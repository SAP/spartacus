import { TestBed } from '@angular/core/testing';
import { RouterStateSnapshot, UrlTree } from '@angular/router';
import { CmsActivatedRouteSnapshot } from '@spartacus/core';
import { of } from 'rxjs';
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

  it('should return true if no guards are provided', (done) => {
    const guards: CanActivate[] = [];

    service.canActivate(guards, route, state).subscribe((result) => {
      expect(result).toEqual(true);
      done();
    });
  });

  it('should return true if all guards pass', (done) => {
    const guards: CanActivate[] = [
      { canActivate: () => of(true) },
      { canActivate: () => of(true) },
    ];

    service.canActivate(guards, route, state).subscribe((result) => {
      expect(result).toEqual(true);
      done();
    });
  });

  it('should return false if any guard fails', (done) => {
    const guards: CanActivate[] = [
      { canActivate: () => of(true) },
      { canActivate: () => of(false) },
      { canActivate: () => of(true) },
    ];

    service.canActivate(guards, route, state).subscribe((result) => {
      expect(result).toEqual(false);
      done();
    });
  });

  it('should return UrlTree if any guard returns UrlTree', (done) => {
    const guards: CanActivate[] = [
      { canActivate: () => of(true) },
      { canActivate: () => of(urlTree) },
      { canActivate: () => of(true) },
    ];

    service.canActivate(guards, route, state).subscribe((result) => {
      expect(result).toEqual(urlTree);
      done();
    });
  });

  it('should return first encountered false / UrlTree', (done) => {
    const guards1: CanActivate[] = [
      { canActivate: () => of(true) },
      { canActivate: () => of(urlTree) },
      { canActivate: () => of(false) },
    ];

    service.canActivate(guards1, route, state).subscribe((result) => {
      expect(result).toEqual(urlTree);
    });
    const guards2: CanActivate[] = [
      { canActivate: () => of(true) },
      { canActivate: () => of(false) },
      { canActivate: () => of(urlTree) },
    ];

    service.canActivate(guards2, route, state).subscribe((result) => {
      expect(result).toEqual(false);
      done();
    });
  });
});
