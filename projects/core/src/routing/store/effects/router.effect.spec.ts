import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { AuthActions } from '../../../auth/user-auth/store/actions/index';
import { RoutingActions } from '../actions/index';
import * as fromEffects from './router.effect';

describe('Router Effects', () => {
  let actions$: Observable<Action>;
  let effects: fromEffects.RouterEffects;
  let router: Router;
  let location: Location;

  const mockRoutes = [
    { path: 'test', component: true, data: { cxCmsRouteContext: true } },
    { path: 'test2', component: true },
  ] as any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(mockRoutes)],
      providers: [
        fromEffects.RouterEffects,
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(fromEffects.RouterEffects);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  describe('navigate$', () => {
    it('should navigate to path', () => {
      const action = new RoutingActions.RouteGoAction({
        path: ['/test'],
      });

      actions$ = hot('-a', { a: action });

      spyOn(router, 'navigate');
      spyOn(router, 'navigateByUrl');
      effects.navigate$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/test'], {
          queryParams: undefined,
        });
      });
    });
  });

  describe('navigateByUrl$', () => {
    it('should navigate to url', (done) => {
      const action = new RoutingActions.RouteGoByUrlAction('/test');

      actions$ = hot('-a', { a: action });

      spyOn(router, 'navigateByUrl');
      effects.navigateByUrl$.subscribe(() => {
        expect(router.navigateByUrl).toHaveBeenCalledWith('/test');
      });
      done();
    });
  });

  describe('clearCmsRoutes$', () => {
    it('should remove cms driven routes', () => {
      const action = new AuthActions.Logout();

      actions$ = hot('-a', { a: action });

      spyOn(router, 'resetConfig');
      effects.clearCmsRoutes$.subscribe(() => {
        expect(router.resetConfig).toHaveBeenCalledWith([
          { path: 'test2', component: true } as any,
        ]);
      });
    });
  });

  describe('navigateBack$', () => {
    it('should navigate back', (done) => {
      const action = new RoutingActions.RouteBackAction();

      actions$ = hot('-a', { a: action });

      spyOn(location, 'back');
      effects.navigateBack$.subscribe(() => {
        expect(location.back).toHaveBeenCalled();
      });
      done();
    });
  });

  describe('navigateForward$', () => {
    it('should navigate forward', (done) => {
      const action = new RoutingActions.RouteForwardAction();

      actions$ = hot('-a', { a: action });

      spyOn(location, 'forward');
      effects.navigateForward$.subscribe(() => {
        expect(location.forward).toHaveBeenCalled();
      });
      done();
    });
  });
});
