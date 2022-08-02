// import { CommonModule } from '@angular/common';
// import { ElementRef, ViewContainerRef } from '@angular/core';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ReactiveFormsModule } from '@angular/forms';
// import { By } from '@angular/platform-browser';
// import { I18nTestingModule, Product } from '@spartacus/core';
// import { PreferredStoreService } from '@spartacus/pickup-in-store/core';
// import {
//   IntendedPickupLocationFacade,
//   PickupLocationsSearchFacade,
// } from '@spartacus/pickup-in-store/root';
// import {
//   CurrentProductService,
//   LaunchDialogService,
//   LAUNCH_CALLER,
// } from '@spartacus/storefront';
// import { MockPreferredStoreService } from 'feature-libs/pickup-in-store/core/services/preferred-store.service.spec';
// import { Observable, of, Subscription } from 'rxjs';
// import { MockIntendedPickupLocationService } from '../../../core/facade/intended-pickup-location.service.spec';
// import { CurrentLocationService } from '../../services/current-location.service';
// import { PickupOptionsComponent } from './pickup-options.component';

// import createSpy = jasmine.createSpy;

// class MockPickupLocationsSearchFacade implements PickupLocationsSearchFacade {
//   startSearch = createSpy();
//   hasSearchStarted = createSpy();
//   isSearchRunning = createSpy();
//   getSearchResults = createSpy().and.returnValue(
//     of([
//       {
//         name: 'preferredStore',
//         stockInfo: {
//           stockLevel: 12,
//         },
//       },
//     ])
//   );
//   clearSearchResults = createSpy();
//   getHideOutOfStock = createSpy();
//   setBrowserLocation = createSpy();
//   toggleHideOutOfStock = createSpy();
//   stockLevelAtStore = createSpy();
//   getStockLevelAtStore = createSpy().and.returnValue(
//     of({ stockLevel: { displayName: 'London School' } })
//   );
// }

// class MockLaunchDialogService implements Partial<LaunchDialogService> {
//   openDialog(
//     _caller: LAUNCH_CALLER,
//     _openElement?: ElementRef,
//     _vcr?: ViewContainerRef,
//     _data?: any
//   ) {
//     return of();
//   }

//   get dialogClose(): Observable<string | undefined> {
//     return of(undefined);
//   }
// }

// class MockCurrentProductService {
//   getProduct(): Observable<Product | null> {
//     return of({ code: 'productCode', availableForPickup: true });
//   }
// }

// class MockCurrentLocationService {
//   getCurrentLocation(
//     successCallback: PositionCallback,
//     _errorCallback?: PositionErrorCallback | null,
//     _options?: PositionOptions
//   ): void {
//     successCallback({
//       coords: {
//         latitude: 0,
//         longitude: 0,
//         accuracy: 0,
//         altitude: 0,
//         altitudeAccuracy: 0,
//         heading: 0,
//         speed: 0,
//       },
//       timestamp: 0,
//     });
//   }
// }

// describe('PickupOptionsComponent', () => {
//   let component: PickupOptionsComponent;
//   let fixture: ComponentFixture<PickupOptionsComponent>;
//   let launchDialogService: LaunchDialogService;
//   let intendedPickupLocationService: IntendedPickupLocationFacade;
//   let currentProductService: CurrentProductService;

//   const configureTestingModule = () =>
//     TestBed.configureTestingModule({
//       imports: [CommonModule, I18nTestingModule, ReactiveFormsModule],
//       providers: [
//         PickupOptionsComponent,
//         {
//           provide: PickupLocationsSearchFacade,
//           useClass: MockPickupLocationsSearchFacade,
//         },
//         {
//           provide: LaunchDialogService,
//           useClass: MockLaunchDialogService,
//         },
//         {
//           provide: IntendedPickupLocationFacade,
//           useClass: MockIntendedPickupLocationService,
//         },
//         { provide: CurrentProductService, useClass: MockCurrentProductService },
//         {
//           provide: PreferredStoreService,
//           useClass: MockPreferredStoreService,
//         },
//         {
//           provide: CurrentLocationService,
//           useClass: MockCurrentLocationService,
//         },
//       ],
//       declarations: [PickupOptionsComponent],
//     });

//   const stubServiceAndCreateComponent = () => {
//     fixture = TestBed.createComponent(PickupOptionsComponent);
//     component = fixture.componentInstance;
//     launchDialogService = TestBed.inject(LaunchDialogService);
//     intendedPickupLocationService = TestBed.inject(
//       IntendedPickupLocationFacade
//     );
//     currentProductService = TestBed.inject(CurrentProductService);

