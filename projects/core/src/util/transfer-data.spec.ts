import { TransferData } from './transfer-data';

describe(`TransferData`, () => {
  describe(`rehydrate`, () => {
    function runWithDomScript(
      scriptOptions: { id: string; content: string },
      test: Function
    ) {
      // prepare script
      const script = document.createElement('script');
      script.id = scriptOptions.id;
      script.setAttribute('type', 'application/json');
      script.textContent = scriptOptions.content;
      document.body.appendChild(script);

      // run test
      test();

      // clean up script
      document.body.removeChild(script);
    }

    it(`should rehydrate config from the JSON script`, () => {
      runWithDomScript(
        { id: 'testId', content: '{&q;test&q;:&q;value&q;}' },
        () => {
          expect(TransferData.rehydrate('testId')).toEqual({ test: 'value' });
        }
      );
    });

    it(`should unescape html characters in the JSON script`, () => {
      runWithDomScript(
        {
          id: 'testId',
          content: '{&q;test&q;:&q;value &s; \\&q; &a; &l; &g;&q;}',
        },
        () => {
          expect(TransferData.rehydrate('testId')).toEqual({
            test: 'value \' " & < >',
          });
        }
      );
    });

    it(`should return undefined when there is no script of given ID`, () => {
      expect(TransferData.rehydrate('noSuchId')).toEqual(undefined);
    });

    it(`should return undefined when the data in the script are not valid JSON`, () => {
      runWithDomScript({ id: 'testId', content: 'invalid-json' }, () => {
        spyOn(console, 'warn');
        expect(TransferData.rehydrate('testId')).toEqual(undefined);
        expect(console.warn).toHaveBeenCalled();
      });
    });
  });

  describe(`transfer`, () => {
    const TEST_ID = 'testId';

    afterEach(() => {
      const script = document.getElementById(TEST_ID);
      if (script) {
        script.parentNode.removeChild(script);
      }
    });

    it(`should place the given data in the JSON script`, () => {
      TransferData.transfer(TEST_ID, { test: 'value' }, document);
      expect(document.getElementById('testId').textContent).toEqual(
        '{&q;test&q;:&q;value&q;}'
      );
    });

    it(`should escape HTML characters in the given data`, () => {
      TransferData.transfer(TEST_ID, { test: 'value \' " & < >' }, document);
      expect(document.getElementById(TEST_ID).textContent).toEqual(
        '{&q;test&q;:&q;value &s; \\&q; &a; &l; &g;&q;}'
      );
    });
  });
});
