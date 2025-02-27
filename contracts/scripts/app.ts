/**
 * @notice Deploys an instance of the GrantRegistry and initialize is with dummy data
 * @dev Used for testing the UI
 * @dev To ensure the GrantRegistry deploys to the expected address, make sure your mnemonic is set to the Hardhat
 * default mnemonic of `test test test test test test test test test test test junk`. When set correctly, the
 * GrantRegistry contract should be deployed locally to 0x5FbDB2315678afecb367f032d93F642f64180aa3
 */

// --- External imports ---
import { ContractFactory } from 'ethers';
import { ethers, network } from 'hardhat';

// --- Constants ---
// Define grants to create (addresses are random)
const grants = [
  {
    owner: '0x34f4E532a33EB545941e914B25Efe348Aea31f0A',
    payee: '0x06c94663E5884BE4cCe85F0869e95C7712d34803',
    metaPtr: 'https://invent-teleportation.eth.link',
  },
  {
    owner: '0x58E52440F56f2A5307772Ec881BCEf2c15e988Ab',
    payee: '0x6f02c37ea174DD05f20aC118da725ffa6A40B990',
    metaPtr: 'https://get-to-mars.eth.link',
  },
  {
    owner: '0x1fB6C46e6aDD95698352707D7f93a31030c80a0B',
    payee: '0x834e659c6757E250db500fe869877311Bb552966',
    metaPtr: 'https://time-travel.eth.link',
  },
];

// --- Method to execute ---
async function main(): Promise<void> {
  // Only run on Hardhat network
  if (network.name !== 'localhost') throw new Error('This script is for use with a running local node');

  // --- GrantRegistry Setup ---
  // Deploy contract
  const signers = await ethers.getSigners();
  const deployer = signers[16]; // use a random signer to minimize chance of mainnet use bumping the nonce and changing deploy address
  const GrantRegistryFactory: ContractFactory = await ethers.getContractFactory('GrantRegistry', deployer);
  const registry = await (await GrantRegistryFactory.deploy()).deployed();
  console.log(`Deployed GrantRegistry to ${registry.address}`);

  // Create the grants
  await Promise.all(grants.map((grant) => registry.createGrant(grant.owner, grant.payee, grant.metaPtr)));
  console.log(`Created ${grants.length} dummy grants`);
}

// --- Execute main() ---
void main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
