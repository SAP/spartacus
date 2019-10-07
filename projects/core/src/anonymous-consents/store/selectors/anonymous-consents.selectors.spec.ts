import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { AnonymousConsent } from '../../../model/index';
import { AnonymousConsentsActions } from '../actions/index';
import {
  ANONYMOUS_CONSENTS_FEATURE,
  StateWithAnonymousConsents,
} from '../anonymous-consents-state';
import * as fromReducers from '../reducers/index';
import { AnonymousConsentsSelectors } from '../selectors/index';

const mockTemplateCode = 'MARKETING';
const mockAnonymousConsents: AnonymousConsent[] = [
  {
    consentState: undefined,
    templateCode: mockTemplateCode,
    version: 0,
  },
];

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

  describe('getAnonymousConsents', () => {
    it('should return the consents from the state', () => {
      store.dispatch(
        new AnonymousConsentsActions.SetAnonymousConsents(mockAnonymousConsents)
      );

      let result: AnonymousConsent[];
      store
        .pipe(select(AnonymousConsentsSelectors.getAnonymousConsents))
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual(mockAnonymousConsents);
    });
  });

  describe('getAnonymousConsentByTemplateCode', () => {
    it('should return the consents from the state', () => {
      store.dispatch(
        new AnonymousConsentsActions.SetAnonymousConsents(mockAnonymousConsents)
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

  describe('getAnonymousConsentsBannerVisibility', () => {
    it('should return the banner slice of the state', () => {
      store.dispatch(
        new AnonymousConsentsActions.ToggleAnonymousConsentsBannerVisibility(
          false
        )
      );

      let result = true;
      store
        .pipe(
          select(
            AnonymousConsentsSelectors.getAnonymousConsentsBannerVisibility
          )
        )
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual(false);
    });
  });
});
