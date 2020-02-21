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
      providers: [
        {
          provide: CmsMappingService,
          useClass: MockCmsMappingService,
        },
        PositiveGuard,
        PositiveGuardObservable,
        NegativeGuard,
        UrlTreeGuard,
      ],
    });
    service = TestBed.inject(CmsGuardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('cmsPageCanActivate', () => {
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
});
