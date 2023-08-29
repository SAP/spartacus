// import { ViewContainerRef } from '@angular/core';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { DomSanitizer } from '@angular/platform-browser';
// import { OpfGlobalFunctionsFacade } from '@spartacus/opf/base/root';
// import { of } from 'rxjs';
// import { OpfCheckoutPaymentWrapperComponent } from './opf-checkout-payment-wrapper.component';
// import { OpfCheckoutPaymentWrapperService } from './opf-checkout-payment-wrapper.service';

// describe('OpfCheckoutPaymentWrapperComponent', () => {
//   let component: OpfCheckoutPaymentWrapperComponent;
//   let fixture: ComponentFixture<OpfCheckoutPaymentWrapperComponent>;
//   let mockService: jasmine.SpyObj<OpfCheckoutPaymentWrapperService>;
//   let mockSanitizer: jasmine.SpyObj<DomSanitizer>;
//   let mockGlobalFunctionsService: jasmine.SpyObj<OpfGlobalFunctionsFacade>;

//   beforeEach(() => {
//     mockService = jasmine.createSpyObj('OpfCheckoutPaymentWrapperService', [
//       'getRenderPaymentMethodEvent',
//       'initiatePayment',
//       'reloadPaymentMode',
//     ]);
//     mockSanitizer = jasmine.createSpyObj('DomSanitizer', [
//       'bypassSecurityTrustHtml',
//     ]);
//     mockGlobalFunctionsService = jasmine.createSpyObj(
//       'OpfGlobalFunctionsFacade',
//       ['registerGlobalFunctions', 'removeGlobalFunctions']
//     );

//     TestBed.configureTestingModule({
//       declarations: [OpfCheckoutPaymentWrapperComponent],
//       providers: [
//         { provide: OpfCheckoutPaymentWrapperService, useValue: mockService },
//         { provide: DomSanitizer, useValue: mockSanitizer },
//         {
//           provide: OpfGlobalFunctionsFacade,
//           useValue: mockGlobalFunctionsService,
//         },
//         { provide: ViewContainerRef, useValue: {} },
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(OpfCheckoutPaymentWrapperComponent);
//     component = fixture.componentInstance;
//   });

//   afterEach(() => {
//     fixture.destroy();
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should call initiatePayment on ngOnInit', () => {
//     const mockPaymentSessionData = {
//       paymentSessionId: 'session123',
//       pattern: 'HOSTED_FIELDS',
//     };
//     mockService.initiatePayment.and.returnValue(of(mockPaymentSessionData));

//     component.selectedPaymentId = 123;
//     component.ngOnInit();

//     expect(mockService.initiatePayment).toHaveBeenCalledWith(123);
//     expect(
//       mockGlobalFunctionsService.registerGlobalFunctions
//     ).toHaveBeenCalledWith('session123', jasmine.any(ViewContainerRef));
//   });

//   it('should call removeGlobalFunctions if paymentSessionData is not HOSTED_FIELDS', () => {
//     const mockPaymentSessionData = {
//       paymentSessionId: 'session123',
//       pattern: 'NON_HOSTED_FIELDS',
//     };
//     mockService.initiatePayment.and.returnValue(of(mockPaymentSessionData));

//     component.selectedPaymentId = 123;
//     component.ngOnInit();

//     expect(mockGlobalFunctionsService.removeGlobalFunctions).toHaveBeenCalled();
//   });

//   it('should call reloadPaymentMode on retryInitiatePayment', () => {
//     component.retryInitiatePayment();

//     expect(mockService.reloadPaymentMode).toHaveBeenCalled();
//   });

//   it('should return true if paymentSessionData is HOSTED_FIELDS', () => {
//     const mockPaymentSessionData = {
//       paymentSessionId: 'session123',
//       pattern: 'HOSTED_FIELDS',
//     };
//     const result = (component as any)?.isHostedFields(mockPaymentSessionData);

//     expect(result).toBeTruthy();
//   });

//   it('should return false if paymentSessionData is not HOSTED_FIELDS', () => {
//     const mockPaymentSessionData = {
//       paymentSessionId: 'session123',
//       pattern: 'NON_HOSTED_FIELDS',
//     };
//     const result = (component as any)?.isHostedFields(mockPaymentSessionData);

//     expect(result).toBeFalsy();
//   });
// });
