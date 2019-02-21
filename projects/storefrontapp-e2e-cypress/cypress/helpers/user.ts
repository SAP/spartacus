export function generateMail(alias: string, newTimestamp: boolean) {
  const timestamp = newTimestamp
    ? Date.now() - 1535535333333
    : Cypress.env('TIMESTAMP');
  return `user_${alias}_${timestamp}@ydev.hybris.com`;
}

export function randomString() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
}
