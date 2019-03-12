import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { Location } from '@angular/common';

import * as fromEffects from './router.effect';
import * as fromActions from '../actions/router.action';
import { Action } from '@ngrx/store';
import { Logout } from '@spartacus/core';

describe('Router Effects', () => {
  let actions$: Observable<Action>;
  let effects: fromEffects.RouterEffects;
  let router: Router;
  let location: Location;

  const mockRoutes = [
    { path: 'test', component: true, data: { cxCmsContext: true } },
    { path: 'test2', component: true }
  ] as any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(mockRoutes)],
      providers: [fromEffects.RouterEffects, provideMockActions(() => actions$)]
    });

    effects = TestBed.get(fromEffects.RouterEffects);
    router = TestBed.get(Router);
    location = TestBed.get(Location);
  });

  describe('navigate$', () => {
    it('should navigate to path', () => {
      const action = new fromActions.Go({
        path: ['/test']
      });

      actions$ = hot('-a', { a: action });

      spyOn(router, 'navigate');
      spyOn(router, 'navigateByUrl');
      effects.navigate$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/test'], {
          queryParams: undefined
        });
      });
    });
  });

  describe('navigateByUrl$', () => {
    it('should navigate to url', () => {
      const action = new fromActions.GoByUrl('/test');

      actions$ = hot('-a', { a: action });

      spyOn(router, 'navigate');
      effects.navigate$.subscribe(() => {
        expect(router.navigateByUrl).toHaveBeenCalledWith('/test');
      });
    });
  });

  describe('clearCustomRoutes$', () => {
    it('should remove custom routes', () => {
      const action = new Logout();

      actions$ = hot('-a', { a: action });

      spyOn(router, 'resetConfig');
      effects.clearCustomRoutes$.subscribe(() => {
        expect(router.resetConfig).toHaveBeenCalledWith([
          { path: 'test2', component: true }
        ]);
      });
    });
  });

  describe('navigateBack$', () => {
    it('should navigate back', () => {
      const action = new fromActions.Back();

      actions$ = hot('-a', { a: action });

      spyOn(location, 'back');
      effects.navigate$.subscribe(() => {
        expect(location.back).toHaveBeenCalled();
      });
    });
  });

  describe('navigateForward$', () => {
    it('should navigate forward', () => {
      const action = new fromActions.Back();

      actions$ = hot('-a', { a: action });

      spyOn(location, 'forward');
      effects.navigate$.subscribe(() => {
        expect(location.forward).toHaveBeenCalled();
      });
    });
  });
});
