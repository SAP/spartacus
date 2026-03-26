/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { CheckoutPaymentFacade } from '@spartacus/checkout/base/root';
import { OpfMetadataStoreService } from '@spartacus/opf/base/root';
import { BehaviorSubject, of } from 'rxjs';
import {
  SAVED_CARDS_ID,
  OpfTokenisationSavedCardsService,
} from './opf-tokenisation-saved-cards.service';

describe('OpfTokenisationSavedCardsService', () => {
  let service: OpfTokenisationSavedCardsService;
  let checkoutPaymentFacade: jasmine.SpyObj<CheckoutPaymentFacade>;
  let opfMetadataStoreService: jasmine.SpyObj<OpfMetadataStoreService>;
  let metadataState$: BehaviorSubject<any>;

  beforeEach(() => {
    checkoutPaymentFacade = jasmine.createSpyObj('CheckoutPaymentFacade', [
      'deletePaymentDetails',
    ]);
    checkoutPaymentFacade.deletePaymentDetails.and.returnValue(of({}));

    metadataState$ = new BehaviorSubject({
      selectedPaymentOptionId: undefined,
    });

    opfMetadataStoreService = jasmine.createSpyObj(
      'OpfMetadataStoreService',
      ['updateOpfMetadata', 'getOpfMetadataState'],
      { opfMetadataState: metadataState$ }
    );
    opfMetadataStoreService.getOpfMetadataState.and.returnValue(metadataState$);

    TestBed.configureTestingModule({
      providers: [
        OpfTokenisationSavedCardsService,
        { provide: CheckoutPaymentFacade, useValue: checkoutPaymentFacade },
        { provide: OpfMetadataStoreService, useValue: opfMetadataStoreService },
      ],
    });

    service = TestBed.inject(OpfTokenisationSavedCardsService);
  });

  afterEach(() => {
    service.ngOnDestroy();
  });

  describe('Initialization', () => {
    it('should create the service', () => {
      expect(service).toBeTruthy();
    });

    it('should have cardSelected$ initialized to false', () => {
      expect((service as any).cardSelected$.value).toBe(false);
    });

    it('should initialize subscription', () => {
      expect((service as any).subscription).toBeDefined();
    });

    it('should inject CheckoutPaymentFacade', () => {
      expect((service as any).checkoutPaymentFacade).toBeDefined();
    });

    it('should inject OpfMetadataStoreService', () => {
      expect((service as any).opfMetadataStoreService).toBeDefined();
    });
  });

  describe('SAVED_CARDS_ID constant', () => {
    it('should equal -1', () => {
      expect(SAVED_CARDS_ID).toBe(-1);
    });
  });

  describe('selectSavedCards', () => {
    it('should update metadata with SAVED_CARDS_ID', () => {
      service.selectSavedCards();

      expect(opfMetadataStoreService.updateOpfMetadata).toHaveBeenCalledWith({
        selectedPaymentOptionId: SAVED_CARDS_ID,
      });
    });

    it('should reset cardSelected$ to false', () => {
      service.markCardAsSelected();
      service.selectSavedCards();

      expect((service as any).cardSelected$.value).toBe(false);
    });

    it('should reset cardSelected$ even if already false', () => {
      service.selectSavedCards();

      expect((service as any).cardSelected$.value).toBe(false);
    });

    it('should call updateOpfMetadata each time', () => {
      service.selectSavedCards();
      service.selectSavedCards();

      expect(opfMetadataStoreService.updateOpfMetadata).toHaveBeenCalledTimes(
        2
      );
    });
  });

  describe('markCardAsSelected', () => {
    it('should set cardSelected$ to true', () => {
      service.markCardAsSelected();

      expect((service as any).cardSelected$.value).toBe(true);
    });

    it('should set cardSelected$ to true multiple times', () => {
      service.markCardAsSelected();
      service.markCardAsSelected();

      expect((service as any).cardSelected$.value).toBe(true);
    });
  });

  describe('areSavedCardsSelected', () => {
    it('should return true when selectedPaymentOptionId equals SAVED_CARDS_ID', () => {
      metadataState$.next({ selectedPaymentOptionId: SAVED_CARDS_ID });

      expect(service.areSavedCardsSelected()).toBe(true);
    });

    it('should return false with positive number', () => {
      metadataState$.next({ selectedPaymentOptionId: 1 });

      expect(service.areSavedCardsSelected()).toBe(false);
    });

    it('should return false with zero', () => {
      metadataState$.next({ selectedPaymentOptionId: 0 });

      expect(service.areSavedCardsSelected()).toBe(false);
    });

    it('should return false with undefined', () => {
      metadataState$.next({ selectedPaymentOptionId: undefined });

      expect(service.areSavedCardsSelected()).toBe(false);
    });

    it('should return false with null', () => {
      metadataState$.next({ selectedPaymentOptionId: null });

      expect(service.areSavedCardsSelected()).toBe(false);
    });

    it('should read from current metadata state value', () => {
      metadataState$.next({ selectedPaymentOptionId: SAVED_CARDS_ID });
      metadataState$.next({ selectedPaymentOptionId: 999 });

      expect(service.areSavedCardsSelected()).toBe(false);
    });
  });

  describe('listenForPaymentTransitions - deletion triggers', () => {
    it('should delete when: prev=SAVED_CARDS_ID, curr=other, cardSelected=true', (done) => {
      service.markCardAsSelected();
      metadataState$.next({ selectedPaymentOptionId: SAVED_CARDS_ID });
      metadataState$.next({ selectedPaymentOptionId: 1 });

      setTimeout(() => {
        expect(
          checkoutPaymentFacade.deletePaymentDetails
        ).toHaveBeenCalledTimes(1);
        done();
      }, 50);
    });

    it('should not delete when: cardSelected=false', (done) => {
      metadataState$.next({ selectedPaymentOptionId: SAVED_CARDS_ID });
      metadataState$.next({ selectedPaymentOptionId: 1 });

      setTimeout(() => {
        expect(
          checkoutPaymentFacade.deletePaymentDetails
        ).not.toHaveBeenCalled();
        done();
      }, 50);
    });

    it('should not delete when transitioning to undefined', (done) => {
      service.markCardAsSelected();
      metadataState$.next({ selectedPaymentOptionId: SAVED_CARDS_ID });
      metadataState$.next({ selectedPaymentOptionId: undefined });

      setTimeout(() => {
        expect(
          checkoutPaymentFacade.deletePaymentDetails
        ).not.toHaveBeenCalled();
        done();
      }, 50);
    });

    it('should delete when transitioning to null from SAVED_CARDS_ID', (done) => {
      service.markCardAsSelected();
      metadataState$.next({ selectedPaymentOptionId: SAVED_CARDS_ID });
      metadataState$.next({ selectedPaymentOptionId: null });

      setTimeout(() => {
        expect(
          checkoutPaymentFacade.deletePaymentDetails
        ).toHaveBeenCalled();
        done();
      }, 50);
    });

    it('should not delete when staying in SAVED_CARDS_ID', (done) => {
      service.markCardAsSelected();
      metadataState$.next({ selectedPaymentOptionId: SAVED_CARDS_ID });
      metadataState$.next({ selectedPaymentOptionId: SAVED_CARDS_ID });

      setTimeout(() => {
        expect(
          checkoutPaymentFacade.deletePaymentDetails
        ).not.toHaveBeenCalled();
        done();
      }, 50);
    });

    it('should not delete when prev is not SAVED_CARDS_ID', (done) => {
      service.markCardAsSelected();
      metadataState$.next({ selectedPaymentOptionId: 100 });
      metadataState$.next({ selectedPaymentOptionId: 200 });

      setTimeout(() => {
        expect(
          checkoutPaymentFacade.deletePaymentDetails
        ).not.toHaveBeenCalled();
        done();
      }, 50);
    });

    it('should not delete when transitioning to SAVED_CARDS_ID', (done) => {
      service.markCardAsSelected();
      metadataState$.next({ selectedPaymentOptionId: 999 });
      metadataState$.next({ selectedPaymentOptionId: SAVED_CARDS_ID });

      setTimeout(() => {
        expect(
          checkoutPaymentFacade.deletePaymentDetails
        ).not.toHaveBeenCalled();
        done();
      }, 50);
    });
  });

  describe('Flag reset after deletion', () => {
    it('should reset cardSelected$ to false after deletion', (done) => {
      service.markCardAsSelected();
      metadataState$.next({ selectedPaymentOptionId: SAVED_CARDS_ID });
      metadataState$.next({ selectedPaymentOptionId: 5 });

      setTimeout(() => {
        expect((service as any).cardSelected$.value).toBe(false);
        done();
      }, 50);
    });

    it('cardSelected$ should remain false if deletion not triggered', (done) => {
      service.markCardAsSelected();
      metadataState$.next({ selectedPaymentOptionId: SAVED_CARDS_ID });
      metadataState$.next({ selectedPaymentOptionId: SAVED_CARDS_ID });

      setTimeout(() => {
        expect((service as any).cardSelected$.value).toBe(true);
        done();
      }, 50);
    });
  });

  describe('distinctUntilChanged behavior', () => {
    it('should ignore duplicate consecutive values', (done) => {
      service.markCardAsSelected();
      metadataState$.next({ selectedPaymentOptionId: 10 });
      metadataState$.next({ selectedPaymentOptionId: 10 });
      metadataState$.next({ selectedPaymentOptionId: 1 });

      setTimeout(() => {
        expect(
          checkoutPaymentFacade.deletePaymentDetails
        ).not.toHaveBeenCalled();
        done();
      }, 50);
    });

    it('should process duplicate SAVED_CARDS_ID values once', (done) => {
      service.markCardAsSelected();
      metadataState$.next({ selectedPaymentOptionId: SAVED_CARDS_ID });
      metadataState$.next({ selectedPaymentOptionId: SAVED_CARDS_ID });
      metadataState$.next({ selectedPaymentOptionId: 1 });

      setTimeout(() => {
        expect(
          checkoutPaymentFacade.deletePaymentDetails
        ).toHaveBeenCalledTimes(1);
        done();
      }, 50);
    });
  });

  describe('Subscription management', () => {
    

    it('should add subscription to subscription object', () => {
      const subscriptionBefore = (service as any).subscription.closed;

      expect(subscriptionBefore).toBe(false);
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from subscription', () => {
      spyOn((service as any).subscription, 'unsubscribe');

      service.ngOnDestroy();

      expect((service as any).subscription.unsubscribe).toHaveBeenCalled();
    });

    it('should be safe to call multiple times', () => {
      spyOn((service as any).subscription, 'unsubscribe');

      service.ngOnDestroy();
      service.ngOnDestroy();

      expect((service as any).subscription.unsubscribe).toHaveBeenCalledTimes(
        2
      );
    });
  });

  describe('Complex scenarios', () => {
    it('should handle rapid state changes', (done) => {
      service.markCardAsSelected();
      metadataState$.next({ selectedPaymentOptionId: SAVED_CARDS_ID });
      metadataState$.next({ selectedPaymentOptionId: 1 });
      metadataState$.next({ selectedPaymentOptionId: 2 });
      metadataState$.next({ selectedPaymentOptionId: 3 });

      setTimeout(() => {
        expect(
          checkoutPaymentFacade.deletePaymentDetails
        ).toHaveBeenCalledTimes(1);
        done();
      }, 100);
    });

    it('should allow re-marking after deletion', (done) => {
      service.markCardAsSelected();
      metadataState$.next({ selectedPaymentOptionId: SAVED_CARDS_ID });
      metadataState$.next({ selectedPaymentOptionId: 1 });

      setTimeout(() => {
        expect(
          checkoutPaymentFacade.deletePaymentDetails
        ).toHaveBeenCalledTimes(1);

        checkoutPaymentFacade.deletePaymentDetails.calls.reset();
        service.markCardAsSelected();
        metadataState$.next({ selectedPaymentOptionId: SAVED_CARDS_ID });
        metadataState$.next({ selectedPaymentOptionId: 2 });

        setTimeout(() => {
          expect(
            checkoutPaymentFacade.deletePaymentDetails
          ).toHaveBeenCalledTimes(1);
          done();
        }, 50);
      }, 50);
    });

    it('should handle state changes before deletion completes', (done) => {
      service.markCardAsSelected();
      metadataState$.next({ selectedPaymentOptionId: SAVED_CARDS_ID });
      metadataState$.next({ selectedPaymentOptionId: 1 });
      metadataState$.next({ selectedPaymentOptionId: 2 });

      setTimeout(() => {
        expect(checkoutPaymentFacade.deletePaymentDetails).toHaveBeenCalled();
        done();
      }, 100);
    });
  });
});
