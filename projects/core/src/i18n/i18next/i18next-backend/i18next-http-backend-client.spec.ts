/*
SPIKE TODO: DRAFT PLAN plan:

when config 'i18n.backend.loadPath' is set
should use angular http client for loading translations from backend
should use the loadPath for loading translations from backend

forwards success response to i18next callback
forwards failure response to i18next callback
*/

// SPIKE TODO: fix the tests below:

// imports: [
//   HttpClientTestingModule,
// ],

// describe('i18nextGetHttpClient should return a http client that', () => {
//   let httpMock: HttpTestingController;
//   let httpClient: HttpClient;
//   let req: TestRequest;
//   let testCallback: RequestCallback;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//     });

//     httpMock = TestBed.inject(HttpTestingController);
//     httpClient = TestBed.inject(HttpClient);

//     const func = i18nextGetHttpClient(httpClient);
//     testCallback = jasmine.createSpy('testCallback');
//     func({}, testUrl, {}, testCallback);
//     req = httpMock.expectOne({ url: testUrl, method: 'GET' });
//   });

//   afterEach(() => {
//     httpMock.verify();
//   });

//   it('requests for responseType text', () => {
//     expect(req.request.responseType).toBe('text');
//   });

//   it('forwards success response to i18next callback', () => {
//     req.flush('testResponse');

//     expect(testCallback).toHaveBeenCalledWith(null, {
//       status: 200,
//       data: 'testResponse',
//     });
//   });

//   it('forwards failure response to i18next callback', () => {
//     const error = 'test error message';
//     const statusText = 'Not Found';
//     const status = 404;
//     const expectedHttpErrorResponse = new HttpErrorResponse({
//       status,
//       error,
//       statusText,
//       url: testUrl,
//     });

//     req.flush(error, {
//       status,
//       statusText,
//     });
//     expect(testCallback).toHaveBeenCalledWith(expectedHttpErrorResponse, {
//       status,
//       // a workaround for https://github.com/i18next/i18next-http-backend/issues/82
//       data: null as any,
//     });
//   });
// });
