import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { AuthActions } from '../../../auth/user-auth/store/actions/index';
import * as fromEffects from './router.effect';

describe('Router Effects', () => {
  let actions$: Observable<Action>;
  let effects: fromEffects.RouterEffects;
  let router: Router;

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
});
