// import {
//   HttpClientTestingModule,
//   HttpTestingController,
// } from '@angular/common/http/testing';
// import { TestBed } from '@angular/core/testing';
// import { ConverterService, OccEndpointsService } from '@spartacus/core';
// import { OccSavedCartAdapter } from './occ-saved-cart.adapter';

// import {
//   HttpClientTestingModule,
//   HttpTestingController,
// } from '@angular/common/http/testing';
// import { TestBed } from '@angular/core/testing';
// import { ConverterService, OccEndpointsService } from '@spartacus/core';
// import { OccSavedCartAdapter } from './occ-saved-cart.adapter';

// describe('OccSavedCartAdapter', () => {
//   let adapter: OccSavedCartAdapter;
//   let converter: ConverterService;
//   let httpMock: HttpTestingController;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [
//         OccSavedCartAdapter,
//         {
//           provide: OccEndpointsService,
//         },
//       ],
//     });
//     converter = TestBed.inject(ConverterService);
//     adapter = TestBed.inject(OccSavedCartAdapter);
//     httpMock = TestBed.inject(HttpTestingController);
//     spyOn(converter, 'pipeable').and.callThrough();
//   });

//   afterEach(() => {
//     httpMock.verify();
//   });

//   it('should be created', () => {
//     expect(adapter).toBeTruthy();
//   });
// });
