import { TestBed } from '@angular/core/testing';
import { CmsActivatedRouteSnapshot, ConfigModule } from '@spartacus/core';
import { CmsGuardsService } from '../services';
import { MultiCmsPageGuardService } from './multi-cms-page-guard.service';
import { CX_PAGE_GUARD } from './cms-page-guard.provider';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
class MockCmsGuardsService implements Partial<CmsGuardsService> {
  canActivateGuard(
    _guard: any,
    _route: CmsActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return of(true);
  }
}
class MockCustomGuard1 {
  canActivate(
    _route: CmsActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return of(true);
  }
}
class MockCustomGuard2 {
  canActivate(
    _route: CmsActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return of(false);
  }
}
class MockCustomGuard3 {
  canActivate(
    _route: CmsActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return of(false);
  }
}
let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
let mockRouterStateSnapshot: RouterStateSnapshot;
describe('MultiCmsPageGuardService', () => {
  let service: MultiCmsPageGuardService;
  let cmsService: CmsGuardsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [
        {
          provide: CmsGuardsService,
          useClass: MockCmsGuardsService,
        },
        {
          provide: CX_PAGE_GUARD,
          useValue: [MockCustomGuard1, MockCustomGuard2, MockCustomGuard3],
        },
      ],
    });
    service = TestBed.inject(MultiCmsPageGuardService);
    cmsService = TestBed.inject(CmsGuardsService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return true if all guards return true', () => {
    spyOn(cmsService, 'canActivateGuard').and.returnValue(of(true));
    service
      .canActivate(mockActivatedRouteSnapshot, mockRouterStateSnapshot)
      .subscribe((result) => {
        expect(result).toEqual(true);
      });
  });
  it('should return false if even one guard return false', () => {
    spyOn(cmsService, 'canActivateGuard')
      .withArgs(
        MockCustomGuard1,
        mockActivatedRouteSnapshot,
        mockRouterStateSnapshot
      )
      .and.returnValue(of(true))
      .withArgs(
        MockCustomGuard2,
        mockActivatedRouteSnapshot,
        mockRouterStateSnapshot
      )
      .and.returnValue(of(false))
      .withArgs(
        MockCustomGuard3,
        mockActivatedRouteSnapshot,
        mockRouterStateSnapshot
      )
      .and.returnValue(of(true));
    service
      .canActivate(mockActivatedRouteSnapshot, mockRouterStateSnapshot)
      .subscribe((result) => {
        expect(result).toEqual(false);
      });
  });
  it('should return first encountered urlTree', () => {
    const mockUrlTree = new UrlTree();
    spyOn(cmsService, 'canActivateGuard')
      .withArgs(
        MockCustomGuard1,
        mockActivatedRouteSnapshot,
        mockRouterStateSnapshot
      )
      .and.returnValue(of(true))
      .withArgs(
        MockCustomGuard2,
        mockActivatedRouteSnapshot,
        mockRouterStateSnapshot
      )
      .and.returnValue(of(mockUrlTree))
      .withArgs(
        MockCustomGuard3,
        mockActivatedRouteSnapshot,
        mockRouterStateSnapshot
      )
      .and.returnValue(of(false));
    service
      .canActivate(mockActivatedRouteSnapshot, mockRouterStateSnapshot)
      .subscribe((result) => {
        expect(result).toEqual(mockUrlTree);
      });
  });
  it('should return first encountered false', () => {
    const mockUrlTree = new UrlTree();
    spyOn(cmsService, 'canActivateGuard')
      .withArgs(
        MockCustomGuard1,
        mockActivatedRouteSnapshot,
        mockRouterStateSnapshot
      )
      .and.returnValue(of(true))
      .withArgs(
        MockCustomGuard2,
        mockActivatedRouteSnapshot,
        mockRouterStateSnapshot
      )
      .and.returnValue(of(false))
      .withArgs(
        MockCustomGuard3,
        mockActivatedRouteSnapshot,
        mockRouterStateSnapshot
      )
      .and.returnValue(of(mockUrlTree));
    service
      .canActivate(mockActivatedRouteSnapshot, mockRouterStateSnapshot)
      .subscribe((result) => {
        expect(result).toEqual(false);
      });
  });
});
