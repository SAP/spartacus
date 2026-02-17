// /*
//  * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
//  *
//  * SPDX-License-Identifier: Apache-2.0
//  */
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { of } from 'rxjs';
// import {
//   GlobalMessageService,
//   PaymentDetails,
//   TranslationService,
// } from '@spartacus/core';
// import { OpfTokenisationFacade } from '../../root/facade';
// import { OpfTokenisationPaymentMethodsComponent } from './opf-tokenisation-payment-methods.component';
// import { Card } from '@spartacus/storefront';

// describe('OpfTokenisationPaymentMethodsComponent', () => {
//   let component: OpfTokenisationPaymentMethodsComponent;
//   let fixture: ComponentFixture<OpfTokenisationPaymentMethodsComponent>;
//   let tokenisationFacade: jasmine.SpyObj<OpfTokenisationFacade>;
//   let translationService: jasmine.SpyObj<TranslationService>;
//   let globalMessageService: jasmine.SpyObj<GlobalMessageService>;

//   const mockPaymentMethod1: PaymentDetails = {
//     id: 'card-1',
//     cardNumber: '1234567812345678',
//     expiryMonth: '12',
//     expiryYear: '25',
//     cardType: { code: '8764', name: 'VISA' },
//   };

//   const mockPaymentMethod2: PaymentDetails = {
//     id: 'card-2',
//     cardNumber: '8765432187654321',
//     expiryMonth: '06',
//     expiryYear: '26',
//     cardType: { code: '8764', name: 'MASTERCARD' },
//   };

//   beforeEach(async () => {
//     const facadeSpy = jasmine.createSpyObj('OpfTokenisationFacade', [
//       'getPaymentMethods',
//       'getPaymentMethodsLoading',
//       'loadPaymentMethods',
//       'deletePaymentMethod',
//     ]);

//     const translationSpy = jasmine.createSpyObj('TranslationService', [
//       'translate',
//     ]);

//     const globalMessageSpy = jasmine.createSpyObj('GlobalMessageService', [
//       'add',
//     ]);

//     await TestBed.configureTestingModule({
//       declarations: [OpfTokenisationPaymentMethodsComponent],
//       providers: [
//         { provide: OpfTokenisationFacade, useValue: facadeSpy },
//         { provide: TranslationService, useValue: translationSpy },
//         { provide: GlobalMessageService, useValue: globalMessageSpy },
//       ],
//     }).compileComponents();

//     tokenisationFacade = TestBed.inject(
//       OpfTokenisationFacade
//     ) as jasmine.SpyObj<OpfTokenisationFacade>;
//     translationService = TestBed.inject(
//       TranslationService
//     ) as jasmine.SpyObj<TranslationService>;
//     globalMessageService = TestBed.inject(
//       GlobalMessageService
//     ) as jasmine.SpyObj<GlobalMessageService>;

//     fixture = TestBed.createComponent(OpfTokenisationPaymentMethodsComponent);
//     component = fixture.componentInstance;
//   });

//   describe('Component Initialization', () => {
//     it('should create', () => {
//       expect(component).toBeTruthy();
//     });

//     it('should initialize with undefined editCard', () => {
//       tokenisationFacade.getPaymentMethods.and.returnValue(of([]));
//       tokenisationFacade.getPaymentMethodsLoading.and.returnValue(of(false));

//       expect(component.editCard).toBeUndefined();
//     });

//     it('should call loadPaymentMethods on init', () => {
//       tokenisationFacade.getPaymentMethods.and.returnValue(of([]));
//       tokenisationFacade.getPaymentMethodsLoading.and.returnValue(of(false));

//       fixture.detectChanges();

//       expect(tokenisationFacade.loadPaymentMethods).toHaveBeenCalled();
//     });

//     it('should set editCard to undefined on init', () => {
//       tokenisationFacade.getPaymentMethods.and.returnValue(of([]));
//       tokenisationFacade.getPaymentMethodsLoading.and.returnValue(of(false));

//       fixture.detectChanges();

//       expect(component.editCard).toBeUndefined();
//     });
//   });

