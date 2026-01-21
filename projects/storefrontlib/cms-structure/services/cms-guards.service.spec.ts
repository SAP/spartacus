import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ConfigModule } from '@spartacus/core';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CmsComponentsService } from './cms-components.service';
import { CmsGuardsService } from './cms-guards.service';

describe('CmsGuardsService', () => {
  let service: CmsGuardsService;
  let guards: any[];
  const mockUrlTree = new UrlTree();

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

  beforeEach(() => {
    guards = [];
    TestBed.configureTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [
        {
          provide: CmsComponentsService,
          useClass: MockCmsComponentsService,
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
