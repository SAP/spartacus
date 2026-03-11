// import { Component, Input, Type } from '@angular/core';
// import {
//   ComponentFixture,
//   fakeAsync,
//   TestBed,
//   tick,
//   waitForAsync,
// } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { ActivatedRoute } from '@angular/router';
// import { ActiveCartFacade } from '@spartacus/cart/base/root';
// import {
//   CheckoutDeliveryAddressFacade,
//   CheckoutPaymentFacade,
// } from '@spartacus/checkout/base/root';
// import {
//   Address,
//   FeaturesConfig,
//   GlobalMessageService,
//   I18nTestingModule,
//   MockTranslatePipe,
//   PaymentDetails,
//   QueryState,
//   RoutingService,
//   TranslatePipe,
//   UserPaymentService,
// } from '@spartacus/core';
// import {
//   CardComponent,
//   ICON_TYPE,
//   IconComponent,
//   SpinnerComponent,
// } from '@spartacus/storefront';
// import { EMPTY, Observable, of, throwError } from 'rxjs';
// import createSpy = jasmine.createSpy;
// import { CheckoutStepService } from '@spartacus/checkout/base/components';
// import { OpfTokenisationCheckoutPaymentMethodComponent } from './opf-tokenisation-checkout-payment-method.component';
// import { OpfTokenisationCheckoutPaymentMethodService } from './opf-tokenisation-checkout-payment-method.service';
// import { Order, OrderFacade } from '@spartacus/order/root';

// @Component({
//   selector: 'cx-icon',
//   template: '',
//   imports: [I18nTestingModule],
// })
// class MockCxIconComponent {
//   @Input() type: ICON_TYPE;
// }

// class MockOpfTokenisationCheckoutPaymentMethodService
//   implements Partial<OpfTokenisationCheckoutPaymentMethodService>
// {
//   initialize = createSpy();
//   getCards$ = createSpy().and.returnValue(of([]));
//   selectPaymentMethod = createSpy();
//   setPaymentDetails = createSpy();
//   next = createSpy();
//   back = createSpy();
//   destroy = createSpy();
//   focusCardAfterSelecting = createSpy();
//   isUpdating$ = of(false);
//   selectedMethod$ = of(undefined);
// }

// const mockPaymentDetails: PaymentDetails = {
//   id: 'mock payment id',
//   cardNumber: '123456789',
//   cardType: {
//     code: 'Visa',
//     name: 'Visa',
//   },
//   expiryMonth: '01',
//   expiryYear: '2022',
//   cvn: '123',
// };

// const mockPayments: PaymentDetails[] = [
//   {
//     id: 'non default method',
//     cardNumber: '123456789',
//     cardType: {
//       code: 'Visa',
//       name: 'Visa',
//     },
//     expiryMonth: '01',
//     expiryYear: '2022',
//     cvn: '123',
//   },
//   {
//     id: 'default payment method',
//     cardNumber: '123456789',
//     cardType: {
//       code: 'Visa',
//       name: 'Visa',
//     },
//     expiryMonth: '01',
//     expiryYear: '2022',
//     cvn: '123',
//     defaultPayment: true,
//   },
//   mockPaymentDetails,
// ];

// const mockOrder: Order = { code: 'testOrder123' };

// class MockOrderFacade implements Partial<OrderFacade> {
//   placePaymentAuthorizedOrder = createSpy().and.returnValue(of(mockOrder));
// }

// class MockRoutingService implements Partial<RoutingService> {
//   go = createSpy();
// }

// class MockUserPaymentService implements Partial<UserPaymentService> {
//   loadPaymentMethods(): void {}
//   getPaymentMethods(): Observable<PaymentDetails[]> {
//     return EMPTY;
//   }
//   getPaymentMethodsLoading(): Observable<boolean> {
//     return EMPTY;
//   }
// }

// class MockCheckoutPaymentService implements Partial<CheckoutPaymentFacade> {
//   setPaymentDetails = createSpy().and.returnValue(EMPTY);
//   createPaymentDetails(_paymentDetails: PaymentDetails): Observable<unknown> {
//     return EMPTY;
//   }
//   getPaymentDetails(): Observable<PaymentDetails> {
//     return of(mockPaymentDetails);
//   }
//   paymentProcessSuccess() {}

//   getPaymentDetailsState(): Observable<QueryState<PaymentDetails | undefined>> {
//     return EMPTY;
//   }
// }
// class MockCheckoutDeliveryFacade
//   implements Partial<CheckoutDeliveryAddressFacade>
// {
//   getDeliveryAddressState(): Observable<QueryState<Address | undefined>> {
//     return of({ loading: false, error: false, data: undefined });
//   }
// }

