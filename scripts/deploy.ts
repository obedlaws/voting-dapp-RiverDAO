
import { expect } from "chai";
import { ethers } from "hardhat";

async function main() {
  const RiverDAOvoting = await ethers.getContractFactory("States");
  const riverDAOvoting = await RiverDAOvoting.deploy();

  await riverDAOvoting.deployed();

  console.log("Voting system deployed at", riverDAOvoting.address);

  expect(await state)


}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
