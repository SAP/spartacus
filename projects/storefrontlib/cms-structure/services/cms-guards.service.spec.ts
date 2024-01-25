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