// class MockCheckoutStepService implements Partial<CheckoutStepService> {
//   next = createSpy();
//   back = createSpy();
//   getBackBntText(): string {
//     return 'common.back';
//   }
// }

// const mockActivatedRoute = {
//   snapshot: {
//     url: ['checkout', 'payment-method'],
//   },
// };

// class MockActiveCartService implements Partial<ActiveCartFacade> {
//   isGuestCart(): Observable<boolean> {
//     return of(false);
//   }
// }

// class MockGlobalMessageService implements Partial<GlobalMessageService> {
//   add = createSpy();
// }

// const mockAddress: Address = {
//   id: 'mock address id',
//   firstName: 'John',
//   lastName: 'Doe',
//   titleCode: 'mr',
//   line1: 'Toyosaki 2 create on cart',
//   line2: 'line2',
//   town: 'town',
//   region: { isocode: 'JP-27' },
//   postalCode: 'zip',
//   country: { isocode: 'JP' },
// };

// @Component({
//   selector: 'cx-spinner',
//   template: '',
//   imports: [I18nTestingModule],
// })
// class MockSpinnerComponent {}

// describe('OpfTokenisationCheckoutPaymentMethodComponent', () => {
//   let component: OpfTokenisationCheckoutPaymentMethodComponent;
//   let fixture: ComponentFixture<OpfTokenisationCheckoutPaymentMethodComponent>;
//   let mockUserPaymentService: UserPaymentService;
//   let mockCheckoutPaymentService: CheckoutPaymentFacade;
//   let mockActiveCartService: ActiveCartFacade;
//   let checkoutStepService: CheckoutStepService;
//   let globalMessageService: GlobalMessageService;
//   let orderFacade: OrderFacade;
//   let routingService: RoutingService;
//   let mockService: MockOpfTokenisationCheckoutPaymentMethodService;

//   beforeEach(waitForAsync(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         OpfTokenisationCheckoutPaymentMethodComponent,
//         CardComponent,
//         IconComponent,
//         SpinnerComponent,
//       ],
//       providers: [
//         { provide: UserPaymentService, useClass: MockUserPaymentService },
//         {
//           provide: CheckoutDeliveryAddressFacade,
//           useClass: MockCheckoutDeliveryFacade,
//         },
//         {
//           provide: ActiveCartFacade,
//           useClass: MockActiveCartService,
//         },
//         {
//           provide: CheckoutPaymentFacade,
//           useClass: MockCheckoutPaymentService,
//         },
//         { provide: CheckoutStepService, useClass: MockCheckoutStepService },
//         { provide: ActivatedRoute, useValue: mockActivatedRoute },
//         { provide: GlobalMessageService, useClass: MockGlobalMessageService },
//         {
//           provide: FeaturesConfig,
//           useValue: {
//             features: { level: '6.3' },
//           },
//         },

//         { provide: OrderFacade, useClass: MockOrderFacade },
//         { provide: RoutingService, useClass: MockRoutingService },
//         {
//           provide: OpfTokenisationCheckoutPaymentMethodService,
//           useClass: MockOpfTokenisationCheckoutPaymentMethodService,
//         },
//       ],
//     })
//       .overrideComponent(OpfTokenisationCheckoutPaymentMethodComponent, {
//         remove: {
//           imports: [TranslatePipe, SpinnerComponent, IconComponent],
//         },
//         add: {
//           imports: [
//             MockTranslatePipe,
//             MockSpinnerComponent,
//             MockCxIconComponent,
//           ],
//         },
//       })
//       .compileComponents();

