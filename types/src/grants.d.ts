import { BigNumber, BigNumberish } from 'ethers';

// --- Types ---
// The output from ethers/typechain allows array or object access to grant data, so we must define types for
// handling the Grant struct as done below
export type GrantObject = {
  id: BigNumber;
  owner: string;
  payee: string;
  metaPtr: string;
};
export type GrantArray = [BigNumber, string, string, string];
export type GrantEthers = GrantArray & GrantObject;
export type Grant = GrantObject | GrantEthers;
export type GrantRound = {
  address: string,
  owner: string,
  registry: string,
  donationToken: string,
  donationTokenName: string,
  donationTokenSymbol: string,
  donationTokenDecimals: BigNumberish,
  funds: BigNumberish,
  status: string,
  startTime: BigNumberish,
  endTime: BigNumberish,
  metaPtr: string,
  minContribution: BigNumberish,
  hasPaidOut: Boolean
};
export type GrantRounds = Array<GrantRound>;