//   describe('Observable Initialization', () => {
//     it('should initialize paymentMethods$ observable from facade', (done) => {
//       const paymentMethods = [mockPaymentMethod1, mockPaymentMethod2];
//       tokenisationFacade.getPaymentMethods.and.returnValue(of(paymentMethods));
//       tokenisationFacade.getPaymentMethodsLoading.and.returnValue(of(false));

//       fixture.detectChanges();

//       component.paymentMethods$.subscribe((result) => {
//         expect(result).toEqual(paymentMethods);
//         done();
//       });
//     });

//     it('should initialize loading$ observable from facade', (done) => {
//       tokenisationFacade.getPaymentMethods.and.returnValue(of([]));
//       tokenisationFacade.getPaymentMethodsLoading.and.returnValue(of(true));

//       fixture.detectChanges();

//       component.loading$.subscribe((isLoading) => {
//         expect(isLoading).toEqual(true);
//         done();
//       });
//     });

//     it('should handle empty payment methods list', (done) => {
//       tokenisationFacade.getPaymentMethods.and.returnValue(of([]));
//       tokenisationFacade.getPaymentMethodsLoading.and.returnValue(of(false));

//       fixture.detectChanges();

//       component.paymentMethods$.subscribe((result) => {
//         expect(result).toEqual([]);
//         done();
//       });
//     });

//     it('should emit loading state changes', (done) => {
//       tokenisationFacade.getPaymentMethods.and.returnValue(of([]));
//       tokenisationFacade.getPaymentMethodsLoading.and.returnValue(of(false));

//       fixture.detectChanges();

//       component.loading$.subscribe((isLoading) => {
//         expect(typeof isLoading).toBe('boolean');
//         done();
//       });
//     });
//   });

//   describe('getCardContent', () => {
//     beforeEach(() => {
//       tokenisationFacade.getPaymentMethods.and.returnValue(of([]));
//       tokenisationFacade.getPaymentMethodsLoading.and.returnValue(of(false));
//       translationService.translate.and.returnValue(of('Translated Text'));
//       fixture.detectChanges();
//     });

//     it('should return card content observable', (done) => {
//       component.getCardContent(mockPaymentMethod1).subscribe((card) => {
//         expect(card).toBeDefined();
//         done();
//       });
//     });

//     it('should include card number in card text', (done) => {
//       component.getCardContent(mockPaymentMethod1).subscribe((card) => {
//         expect(card.text).toContain(mockPaymentMethod1.cardNumber);
//         done();
//       });
//     });

//     it('should include expiry information in card text', (done) => {
//       component.getCardContent(mockPaymentMethod1).subscribe((card) => {
//         expect(card.text.length).toBeGreaterThanOrEqual(2);
//         done();
//       });
//     });

//     it('should translate delete label', (done) => {
//       component.getCardContent(mockPaymentMethod1).subscribe(() => {
//         expect(translationService.translate).toHaveBeenCalledWith(
//           'common.delete'
//         );
//         done();
//       });
//     });

//     it('should translate delete confirmation message', (done) => {
//       component.getCardContent(mockPaymentMethod1).subscribe(() => {
//         expect(translationService.translate).toHaveBeenCalledWith(
//           'paymentCard.deleteConfirmation'
//         );
//         done();
//       });
//     });

//     it('should translate expiry date with month and year parameters', (done) => {
//       component.getCardContent(mockPaymentMethod1).subscribe(() => {
//         expect(translationService.translate).toHaveBeenCalledWith(
//           'paymentCard.expires',
//           {
//             month: mockPaymentMethod1.expiryMonth,
//             year: mockPaymentMethod1.expiryYear,
//           }
//         );
//         done();
//       });
//     });

//     it('should include delete action in card', (done) => {
//       component.getCardContent(mockPaymentMethod1).subscribe((card) => {
//         const deleteAction = card.actions?.find(
//           (action) => action.event === 'edit'
//         );
//         expect(deleteAction).toBeDefined();
//         done();
//       });
//     });

//     it('should set card role to application', (done) => {
//       component.getCardContent(mockPaymentMethod1).subscribe((card) => {
//         expect(card.role).toBe('application');
//         done();
//       });
//     });

//     it('should set deleteMsg from translation', (done) => {
//       component.getCardContent(mockPaymentMethod1).subscribe((card) => {
//         expect(card.deleteMsg).toBeDefined();
//         done();
//       });
//     });

