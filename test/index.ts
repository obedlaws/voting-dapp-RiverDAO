import { expect } from "chai";
import { ethers } from "hardhat";

describe("Deployment", function () {
  it("Should deploy and state should be 0", async function () {
    const VToken = await ethers.getContractFactory("VToken");
    const vToken = await VToken.deploy();
    
    const RiverDAOvoting = await ethers.getContractFactory("Voting");
    const riverDAOvoting = await RiverDAOvoting.deploy(vToken.address);

    await riverDAOvoting.deployed();
    expect(await riverDAOvoting.state()).to.equal(0)

  })
})

describe("Registering error", function () {
  it("Should fail and throw error 'Not enough token to register' ", async function () {
    const [addr1] = await ethers.getSigners();

    const VToken = await ethers.getContractFactory("VToken");
    const vToken = await VToken.deploy();

    const RiverDAOvoting = await ethers.getContractFactory("Voting");
    const riverDAOvoting = await RiverDAOvoting.deploy(vToken.address);

    await vToken.transfer(addr1.address, "20000000000000000000");

    await riverDAOvoting.connect(addr1).registerVoters();

  })
})

describe("Succesful registering", function () {
  it("Registration of addr1 should be equal to true", async function () {
    const [addr1] = await ethers.getSigners();

    const VToken = await ethers.getContractFactory("VToken");
    const vToken = await VToken.deploy();

    const RiverDAOvoting = await ethers.getContractFactory("Voting");
    const riverDAOvoting = await RiverDAOvoting.deploy(vToken.address);

    await vToken.transfer(addr1.address, "2000000000000000000000");

    await riverDAOvoting.connect(addr1).registerVoters();

    const test = riverDAOvoting.registered(addr1.address);

    expect(await test).to.equal(true);

  })
})

describe("Succesful Proposal Registration", function () {
  it("Proposal '0' should be 'Make Pinguins Fly'", async function () {
    const [addr1] = await ethers.getSigners();

    const VToken = await ethers.getContractFactory("VToken");
    const vToken = await VToken.deploy();

    const RiverDAOvoting = await ethers.getContractFactory("Voting");
    const riverDAOvoting = await RiverDAOvoting.deploy(vToken.address);

    await vToken.transfer(addr1.address, "2000000000000000000000");

    await riverDAOvoting.connect(addr1).registerVoters();
    await riverDAOvoting.startProposalReg();

    await riverDAOvoting.connect(addr1).registerProposal("Make Pinguins Fly");

    expect(await riverDAOvoting.getProposalDescription(0)).to.equal("Make Pinguins Fly");

  })
})


describe("Succesful Voting", function () {
  it("Proposal '0' should win", async function () {
    const [addr1, addr2, addr3, addr4, addr5, addr6, addr7, addr8] = await ethers.getSigners();

    const VToken = await ethers.getContractFactory("VToken");
    const vToken = await VToken.deploy();

    const RiverDAOvoting = await ethers.getContractFactory("Voting");
    const riverDAOvoting = await RiverDAOvoting.deploy(vToken.address);

    await vToken.transfer(addr1.address, "2000000000000000000000");
    await vToken.transfer(addr2.address, "2000000000000000000000");
    await vToken.transfer(addr3.address, "2000000000000000000000");
    await vToken.transfer(addr4.address, "2000000000000000000000");
    await vToken.transfer(addr5.address, "2000000000000000000000");
    await vToken.transfer(addr6.address, "2000000000000000000000");
    await vToken.transfer(addr7.address, "2000000000000000000000");
    await vToken.transfer(addr8.address, "2000000000000000000000");

    await riverDAOvoting.connect(addr1).registerVoters();
    await riverDAOvoting.connect(addr2).registerVoters();
    await riverDAOvoting.connect(addr3).registerVoters();
    await riverDAOvoting.connect(addr4).registerVoters();
    await riverDAOvoting.connect(addr5).registerVoters();
    await riverDAOvoting.connect(addr6).registerVoters();
    await riverDAOvoting.connect(addr7).registerVoters();
    await riverDAOvoting.connect(addr8).registerVoters();

    await riverDAOvoting.startProposalReg();

    await riverDAOvoting.connect(addr1).registerProposal("Make Pinguins Fly");
    await riverDAOvoting.connect(addr2).registerProposal("Get 1mill a year");
  
    await riverDAOvoting.endProposalReg();
    await riverDAOvoting.startVoting()

    await riverDAOvoting.connect(addr1).vote(0);
    await riverDAOvoting.connect(addr2).vote(0);
    await riverDAOvoting.connect(addr3).vote(0);
    await riverDAOvoting.connect(addr4).vote(0);
    await riverDAOvoting.connect(addr5).vote(0);
    await riverDAOvoting.connect(addr6).vote(1);
    await riverDAOvoting.connect(addr7).vote(1);
    await riverDAOvoting.connect(addr8).vote(1);

    await riverDAOvoting.endVoting();
    await riverDAOvoting.tallyVotes();

    expect(await riverDAOvoting.winningDesc()).to.equal("Make Pinguins Fly")

  })
})