//     mockUserPaymentService = TestBed.inject(UserPaymentService);
//     mockCheckoutPaymentService = TestBed.inject(CheckoutPaymentFacade);
//     mockActiveCartService = TestBed.inject(ActiveCartFacade);
//     checkoutStepService = TestBed.inject(
//       CheckoutStepService as Type<CheckoutStepService>
//     );
//     globalMessageService = TestBed.inject(GlobalMessageService);
//     orderFacade = TestBed.inject(OrderFacade);
//     routingService = TestBed.inject(RoutingService);
//     mockService = TestBed.inject(
//       OpfTokenisationCheckoutPaymentMethodService as any
//     );
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(
//       OpfTokenisationCheckoutPaymentMethodComponent
//     );
//     component = fixture.componentInstance;

//     spyOn(component, 'selectPaymentMethod').and.callThrough();
//     spyOn<any>(component, 'savePaymentMethod').and.callThrough();
//   });

//   it('should be created', () => {
//     expect(component).toBeTruthy();
//   });

//   describe('component behavior', () => {
//     it('should show loader during existing payment methods loading', () => {
//       component.isUpdating$ = of(true);
//       spyOn(mockUserPaymentService, 'getPaymentMethods').and.returnValue(
//         of([])
//       );
//       spyOn(
//         mockCheckoutPaymentService,
//         'getPaymentDetailsState'
//       ).and.returnValue(of({ loading: false, error: false, data: undefined }));

//       component.ngOnInit();
//       fixture.detectChanges();

//       expect(fixture.debugElement.queryAll(By.css('cx-card')).length).toEqual(
//         0
//       );
//       expect(fixture.debugElement.query(By.css('cx-spinner'))).toBeTruthy();
//       expect(fixture.debugElement.query(By.css('cx-payment-form'))).toBeFalsy();
//     });
//     it('should create and select new payment method and redirect', () => {
//       spyOn(mockUserPaymentService, 'getPaymentMethodsLoading').and.returnValue(
//         of(false)
//       );
//       spyOn(mockUserPaymentService, 'getPaymentMethods').and.returnValue(
//         of([])
//       );
//       spyOn(
//         mockCheckoutPaymentService,
//         'getPaymentDetailsState'
//       ).and.returnValue(of({ loading: false, error: false, data: undefined }));
//       spyOn(mockCheckoutPaymentService, 'createPaymentDetails').and.returnValue(
//         of({})
//       );

//       component.ngOnInit();
//       fixture.detectChanges();

//       component.setPaymentDetails({
//         paymentDetails: mockPaymentDetails,
//         billingAddress: mockAddress,
//       });

//       expect(
//         mockCheckoutPaymentService.createPaymentDetails
//       ).toHaveBeenCalledWith({
//         ...mockPaymentDetails,
//         billingAddress: mockAddress,
//       });
//       expect(routingService.go).toHaveBeenCalledWith({
//         cxRoute: 'orderConfirmation',
//       });
//     });
//     it('should not add select action for selected card', () => {
//       const selectedPaymentMethod: PaymentDetails = {
//         id: 'selected payment method',
//         cardNumber: '123456789',
//         cardType: {
//           code: 'Visa',
//           name: 'Visa',
//         },
//         expiryMonth: '01',
//         expiryYear: '2022',
//         cvn: '123',
//         defaultPayment: true,
//       };
//       const card = component['createCard'](
//         selectedPaymentMethod,
//         {
//           textExpires: 'Expires',
//           textUseThisPayment: 'Use this payment',
//           textSelected: 'Selected',
//         },
//         selectedPaymentMethod
//       );
//       expect(card.actions?.length).toBe(0);
//     });

//     it('should after each payment method selection change that in backend', () => {
//       const mockPayments: PaymentDetails[] = [
//         mockPaymentDetails,
//         {
//           id: 'default payment method',
//           cardNumber: '123456789',
//           cardType: {
//             code: 'Visa',
//             name: 'Visa',
//           },
//           expiryMonth: '01',
//           expiryYear: '2022',
//           cvn: '123',
//           defaultPayment: true,
//         },
//       ];
//       spyOn(mockUserPaymentService, 'getPaymentMethods').and.returnValue(
//         of(mockPayments)
//       );
//       spyOn(
//         mockCheckoutPaymentService,
//         'getPaymentDetailsState'
//       ).and.returnValue(
//         of({ loading: false, error: false, data: mockPaymentDetails })
//       );

//       component.ngOnInit();
//       fixture.detectChanges();
//       fixture.debugElement
//         .queryAll(By.css('cx-card'))[1]
//         .query(By.css('.btn'))
//         .nativeElement.click();

//       expect(mockCheckoutPaymentService.setPaymentDetails).toHaveBeenCalledWith(
//         mockPayments[1]
//       );
//     });

//     it('should not try to load methods for guest checkout', () => {
//       spyOn(mockUserPaymentService, 'loadPaymentMethods').and.stub();
//       spyOn(mockUserPaymentService, 'getPaymentMethods').and.returnValue(
//         of([])
//       );
//       spyOn(mockActiveCartService, 'isGuestCart').and.returnValue(of(true));

//       component.ngOnInit();

//       expect(mockUserPaymentService.loadPaymentMethods).not.toHaveBeenCalled();
//     });

//     it('should show selected card, when there was previously selected method', () => {
//       const mockPayments: PaymentDetails[] = [
//         mockPaymentDetails,
//         {
//           id: 'default payment method',
//           cardNumber: '123456789',
//           cardType: {
//             code: 'Visa',
//             name: 'Visa',
//           },
//           expiryMonth: '01',
//           expiryYear: '2022',
//           cvn: '123',
//           defaultPayment: true,
//         },
//       ];
//       spyOn(mockUserPaymentService, 'getPaymentMethods').and.returnValue(
//         of(mockPayments)
//       );
//       spyOn(
//         mockCheckoutPaymentService,
//         'getPaymentDetailsState'
//       ).and.returnValue(
//         of({ loading: false, error: false, data: mockPaymentDetails })
//       );

//       component.ngOnInit();
//       fixture.detectChanges();

//       expect(
//         mockCheckoutPaymentService.setPaymentDetails
//       ).not.toHaveBeenCalled();
//     });

//     it('should be able to select payment method', () => {
//       fixture.detectChanges();

//       component.selectPaymentMethod(mockPaymentDetails);

//       expect(mockCheckoutPaymentService.setPaymentDetails).toHaveBeenCalledWith(
//         mockPaymentDetails
//       );
//       expect(component['savePaymentMethod']).toHaveBeenCalledWith(
//         mockPaymentDetails
//       );
//       expect(globalMessageService.add).toHaveBeenCalled();
//     });

//     it('should NOT be able to select payment method if the selection is the same as the currently set payment details', () => {
//       component['selectedPaymentMethod$'].next(mockPayments[0]);

//       component.selectPaymentMethod(mockPayments[0]);

//       expect(
//         mockCheckoutPaymentService.setPaymentDetails
//       ).not.toHaveBeenCalledWith(mockPayments[0]);
//       expect(component['savePaymentMethod']).not.toHaveBeenCalledWith(
//         mockPayments[0]
//       );
//       expect(globalMessageService.add).not.toHaveBeenCalled();
//     });

//     describe('createCard().role', () => {
//       let paymentMethod1: PaymentDetails;
//       beforeEach(() => {
//         paymentMethod1 = {
//           id: 'selected payment method',
//           cardNumber: '123456789',
//           cardType: {
//             code: 'Visa',
//             name: 'Visa',
//           },
//           expiryMonth: '01',
//           expiryYear: '2022',
//           cvn: '123',
//           defaultPayment: true,
//         };
//       });

//       it('should be set to "application" for selected payment card', () => {
//         expect(
//           component['createCard'](
//             paymentMethod1,
//             {
//               textExpires: 'Expires',
//               textUseThisPayment: 'Use this payment',
//               textSelected: 'Selected',
//             },
//             paymentMethod1
//           ).role
//         ).toEqual('application');
//       });

//       it('should be set to "button" for non selected payment cards', () => {
//         expect(
//           component['createCard'](
//             paymentMethod1,
//             {
//               textExpires: 'Expires',
//               textUseThisPayment: 'Use this payment',
//               textSelected: 'Selected',
//             },
//             { ...paymentMethod1, id: 'newId' }
//           ).role
//         ).toEqual('button');
//       });
//     });

//     describe('focusCardAfterSelecting', () => {
//       it('should refocus the selected card after updating', fakeAsync(() => {
//         const card = document.createElement('cx-card');
//         const selectButton = document.createElement('button');
//         card.appendChild(selectButton);
//         card.tabIndex = 0;
//         document.body.appendChild(card);
//         selectButton.focus();
//         component['isUpdating$'] = of(false);
//         spyOn(card, 'focus');
//         spyOn(component['focusService'], 'findFirstFocusable').and.returnValue(
//           card
//         );

//         component.focusCardAfterSelecting();
//         tick(16); // Wait for requestAnimationFrame

//         expect(card.focus).toHaveBeenCalled();
//       }));
//     });

//     describe('next()', () => {
//       it('should set busy$ to true and call placePaymentAuthorizedOrder', () => {
//         spyOn(component['busy$'], 'next').and.callThrough();

//         component.next();

//         expect(component['busy$'].next).toHaveBeenCalledWith(true);
//         expect(orderFacade.placePaymentAuthorizedOrder).toHaveBeenCalledWith(
//           true
//         );
//       });

//       it('should navigate to orderConfirmation and set busy$ false on success', () => {
//         spyOn(component['busy$'], 'next').and.callThrough();

//         component.next();

//         expect(routingService.go).toHaveBeenCalledWith({
//           cxRoute: 'orderConfirmation',
//         });
//         expect(component['busy$'].next).toHaveBeenCalledWith(false);
//       });

//       it('should set busy$ to false on error', () => {
//         (
//           orderFacade.placePaymentAuthorizedOrder as jasmine.Spy
//         ).and.returnValue(throwError(() => new Error('error')));
//         spyOn(component['busy$'], 'next').and.callThrough();

//         component.next();

//         expect(component['busy$'].next).toHaveBeenCalledWith(false);
//         expect(routingService.go).not.toHaveBeenCalled();
//       });
//     });

//     describe('back()', () => {
//       it('should call checkoutStepService.back with activatedRoute', () => {
//         component.back();
//         expect(checkoutStepService.back).toHaveBeenCalledWith(
//           mockActivatedRoute as any
//         );
//       });
//     });
//   });
// });
