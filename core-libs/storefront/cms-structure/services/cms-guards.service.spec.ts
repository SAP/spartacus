import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ConfigModule } from '@spartacus/core';
import { firstValueFrom, of } from 'rxjs';
import { CmsComponentsService } from './cms-components.service';
import { CmsGuardsService } from './cms-guards.service';

describe('CmsGuardsService', () => {
  let service: CmsGuardsService;
  let guards: any[];
  const mockUrlTree = new UrlTree();

  class MockCmsComponentsService implements Partial<CmsComponentsService> {
    getGuards = vi.fn().mockReturnValue(guards);
  }

  class PositiveGuard {
    canActivate = vi.fn()
      .mockReturnValue(true);
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

    it('should resolve to true if not guards are defined', async () => {
      const result = await firstValueFrom(
        service.cmsPageCanActivate(
          [],
          mockActivatedRouteSnapshot,
          mockRouterStateSnapshot
        )
      );
      expect(result).toEqual(true);
    });
    it('should resolve to true if all guards resolve to true', async () => {
      guards.push(PositiveGuard, PositiveGuardObservable);

      const result = await firstValueFrom(
        service.cmsPageCanActivate(
          [],
          mockActivatedRouteSnapshot,
          mockRouterStateSnapshot
        )
      );
      expect(result).toEqual(true);
      expect(
        TestBed.inject(PositiveGuard).canActivate
      ).toHaveBeenCalledWith(
        mockActivatedRouteSnapshot,
        mockRouterStateSnapshot
      );
    });
    it('should resolve to false if any guard resolve to false', async () => {
      guards.push(PositiveGuard, NegativeGuard, PositiveGuardObservable);

      const result = await firstValueFrom(
        service.cmsPageCanActivate(
          [],
          mockActivatedRouteSnapshot,
          mockRouterStateSnapshot
        )
      );
      expect(result).toEqual(false);
    });

    it('should resolve to UrlTree if any guard resolve to UrlTree', async () => {
      guards.push(PositiveGuard, UrlTreeGuard);

      const result = await firstValueFrom(
        service.cmsPageCanActivate(
          [],
          mockActivatedRouteSnapshot,
          mockRouterStateSnapshot
        )
      );
      expect(result).toEqual(mockUrlTree);
    });
    it('should continue processing remaining guards if some guard is not CanActivate', async () => {
      guards.push(PositiveGuard, NotGuard, PositiveGuardObservable);
      const result = await firstValueFrom(
        service.cmsPageCanActivate(
          [],
          mockActivatedRouteSnapshot,
          mockRouterStateSnapshot
        )
      );
      expect(result).toEqual(true);
    });
  });
});
