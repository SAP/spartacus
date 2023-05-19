// TODO: Add unit tests

// import { TestBed } from '@angular/core/testing';
// import { BaseSiteService, Config } from '@spartacus/core';
// import { of } from 'rxjs';
// import { OpfEndpointsService } from './opf-endpoints.service';
// import createSpy = jasmine.createSpy;

// const mockOccConfig = {
//   backend: {
//     occ: {
//       baseUrl: 'http://test-baseUrl',
//       endpoints: {
//         test: 'test-endpoint',
//       },
//     },
//   },
//   opf: {
//     baseUrl: 'http://test-opf.com',
//   },
// };

// const baseSite = 'test-baseSite';
// class MockBaseSiteService {
//   getActive = createSpy().and.returnValue(of(baseSite));
// }

// describe(`OpfEndpointsService`, () => {
//   let service: OpfEndpointsService;
//   let baseSiteService: BaseSiteService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         OpfEndpointsService,
//         { provide: BaseSiteService, useClass: MockBaseSiteService },
//         { provide: Config, useValue: mockOccConfig },
//       ],
//     });

//     service = TestBed.inject(OpfEndpointsService);
//     baseSiteService = TestBed.inject(BaseSiteService);
//   });

//   it(`should build proper url based on passed endpoint for context`, () => {
//     const result = service.buildUrl('test');
//     const expectedUrl = `${mockOccConfig.opf.baseUrl}/${baseSite}/${mockOccConfig.backend.occ.endpoints.test}`;

//     expect(result).toEqual(expectedUrl);
//     expect(baseSiteService.getActive).toHaveBeenCalled();
//   });
// });
