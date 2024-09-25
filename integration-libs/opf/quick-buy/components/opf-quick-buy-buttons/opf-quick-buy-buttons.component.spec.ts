// TODO: Add unit tests...

// /*
//  *
//  * SPDX-License-Identifier: Apache-2.0
//  */

// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterState, RoutingService } from '@spartacus/core';
// import { BehaviorSubject, of } from 'rxjs';
// import { OpfProviderType } from '../../root/model';
// import { OpfQuickBuyComponent } from './opf-quick-buy-buttons.component';
// import { OpfQuickBuyService } from './opf-quick-buy-buttons.service';
// import createSpy = jasmine.createSpy;

// const routerStateSubject = new BehaviorSubject<RouterState>({
//   state: {
//     semanticRoute: 'cart',
//   },
// } as unknown as RouterState);

// class MockRoutingService implements Partial<RoutingService> {
//   getRouterState = createSpy().and.returnValue(
//     routerStateSubject.asObservable()
//   );
// }

// describe('OpfQuickBuyComponent', () => {
//   let component: OpfQuickBuyComponent;
//   let fixture: ComponentFixture<OpfQuickBuyComponent>;
//   let opfQuickBuyServiceMock: any;

//   beforeEach(async () => {
//     opfQuickBuyServiceMock = jasmine.createSpyObj('OpfQuickBuyService', [
//       'getPaymentGatewayConfiguration',
//       'isUserGuestOrLoggedIn',
//       'isQuickBuyProviderEnabled',
//     ]);

//     await TestBed.configureTestingModule({
//       declarations: [OpfQuickBuyComponent],
//       providers: [
//         { provide: OpfQuickBuyService, useValue: opfQuickBuyServiceMock },
//         { provide: RoutingService, useValie: MockRoutingService },
//       ],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(OpfQuickBuyComponent);
//     component = fixture.componentInstance;

//     opfQuickBuyServiceMock.getPaymentGatewayConfiguration.and.returnValue(
//       of({})
//     );
//     opfQuickBuyServiceMock.isUserGuestOrLoggedIn.and.returnValue(of({}));

//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should call getPaymentGatewayConfiguration on init', () => {
//     expect(
//       opfQuickBuyServiceMock.getPaymentGatewayConfiguration
//     ).toHaveBeenCalled();
//   });

//   it('should call isUserGuestOrLoggedIn on init', () => {
//     expect(opfQuickBuyServiceMock.isUserGuestOrLoggedIn).toHaveBeenCalled();
//   });

//   it('should determine if a payment method is enabled', () => {
//     const provider = OpfProviderType.APPLE_PAY;
//     const activeConfiguration = {};
//     opfQuickBuyServiceMock.isQuickBuyProviderEnabled.and.returnValue(true);

//     expect(
//       component.isPaymentMethodEnabled(provider, activeConfiguration)
//     ).toBeTruthy();
//     expect(
//       opfQuickBuyServiceMock.isQuickBuyProviderEnabled
//     ).toHaveBeenCalledWith(provider, activeConfiguration);
//   });
// });
