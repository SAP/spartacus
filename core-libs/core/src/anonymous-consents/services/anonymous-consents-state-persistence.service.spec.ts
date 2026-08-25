import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { firstValueFrom, of } from 'rxjs';
import { AnonymousConsent, ANONYMOUS_CONSENT_STATUS } from '../../model/index';
import { StatePersistenceService } from '../../state/index';
import { AnonymousConsentsService } from '../facade/index';
import { LoadAnonymousConsentTemplatesSuccess } from '../store/actions/anonymous-consents-group';
import {
  ANONYMOUS_CONSENTS_STORE_FEATURE,
  StateWithAnonymousConsents,
} from '../store/index';
import * as fromAnonymousConsentsReducers from '../store/reducers/index';
import {
  AnonymousConsentsStatePersistenceService,
  SyncedAnonymousConsentsState,
} from './anonymous-consents-state-persistence.service';

class MockAnonymousConsentsService {
  getTemplates = vi.fn();
  setConsents = vi.fn();
  toggleBannerDismissed = vi.fn();
  toggleTemplatesUpdated = vi.fn();
}

const mockConsent: AnonymousConsent = {
  templateCode: 'consentCode',
  templateVersion: 1,
  consentState: ANONYMOUS_CONSENT_STATUS.GIVEN,
};

const mockState: SyncedAnonymousConsentsState = {
  templates: {
    success: true,
    value: [
      {
        id: 'consentId',
        name: 'consentName',
      },
    ],
  },
  consents: [mockConsent],
  ui: {
    bannerDismissed: false,
    updated: false,
  },
};

describe('AnonymousConsentsStatePersistenceService', () => {
  let service: AnonymousConsentsStatePersistenceService;
  let persistenceService: StatePersistenceService;
  let store: Store<StateWithAnonymousConsents>;
  let anonymousConsentsService: AnonymousConsentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          ANONYMOUS_CONSENTS_STORE_FEATURE,
          fromAnonymousConsentsReducers.getReducers()
        ),
      ],
      providers: [
        AnonymousConsentsStatePersistenceService,
        StatePersistenceService,
        {
          provide: AnonymousConsentsService,
          useClass: MockAnonymousConsentsService,
        },
      ],
    });

    service = TestBed.inject(AnonymousConsentsStatePersistenceService);
    persistenceService = TestBed.inject(StatePersistenceService);
    store = TestBed.inject(Store);
    anonymousConsentsService = TestBed.inject(AnonymousConsentsService);

    vi.spyOn(store, 'dispatch');
    vi.spyOn(persistenceService, 'syncWithStorage').mockImplementation(
      () => {}
    );
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  describe('initSync()', () => {
    it('should sync state with storage', () => {
      service.initSync();

      expect(persistenceService.syncWithStorage).toHaveBeenCalled();
    });
  });

  describe('getAuthState()', () => {
    it('should return the full state', async () => {
      vi.spyOn(store, 'select').mockReturnValue(of(mockState));

      const state = await firstValueFrom(service['getAuthState']());
      expect(state).toEqual(mockState);
    });

    it('should return the state partially', async () => {
      const partialState = { ...mockState };
      delete partialState.ui;

      vi.spyOn(store, 'select').mockReturnValue(of(partialState));

      const state = await firstValueFrom(service['getAuthState']());
      expect(state).toEqual(partialState);
    });
  });

  describe('onRead()', () => {
    it('should handle templates', () => {
      const stateObj = { templates: mockState.templates };

      service['onRead'](stateObj);

      expect(store.dispatch).toHaveBeenCalledWith(
        new LoadAnonymousConsentTemplatesSuccess(stateObj.templates.value)
      );
    });

    it('should handle consents', () => {
      const stateObj = { consents: mockState.consents };

      service['onRead'](stateObj);

      expect(anonymousConsentsService.setConsents).toHaveBeenCalledWith(
        stateObj.consents
      );
    });

    it('should handle ui', () => {
      const stateObj = { ui: mockState.ui };

      service['onRead'](stateObj);

      expect(
        anonymousConsentsService.toggleBannerDismissed
      ).toHaveBeenCalledWith(stateObj.ui.bannerDismissed);
      expect(
        anonymousConsentsService.toggleTemplatesUpdated
      ).toHaveBeenCalledWith(stateObj.ui.updated);
    });
  });
});
