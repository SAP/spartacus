import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import * as ngrxStore from '@ngrx/store';
import { Store, StoreModule } from '@ngrx/store';
import {
  SiteConnector,
  SiteContextConfig,
  StateWithSiteContext,
} from '@spartacus/core';
import { of } from 'rxjs';
import { SiteAdapter } from '../connectors/site.adapter';
import { SiteContextActions } from '../store/actions/index';
import { SiteContextStoreModule } from '../store/site-context-store.module';
import { BaseSiteService } from './base-site.service';
import createSpy = jasmine.createSpy;

const mockActiveBaseSiteUid = 'mock-active-base-site-uid';
const mockActiveBaseSiteUidSelect = createSpy('select').and.returnValue(() =>
  of(mockActiveBaseSiteUid)
);
const mockBaseSitesSelect = createSpy('select').and.returnValue(() =>
  of([{ uid: 'mock-active-base-site-uid' }, { uid: 'test-baseSite' }])
);

const mockSiteContextConfig: SiteContextConfig = {
  context: {
    baseSite: ['electronics-spa'],
  },
};

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
        { provide: SiteContextConfig, useValue: mockSiteContextConfig },
      ],
    });
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.stub();
    service = TestBed.inject(BaseSiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getActive should return active baseSite uid', () => {
    spyOnProperty(ngrxStore, 'select').and.returnValues(
      mockActiveBaseSiteUidSelect
    );

    let result;
    service.getActive().subscribe((res) => (result = res));

    expect(result).toEqual(mockActiveBaseSiteUid);
  });

  it('getAll should return all base sites data', () => {
    spyOnProperty(ngrxStore, 'select').and.returnValues(mockBaseSitesSelect);

    let result;
    service.getAll().subscribe((res) => (result = res));
    expect(result.length).toEqual(2);
  });

  it('getAll should load all base sites data if they do not exist', () => {
    spyOnProperty(ngrxStore, 'select').and.returnValues(
      createSpy('select').and.returnValue(() => of(null))
    );

    service.getAll().subscribe();
    expect(store.dispatch).toHaveBeenCalledWith(
      new SiteContextActions.LoadBaseSites()
    );
  });

  describe('setActive', () => {
    it('should dispatch SetActiveBaseSite action', () => {
      spyOnProperty(ngrxStore, 'select').and.returnValues(
        mockActiveBaseSiteUidSelect
      );
      const connector = TestBed.inject(SiteConnector);
      spyOn(connector, 'getBaseSite').and.returnValue(of({}));
      service.setActive('my-base-site');
      expect(store.dispatch).toHaveBeenCalledWith(
        new SiteContextActions.SetActiveBaseSite('my-base-site')
      );
    });

    it('should not dispatch SetActiveBaseSite action if not changed', () => {
      spyOnProperty(ngrxStore, 'select').and.returnValues(
        mockActiveBaseSiteUidSelect
      );
      service.setActive(mockActiveBaseSiteUid);
      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });

  it('get should return active baseSite data if no siteUid given', () => {
    spyOnProperty(ngrxStore, 'select').and.returnValues(
      mockActiveBaseSiteUidSelect,
      mockBaseSitesSelect
    );

    let result;
    service.get().subscribe((res) => (result = res));
    expect(result).toEqual({ uid: 'mock-active-base-site-uid' });
  });

  it('get should return baseSite data based on the siteUid', () => {
    spyOnProperty(ngrxStore, 'select').and.returnValues(mockBaseSitesSelect);

    let result;
    service.get('test-baseSite').subscribe((res) => (result = res));
    expect(result).toEqual({ uid: 'test-baseSite' });
  });

  describe('isInitialized', () => {
    it('should return TRUE if a base site is initialized', () => {
      spyOnProperty(ngrxStore, 'select').and.returnValues(mockBaseSitesSelect);
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
