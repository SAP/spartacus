// import { ChangeDetectionStrategy } from '@angular/core';
// import { ReactiveFormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import createSpy = jasmine.createSpy;

// import { BillingAddressFormModule } from './billing-address-form.module';
// import { BillingAddressFormComponent } from './billing-address-form.component';
// import { Observable, of } from 'rxjs';
// import {
//   Title,
//   Country,
//   Region,
//   UserService,
//   CheckoutService
// } from '@spartacus/core';

// class MockUserService {
//   getTitles(): Observable<Title[]> {
//     return of();
//   }

//   loadTitles(): void {}

//   getDeliveryCountries(): Observable<Country[]> {
//     return of();
//   }

//   loadDeliveryCountries(): void {}

//   getRegions(): Observable<Region[]> {
//     return of();
//   }

//   loadRegions(_countryIsoCode: string): void {}
// }

// class MockCheckoutService {
//   clearAddressVerificationResults = createSpy();
// }

// const mockTitles: Title[] = [
//   {
//     code: 'mr',
//     name: 'Mr.'
//   },
//   {
//     code: 'mrs',
//     name: 'Mrs.'
//   }
// ];
// const mockCountries: Country[] = [
//   {
//     isocode: 'AD',
//     name: 'Andorra'
//   },
//   {
//     isocode: 'RS',
//     name: 'Serbia'
//   }
// ];
// const mockRegions: Region[] = [
//   {
//     isocode: 'CA-ON',
//     name: 'Ontario'
//   },
//   {
//     isocode: 'CA-QC',
//     name: 'Quebec'
//   }
// ];

// describe('BillingAddressFormComponent', () => {
//   let component: BillingAddressFormComponent;
//   let fixture: ComponentFixture<BillingAddressFormComponent>;
//   let mockCheckoutService: MockCheckoutService;
//   let mockUserService: MockUserService;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [ReactiveFormsModule, BrowserAnimationsModule],
//       providers: [
//         { provide: CheckoutService, useValue: mockCheckoutService },
//         { provide: UserService, useValue: mockUserService }
//       ]
//     })
//       .overrideComponent(BillingAddressFormComponent, {
//         set: { changeDetection: ChangeDetectionStrategy.Default }
//       })
//       .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(BillingAddressFormComponent);
//     component = fixture.componentInstance;
//   });

//   it('should be created', () => {
//     expect(component).toBeTruthy();
//   });
// });
