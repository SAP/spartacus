/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { CheckoutPaymentFacade } from '@spartacus/checkout/base/root';
import { OpfMetadataStoreService } from '@spartacus/opf/base/root';
import { BehaviorSubject, of } from 'rxjs';
import {
  SAVED_CARDS_ID,
  OpfTokenisationSavedCardsService,
} from './opf-tokenisation-saved-cards.service';

describe('OpfTokenisationSavedCardsService', () => {
  let service: OpfTokenisationSavedCardsService;
  let checkoutPaymentFacade: any;
  let opfMetadataStoreService: any;
  let metadataState$: BehaviorSubject<any>;

  beforeEach(() => {
    checkoutPaymentFacade = { deletePaymentDetails: vi.fn() };
    checkoutPaymentFacade.deletePaymentDetails.mockReturnValue(of({}));

    metadataState$ = new BehaviorSubject({
      selectedPaymentOptionId: undefined,
    });

    opfMetadataStoreService = {
      updateOpfMetadata: vi.fn(),
      getOpfMetadataState: vi.fn(),
      opfMetadataState: metadataState$,
    };
    opfMetadataStoreService.getOpfMetadataState.mockReturnValue(metadataState$);

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

    it('should have selectedPaymentMethodId$ initialized to undefined', () => {
      expect(service.selectedPaymentMethodId$.value).toBeUndefined();
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

    it('should persist the provided id in selectedPaymentMethodId$', () => {
      service.markCardAsSelected('card-123');

      expect(service.selectedPaymentMethodId$.value).toBe('card-123');
    });

    it('should not change selectedPaymentMethodId$ when called without an id', () => {
      service.selectedPaymentMethodId$.next('existing-id');
      service.markCardAsSelected();

      expect(service.selectedPaymentMethodId$.value).toBe('existing-id');
    });

    it('should overwrite a previous id when called with a new one', () => {
      service.markCardAsSelected('card-1');
      service.markCardAsSelected('card-2');

      expect(service.selectedPaymentMethodId$.value).toBe('card-2');
    });
  });

  describe('clearSelectedPaymentMethodId', () => {
    it('should reset selectedPaymentMethodId$ to undefined', () => {
      service.markCardAsSelected('card-abc');
      service.clearSelectedPaymentMethodId();

      expect(service.selectedPaymentMethodId$.value).toBeUndefined();
    });

    it('should be safe to call when already undefined', () => {
      service.clearSelectedPaymentMethodId();

      expect(service.selectedPaymentMethodId$.value).toBeUndefined();
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
    it('should delete when: prev=SAVED_CARDS_ID, curr=other, cardSelected=true', async () => {
      service.markCardAsSelected();
      metadataState$.next({ selectedPaymentOptionId: SAVED_CARDS_ID });
      metadataState$.next({ selectedPaymentOptionId: 1 });

      expect(checkoutPaymentFacade.deletePaymentDetails).toHaveBeenCalledTimes(
        1
      );
    });

    it('should not delete when: cardSelected=false', async () => {
      metadataState$.next({ selectedPaymentOptionId: SAVED_CARDS_ID });
      metadataState$.next({ selectedPaymentOptionId: 1 });

      expect(checkoutPaymentFacade.deletePaymentDetails).not.toHaveBeenCalled();
    });

    it('should not delete when transitioning to undefined', async () => {
      service.markCardAsSelected();
      metadataState$.next({ selectedPaymentOptionId: SAVED_CARDS_ID });
      metadataState$.next({ selectedPaymentOptionId: undefined });

      expect(checkoutPaymentFacade.deletePaymentDetails).not.toHaveBeenCalled();
    });

    it('should delete when transitioning to null from SAVED_CARDS_ID', async () => {
      service.markCardAsSelected();
      metadataState$.next({ selectedPaymentOptionId: SAVED_CARDS_ID });
      metadataState$.next({ selectedPaymentOptionId: null });
      expect(checkoutPaymentFacade.deletePaymentDetails).toHaveBeenCalled();
    });

    it('should not delete when staying in SAVED_CARDS_ID', async () => {
      service.markCardAsSelected();
      metadataState$.next({ selectedPaymentOptionId: SAVED_CARDS_ID });
      metadataState$.next({ selectedPaymentOptionId: SAVED_CARDS_ID });

      expect(checkoutPaymentFacade.deletePaymentDetails).not.toHaveBeenCalled();
    });

    it('should not delete when prev is not SAVED_CARDS_ID', async () => {
      service.markCardAsSelected();
      metadataState$.next({ selectedPaymentOptionId: 100 });
      metadataState$.next({ selectedPaymentOptionId: 200 });

      expect(checkoutPaymentFacade.deletePaymentDetails).not.toHaveBeenCalled();
    });

    it('should not delete when transitioning to SAVED_CARDS_ID', async () => {
      service.markCardAsSelected();
      metadataState$.next({ selectedPaymentOptionId: 999 });
      metadataState$.next({ selectedPaymentOptionId: SAVED_CARDS_ID });
      expect(checkoutPaymentFacade.deletePaymentDetails).not.toHaveBeenCalled();
    });
  });

  describe('Flag reset after deletion', () => {
    it('should reset cardSelected$ to false after deletion', async () => {
      service.markCardAsSelected();
      metadataState$.next({ selectedPaymentOptionId: SAVED_CARDS_ID });
      metadataState$.next({ selectedPaymentOptionId: 5 });

      expect((service as any).cardSelected$.value).toBe(false);
    });

    it('cardSelected$ should remain false if deletion not triggered', async () => {
      service.markCardAsSelected();
      metadataState$.next({ selectedPaymentOptionId: SAVED_CARDS_ID });
      metadataState$.next({ selectedPaymentOptionId: SAVED_CARDS_ID });

      expect((service as any).cardSelected$.value).toBe(true);
    });
  });

  describe('distinctUntilChanged behavior', () => {
    it('should ignore duplicate consecutive values', async () => {
      service.markCardAsSelected();
      metadataState$.next({ selectedPaymentOptionId: 10 });
      metadataState$.next({ selectedPaymentOptionId: 10 });
      metadataState$.next({ selectedPaymentOptionId: 1 });

      expect(checkoutPaymentFacade.deletePaymentDetails).not.toHaveBeenCalled();
    });

    it('should process duplicate SAVED_CARDS_ID values once', async () => {
      service.markCardAsSelected();
      metadataState$.next({ selectedPaymentOptionId: SAVED_CARDS_ID });
      metadataState$.next({ selectedPaymentOptionId: SAVED_CARDS_ID });
      metadataState$.next({ selectedPaymentOptionId: 1 });

      expect(checkoutPaymentFacade.deletePaymentDetails);
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
      vi.spyOn((service as any).subscription, 'unsubscribe');

      service.ngOnDestroy();

      expect((service as any).subscription.unsubscribe).toHaveBeenCalled();
    });

    it('should be safe to call multiple times', () => {
      vi.spyOn((service as any).subscription, 'unsubscribe');

      service.ngOnDestroy();
      service.ngOnDestroy();

      expect((service as any).subscription.unsubscribe).toHaveBeenCalledTimes(
        2
      );
    });
  });

  describe('Complex scenarios', () => {
    it('should handle rapid state changes', async () => {
      service.markCardAsSelected();
      metadataState$.next({ selectedPaymentOptionId: SAVED_CARDS_ID });
      metadataState$.next({ selectedPaymentOptionId: 1 });
      metadataState$.next({ selectedPaymentOptionId: 2 });
      metadataState$.next({ selectedPaymentOptionId: 3 });

      expect(checkoutPaymentFacade.deletePaymentDetails).toHaveBeenCalledTimes(
        1
      );
    });

    it('should allow re-marking after deletion', async () => {
      service.markCardAsSelected();
      metadataState$.next({ selectedPaymentOptionId: SAVED_CARDS_ID });
      metadataState$.next({ selectedPaymentOptionId: 1 });

      expect(checkoutPaymentFacade.deletePaymentDetails).toHaveBeenCalledTimes(
        1
      );

      checkoutPaymentFacade.deletePaymentDetails.mockClear();
      service.markCardAsSelected();
      metadataState$.next({ selectedPaymentOptionId: SAVED_CARDS_ID });
      metadataState$.next({ selectedPaymentOptionId: 2 });
      expect(checkoutPaymentFacade.deletePaymentDetails);
    });

    it('should handle state changes before deletion completes', async () => {
      service.markCardAsSelected();
      metadataState$.next({ selectedPaymentOptionId: SAVED_CARDS_ID });
      metadataState$.next({ selectedPaymentOptionId: 1 });
      metadataState$.next({ selectedPaymentOptionId: 2 });

      expect(checkoutPaymentFacade.deletePaymentDetails).toHaveBeenCalled();
    });
  });
});
