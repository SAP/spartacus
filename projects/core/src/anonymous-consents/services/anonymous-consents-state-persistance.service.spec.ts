import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { AnonymousConsent, ANONYMOUS_CONSENT_STATUS } from '../../model/index';
import { StatePersistenceService } from '../../state/index';
import { AnonymousConsentsService } from '../facade/index';
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
  getTemplates = jasmine.createSpy();
  setConsents = jasmine.createSpy();
  toggleBannerDismissed = jasmine.createSpy();
  toggleTemplatesUpdated = jasmine.createSpy();
}

const mockConsent: AnonymousConsent = {
  templateCode: 'consentCode',
  templateVersion: 1,
  consentState: ANONYMOUS_CONSENT_STATUS.GIVEN,
};

const mockState: SyncedAnonymousConsentsState = {
  templates: {
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

    spyOn(store, 'dispatch').and.stub();
    spyOn(persistenceService, 'syncWithStorage').and.stub();
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
    it('should return the full state', (done: DoneFn) => {
      spyOn(store, 'select').and.returnValue(of(mockState));

      service['getAuthState']().subscribe((state) => {
        expect(state).toEqual(mockState);

        done();
      });
    });

    it('should return the state partially', (done: DoneFn) => {
      const partialState = { ...mockState };
      delete partialState.ui;

      spyOn(store, 'select').and.returnValue(of(partialState));

      service['getAuthState']().subscribe((state) => {
        expect(state).toEqual(partialState);

        done();
      });
    });
  });

  describe('onRead()', () => {
    it('should handle templates', () => {
      service['onRead']({ templates: mockState.templates });

      expect(anonymousConsentsService.getTemplates).toHaveBeenCalled();
    });

    it('should handle consents', () => {
      service['onRead']({ consents: mockState.consents });

      expect(anonymousConsentsService.setConsents).toHaveBeenCalled();
    });

    it('should handle ui', () => {
      service['onRead']({ ui: mockState.ui });

      expect(anonymousConsentsService.toggleBannerDismissed).toHaveBeenCalled();
      expect(
        anonymousConsentsService.toggleTemplatesUpdated
      ).toHaveBeenCalled();
    });
  });
});
