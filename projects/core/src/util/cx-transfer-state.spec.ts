import { CxTransferState } from './cx-transfer-state';

describe(`CxTransferState`, () => {
  const TEST_SCRIPT_ID = 'test-script-id';

  // spike todo add more tests!
  describe(`rehydrate`, () => {
    it(`should rehydrate config from DOM json script`, async () => {
      // prepare script
      const script = document.createElement('script');
      script.id = TEST_SCRIPT_ID;
      script.setAttribute('type', 'application/json');
      script.textContent = '{}';
      document.body.appendChild(script);

      // test
      const result = CxTransferState.rehydrate(TEST_SCRIPT_ID, document);
      expect(result).toEqual({});

      // clean up script
      document.body.removeChild(script);
    });
  });
});
