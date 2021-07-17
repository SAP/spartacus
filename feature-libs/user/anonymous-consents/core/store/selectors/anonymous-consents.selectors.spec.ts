import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { AnonymousConsent } from '@spartacus/user/anonymous-consents/root';
import { AnonymousConsentsActions } from '../actions/index';
import {
  ANONYMOUS_CONSENTS_STORE_FEATURE,
  StateWithAnonymousConsents,
} from '../anonymous-consents-state';
import * as fromReducers from '../reducers/index';
import { AnonymousConsentsSelectors } from '../selectors/index';

const mockTemplateCode = 'MARKETING';
const mockAnonymousConsents: AnonymousConsent[] = [
  {
    consentState: undefined,
    templateCode: mockTemplateCode,
    templateVersion: 0,
  },
];

describe('anonymous consents selectors', () => {
  let store: Store<StateWithAnonymousConsents>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          ANONYMOUS_CONSENTS_STORE_FEATURE,
          fromReducers.getReducers()
        ),
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getAnonymousConsents', () => {
    it('should return the consents from the state', () => {
      store.dispatch(
        new AnonymousConsentsActions.SetAnonymousConsents(mockAnonymousConsents)
      );

      let result: AnonymousConsent[] | undefined;
      store
        .pipe(select(AnonymousConsentsSelectors.getAnonymousConsents))
        .subscribe((value) => (result = value))
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
        templateVersion: 0,
      };

      let result: AnonymousConsent | undefined;
      store
        .pipe(
          select(
            AnonymousConsentsSelectors.getAnonymousConsentByTemplateCode(
              mockTemplateCode
            )
          )
        )
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual(expected);
    });
  });
});
