// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

/// @title Messenger - A simple contract to facilitate messaging between users.
contract Messenger {
    struct User {
        string name;
        Friend[] friendList;
    }

    struct Friend {
        address addr;
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

    struct friendRequ {
        address from;
        address to;
        bool isAcc;
    }

    AllUsers[] getAllUsers;

    mapping(address => User) userList;
    mapping(bytes32 => Message[]) allMessages;
    mapping(bytes32 => friendRequ) requestInfo;
    mapping(address => friendRequ[]) sentRequest;

    /// @dev Checks if a user with the given address exists.
    function checkUserExists(address addr) public view returns (bool) {
        return bytes(userList[addr].name).length > 0;
    }

    /// @dev Creates a new user account with the provided name.
    function createAcc(string calldata _name) external {
        require(!checkUserExists(msg.sender), "User is already exist.");
        require(bytes(_name).length > 0, "User name can't be null");
        userList[msg.sender].name = _name;
        getAllUsers.push(AllUsers(_name, msg.sender));
    }

    /// @dev Returns the name of the user associated with the given address.
    function getUserName(address _addr) external view returns (string memory) {
        require(checkUserExists(msg.sender), "User is not exist.");
        return userList[_addr].name;
    }

    /// @dev Checks if two addresses are already friends.
    function checkAlreadyFriends(address _user, address _friendAddr)
        internal
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
    function sendRequest(address friendAddr) external {
        bytes32 chatCode = _getChatCode(msg.sender, friendAddr);
        friendRequ memory newRequ = friendRequ(msg.sender, friendAddr, false);
        sentRequest[msg.sender].push(newRequ);
        requestInfo[chatCode] = newRequ;
    }

    /// @dev Accepts a friend request from another user.
    function acceptRequest(address senderAddr) external {
        bytes32 chatCode = _getChatCode(msg.sender, senderAddr);
        requestInfo[chatCode].isAcc = true;
        addFriend(senderAddr);
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
            checkAlreadyFriends(msg.sender, friendAddr),
            "Already a friend"
        );
        _addFriend(msg.sender, friendAddr);
        _addFriend(friendAddr, msg.sender);
    }

    /// @dev Internal function to add a new friend.
    function _addFriend(address me, address friendAddr) internal {
        Friend memory newFriend = Friend(friendAddr);
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
    function sendMessage(address friendAddr, string calldata _msg) external {
        require(checkUserExists(msg.sender), "Create an account first");
        require(
            checkUserExists(friendAddr),
            "The person you want to send a message to isn't registered!"
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
    function readMessage(address friendAddr)
        external
        view
        returns (Message[] memory)
    {
        bytes32 chatCode = _getChatCode(msg.sender, friendAddr);
        return allMessages[chatCode];
    }

    /// @dev Returns the total number of registered users.
    function getAllUsersCount() external view returns (uint256) {
        return getAllUsers.length;
    }

    /// @dev Returns the name and address of a user based on the provided index.
    function getUserByIndex(uint256 index)
        external
        view
        returns (string memory, address)
    {
        require(index < getAllUsers.length, "Invalid index");
        AllUsers memory user = getAllUsers[index];
        return (user.name, user.accountAddress);
    }
}
