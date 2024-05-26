// Usage: pnpm hardhat run --network <network> scripts/run-deadcaster.ts

import { ethers } from 'hardhat';

async function main() {
  const DeadCaster = await ethers.getContractFactory('DeadCaster');
  const deadCaster = await DeadCaster.deploy();
  console.log('DeadCaster deployed to:', await deadCaster.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
