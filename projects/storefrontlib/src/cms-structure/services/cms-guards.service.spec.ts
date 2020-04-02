import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { of } from 'rxjs';
import { CmsGuardsService } from './cms-guards.service';
import { CmsMappingService } from './cms-mapping.service';
import {
  ConfigModule,
  FeatureConfigService,
  provideConfig,
} from '@spartacus/core';

describe('CmsGuardsService', () => {
  let service: CmsGuardsService;
  let guards: any[];
  const mockUrlTree = new UrlTree();

  class MockCmsMappingService {
    getGuardsForComponents = jasmine
      .createSpy('getGuardsForComponents')
      .and.returnValue(guards);
  }

  class PositiveGuard implements CanActivate {
    canActivate = jasmine
      .createSpy('PositiveGuard.canActivate')
      .and.returnValue(true);
  }

  class PositiveGuardObservable implements CanActivate {
    canActivate() {
      return of(true);
    }
  }

  class NegativeGuard implements CanActivate {
    canActivate() {
      return false;
    }
  }

  class UrlTreeGuard implements CanActivate {
    canActivate() {
      return mockUrlTree;
    }
  }

  const mockActivatedRouteSnapshot: ActivatedRouteSnapshot = 'ActivatedRouteSnapshot ' as any;
  const mockRouterStateSnapshot: RouterStateSnapshot = 'RouterStateSnapshot' as any;

  beforeEach(() => {
    guards = [];
    TestBed.configureTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [
        {
          provide: CmsMappingService,
          useClass: MockCmsMappingService,
        },
        FeatureConfigService,
        PositiveGuard,
        PositiveGuardObservable,
        NegativeGuard,
        UrlTreeGuard,
      ],
    });
  });

  it('should be created', () => {
    service = TestBed.get(CmsGuardsService);
    expect(service).toBeTruthy();
  });

  describe('cmsPageCanActivate', () => {
    beforeEach(() => {
      service = TestBed.get(CmsGuardsService);
    });
    it('should resolve to true if not guards are defined', () => {
      let result;
      service
        .cmsPageCanActivate(
          [],
          mockActivatedRouteSnapshot,
          mockRouterStateSnapshot
        )
        .subscribe(res => (result = res));
      expect(result).toEqual(true);
    });

    it('should resolve to true if all guards resolve to true', () => {
      guards.push(PositiveGuard, PositiveGuardObservable);

      let result;
      service
        .cmsPageCanActivate(
          [],
          mockActivatedRouteSnapshot,
          mockRouterStateSnapshot
        )
        .subscribe(res => (result = res));
      expect(result).toEqual(true);
      expect(TestBed.get(PositiveGuard).canActivate).toHaveBeenCalledWith(
        mockActivatedRouteSnapshot,
        mockRouterStateSnapshot
      );
    });

    it('should resolve to false if any guard resolve to false', () => {
      guards.push(PositiveGuard, NegativeGuard, PositiveGuardObservable);

      let result;
      service
        .cmsPageCanActivate(
          [],
          mockActivatedRouteSnapshot,
          mockRouterStateSnapshot
        )
        .subscribe(res => (result = res));
      expect(result).toEqual(false);
    });

    it('should resolve to UrlTree if any guard resolve to UrlTree', () => {
      guards.push(PositiveGuard, UrlTreeGuard);

      let result;
      service
        .cmsPageCanActivate(
          [],
          mockActivatedRouteSnapshot,
          mockRouterStateSnapshot
        )
        .subscribe(res => (result = res));
      expect(result).toEqual(mockUrlTree);
    });
  });

  describe('shouldForceRefreshPage', () => {
    it('should return true if cmsPageLoadOnce flag is not enabled', () => {
      TestBed.configureTestingModule({
        providers: [
          provideConfig({
            features: {
              cmsPageLoadOnce: false,
            },
          }),
        ],
      });
      service = TestBed.get(CmsGuardsService);
      expect(service.shouldForceRefreshPage()).toBeTruthy();
    });
  });
  it('should return false if cmsPageLoadOnce flag is enabled', () => {
    TestBed.configureTestingModule({
      providers: [
        provideConfig({
          features: {
            cmsPageLoadOnce: true,
          },
        }),
      ],
    });
    service = TestBed.get(CmsGuardsService);
    expect(service.shouldForceRefreshPage()).toBeFalsy();
  });
});
