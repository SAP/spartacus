import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { ConsentTemplate } from '../../../model/index';
import { StateUtils } from '../../../state/index';
import { AnonymousConsentsActions } from '../actions/index';
import {
  ANONYMOUS_CONSENTS_STORE_FEATURE,
  StateWithAnonymousConsents,
} from '../anonymous-consents-state';
import * as fromReducers from '../reducers/index';
import { AnonymousConsentsSelectors } from '../selectors/index';

describe('anonymous consent templates selectors', () => {
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

  const mockTemplateCode = 'MARKETING';
  const mockConsentTemplates: ConsentTemplate[] = [
    {
      id: mockTemplateCode,
      version: 0,
      name: 'Marketing consent',
    },
  ];

  describe('getAnonymousConsentTemplatesState', () => {
    it('should return the consent template loader state', () => {
      store.dispatch(
        new AnonymousConsentsActions.LoadAnonymousConsentTemplatesSuccess(
          mockConsentTemplates
        )
      );

      let result: StateUtils.LoaderState<ConsentTemplate[]>;
      store
        .pipe(
          select(AnonymousConsentsSelectors.getAnonymousConsentTemplatesState)
        )
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual({
        loading: false,
        error: false,
        success: true,
        value: mockConsentTemplates,
      });
    });
  });
  describe('getAnonymousConsentTemplatesValue', () => {
    it('should return the consent templates from the state', () => {
      store.dispatch(
        new AnonymousConsentsActions.LoadAnonymousConsentTemplatesSuccess(
          mockConsentTemplates
        )
      );

      let result: ConsentTemplate[];
      store
        .pipe(
          select(AnonymousConsentsSelectors.getAnonymousConsentTemplatesValue)
        )
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual(mockConsentTemplates);
    });
  });
  describe('getAnonymousConsentTemplatesLoading', () => {
    it('should return the loading flag', () => {
      store.dispatch(
        new AnonymousConsentsActions.LoadAnonymousConsentTemplates()
      );

      let result = false;
      store
        .pipe(
          select(AnonymousConsentsSelectors.getAnonymousConsentTemplatesLoading)
        )
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual(true);
    });
  });
  describe('getAnonymousConsentTemplatesSuccess', () => {
    it('should return the success flag', () => {
      store.dispatch(
        new AnonymousConsentsActions.LoadAnonymousConsentTemplatesSuccess(
          mockConsentTemplates
        )
      );

      let result = false;
      store
        .pipe(
          select(AnonymousConsentsSelectors.getAnonymousConsentTemplatesSuccess)
        )
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual(true);
    });
  });
  describe('getAnonymousConsentTemplatesError', () => {
    it('should return the error flag', () => {
      store.dispatch(
        new AnonymousConsentsActions.LoadAnonymousConsentTemplatesFail(
          'anError'
        )
      );

      let result = false;
      store
        .pipe(
          select(AnonymousConsentsSelectors.getAnonymousConsentTemplatesError)
        )
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual(true);
    });
  });
  describe('getAnonymousConsentTemplate', () => {
    it('should return the specified consent template', () => {
      store.dispatch(
        new AnonymousConsentsActions.LoadAnonymousConsentTemplatesSuccess(
          mockConsentTemplates
        )
      );

      let result: ConsentTemplate;
      store
        .pipe(
          select(
            AnonymousConsentsSelectors.getAnonymousConsentTemplate(
              mockTemplateCode
            )
          )
        )
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual(mockConsentTemplates[0]);
    });
  });
});