//     it('should handle payment method with missing cardNumber', (done) => {
//       const paymentMethod: PaymentDetails = {
//         ...mockPaymentMethod1,
//         cardNumber: undefined,
//       };
//       component.getCardContent(paymentMethod).subscribe((card) => {
//         expect(card.text[0]).toBe('');
//         done();
//       });
//     });

//     it('should return correct card content for different payment methods', (done) => {
//       let count = 0;
//       component.getCardContent(mockPaymentMethod1).subscribe((card1) => {
//         expect(card1.text).toContain(mockPaymentMethod1.cardNumber);
//         count++;
//         if (count === 2) {
//           done();
//         }
//       });

//       component.getCardContent(mockPaymentMethod2).subscribe((card2) => {
//         expect(card2.text).toContain(mockPaymentMethod2.cardNumber);
//         count++;
//         if (count === 2) {
//           done();
//         }
//       });
//     });

//     it('should have exactly one action with event "edit"', (done) => {
//       component.getCardContent(mockPaymentMethod1).subscribe((card) => {
//         const editActions = card.actions?.filter(
//           (action) => action.event === 'edit'
//         );
//         expect(editActions?.length).toBe(1);
//         done();
//       });
//     });
//   });

//   describe('deletePaymentMethod', () => {
//     beforeEach(() => {
//       tokenisationFacade.getPaymentMethods.and.returnValue(
//         of([mockPaymentMethod1])
//       );
//       tokenisationFacade.getPaymentMethodsLoading.and.returnValue(of(false));
//       fixture.detectChanges();
//     });

//     it('should call facade.deletePaymentMethod with payment method id', () => {
//       component.deletePaymentMethod(mockPaymentMethod1);

//       expect(tokenisationFacade.deletePaymentMethod).toHaveBeenCalledWith(
//         'card-1'
//       );
//     });

//     it('should set editCard to undefined after deletion', () => {
//       component.editCard = 'card-1';
//       component.deletePaymentMethod(mockPaymentMethod1);

//       expect(component.editCard).toBeUndefined();
//     });

//     it('should not call deletePaymentMethod if payment method has no id', () => {
//       const paymentMethod: PaymentDetails = {
//         ...mockPaymentMethod1,
//         id: undefined,
//       };
//       component.deletePaymentMethod(paymentMethod);

//       expect(tokenisationFacade.deletePaymentMethod).not.toHaveBeenCalled();
//     });

//     it('should call deletePaymentMethod for different payment methods', () => {
//       component.deletePaymentMethod(mockPaymentMethod1);
//       expect(tokenisationFacade.deletePaymentMethod).toHaveBeenCalledWith(
//         'card-1'
//       );

//       component.deletePaymentMethod(mockPaymentMethod2);
//       expect(tokenisationFacade.deletePaymentMethod).toHaveBeenCalledWith(
//         'card-2'
//       );
//     });

//     it('should only call deletePaymentMethod once per invocation', () => {
//       component.deletePaymentMethod(mockPaymentMethod1);

//       expect(tokenisationFacade.deletePaymentMethod).toHaveBeenCalledTimes(1);
//     });
//   });

//   describe('setEdit', () => {
//     beforeEach(() => {
//       tokenisationFacade.getPaymentMethods.and.returnValue(of([]));
//       tokenisationFacade.getPaymentMethodsLoading.and.returnValue(of(false));
//       fixture.detectChanges();
//     });

//     it('should set editCard to payment method id', () => {
//       component.setEdit(mockPaymentMethod1);

//       expect(component.editCard).toBe('card-1');
//     });

//     it('should update editCard when called multiple times', () => {
//       component.setEdit(mockPaymentMethod1);
//       expect(component.editCard).toBe('card-1');

//       component.setEdit(mockPaymentMethod2);
//       expect(component.editCard).toBe('card-2');
//     });

//     it('should handle setEdit with different payment methods', () => {
//       component.setEdit(mockPaymentMethod2);
//       expect(component.editCard).toBe(mockPaymentMethod2.id);
//     });
//   });