//     spyOn(currentProductService, 'getProduct').and.callThrough();
//     spyOn(launchDialogService, 'openDialog').and.callThrough();
//     spyOn(
//       intendedPickupLocationService,
//       'removeIntendedLocation'
//     ).and.callThrough();
//     spyOn(intendedPickupLocationService, 'setIntendedLocation');

//     fixture.detectChanges();
//   };

//   describe('with current product', () => {
//     beforeEach(() => {
//       configureTestingModule().compileComponents();
//       stubServiceAndCreateComponent();
//     });

//     it('should create', () => {
//       expect(component).toBeDefined();
//     });

//     it('should display the form', () => {
//       const form = fixture.debugElement.query(By.css('form'));
//       expect(form).not.toBeNull();

//       const element: HTMLFormElement = form.nativeElement;
//       expect(element.querySelector('#delivery')).not.toBeNull();
//       expect(element.querySelector('#pickup')).not.toBeNull();
//     });

//     it('should trigger and open dialog', () => {
//       component.openDialog();
//       expect(launchDialogService.openDialog).toHaveBeenCalledWith(
//         LAUNCH_CALLER.PICKUP_IN_STORE,
//         component.element,
//         component['vcr'],
//         { productCode: 'productCode' }
//       );
//     });

//     it('should unsubscribe from any subscriptions when destroyed', () => {
//       component.subscription = new Subscription();
//       spyOn(component.subscription, 'unsubscribe');
//       component.ngOnDestroy();
//       expect(component.subscription.unsubscribe).toHaveBeenCalled();
//     });

//     it('should get the intended pickup location for the product on init', () => {
//       spyOn(
//         intendedPickupLocationService,
//         'getIntendedLocation'
//       ).and.callThrough();

//       component.ngOnInit();

//       expect(
//         intendedPickupLocationService.getIntendedLocation
//       ).toHaveBeenCalledWith('productCode');
//       expect(component.availableForPickup).toBe(true);
//     });

//     it('should set pickupInStore to false when there is not an intended location', () => {
//       spyOn(
//         intendedPickupLocationService,
//         'getIntendedLocation'
//       ).and.callThrough();

//       component.ngOnInit();

//       expect(component.deliveryOptionsForm.value).toEqual({
//         deliveryOption: 'delivery',
//       });
//     });

//     it('should set pickupInStore to true when there is an intended location', () => {
//       spyOn(
//         intendedPickupLocationService,
//         'getIntendedLocation'
//       ).and.returnValue(of({ name: 'location-name' }));

//       component.ngOnInit();

//       expect(component.deliveryOptionsForm.value).toEqual({
//         deliveryOption: 'pickup',
//       });
//     });

//     it('should clear intended pickup location when delivery is selected', () => {
//       component.clearIntendedPickupLocation();
//       expect(
//         intendedPickupLocationService.removeIntendedLocation
//       ).toHaveBeenCalledWith('productCode');
//     });

//     it('should open the dialog if the display name is not set', () => {
//       component['displayNameIsSet'] = false;

//       component.openDialog = createSpy();
//       component.selectPickupInStore();

//       expect(component.openDialog).toHaveBeenCalled();
//     });

//     it('should set the intended location if display name is set', () => {
//       component['displayNameIsSet'] = true;
//       component['productCode'] = 'P001';
//       component.selectPickupInStore();

//       expect(
//         intendedPickupLocationService.setIntendedLocation
//       ).toHaveBeenCalledWith(component['productCode'], {
//         name: 'London School',
//         displayName: 'London School',
//       });
//     });
//   });

//   describe('without current product', () => {
//     beforeEach(() => {
//       configureTestingModule()
//         .overrideProvider(CurrentProductService, {
//           useValue: { getProduct: () => of(null) },
//         })
//         .compileComponents();
//       stubServiceAndCreateComponent();
//     });

//     it('should make no calls', () => {
//       spyOn(
//         intendedPickupLocationService,
//         'getIntendedLocation'
//       ).and.callThrough();

//       component.ngOnInit();

//       expect(currentProductService.getProduct).toHaveBeenCalled();
//       expect(
//         intendedPickupLocationService.getIntendedLocation
//       ).not.toHaveBeenCalled();
//       expect(component.availableForPickup).toBe(false);
//     });

//     it('should not display the form', () => {
//       const form = fixture.debugElement.query(By.css('form'));
//       expect(form).toBeNull();
//     });
//   });
// });
