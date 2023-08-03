const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Messenger", function () {
  let owner;
  let friend1;
  let friend2;

  //   beforeEach(async function () {
  //     [owner, friend1, friend2] = await ethers.getSigners();
  //     console.log("Deploying contracts with the account:", owner.address);
  //     const contract = await ethers.deployContract("Messenger");
  //     console.log("Contract address:", await contract.getAddress());
  //   });

  describe("Create account", function () {
    it("should create an account and emit NewMember event", async function () {
      [owner, friend1, friend2] = await ethers.getSigners();
      console.log("Deploying contracts with the account:", owner.address);
      const contract = await ethers.deployContract("Messenger");
      console.log("Contract address:", await contract.getAddress());

      const name = "Alice";
      await contract.createAcc(name);

      const user = await contract.userList(owner.address);
      expect(user).to.equal(name);

      const uname = await contract.checkUserExists(owner.address);
      console.log("This is user information", uname);
      expect(uname).to.equal(true);
    });
  });

  // Add more test cases to cover other functionalities of the contract
});
