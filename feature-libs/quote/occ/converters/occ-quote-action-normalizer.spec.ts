import { TestBed } from '@angular/core/testing';
import { QuoteConfig } from '@spartacus/quote/core';
import {
  OccQuote,
  Quote,
  QuoteActionType,
  QuoteState,
} from '@spartacus/quote/root';
import { createEmptyQuote } from '../../core/testing/quote-test-utils';
import { OccQuoteActionNormalizer } from './occ-quote-action-normalizer';

const SUBMIT_AND_CANCEL_UNORDERED = [
  QuoteActionType.SUBMIT,
  QuoteActionType.CANCEL,
];

describe('OccQuoteActionNormalizer', () => {
  let service: OccQuoteActionNormalizer;
  let occQuote: OccQuote;
  let expectedQuote: Quote;
  let quoteConfig: QuoteConfig;

  beforeEach(() => {
    initTestData();
    TestBed.configureTestingModule({
      providers: [
        OccQuoteActionNormalizer,
        { provide: QuoteConfig, useValue: quoteConfig },
      ],
    });

    service = TestBed.inject(OccQuoteActionNormalizer);
  });

  function initTestData() {
    occQuote = {
      ...createEmptyQuote(),
      allowedActions: SUBMIT_AND_CANCEL_UNORDERED,
      state: QuoteState.BUYER_DRAFT,
    };
    expectedQuote = {
      ...occQuote,
      allowedActions: [
        { type: QuoteActionType.CANCEL, isPrimary: false },
        { type: QuoteActionType.SUBMIT, isPrimary: true },
      ],
      isEditable: false,
    };
    quoteConfig = {
      quote: {
        actions: {
          actionsOrderByState: {
            BUYER_DRAFT: [QuoteActionType.CANCEL, QuoteActionType.SUBMIT],
          },
          primaryActions: [QuoteActionType.SUBMIT],
        },
      },
    };
  }

  it('should inject OccQuoteActionNormalizer', () => {
    expect(service).toBeDefined();
  });

  describe('convert', () => {
    it('should convert OccQuote to Quote', () => {
      const result = service.convert(occQuote);
      expect(result).toEqual(expectedQuote);
    });

    it('should set isEditable to true if edit is allowed by backend', () => {
      occQuote.allowedActions = [QuoteActionType.EDIT];
      expect(service.convert(occQuote).isEditable).toBe(true);
    });

    it('should set isEditable to false if edit is allowed by backend, but would require status change', () => {
      occQuote.allowedActions = [QuoteActionType.EDIT];
      (quoteConfig.quote?.actions?.actionsOrderByState ?? {}).BUYER_DRAFT = [
        QuoteActionType.EDIT,
      ];
      expect(service.convert(occQuote).isEditable).toBe(false);
    });

    it('should set isEditable to false in case occ does not return allowedActions', () => {
      occQuote.allowedActions = undefined;
      expect(service.convert(occQuote).isEditable).toBe(false);
    });

    it('should set allowedActions in quote to empty array in case occ does not return allowedActions', () => {
      occQuote.allowedActions = undefined;
      expect(service.convert(occQuote).allowedActions).toEqual([]);
    });
  });

  describe('getOrderedActions', () => {
    it('should return sorted list according to config', () => {
      const orderedActions = service['getOrderedActions'](
        QuoteState.BUYER_DRAFT,
        SUBMIT_AND_CANCEL_UNORDERED
      );
      expect(orderedActions).toEqual([
        QuoteActionType.CANCEL,
        QuoteActionType.SUBMIT,
      ]);
    });
    it('should return unsorted list if no quote config is given', () => {
      quoteConfig.quote = undefined;
      const orderedActions = service['getOrderedActions'](
        QuoteState.BUYER_DRAFT,
        SUBMIT_AND_CANCEL_UNORDERED
      );
      expect(orderedActions).toEqual(SUBMIT_AND_CANCEL_UNORDERED);
    });
    it('should return unsorted list if no actions are defined in the config', () => {
      (quoteConfig?.quote ?? {}).actions = undefined;
      const orderedActions = service['getOrderedActions'](
        QuoteState.BUYER_DRAFT,
        SUBMIT_AND_CANCEL_UNORDERED
      );
      expect(orderedActions).toEqual(SUBMIT_AND_CANCEL_UNORDERED);
    });

    it('should return unsorted list if no actions by state are defined in the config', () => {
      (quoteConfig.quote?.actions ?? {}).actionsOrderByState = undefined;
      const orderedActions = service['getOrderedActions'](
        QuoteState.BUYER_DRAFT,
        SUBMIT_AND_CANCEL_UNORDERED
      );
      expect(orderedActions).toEqual(SUBMIT_AND_CANCEL_UNORDERED);
    });
  });

  describe('getActionCategory', () => {
    const SUBMIT_NOT_PRIMARY_ACTION = {
      type: QuoteActionType.SUBMIT,
      isPrimary: false,
    };
    it('should set isPrimary to true if action is defined as primary in the config', () => {
      const actualResult = service['getActionCategory'](QuoteActionType.SUBMIT);
      expect(actualResult).toEqual({
        type: QuoteActionType.SUBMIT,
        isPrimary: true,
      });
    });
    it('should set isPrimary to false action is not defined as primary in the config', () => {
      const actualResult = service['getActionCategory'](QuoteActionType.CANCEL);
      expect(actualResult).toEqual({
        type: QuoteActionType.CANCEL,
        isPrimary: false,
      });
    });
    it('should set isPrimary to false if no quote config is given', () => {
      quoteConfig.quote = undefined;
      const actualResult = service['getActionCategory'](QuoteActionType.SUBMIT);
      expect(actualResult).toEqual(SUBMIT_NOT_PRIMARY_ACTION);
    });
    it('should set isPrimary to false if no actions are defined in the config', () => {
      (quoteConfig?.quote ?? {}).actions = undefined;
      const actualResult = service['getActionCategory'](QuoteActionType.SUBMIT);
      expect(actualResult).toEqual(SUBMIT_NOT_PRIMARY_ACTION);
    });
    it('should set isPrimary to false if no primaryActions are defined in the config', () => {
      (quoteConfig?.quote?.actions ?? {}).primaryActions = undefined;
      const actualResult = service['getActionCategory'](QuoteActionType.SUBMIT);
      expect(actualResult).toEqual(SUBMIT_NOT_PRIMARY_ACTION);
    });
  });
});
