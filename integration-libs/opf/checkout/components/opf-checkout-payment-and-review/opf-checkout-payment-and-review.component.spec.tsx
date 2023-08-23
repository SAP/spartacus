// TODO: Add unit tests

// import { CommonModule } from '@angular/common';
// import {
//   Component,
//   DebugElement,
//   Directive,
//   Input,
//   Pipe,
//   PipeTransform,
// } from '@angular/core';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ReactiveFormsModule } from '@angular/forms';
// import { By } from '@angular/platform-browser';
// import { RouterTestingModule } from '@angular/router/testing';
// import { ActiveCartService } from '@spartacus/cart/base/core';
// import { ActiveCartFacade, Cart, OrderEntry } from '@spartacus/cart/base/root';
// import { CheckoutStepService } from '@spartacus/checkout/base/components';
// import { CheckoutStep, CheckoutStepType } from '@spartacus/checkout/base/root';
// import { I18nTestingModule } from '@spartacus/core';
// import {
//   FormErrorsModule,
//   IconTestingModule,
//   OutletDirective,
//   PromotionsModule,
// } from '@spartacus/storefront';
// import { BehaviorSubject, Observable, of } from 'rxjs';

// import { OpfCheckoutPaymentAndReviewComponent } from './opf-checkout-payment-and-review.component';

// const mockCart = {
//   code: 'test',
//   paymentType: {
//     code: 'PAYMENT_GATEWAY',
//   },
// };
// const mockEntries: OrderEntry[] = [{ entryNumber: 123 }, { entryNumber: 456 }];

// const cart$ = new BehaviorSubject<any>({});
// class MockActiveCartService implements Partial<ActiveCartService> {
//   getActive(): Observable<Cart> {
//     return cart$.asObservable();
//   }
//   getEntries(): Observable<OrderEntry[]> {
//     return of(mockEntries);
//   }
// }

// @Pipe({
//   name: 'cxUrl',
// })
// class MockUrlPipe implements PipeTransform {
//   transform() {}
// }

// @Component({
//   template: '',
//   selector: 'cx-opf-checkout-payments',
// })
// class MockOpfCheckoutPaymentsComponent {
//   @Input()
//   disabled = false;
// }

// @Component({
//   template: '',
//   selector: 'cx-opf-checkout-billing-address-form',
// })
// class MockOpfCheckoutBillingAddressFormComponent {}

// @Directive({
//   selector: '[cxOutlet]',
// })
// class MockOutletDirective implements Partial<OutletDirective> {
//   @Input() cxOutlet: string;
//   @Input() cxOutletContext: string;
// }

// const mockCheckoutStep: CheckoutStep = {
//   id: 'step',
//   name: 'name',
//   routeName: '/route',
//   type: [CheckoutStepType.DELIVERY_ADDRESS],
// };
// class MockCheckoutStepService {
//   steps$ = of([
//     {
//       id: 'step1',
//       name: 'step1',
//       routeName: 'route1',
//       type: [CheckoutStepType.PAYMENT_TYPE],
//     },
//     {
//       id: 'step2',
//       name: 'step2',
//       routeName: 'route2',
//       type: [CheckoutStepType.REVIEW_ORDER],
//     },
//   ]);
//   getCheckoutStep(): CheckoutStep {
//     return mockCheckoutStep;
//   }
// }

// describe('OPFCheckoutPaymentReviewComponent', () => {
//   let component: OpfCheckoutPaymentAndReviewComponent;
//   let fixture: ComponentFixture<OpfCheckoutPaymentAndReviewComponent>;
//   let el: DebugElement;
//   let activeCartService: ActiveCartFacade;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [
//         CommonModule,
//         ReactiveFormsModule,
//         I18nTestingModule,
//         FormErrorsModule,
//         RouterTestingModule,
//         PromotionsModule,
//         IconTestingModule,
//       ],
//       declarations: [
//         OpfCheckoutPaymentAndReviewComponent,
//         MockOpfCheckoutPaymentsComponent,
//         MockUrlPipe,
//         MockOpfCheckoutBillingAddressFormComponent,
//         MockOutletDirective,
//       ],
//       providers: [
//         { provide: ActiveCartFacade, useClass: MockActiveCartService },
//         {
//           provide: CheckoutStepService,
//           useClass: MockCheckoutStepService,
//         },
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(OpfCheckoutPaymentAndReviewComponent);
//     el = fixture.debugElement;
//     activeCartService = TestBed.inject(ActiveCartFacade);

//     component = fixture.componentInstance;
//     spyOn(activeCartService, 'getActive').and.returnValue(cart$);

//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should call for active cart to get payment type', () => {
//     expect(activeCartService.getActive).toHaveBeenCalled();
//   });

//   it('should render cx-opf-checkout-payments component if payment type is not set to ACCOUNT', () => {
//     cart$.next(mockCart);
//     fixture.detectChanges();

//     expect(el.query(By.css('cx-opf-checkout-payments'))).toBeTruthy();
//   });

//   it('should not render cx-opf-checkout-payments component if payment type is set to ACCOUNT', () => {
//     cart$.next({ ...mockCart, paymentType: { code: 'ACCOUNT' } });

//     fixture.detectChanges();

//     expect(el.query(By.css('cx-opf-checkout-payments'))).toBeFalsy();
//   });

//   it('should change form value when checkbox get selected / change state', () => {
//     cart$.next(mockCart);

//     fixture.detectChanges();

//     expect(component.termsAndConditionInvalid).toEqual(true);

//     const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;

//     inputEl.click();

//     expect(inputEl.checked).toEqual(true);
//     expect(component.termsAndConditionInvalid).toEqual(false);
//   });
// });
