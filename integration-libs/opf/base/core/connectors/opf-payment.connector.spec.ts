// TODO: Add unit tests

// import { TestBed } from '@angular/core/testing';
// import { ActiveConfiguration } from '@spartacus/opf/root';
// import { EMPTY, Observable } from 'rxjs';
// import { OpfCheckoutConnector } from './opf-checkout.connector';
// import { OpfAdapter } from './opf.adapter';

// class MockOpfAdapter implements Partial<OpfAdapter> {
//   getActiveConfigurations(): Observable<ActiveConfiguration[]> {
//     return EMPTY;
//   }
// }

// describe('OpfCheckoutConnector', () => {
//   let service: OpfCheckoutConnector;
//   let adapter: OpfAdapter;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         OpfCheckoutConnector,
//         { provide: OpfAdapter, useClass: MockOpfAdapter },
//       ],
//     });

//     service = TestBed.inject(OpfCheckoutConnector);
//     adapter = TestBed.inject(OpfAdapter);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('getActiveConfigurations should call adapter', () => {
//     spyOn(adapter, 'getActiveConfigurations').and.stub();
//     service.getActiveConfigurations();
//     expect(adapter.getActiveConfigurations).toHaveBeenCalled();
//   });
// });
