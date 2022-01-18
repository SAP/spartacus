import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import * as ngrxStore from '@ngrx/store';
import { Store, StoreModule } from '@ngrx/store';
import {
  BaseSite,
  SiteAdapter,
  SiteContextActions,
  SiteContextConfig,
  StateWithSiteContext,
} from '@spartacus/core';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { SiteContextStoreModule } from '../store/site-context-store.module';
import { BaseSiteService } from './base-site.service';
import createSpy = jasmine.createSpy;

const mockActiveBaseSiteUid = 'mock-active-base-site-uid';
const mockActiveBaseSites: BaseSite[] = [
  { uid: mockActiveBaseSiteUid },
  { uid: 'test-base-site' },
];

class MockSiteContextConfig implements Partial<SiteContextConfig> {
  context = {
    baseSite: ['electronics-spa'],
  };
}

describe('BaseSiteService', () => {
  let service: BaseSiteService;
  let store: Store<StateWithSiteContext>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        SiteContextStoreModule,
      ],
      providers: [
        BaseSiteService,
        {
          provide: SiteAdapter,
          useValue: {},
        },
        { provide: SiteContextConfig, useClass: MockSiteContextConfig },
      ],
    });
    service = TestBed.inject(BaseSiteService);
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getActive', () => {
    it('should return active baseSite uid', (done) => {
      store.dispatch(
        new SiteContextActions.SetActiveBaseSite(mockActiveBaseSiteUid)
      );

      service
        .getActive()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(mockActiveBaseSiteUid);
          done();
        });
    });
  });

  describe('getActiveData', () => {
    it('should return active baseSite data', (done) => {
      store.dispatch(
        new SiteContextActions.LoadBaseSitesSuccess(mockActiveBaseSites)
      );
      store.dispatch(
        new SiteContextActions.SetActiveBaseSite(mockActiveBaseSiteUid)
      );

      service
        .getActiveData()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(mockActiveBaseSites[0]);
          done();
        });
    });
  });

  describe('getAll', () => {
    it('should return all base sites data', (done) => {
      store.dispatch(
        new SiteContextActions.LoadBaseSitesSuccess(mockActiveBaseSites)
      );

      service
        .getAll()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result.length).toEqual(2);
          done();
        });
    });

    it('should load all base sites data if they do not exist in the state', () => {
      service.getAll().subscribe().unsubscribe();

      expect(store.dispatch).toHaveBeenCalledWith(
        new SiteContextActions.LoadBaseSites()
      );
    });
  });

  describe('setActive', () => {
    it('should dispatch SetActiveBaseSite action', () => {
      store.dispatch(new SiteContextActions.SetActiveBaseSite('test'));

      service.setActive(mockActiveBaseSiteUid);
      expect(store.dispatch).toHaveBeenCalledWith(
        new SiteContextActions.SetActiveBaseSite(mockActiveBaseSiteUid)
      );
    });

    it('should not dispatch SetActiveBaseSite action if not changed', () => {
      const mockSelect = createSpy('select').and.returnValue(() =>
        of(mockActiveBaseSiteUid)
      );
      spyOnProperty(ngrxStore, 'select').and.returnValue(mockSelect);

      service.setActive(mockActiveBaseSiteUid);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new SiteContextActions.SetActiveBaseSite(mockActiveBaseSiteUid)
      );
    });
  });

  describe('get', () => {
    it('should return active baseSite data if parameter siteUid is given', (done) => {
      store.dispatch(
        new SiteContextActions.LoadBaseSitesSuccess(mockActiveBaseSites)
      );

      service
        .get(mockActiveBaseSites[0].uid)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(mockActiveBaseSites[0]);
          done();
        });
    });

    it('should return baseSite data if parameter siteUid is NOT given', (done) => {
      store.dispatch(
        new SiteContextActions.LoadBaseSitesSuccess(mockActiveBaseSites)
      );
      store.dispatch(
        new SiteContextActions.SetActiveBaseSite(mockActiveBaseSites[0].uid)
      );

      service
        .get()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(mockActiveBaseSites[0]);
          done();
        });
    });
  });

  describe('isInitialized', () => {
    it('should return TRUE if a base site is initialized', () => {
      store.dispatch(
        new SiteContextActions.SetActiveBaseSite(mockActiveBaseSiteUid)
      );
      expect(service.isInitialized()).toBeTruthy();
    });
  });

  describe('isValid', () => {
    it('should return TRUE if the base site is valid', () => {
      expect(service['isValid']('electronics-spa')).toBeTruthy();
    });
    it('should return FALSE if the base site is not valid', () => {
      expect(service['isValid']('something-else')).toBeFalsy();
    });
  });
});
