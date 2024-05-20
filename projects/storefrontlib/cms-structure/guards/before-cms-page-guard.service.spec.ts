import { TestBed } from '@angular/core/testing';
import { RouterStateSnapshot, UrlTree } from '@angular/router';
import { CmsActivatedRouteSnapshot } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CanActivate, GuardsComposer } from '../services/guards-composer';
import { BeforeCmsPageGuardService } from './before-cms-page-guard.service';

class MockGuardsComposer implements Partial<GuardsComposer> {
  canActivate(
    _guards: CanActivate[],
    _route: CmsActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return of(true);
  }
}
describe('BeforeCmsPageGuardService', () => {
  let service: BeforeCmsPageGuardService;
  let guardsComposer: GuardsComposer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BeforeCmsPageGuardService,
        { provide: GuardsComposer, useClass: MockGuardsComposer },
      ],
    });
    service = TestBed.inject(BeforeCmsPageGuardService);
    guardsComposer = TestBed.inject(GuardsComposer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call canActivate and return value', (done) => {
    const route: CmsActivatedRouteSnapshot = {} as CmsActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;

    spyOn(guardsComposer, 'canActivate').and.returnValue(of(true));

    service.canActivate(route, state).subscribe((value) => {
      expect(guardsComposer.canActivate).toHaveBeenCalledWith(
        service['guards'],
        route,
        state
      );
      expect(value).toEqual(true);
      done();
    });
  });
});
