const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Messenger", function () {
  let owner;
  let friend1;
  let friend2;
  let contract;

  beforeEach(async function () {
    [owner, friend1, friend2] = await ethers.getSigners();
    contract = await ethers.deployContract("Messenger");
  });

  describe("Create account", function () {
    it("should create an account and emit NewMember event", async function () {
      const name = "Alice";
      await contract.createAcc(name);
      const user = await contract.userList(owner.address);
      expect(user).to.equal(name);
    });
    it("Should return true if address is Registered", async function () {
      await contract.createAcc("Alex");
      const isRegi = await contract.checkUserExists(owner.address);
      expect(isRegi).to.equal(true);
    });
    it("Should emit NewMember event", async function () {
      await expect(contract.createAcc("Alex"))
        .to.emit(contract, "NewMember")
        .withArgs(owner.address, "Alex");
    });
  });
  // Add more test cases to cover other functionalities of the contract
  describe("Send Friend Request", function () {
    it("Should sent friend rerquest", async function () {
      await contract.connect(friend1).createAcc("Alex");
      await contract.connect(friend2).createAcc("Bob");
      await contract.connect(friend1).sendRequest(friend2.address);
      const array = await contract.connect(friend1).getAllSentRequest();
      expect(array.length).to.equal(1);
    });

    it("Should receive friend rerquest", async function () {
      await contract.connect(friend1).createAcc("Alex");
      await contract.connect(friend2).createAcc("Bob");
      await contract.connect(friend1).sendRequest(friend2.address);
      const array = await contract.connect(friend2).getAllReceivedRequest();
      expect(array.length).to.equal(1);
    });
  });
});
