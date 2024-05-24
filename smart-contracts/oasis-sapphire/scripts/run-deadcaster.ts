// Usage: pnpm hardhat run --network <network> scripts/run-deadcaster.ts

import { ethers } from 'hardhat';

async function main() {
  const DeadCaster = await ethers.getContractFactory('DeadCaster');
  const deadCaster = await DeadCaster.deploy();
  console.log('DeadCaster deployed to:', await deadCaster.getAddress());

  const tx = await deadCaster.createSecret(
    'ingredient',
    30 /* seconds */,
    Buffer.from('brussels sprouts'),
  );
  console.log('Storing a secret in', tx.hash);
  await tx.wait();
  try {
    console.log('Checking the secret');
    await deadCaster.connect(ethers.provider).revealSecret.staticCall(0);
    console.log('Uh oh. The secret was available!');
    process.exit(1);
  } catch (e: any) {
    console.log('failed to fetch secret:', e.message);
  }
  console.log('Waiting...');

  // Manually generate some transactions to increment local Docker
  // container block
  if ((await ethers.provider.getNetwork()).name == 'sapphire_localnet') {
    await generateTraffic(10);
  }

  await new Promise((resolve) => setTimeout(resolve, 30_000));
  console.log('Checking the secret again');
  await (await deadCaster.revealSecret(0)).wait(); // Reveal the secret.
  const secret = await deadCaster.revealSecret.staticCallResult(0); // Get the value.
  console.log('The secret ingredient is', Buffer.from(secret[0].slice(2), 'hex').toString());
}

async function generateTraffic(n: number) {
  const signer = await ethers.provider.getSigner();
  for (let i = 0; i < n; i++) {
    await signer.sendTransaction({
      to: '0x000000000000000000000000000000000000dEaD',
      value: ethers.parseEther('1.0'),
      data: '0x',
    });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
