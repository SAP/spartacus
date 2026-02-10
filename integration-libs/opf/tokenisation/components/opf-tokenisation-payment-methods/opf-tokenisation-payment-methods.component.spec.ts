// import { Component, DebugElement, Directive, Input } from '@angular/core';
// import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import {
//   CxDatePipe,
//   FeatureDirective,
//   FeaturesConfig,
//   GlobalMessageService,
//   I18nTestingModule,
//   MockDatePipe,
//   MockTranslatePipe,
//   PaymentDetails,
//   TranslatePipe,
// } from '@spartacus/core';
// import {
//   AtMessageDirective,
//   CardComponent,
//   FocusDirective,
//   ICON_TYPE,
//   IconComponent,
//   SpinnerComponent,
// } from '@spartacus/storefront';
// import { MockFeatureDirective } from 'projects/storefrontlib/shared/test/mock-feature-directive';
// import { EMPTY, Observable, of } from 'rxjs';
// import { OpfTokenisationFacade } from '../../root/facade/opf-tokenisation.facade';
// import { OpfTokenisationPaymentMethodsComponent } from './opf-tokenisation-payment-methods.component';

// class MockGlobalMessageService {
//   add = jasmine.createSpy();
// }

// @Component({
//   template: '<div>Spinner</div>',
//   selector: 'cx-spinner',
//   imports: [I18nTestingModule],
// })
// class MockCxSpinnerComponent {}

// @Directive({ selector: '[cxAtMessage]' })
// class MockAtMessageDirective {
//   @Input() cxAtMessage: string | string[] | undefined;
// }

// const mockPayment: PaymentDetails = {
//   defaultPayment: true,
//   accountHolderName: 'John Doe',
//   cardNumber: '4111 1111 1111 1111',
//   expiryMonth: '11',
//   expiryYear: '2020',
//   id: '2',
//   cardType: {
//     code: 'master',
//   },
// };

// @Component({
//   selector: 'cx-icon',
//   template: '',
//   imports: [I18nTestingModule],
// })
// class MockCxIconComponent {
//   @Input() type: ICON_TYPE;
// }

// class MockOcfTokenisationFacade implements OpfTokenisationFacade {
//   getPaymentMethodsLoading(): Observable<boolean> {
//     return EMPTY;
//   }
//   getPaymentMethods(): Observable<PaymentDetails[]> {
//     return of([mockPayment]);
//   }
//   loadPaymentMethods(): void {}
//   deletePaymentMethod(_paymentMethodId: string): void {}
//   setPaymentMethodAsDefault(_paymentMethodId: string): void {}
// }

// describe('OpfTokenisationPaymentMethodsComponent', () => {
//   let component: OpfTokenisationPaymentMethodsComponent;
//   let fixture: ComponentFixture<OpfTokenisationPaymentMethodsComponent>;
//   let tokenisationFacade: OpfTokenisationFacade;
//   let el: DebugElement;

//   beforeEach(waitForAsync(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         OpfTokenisationPaymentMethodsComponent,
//         CardComponent,
//         FocusDirective,
//       ],
//       providers: [
//         { provide: OpfTokenisationFacade, useClass: MockOcfTokenisationFacade },
//         { provide: GlobalMessageService, useClass: MockGlobalMessageService },
//         {
//           provide: FeaturesConfig,
//           useValue: {
//             features: { level: '5.1' },
//           },
//         },
//       ],
//     })
//       .overrideComponent(OpfTokenisationPaymentMethodsComponent, {
//         remove: {
//           imports: [
//             TranslatePipe,
//             CxDatePipe,
//             SpinnerComponent,
//             IconComponent,
//             AtMessageDirective,
//             FeatureDirective,
//           ],
//         },
//         add: {
//           imports: [
//             MockTranslatePipe,
//             MockDatePipe,
//             MockCxSpinnerComponent,
//             MockCxIconComponent,
//             MockAtMessageDirective,
//             MockFeatureDirective,
//           ],
//         },
//       })
//       .overrideComponent(CardComponent, {
//         remove: {
//           imports: [AtMessageDirective, FocusDirective, IconComponent],
//         },
//         add: {
//           imports: [
//             MockAtMessageDirective,
//             FocusDirective,
//             MockCxIconComponent,
//           ],
//         },
//       })
//       .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(OpfTokenisationPaymentMethodsComponent);
//     component = fixture.componentInstance;
//     el = fixture.debugElement;
//     tokenisationFacade = TestBed.inject(OpfTokenisationFacade);
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should display header', () => {
//     fixture.detectChanges();
//     expect(el.query(By.css('h2')).nativeElement.innerText).toEqual(
//       'paymentMethods.paymentMethods'
//     );
//   });

//   it('should show basic information', () => {
//     function getTitle(elem: DebugElement) {
//       return elem.query(By.css('.cx-header')).nativeElement.textContent;
//     }
//     function getBodyMessage(elem: DebugElement) {
//       return elem.query(By.css('.cx-msg')).nativeElement.textContent;
//     }
//     component.ngOnInit();
//     fixture.detectChanges();
//     expect(getTitle(el)).toContain('paymentMethods.paymentMethods');
//     expect(getBodyMessage(el)).toContain(
//       ' paymentMethods.newPaymentMethodsAreAddedDuringCheckout '
//     );
//   });

//   it('should show spinner if payment methods are loading', () => {
//     spyOn(tokenisationFacade, 'getPaymentMethodsLoading').and.returnValue(
//       of(true)
//     );

