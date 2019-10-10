import { LoadJsonUtils, NodeHttpsClient } from './load-json-utils';

describe(`LoadJsonUtils`, () => {
  describe(`using XMLHttpRequest`, () => {
    interface MockXhrOptions {
      success: boolean;
      status?: number;
      responseText?: string;
    }

    async function runWithMockXhr(options: MockXhrOptions, test: Function) {
      // save original properties of global xhr
      const originalXhr = {
        status: Object.getOwnPropertyDescriptor(
          XMLHttpRequest.prototype,
          'status'
        ),
        responseText: Object.getOwnPropertyDescriptor(
          XMLHttpRequest.prototype,
          'responseText'
        ),
        open: XMLHttpRequest.prototype.open,
        send: XMLHttpRequest.prototype.send,
      };

      // mock properties of the global xhr
      Object.defineProperty(XMLHttpRequest.prototype, 'status', {
        writable: true,
      });
      Object.defineProperty(XMLHttpRequest.prototype, 'responseText', {
        writable: true,
      });
      XMLHttpRequest.prototype.open = jasmine.createSpy('open');
      XMLHttpRequest.prototype.send = function() {
        this.status = options.status;
        this.responseText = options.responseText;
        if (options.success) {
          this.onload();
        } else {
          this.onerror('Test Xhr failure');
        }
      };

      // perform test
      await test();

      // restore original properties in the global xhr
      Object.defineProperty(
        XMLHttpRequest.prototype,
        'status',
        originalXhr.status
      );
      Object.defineProperty(
        XMLHttpRequest.prototype,
        'responseText',
        originalXhr.responseText
      );
      XMLHttpRequest.prototype.open = originalXhr.open;
      XMLHttpRequest.prototype.send = originalXhr.send;
    }

    describe(`loadXhr`, () => {
      it('should perform xhr GET call to the given url', async () => {
        await runWithMockXhr(
          { success: true, status: 200, responseText: '{}' },
          async () => {
            await LoadJsonUtils.loadXhr('testUrl');
            expect(XMLHttpRequest.prototype.open).toHaveBeenCalledWith(
              'GET',
              'testUrl',
              true
            );
          }
        );
      });

      it('should reject promise on the call failure', async () => {
        await runWithMockXhr({ success: false }, async () => {
          let rejected;
          await LoadJsonUtils.loadXhr('testUrl').catch(() => (rejected = true));
          expect(rejected).toBe(true);
        });
      });

      it('should reject promise on the status other than 200', async () => {
        await runWithMockXhr(
          { success: false, status: 400, responseText: '{}' },
          async () => {
            let rejected;
            await LoadJsonUtils.loadXhr('testUrl').catch(
              () => (rejected = true)
            );
            expect(rejected).toBe(true);
          }
        );
      });

      it('should reject promise on invalid JSON in the response', async () => {
        await runWithMockXhr(
          { success: false, status: 400, responseText: 'invalid-json' },
          async () => {
            let rejected;
            await LoadJsonUtils.loadXhr('testUrl').catch(
              () => (rejected = true)
            );
            expect(rejected).toBe(true);
          }
        );
      });
    });
  });

  describe(`using Node.js https client`, () => {
    let mockHttpsClient: NodeHttpsClient;
    let mockStatusCode: number;
    let mockEvents: {
      onData?: Function;
      onEnd?: Function;
      onError?: Function;
    };

    beforeEach(() => {
      mockEvents = {};

      const mockGetResult = {
        on: (_: 'error', onError) => (mockEvents.onError = onError),
      };

      const mockResponse = {
        on: function(event: string, callback: Function) {
          if (event === 'data') {
            mockEvents.onData = callback;
          } else if (event === 'end') {
            mockEvents.onEnd = callback;
          }
        },
        get statusCode() {
          return mockStatusCode;
        },
      };

      mockHttpsClient = {
        get: jasmine.createSpy('get').and.callFake((_, onResponse) => {
          onResponse(mockResponse);
          return mockGetResult;
        }),
      };
    });

    describe(`loadNodeHttps`, () => {
      it('should perform Node.js https GET call to the given url', async () => {
        const promise = LoadJsonUtils.loadNodeHttps('testUrl', mockHttpsClient);
        expect(mockHttpsClient.get).toHaveBeenCalledWith(
          'testUrl',
          jasmine.any(Function)
        );

        mockEvents.onData('{');
        mockEvents.onData(' "testKey": "testValue" ');
        mockEvents.onData('}');
        mockStatusCode = 200;
        mockEvents.onEnd();
        const result = await promise;
        expect(result).toEqual({ testKey: 'testValue' });
      });

      it('should reject promise on the call failure', async () => {
        const promise = LoadJsonUtils.loadNodeHttps('testUrl', mockHttpsClient);
        mockEvents.onData('{}');
        mockEvents.onError({ message: 'test error' });

        let rejected;
        await promise.catch(() => (rejected = true));
        expect(rejected).toBe(true);
      });

      it('should reject promise on invalid JSON in the response', async () => {
        const promise = LoadJsonUtils.loadNodeHttps('testUrl', mockHttpsClient);
        mockEvents.onData('{}');
        mockStatusCode = 400;
        mockEvents.onEnd();

        let rejected;
        await promise.catch(() => (rejected = true));
        expect(rejected).toBe(true);
      });

      it('should reject promise on invalid JSON in the response', async () => {
        const promise = LoadJsonUtils.loadNodeHttps('testUrl', mockHttpsClient);
        mockEvents.onData('invalid-json');
        mockStatusCode = 200;
        mockEvents.onEnd();

        let rejected;
        await promise.catch(() => (rejected = true));
        expect(rejected).toBe(true);
      });
    });

    describe(`loadNodeHttpsFactory`, () => {
      it('should return getNodeHttps function fed up with https client object', async () => {
        spyOn(LoadJsonUtils, 'loadNodeHttps');
        const resultFetchFunction = LoadJsonUtils.loadNodeHttpsFactory(null);
        await resultFetchFunction('testUrl');
        expect(LoadJsonUtils.loadNodeHttps).toHaveBeenCalledWith(
          'testUrl',
          null
        );
      });
    });
  });
});
