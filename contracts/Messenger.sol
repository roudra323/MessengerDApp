// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

/// @title Messenger: A smart contract for messaging and friend requests
/// test 1
contract Messenger {
    struct User {
        string name;
        Friend[] friendList;
    }

    struct Friend {
        address addr;
        string name;
    }

    struct Message {
        address sender;
        uint256 timestamp;
        string msge;
        address receiver;
    }

    struct AllUsers {
        string name;
        address accountAddress;
    }

    struct FriendRequ {
        address from;
        address to;
        bool isAcc;
        bool isSent;
        bool isRejec;
    }

    // State Variables
    AllUsers[] getAllUsers;

    mapping(address => User) public userList;
    mapping(bytes32 => Message[]) allMessages;
    mapping(bytes32 => FriendRequ) requestInfo;
    mapping(address => FriendRequ[]) sentRequest;
    mapping(address => FriendRequ[]) receivedRequ;

    // Events
    event NewMember(address memberAddr, string name);

    /// @dev Checks if a user with the given address exists.
    function checkUserExists(address addr) public view returns (bool) {
        return bytes(userList[addr].name).length > 0;
    }

    /// @dev Creates a new user account with the provided name.
    /// @param _name The name of the user.
    function createAcc(string calldata _name) external {
        require(!checkUserExists(msg.sender), "User is already exist.");
        require(bytes(_name).length > 0, "User name can't be null");
        userList[msg.sender].name = _name;
        getAllUsers.push(AllUsers(_name, msg.sender));
        emit NewMember(msg.sender, _name);
    }

    /// @dev Returns the name of the user associated with the given address.
    /// @param _addr The address of the user.
    function getUserName(address _addr) internal view returns (string memory) {
        require(checkUserExists(msg.sender), "User is not exist.");
        return userList[_addr].name;
    }

    /// @dev Checks if two addresses are already friends.
    function checkAlreadyFriends(address _user, address _friendAddr)
        public
        view
        returns (bool)
    {
        if (
            userList[_user].friendList.length >
            userList[_friendAddr].friendList.length
        ) {
            address temp = _user;
            _user = _friendAddr;
            _friendAddr = temp;
        }
        for (uint256 i = 0; i < userList[_user].friendList.length; i++) {
            if (userList[_user].friendList[i].addr == _friendAddr) {
                return true;
            }
        }
        return false;
    }

    /// @dev Sends a friend request to another user.
    /// @param friendAddr The address of the user to send the friend request to.
    function sendRequest(address friendAddr) external {
        require(checkUserExists(msg.sender), "You are not registered");
        require(checkUserExists(friendAddr), "User doesn't exist");
        bytes32 chatCode = _getChatCode(msg.sender, friendAddr);
        FriendRequ memory newRequ = FriendRequ(
            msg.sender,
            friendAddr,
            false,
            true,
            false
        );
        sentRequest[msg.sender].push(newRequ);
        receivedRequ[friendAddr].push(newRequ);
        requestInfo[chatCode] = newRequ;
    }

    /// @dev Accepts a friend request from another user.
    /// @param senderAddr The address of the user who sent the friend request.
    function acceptRequest(address senderAddr) external {
        require(checkUserExists(msg.sender), "You are not registered");
        require(checkUserExists(senderAddr), "User doesn't exist");
        bytes32 chatCode = _getChatCode(msg.sender, senderAddr);
        require(
            requestInfo[chatCode].isSent,
            "Address doesn't sent you friend Request"
        );
        requestInfo[chatCode].isAcc = true;
        addFriend(senderAddr);
    }

    /// @dev Checks if the friend request from a user is accepted.
    /// @param friendAddr The address of the user who sent the friend request.
    /// @return Whether the request is accepted or not.
    function checkIfAccepted(address friendAddr) external view returns (bool) {
        bytes32 chatCode = _getChatCode(msg.sender, friendAddr);
        return requestInfo[chatCode].isAcc;
    }

    /// @dev Rejects a friend request from another user.
    /// @param friendAddress The address of the user who sent the friend request.
    function rejectRequest(address friendAddress) external {
        require(checkUserExists(msg.sender), "You are not registered");
        require(checkUserExists(friendAddress), "User doesn't exist");
        bytes32 chatCode = _getChatCode(msg.sender, friendAddress);
        require(
            requestInfo[chatCode].isSent,
            "Address doesn't sent you friend Request"
        );
        requestInfo[chatCode].isRejec = true;
    }

    /// @dev Adds a new friend to the user's friend list.
    function addFriend(address friendAddr) internal {
        require(friendAddr != address(0), "Address is not valid");
        require(checkUserExists(msg.sender), "User is not exist.");
        require(checkUserExists(friendAddr), "User is not exist.");
        require(
            msg.sender != friendAddr,
            "User can't add himself as a friend!"
        );
        require(
            !checkAlreadyFriends(msg.sender, friendAddr),
            "Already a friend"
        );
        _addFriend(msg.sender, friendAddr);
        _addFriend(friendAddr, msg.sender);
    }

    /// @dev Internal function to add a new friend.
    function _addFriend(address me, address friendAddr) internal {
        Friend memory newFriend = Friend(friendAddr, getUserName(friendAddr));
        userList[me].friendList.push(newFriend);
    }

    /// @dev Returns the list of all friends for the caller.
    function getAllFriends() external view returns (Friend[] memory) {
        return userList[msg.sender].friendList;
    }

    /// @dev Internal function to generate a unique chat code for two addresses.
    function _getChatCode(address addr1, address addr2)
        internal
        pure
        returns (bytes32)
    {
        if (addr1 > addr2) {
            return keccak256(abi.encodePacked(addr2, addr1));
        } else {
            return keccak256(abi.encodePacked(addr1, addr2));
        }
    }

    /// @dev Sends a message to a friend.
    /// @param friendAddr The address of the friend to whom the message is sent.
    /// @param _msg The message content.
    function sendMessage(address friendAddr, string calldata _msg) external {
        require(checkUserExists(msg.sender), "Create an account first");
        require(
            checkUserExists(friendAddr),
            "The person you wanna send msg isn't registered!!"
        );
        require(
            checkAlreadyFriends(msg.sender, friendAddr),
            "You guys are not friends"
        );
        bytes32 chatCode = _getChatCode(msg.sender, friendAddr);
        Message memory newMsg = Message(
            msg.sender,
            block.timestamp,
            _msg,
            friendAddr
        );
        allMessages[chatCode].push(newMsg);
    }

    /// @dev Reads all the messages between the caller and a friend.
    /// @param friendAddr The address of the friend whose messages are being read.
    /// @return An array of messages exchanged between the caller and the friend.
    function readMessage(address senderAddr, address friendAddr)
        external
        view
        returns (Message[] memory)
    {
        bytes32 chatCode = _getChatCode(senderAddr, friendAddr);
        return allMessages[chatCode];
    }

    /// @dev Returns all the friend requests sent by the caller.
    /// @return An array of friend requests sent by the caller.
    function getAllSentRequest() external view returns (FriendRequ[] memory) {
        FriendRequ[] memory friendRequests = sentRequest[msg.sender];
        return friendRequests;
    }

    /// @dev Returns all the friend requests received by the caller.
    /// @return An array of friend requests received by the caller.
    function getAllReceivedRequest()
        external
        view
        returns (FriendRequ[] memory)
    {
        FriendRequ[] memory friendRequests = receivedRequ[msg.sender];
        return friendRequests;
    }

    /// @dev Returns the list of all users registered in the contract.
    /// @return An array of user data containing name and address.
    function getAllUser() external view returns (AllUsers[] memory) {
        uint256 length = getAllUsers.length;
        AllUsers[] memory allUsersData = new AllUsers[](length);
        for (uint256 i = 0; i < length; i++) {
            AllUsers memory user = getAllUsers[i];
            allUsersData[i] = AllUsers(user.name, user.accountAddress);
        }

        return allUsersData;
    }
}
