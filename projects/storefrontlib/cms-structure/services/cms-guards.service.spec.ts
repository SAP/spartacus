import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ConfigModule, FeatureConfigService } from '@spartacus/core';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CmsComponentsService } from './cms-components.service';
import { CmsGuardsService } from './cms-guards.service';

describe('CmsGuardsService', () => {
  let service: CmsGuardsService;
  let guards: any[];
  const mockUrlTree = new UrlTree();
  let featureConfig: FeatureConfigService;

  class MockCmsComponentsService implements Partial<CmsComponentsService> {
    getGuards = jasmine.createSpy('getGuards').and.returnValue(guards);
  }

  class PositiveGuard {
    canActivate = jasmine
      .createSpy('PositiveGuard.canActivate')
      .and.returnValue(true);
  }

  class PositiveGuardObservable {
    canActivate() {
      return of(true);
    }
  }

  class NegativeGuard {
    canActivate() {
      return false;
    }
  }

  class UrlTreeGuard {
    canActivate() {
      return mockUrlTree;
    }
  }

  class NotGuard {}

  const mockActivatedRouteSnapshot: ActivatedRouteSnapshot =
    'ActivatedRouteSnapshot ' as any;
  const mockRouterStateSnapshot: RouterStateSnapshot =
    'RouterStateSnapshot' as any;

  class MockFeatureConfigService implements Partial<FeatureConfigService> {
    isEnabled(_feature: string) {
      return true;
    }
  }

  beforeEach(() => {
    guards = [];
    TestBed.configureTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [
        {
          provide: CmsComponentsService,
          useClass: MockCmsComponentsService,
        },
        {
          provide: FeatureConfigService,
          useClass: MockFeatureConfigService,
        },
        PositiveGuard,
        PositiveGuardObservable,
        NegativeGuard,
        UrlTreeGuard,
      ],
    });
  });

  it('should be created', () => {
    service = TestBed.inject(CmsGuardsService);
    expect(service).toBeTruthy();
  });

  describe('cmsPageCanActivate', () => {
    beforeEach(() => {
      service = TestBed.inject(CmsGuardsService);
      featureConfig = TestBed.inject(FeatureConfigService);
    });
    describe('feature toggle cmsGuardsServiceUseGuardsComposer is false', () => {
      beforeEach(() => {
        spyOn(featureConfig, 'isEnabled').and.returnValue(false);
      });
      it('should resolve to true if not guards are defined', () => {
        let result;
        service
          .cmsPageCanActivate(
            [],
            mockActivatedRouteSnapshot,
            mockRouterStateSnapshot
          )
          .pipe(take(1))
          .subscribe((res) => (result = res));
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
          .pipe(take(1))
          .subscribe((res) => (result = res));
        expect(result).toEqual(true);
        expect(TestBed.inject(PositiveGuard).canActivate).toHaveBeenCalledWith(
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
          .pipe(take(1))
          .subscribe((res) => (result = res));
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
          .pipe(take(1))
          .subscribe((res) => (result = res));
        expect(result).toEqual(mockUrlTree);
      });
      it('should throw error if some guard is not CanActivate', () => {
        guards.push(PositiveGuard, NotGuard, PositiveGuardObservable);

        expect(() => {
          service.cmsPageCanActivate(
            [],
            mockActivatedRouteSnapshot,
            mockRouterStateSnapshot
          );
        }).toThrowError('Invalid CanActivate guard in cmsMapping');
      });
    });
    describe('feature toggle cmsGuardsServiceUseGuardsComposer is true', () => {
      beforeEach(() => {
        spyOn(featureConfig, 'isEnabled').and.returnValue(true);
      });
      it('should resolve to true if not guards are defined', (done) => {
        let result;
        service
          .cmsPageCanActivate(
            [],
            mockActivatedRouteSnapshot,
            mockRouterStateSnapshot
          )
          .pipe(take(1))
          .subscribe((res) => {
            result = res;
            expect(result).toEqual(true);
            done();
          });
      });
      it('should resolve to true if all guards resolve to true', (done) => {
        guards.push(PositiveGuard, PositiveGuardObservable);

        let result;
        service
          .cmsPageCanActivate(
            [],
            mockActivatedRouteSnapshot,
            mockRouterStateSnapshot
          )
          .pipe(take(1))
          .subscribe((res) => {
            result = res;

            expect(result).toEqual(true);
            expect(
              TestBed.inject(PositiveGuard).canActivate
            ).toHaveBeenCalledWith(
              mockActivatedRouteSnapshot,
              mockRouterStateSnapshot
            );
            done();
          });
      });
      it('should resolve to false if any guard resolve to false', (done) => {
        guards.push(PositiveGuard, NegativeGuard, PositiveGuardObservable);

        let result;
        service
          .cmsPageCanActivate(
            [],
            mockActivatedRouteSnapshot,
            mockRouterStateSnapshot
          )
          .pipe(take(1))
          .subscribe((res) => {
            result = res;
            expect(result).toEqual(false);
            done();
          });
      });

      it('should resolve to UrlTree if any guard resolve to UrlTree', (done) => {
        guards.push(PositiveGuard, UrlTreeGuard);

        let result;
        service
          .cmsPageCanActivate(
            [],
            mockActivatedRouteSnapshot,
            mockRouterStateSnapshot
          )
          .pipe(take(1))
          .subscribe((res) => {
            result = res;
            expect(result).toEqual(mockUrlTree);
            done();
          });
      });
      it('should continue processing remaining guards if some guard is not CanActivate', (done) => {
        guards.push(PositiveGuard, NotGuard, PositiveGuardObservable);
        let result;
        service
          .cmsPageCanActivate(
            [],
            mockActivatedRouteSnapshot,
            mockRouterStateSnapshot
          )
          .pipe(take(1))
          .subscribe((res) => {
            result = res;
            expect(result).toEqual(true);
            done();
          });
      });
    });
  });

  describe('canActivateGuard', () => {
    it('should resolve to true if guard resolves to true', () => {
      let result;
      service
        .canActivateGuard(
          PositiveGuard,
          mockActivatedRouteSnapshot,
          mockRouterStateSnapshot
        )
        .pipe(take(1))
        .subscribe((res) => (result = res));
      expect(result).toEqual(true);
    });

    it('should resolve to false if guard resolves to false', () => {
      let result;
      service
        .canActivateGuard(
          NegativeGuard,
          mockActivatedRouteSnapshot,
          mockRouterStateSnapshot
        )
        .pipe(take(1))
        .subscribe((res) => (result = res));
      expect(result).toEqual(false);
    });

    it('should resolve to UrlTree if guard resolves to UrlTree', () => {
      let result;
      service
        .canActivateGuard(
          UrlTreeGuard,
          mockActivatedRouteSnapshot,
          mockRouterStateSnapshot
        )
        .pipe(take(1))
        .subscribe((res) => (result = res));
      expect(result).toEqual(mockUrlTree);
    });

    it('should throw error if guard is not CanActivate', () => {
      expect(() => {
        service.canActivateGuard(
          NotGuard,
          mockActivatedRouteSnapshot,
          mockRouterStateSnapshot
        );
      }).toThrowError('Invalid CanActivate guard in cmsMapping');
    });
  });
});
