import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { AnonymousConsent, ConsentTemplate } from '../../../model/index';
import { AnonymousConsentsActions } from '../actions/index';
import {
  ANONYMOUS_CONSENTS_FEATURE,
  StateWithAnonymousConsents,
} from '../anonymous-consents-state';
import * as fromReducers from '../reducers/index';
import { AnonymousConsentsSelectors } from '../selectors/index';

describe('anonymous consents selectors', () => {
  let store: Store<StateWithAnonymousConsents>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          ANONYMOUS_CONSENTS_FEATURE,
          fromReducers.getReducers()
        ),
      ],
    });

    store = TestBed.get(Store as Type<Store<StateWithAnonymousConsents>>);
    spyOn(store, 'dispatch').and.callThrough();
  });

  const mockTemplateCode = 'MARKETING';
  const mockConsentTemplates: ConsentTemplate[] = [
    {
      id: mockTemplateCode,
      version: 0,
      name: 'Marketing consent',
    },
  ];

  describe('getAnonymousConsents', () => {
    it('should return the consents from the state', () => {
      store.dispatch(
        new AnonymousConsentsActions.InitializeAnonymousConsents(
          mockConsentTemplates
        )
      );
      const expected: AnonymousConsent[] = [
        {
          consentState: undefined,
          templateCode: mockTemplateCode,
          version: 0,
        },
      ];

      let result: AnonymousConsent[];
      store
        .pipe(select(AnonymousConsentsSelectors.getAnonymousConsents))
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual(expected);
    });
  });
  describe('getAnonymousConsentByTemplateCode', () => {
    it('should return the consents from the state', () => {
      store.dispatch(
        new AnonymousConsentsActions.InitializeAnonymousConsents(
          mockConsentTemplates
        )
      );
      const expected: AnonymousConsent = {
        consentState: undefined,
        templateCode: mockTemplateCode,
        version: 0,
      };

      let result: AnonymousConsent;
      store
        .pipe(
          select(
            AnonymousConsentsSelectors.getAnonymousConsentByTemplateCode(
              mockTemplateCode
            )
          )
        )
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual(expected);
    });
  });
});
