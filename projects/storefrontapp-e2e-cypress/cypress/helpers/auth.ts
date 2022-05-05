//TODO: use this const in each place that storage key is used as string
export const AUTH_STORAGE_KEY = 'spartacus⚿⚿auth';

export function getStateAuth() {
  return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY));
}
