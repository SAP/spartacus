/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { UserPaymentService } from '@spartacus/core';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  I18nTestingModule,
  MockTranslatePipe,
  TranslatePipe,
} from '@spartacus/core';
import { IconComponent, OutletContextData } from '@spartacus/storefront';
import { of, BehaviorSubject } from 'rxjs';
import { OpfTokenisationSavedCardsToggleComponent } from './opf-tokenisation-saved-cards-toggle.component';
import {
  OpfTokenisationSavedCardsService,
  SAVED_CARDS_ID,
} from '@spartacus/opf/tokenisation/root';
import { OpfMetadataStoreService } from '@spartacus/opf/base/root';
import { OpfSavedCardsToggleContext } from '../../model';

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockIconComponent {}

describe('OpfTokenisationSavedCardsToggleComponent', () => {
  let component: OpfTokenisationSavedCardsToggleComponent;
  let fixture: ComponentFixture<OpfTokenisationSavedCardsToggleComponent>;
  let mockSavedCardsService: jasmine.SpyObj<OpfTokenisationSavedCardsService>;
  let mockOpfMetadataStoreService: jasmine.SpyObj<OpfMetadataStoreService>;
  let metadataStateSubject: BehaviorSubject<any>;
  let userPaymentService: jasmine.SpyObj<UserPaymentService>;

  beforeEach(waitForAsync(() => {
    userPaymentService = jasmine.createSpyObj('UserPaymentService', [
      'loadPaymentMethods',
      'getPaymentMethods',
      'getPaymentMethodsLoading',
    ]);

    metadataStateSubject = new BehaviorSubject({
      selectedPaymentOptionId: null,
    });

    const savedCardsServiceSpy = jasmine.createSpyObj(
      'OpfTokenisationSavedCardsService',
      ['selectSavedCards']
    );

    const metadataStoreServiceSpy = jasmine.createSpyObj(
      'OpfMetadataStoreService',
      ['getOpfMetadataState']
    );
    metadataStoreServiceSpy.getOpfMetadataState.and.returnValue(
      metadataStateSubject.asObservable()
    );

    const outletContextDataSpy = jasmine.createSpyObj('OutletContextData', [], {
      context$: of({
        savedCardsId: 1,
        selectedPaymentId: 1,
        disabled: false,
      } as OpfSavedCardsToggleContext),
    });

    userPaymentService.getPaymentMethods.and.returnValue(of([]));
    userPaymentService.getPaymentMethodsLoading.and.returnValue(of(false));

    TestBed.configureTestingModule({
      imports: [OpfTokenisationSavedCardsToggleComponent, I18nTestingModule],
      providers: [
        { provide: UserPaymentService, useValue: userPaymentService },
        { provide: OutletContextData, useValue: outletContextDataSpy },
        {
          provide: OpfTokenisationSavedCardsService,
          useValue: savedCardsServiceSpy,
        },
        {
          provide: OpfMetadataStoreService,
          useValue: metadataStoreServiceSpy,
        },
      ],
    })
      .overrideComponent(OpfTokenisationSavedCardsToggleComponent, {
        remove: {
          imports: [IconComponent, TranslatePipe],
        },
        add: {
          imports: [MockIconComponent, MockTranslatePipe],
        },
      })
      .compileComponents();

    mockSavedCardsService = TestBed.inject(
      OpfTokenisationSavedCardsService
    ) as jasmine.SpyObj<OpfTokenisationSavedCardsService>;
    mockOpfMetadataStoreService = TestBed.inject(
      OpfMetadataStoreService
    ) as jasmine.SpyObj<OpfMetadataStoreService>;
  }));

  beforeEach(() => {
    metadataStateSubject.next({ selectedPaymentOptionId: null });
    fixture = TestBed.createComponent(OpfTokenisationSavedCardsToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('iconTypes', () => {
    it('should expose ICON_TYPE constants', () => {
      expect(component.iconTypes).toBeDefined();
      expect(component.iconTypes.CREDIT_CARD).toBeDefined();
    });
  });

  describe('SAVED_CARDS_ID', () => {
    it('should expose SAVED_CARDS_ID constant', () => {
      expect(component.SAVED_CARDS_ID).toBe(SAVED_CARDS_ID);
    });
  });

  describe('context$', () => {
    it('should emit context from outletContextData when available', (done) => {
      const expectedContext: OpfSavedCardsToggleContext = {
        savedCardsId: 1,
        selectedPaymentId: 1,
        hasSavedCards: false,
        disabled: false,
      };

      component.context$.subscribe((context) => {
        expect(context).toEqual(jasmine.objectContaining(expectedContext));
        done();
      });
    });

    it('should emit empty object when outletContextData is not provided', (done) => {
      TestBed.resetTestingModule();

      TestBed.configureTestingModule({
        imports: [OpfTokenisationSavedCardsToggleComponent, I18nTestingModule],
        providers: [
          {
            provide: OpfMetadataStoreService,
            useValue: mockOpfMetadataStoreService,
          },
        ],
      });

      const testFixture = TestBed.createComponent(
        OpfTokenisationSavedCardsToggleComponent
      );
      const testComponent = testFixture.componentInstance;

      testComponent.context$.subscribe((context) => {
        expect(context).toEqual(
          jasmine.objectContaining({ hasSavedCards: false })
        );
        done();
      });
    });
  });

  describe('isSavedCardsChecked$', () => {
    it('should emit true when selectedPaymentOptionId equals SAVED_CARDS_ID', (done) => {
      metadataStateSubject.next({
        selectedPaymentOptionId: SAVED_CARDS_ID,
      });

      component.isSavedCardsChecked$.subscribe((isChecked) => {
        expect(isChecked).toBe(true);
        done();
      });
    });

    it('should emit false when selectedPaymentOptionId does not equal SAVED_CARDS_ID', (done) => {
      metadataStateSubject.next({
        selectedPaymentOptionId: 'OTHER_PAYMENT_METHOD',
      });

      component.isSavedCardsChecked$.subscribe((isChecked) => {
        expect(isChecked).toBe(false);
        done();
      });
    });

    it('should emit false when selectedPaymentOptionId is null', (done) => {
      metadataStateSubject.next({
        selectedPaymentOptionId: null,
      });

      component.isSavedCardsChecked$.subscribe((isChecked) => {
        expect(isChecked).toBe(false);
        done();
      });
    });

    it('should emit false when selectedPaymentOptionId is undefined', (done) => {
      metadataStateSubject.next({
        selectedPaymentOptionId: undefined,
      });

      component.isSavedCardsChecked$.subscribe((isChecked) => {
        expect(isChecked).toBe(false);
        done();
      });
    });

    it('should react to state changes', (done) => {
      const emissions: boolean[] = [];

      component.isSavedCardsChecked$.subscribe((isChecked) => {
        emissions.push(isChecked);

        if (emissions.length === 3) {
          expect(emissions).toEqual([false, true, false]);
          done();
        }
      });

      setTimeout(() => {
        metadataStateSubject.next({
          selectedPaymentOptionId: SAVED_CARDS_ID,
        });

        setTimeout(() => {
          metadataStateSubject.next({
            selectedPaymentOptionId: 'OTHER',
          });
        }, 10);
      }, 10);
    });
  });

  describe('onSavedCardsSelected', () => {
    it('should call selectSavedCards on savedCardsService', () => {
      component.onSavedCardsSelected();

      expect(mockSavedCardsService.selectSavedCards).toHaveBeenCalled();
    });

    it('should call selectSavedCards multiple times when called multiple times', () => {
      component.onSavedCardsSelected();
      component.onSavedCardsSelected();
      component.onSavedCardsSelected();

      expect(mockSavedCardsService.selectSavedCards).toHaveBeenCalledTimes(3);
    });
  });

  describe('Dependency Injection', () => {
    it('should inject OutletContextData as optional', () => {
      expect(() => {
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({
          imports: [
            OpfTokenisationSavedCardsToggleComponent,
            I18nTestingModule,
          ],
          providers: [
            {
              provide: OpfMetadataStoreService,
              useValue: mockOpfMetadataStoreService,
            },
          ],
        });

        TestBed.createComponent(OpfTokenisationSavedCardsToggleComponent);
      }).not.toThrow();
    });

    it('should inject OpfTokenisationSavedCardsService as optional', () => {
      expect(() => {
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({
          imports: [
            OpfTokenisationSavedCardsToggleComponent,
            I18nTestingModule,
          ],
          providers: [
            {
              provide: OpfMetadataStoreService,
              useValue: mockOpfMetadataStoreService,
            },
          ],
        });

        TestBed.createComponent(OpfTokenisationSavedCardsToggleComponent);
      }).not.toThrow();
    });

    it('should inject OpfMetadataStoreService', () => {
      expect(
        mockOpfMetadataStoreService.getOpfMetadataState
      ).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty metadataState', (done) => {
      metadataStateSubject.next({});

      component.isSavedCardsChecked$.subscribe((isChecked) => {
        expect(isChecked).toBe(false);
        done();
      });
    });

    it('should handle rapid state changes', (done) => {
      const emissions: boolean[] = [];

      const subscription = component.isSavedCardsChecked$.subscribe(
        (isChecked) => {
          emissions.push(isChecked);
        }
      );

      for (let i = 0; i < 5; i++) {
        metadataStateSubject.next({
          selectedPaymentOptionId: i % 2 === 0 ? SAVED_CARDS_ID : 'OTHER',
        });
      }

      setTimeout(() => {
        expect(emissions.length).toBeGreaterThan(0);
        subscription.unsubscribe();
        done();
      }, 50);
    });
  });
});
