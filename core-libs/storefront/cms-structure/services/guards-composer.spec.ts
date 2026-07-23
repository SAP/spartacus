import { TestBed } from '@angular/core/testing';
import { RouterStateSnapshot, UrlTree } from '@angular/router';
import { CmsActivatedRouteSnapshot } from '@spartacus/core';
import { delay, firstValueFrom, of } from 'rxjs';
import { CanActivate, GuardsComposer } from './guards-composer';
const route = {} as CmsActivatedRouteSnapshot;
const state = {} as RouterStateSnapshot;
const urlTree: UrlTree = {} as UrlTree;
describe('GuardsComposer', () => {
  let service: GuardsComposer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuardsComposer],
    });
    service = TestBed.inject(GuardsComposer);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should return true if no guards are provided', async () => {
    const guards: CanActivate[] = [];

    const result = await firstValueFrom(
      service.canActivate(guards, route, state)
    );
    expect(result).toEqual(true);
  });

  it('should return true if all guards pass', async () => {
    const guards: CanActivate[] = [
      { canActivate: () => of(true) },
      { canActivate: () => of(true) },
    ];

    const result = await firstValueFrom(
      service.canActivate(guards, route, state)
    );
    expect(result).toEqual(true);
  });

  it('should return false if any guard fails', async () => {
    const guards: CanActivate[] = [
      { canActivate: () => of(true) },
      { canActivate: () => of(false) },
      { canActivate: () => of(true) },
    ];

    const result = await firstValueFrom(
      service.canActivate(guards, route, state)
    );
    expect(result).toEqual(false);
  });

  it('should return UrlTree if any guard returns UrlTree', async () => {
    const guards: CanActivate[] = [
      { canActivate: () => of(true) },
      { canActivate: () => of(urlTree) },
      { canActivate: () => of(true) },
    ];

    const result = await firstValueFrom(
      service.canActivate(guards, route, state)
    );
    expect(result).toEqual(urlTree);
  });

  describe('when guards returns mix of false / UrlTree / true', () => {
    it('should return first encountered value - UrlTree in this case', async () => {
      const guards1: CanActivate[] = [
        { canActivate: () => of(true) },
        { canActivate: () => of(urlTree) },
        { canActivate: () => of(false) },
      ];

      const result = await firstValueFrom(
        service.canActivate(guards1, route, state)
      );
      expect(result).toEqual(urlTree);
    });

    it('should return first encountered value - False in this case', async () => {
      const guards2: CanActivate[] = [
        { canActivate: () => of(true) },
        { canActivate: () => of(false) },
        { canActivate: () => of(urlTree) },
      ];

      const result = await firstValueFrom(
        service.canActivate(guards2, route, state)
      );
      expect(result).toEqual(false);
    });

    it('should return first encountered result even if a delay is encountered - UrlTree in this case', async () => {
      const guards3: CanActivate[] = [
        { canActivate: () => of(true) },
        { canActivate: () => of(urlTree).pipe(delay(2)) },
        { canActivate: () => of(false).pipe(delay(1)) },
      ];

      const result = await firstValueFrom(
        service.canActivate(guards3, route, state)
      );
      expect(result).toEqual(urlTree);
    });

    it('should return first encountered result even if a delay is encountered - UrlTree in this case', async () => {
      const guards4: CanActivate[] = [
        { canActivate: () => of(true) },
        { canActivate: () => of(urlTree).pipe(delay(1)) },
        { canActivate: () => of(false).pipe(delay(2)) },
      ];

      const result = await firstValueFrom(
        service.canActivate(guards4, route, state)
      );
      expect(result).toEqual(urlTree);
    });
  });
});