//   describe('cancelCard', () => {
//     beforeEach(() => {
//       tokenisationFacade.getPaymentMethods.and.returnValue(of([]));
//       tokenisationFacade.getPaymentMethodsLoading.and.returnValue(of(false));
//       fixture.detectChanges();
//     });

//     it('should set editCard to undefined', () => {
//       component.editCard = 'card-1';
//       component.cancelCard();

//       expect(component.editCard).toBeUndefined();
//     });

//     it('should clear editCard even if it was undefined', () => {
//       component.editCard = undefined;
//       component.cancelCard();

//       expect(component.editCard).toBeUndefined();
//     });

//     it('should allow repeated cancellations', () => {
//       component.editCard = 'card-1';
//       component.cancelCard();
//       expect(component.editCard).toBeUndefined();

//       component.cancelCard();
//       expect(component.editCard).toBeUndefined();
//     });
//   });

//   describe('Edit Card Workflow', () => {
//     beforeEach(() => {
//       tokenisationFacade.getPaymentMethods.and.returnValue(
//         of([mockPaymentMethod1, mockPaymentMethod2])
//       );
//       tokenisationFacade.getPaymentMethodsLoading.and.returnValue(of(false));
//       fixture.detectChanges();
//     });

//     it('should handle edit -> cancel workflow', () => {
//       component.setEdit(mockPaymentMethod1);
//       expect(component.editCard).toBe('card-1');

//       component.cancelCard();
//       expect(component.editCard).toBeUndefined();
//     });

//     it('should handle edit -> delete workflow', () => {
//       component.setEdit(mockPaymentMethod1);
//       expect(component.editCard).toBe('card-1');

//       component.deletePaymentMethod(mockPaymentMethod1);
//       expect(component.editCard).toBeUndefined();
//       expect(tokenisationFacade.deletePaymentMethod).toHaveBeenCalledWith(
//         'card-1'
//       );
//     });

//     it('should allow switching between edit cards', () => {
//       component.setEdit(mockPaymentMethod1);
//       expect(component.editCard).toBe('card-1');

//       component.setEdit(mockPaymentMethod2);
//       expect(component.editCard).toBe('card-2');

//       component.cancelCard();
//       expect(component.editCard).toBeUndefined();
//     });
//   });

//   describe('Facade Integration', () => {
//     beforeEach(() => {
//       tokenisationFacade.getPaymentMethods.and.returnValue(of([]));
//       tokenisationFacade.getPaymentMethodsLoading.and.returnValue(of(false));
//       fixture.detectChanges();
//     });

//     it('should call all required facade methods on init', () => {
//       expect(tokenisationFacade.getPaymentMethods).toHaveBeenCalled();
//       expect(tokenisationFacade.getPaymentMethodsLoading).toHaveBeenCalled();
//       expect(tokenisationFacade.loadPaymentMethods).toHaveBeenCalled();
//     });
//   });

//   describe('Component Lifecycle', () => {
//     it('should properly initialize on ngOnInit', () => {
//       tokenisationFacade.getPaymentMethods.and.returnValue(
//         of([mockPaymentMethod1])
//       );
//       tokenisationFacade.getPaymentMethodsLoading.and.returnValue(of(false));

//       component.ngOnInit();

//       expect(component.paymentMethods$).toBeDefined();
//       expect(component.loading$).toBeDefined();
//       expect(component.editCard).toBeUndefined();
//     });

//     it('should handle multiple ngOnInit calls', () => {
//       tokenisationFacade.getPaymentMethods.and.returnValue(of([]));
//       tokenisationFacade.getPaymentMethodsLoading.and.returnValue(of(false));

//       component.ngOnInit();
//       const firstPaymentMethods$ = component.paymentMethods$;

//       component.ngOnInit();
//       const secondPaymentMethods$ = component.paymentMethods$;

//       expect(firstPaymentMethods$).toBeDefined();
//       expect(secondPaymentMethods$).toBeDefined();
//     });

//     it('should cleanup properly on destroy', () => {
//       tokenisationFacade.getPaymentMethods.and.returnValue(of([]));
//       tokenisationFacade.getPaymentMethodsLoading.and.returnValue(of(false));

//       fixture.detectChanges();
//       fixture.destroy();

//       expect(component).toBeTruthy();
//     });
//   });
// });