//     function getSpinner(elem: DebugElement) {
//       return elem.query(By.css('cx-spinner'));
//     }
//     component.ngOnInit();
//     fixture.detectChanges();
//     expect(getSpinner(el)).toBeTruthy();
//   });

//   it('should show payment methods after loading', () => {
//     spyOn(tokenisationFacade, 'getPaymentMethodsLoading').and.returnValue(
//       of(false)
//     );
//     function getCard(elem: DebugElement) {
//       return elem.query(By.css('cx-card'));
//     }
//     component.ngOnInit();
//     fixture.detectChanges();
//     expect(getCard(el)).toBeTruthy();
//   });

//   it('should render all payment methods', () => {
//     spyOn(tokenisationFacade, 'getPaymentMethodsLoading').and.returnValue(
//       of(false)
//     );
//     spyOn(tokenisationFacade, 'getPaymentMethods').and.returnValue(
//       of([mockPayment, mockPayment])
//     );

//     function getCards(elem: DebugElement): DebugElement[] {
//       return elem.queryAll(By.css('cx-card'));
//     }
//     component.ngOnInit();
//     fixture.detectChanges();
//     expect(getCards(el).length).toEqual(2);
//   });

//   it('should render correct content in card', () => {
//     spyOn(tokenisationFacade, 'getPaymentMethodsLoading').and.returnValue(
//       of(false)
//     );
//     spyOn(tokenisationFacade, 'getPaymentMethods').and.returnValue(
//       of([mockPayment, { ...mockPayment, defaultPayment: false }])
//     );
//     function getCardNumber(elem: DebugElement): string {
//       return elem.queryAll(By.css('cx-card .cx-card-label'))[0].nativeElement
//         .textContent;
//     }
//     function getExpiration(elem: DebugElement): string {
//       return elem.queryAll(By.css('cx-card .cx-card-label'))[1].nativeElement
//         .textContent;
//     }

//     component.ngOnInit();
//     fixture.detectChanges();
//     expect(getCardNumber(el)).toContain(mockPayment.cardNumber);
//     expect(getExpiration(el)).toContain(
//       `paymentCard.expires month:${mockPayment.expiryMonth} year:${mockPayment.expiryYear}`
//     );
//   });

//   it('should show confirm on delete', () => {
//     spyOn(tokenisationFacade, 'getPaymentMethodsLoading').and.returnValue(
//       of(false)
//     );

//     function getDeleteMsg(elem: DebugElement): string {
//       return elem.query(By.css('cx-card .cx-card-delete-msg')).nativeElement
//         .textContent;
//     }
//     function getDeleteButton(elem: DebugElement): any {
//       return elem.query(By.css('cx-card .btn')).nativeElement;
//     }
//     function getCancelButton(elem: DebugElement): DebugElement {
//       return elem.query(By.css('cx-card .btn-secondary'));
//     }
//     component.ngOnInit();
//     fixture.detectChanges();
//     getDeleteButton(el).click();
//     fixture.detectChanges();
//     expect(getDeleteMsg(el)).toContain('paymentCard.deleteConfirmation');
//     getCancelButton(el).nativeElement.click();
//     fixture.detectChanges();
//     expect(getCancelButton(el)).toBeFalsy();
//   });

//   it('should successfully delete card', () => {
//     spyOn(tokenisationFacade, 'getPaymentMethodsLoading').and.returnValue(
//       of(false)
//     );
//     spyOn(tokenisationFacade, 'deletePaymentMethod').and.stub();

//     function getDeleteButton(elem: DebugElement): any {
//       return elem.query(By.css('cx-card .btn')).nativeElement;
//     }
//     function getConfirmButton(elem: DebugElement): DebugElement {
//       return elem.query(By.css('cx-card .btn-primary'));
//     }
//     component.ngOnInit();
//     fixture.detectChanges();
//     getDeleteButton(el).click();
//     fixture.detectChanges();
//     getConfirmButton(el).nativeElement.click();
//     fixture.detectChanges();
//     expect(tokenisationFacade.deletePaymentMethod).toHaveBeenCalledWith(
//       mockPayment.id
//     );
//   });

//   it('should successfully set card as default', () => {
//     spyOn(tokenisationFacade, 'getPaymentMethodsLoading').and.returnValue(
//       of(false)
//     );
//     spyOn(tokenisationFacade, 'getPaymentMethods').and.returnValue(
//       of([mockPayment, { ...mockPayment, defaultPayment: false }])
//     );
//     spyOn(tokenisationFacade, 'setPaymentMethodAsDefault').and.stub();

//     function getSetDefaultButton(elem: DebugElement): any {
//       return elem.queryAll(By.css('cx-card .btn'))[1].nativeElement;
//     }
//     component.ngOnInit();
//     fixture.detectChanges();
//     getSetDefaultButton(el).click();
//     expect(tokenisationFacade.setPaymentMethodAsDefault).toHaveBeenCalledWith(
//       mockPayment.id
//     );
//   });

//   it('should return the proper card icon based on its card type', () => {
//     const otherCardType = 'MockCardType';

//     expect(component.getCardIcon('visa')).toBe(ICON_TYPE.VISA);
//     expect(component.getCardIcon('master')).toBe(ICON_TYPE.MASTER_CARD);
//     expect(component.getCardIcon('mastercard_eurocard')).toBe(
//       ICON_TYPE.MASTER_CARD
//     );
//     expect(component.getCardIcon('diners')).toBe(ICON_TYPE.DINERS_CLUB);
//     expect(component.getCardIcon('amex')).toBe(ICON_TYPE.AMEX);
//     expect(component.getCardIcon(otherCardType)).toBe(ICON_TYPE.CREDIT_CARD);
//   });
// });
