import { TestBed } from '@angular/core/testing';
import { GuardResult, RouterStateSnapshot } from '@angular/router';
import { CmsActivatedRouteSnapshot } from '@spartacus/core';
import { firstValueFrom, Observable, of } from 'rxjs';
import { CanActivate, GuardsComposer } from '../services/guards-composer';
import { BeforeCmsPageGuardService } from './before-cms-page-guard.service';

class MockGuardsComposer implements Partial<GuardsComposer> {
  canActivate(
    _guards: CanActivate[],
    _route: CmsActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<GuardResult> {
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

  it('should call canActivate and return value', async () => {
    const route: CmsActivatedRouteSnapshot = {} as CmsActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;

    vi.spyOn(guardsComposer, 'canActivate').mockReturnValue(of(true));

    const value = await firstValueFrom(service.canActivate(route, state));
    expect(guardsComposer.canActivate).toHaveBeenCalledWith(
      service['guards'],
      route,
      state
    );
    expect(value).toEqual(true);
  });
});
