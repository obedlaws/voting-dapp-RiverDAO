import { expect } from "chai";
import { ethers } from "hardhat";

describe("Deployment", function () {
  it("should deploy and state should be 0", async function () {
    const RiverDAOvoting = await ethers.getContractFactory("Voting");
    const riverDAOvoting = await RiverDAOvoting.deploy();

    await riverDAOvoting.deployed();
    expect(await riverDAOvoting.state()).to.equal(0)
  })
})









