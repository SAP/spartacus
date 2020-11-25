const testsPrefix = 'My Company features -';
const testMapping = {
  userPassword: userPasswordTest,
};

export function testFeaturesFromConfig(featureToggles: string[]) {
  featureToggles.forEach((featureToggle: string) => {
    testMapping[featureToggle]();
  });
}

function userPasswordTest(): void {
  describe(`${testsPrefix} user password`, () => {
    it('should', () => {});
  });
}
