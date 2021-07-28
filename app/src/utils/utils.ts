/**
 * @notice Various helper methods and formatters to help display data in the UI nicely
 */
import router from 'src/router/index';
import { RouteLocationRaw } from 'vue-router';
import { BigNumber, isAddress } from 'src/utils/ethers';

// Returns an address with the following format: 0x1234...abcd
export function formatAddress(address: string) {
  if (!address || address.length !== 42) return null;
  return `${address.slice(0, 6)}...${address.slice(38)}`;
}

// Navigates to the specified page and pushes a new entry into the history stack
export async function pushRoute(to: RouteLocationRaw) {
  await router.push(to);
}

// Returns true if the provided URL is a valid URL
export function isValidUrl(val: string) {
  return val && val.includes('://'); // TODO more robust URL validation
}

// Returns true if the provided address is valid (TODO support ENS)
export function isValidAddress(val: string) {
  return isAddress(val);
}

// Expects a unix timestamp and will return a human readable message of how far in the past/future it is
export function daysAgo(val = 0) {
  // use a formatter to establish "in 10 days" vs "10 days ago"
  const formatter = new Intl.RelativeTimeFormat();

  // days ago
  const deltaDays = (val * 1000 - Date.now()) / (1000 * 3600 * 24);

  // Format days to string (rember to round off deltaDays)
  return formatter.format(Math.round(deltaDays), 'days');
}

// convert a unix ts to a toLocaleString
export const unixToLocaleString = (time: BigNumber) => {
  return new Date(time.toNumber() * 1000).toLocaleString();
};
