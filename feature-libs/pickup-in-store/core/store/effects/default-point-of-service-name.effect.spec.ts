import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { User, UserIdService, WindowRef } from '@spartacus/core';
import { UserProfileFacade } from '@spartacus/user/profile/root';

import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { MockWindowRef } from '../../services/preferred-store.service.spec';
import {
  LoadDefaultPointOfService,
  LoadDefaultPointOfServiceSuccess,
  SetDefaultPointOfService,
} from '../actions/default-point-of-service-name.action';
import { DefaultPointOfServiceEffect } from './default-point-of-service-name.effect';

let ForceErrorInMockUserProfileFacadeGo = false;

export class MockUserProfileFacade implements Partial<UserProfileFacade> {
  update(_details: User): Observable<unknown> {
    return ForceErrorInMockUserProfileFacadeGo
      ? throwError(() => 'An RX JS ERROR')
      : of({});
  }
  get(): Observable<User | undefined> {
    return of({
      defaultPointOfServiceName: 'defaultPointOfServiceName',
      displayName: '',
    });
  }
}

export class MockUserProfileFacadeWithError
  implements Partial<UserProfileFacade>
{
  get(): Observable<User | undefined> {
    const error = new HttpErrorResponse({ error: 'error' });
    return new Observable((subscriber) => subscriber.error(error));
  }
}

export class MockUserIdService implements Partial<UserIdService> {
  public getUserId(): Observable<string> {
    return of('');
  }
}

describe('DefaultPointOfServiceEffect', () => {
  let defaultPointOfServiceEffect: DefaultPointOfServiceEffect;
  let userProfileService: UserProfileFacade;
  let actions$: Observable<any>;
  let winRef: WindowRef;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot({})],
      providers: [
        {
          provide: UserProfileFacade,
          useClass: MockUserProfileFacade,
        },
        { provide: WindowRef, useValue: localStorage ? MockWindowRef() : {} },
        DefaultPointOfServiceEffect,

        provideMockActions(() => actions$),
      ],
    });
    winRef = TestBed.inject(WindowRef);
    defaultPointOfServiceEffect = TestBed.inject(DefaultPointOfServiceEffect);
    userProfileService = TestBed.inject(UserProfileFacade);
  });

  it('should call get userProfile on LoadDefaultPointOfService action and create LoadDefaultPointOfServiceSuccess action', () => {
    const action = LoadDefaultPointOfService();
    const actionSuccess = LoadDefaultPointOfServiceSuccess({
      payload: {
        name: 'defaultPointOfServiceName',
        displayName: '',
      },
    });
    actions$ = hot('-a', { a: action });
    const expected = cold('-(b)', { b: actionSuccess });
    expect(
      defaultPointOfServiceEffect.loadDefaultPointOfService$
    ).toBeObservable(expected);
  });

  it('should fetch preferred store value from localstorage if its not present in userProfile and call LoadDefaultPointOfServiceSuccess', () => {
    spyOn(userProfileService, 'get').and.returnValue(of({}));

    winRef.localStorage?.setItem(
      'preferred_store',
      JSON.stringify({
        name: 'preferredStore',
        displayName: '',
      })
    );

    const action = LoadDefaultPointOfService();
    const actionSuccess = LoadDefaultPointOfServiceSuccess({
      payload: {
        name: 'preferredStore',
        displayName: '',
      },
    });
    actions$ = hot('-a', { a: action });
    const expected = cold('-(b)', { b: actionSuccess });
    expect(
      defaultPointOfServiceEffect.loadDefaultPointOfService$
    ).toBeObservable(expected);
  });

  it('should emit empty name and displayName if there is a error', () => {
    const error = new HttpErrorResponse({ error: 'error' });
    spyOn(userProfileService, 'get').and.returnValue(
      new Observable((subscriber) => subscriber.error(error))
    );
    const action = LoadDefaultPointOfService();
    const actionSuccess = LoadDefaultPointOfServiceSuccess({
      payload: {
        name: '',
        displayName: '',
      },
    });
    actions$ = hot('-a', { a: action });
    const expected = cold('-(b)', { b: actionSuccess });
    expect(
      defaultPointOfServiceEffect.loadDefaultPointOfService$
    ).toBeObservable(expected);
  });

  it('should update user profile and emit DefaultPointOfServiceActions.LoadDefaultPointOfService', () => {
    const action = SetDefaultPointOfService({
      payload: {
        name: 'defaultPointOfServiceName',
        displayName: '',
      },
    });
    const actionSuccess = LoadDefaultPointOfService();
    actions$ = hot('-a', { a: action });
    const expected = cold('-(b)', { b: actionSuccess });
    expect(
      defaultPointOfServiceEffect.setDefaultPointOfService$
    ).toBeObservable(expected);
  });

  it('should emit DefaultPointOfServiceActions.LoadDefaultPointOfService in the event of error when calling userProfileService.update', () => {
    ForceErrorInMockUserProfileFacadeGo = true;
    const action = SetDefaultPointOfService({
      payload: {
        name: 'defaultPointOfServiceName',
        displayName: '',
      },
    });
    const actionSuccess = LoadDefaultPointOfService();
    actions$ = hot('-a', { a: action });
    const expected = cold('-(b)', { b: actionSuccess });
    expect(
      defaultPointOfServiceEffect.setDefaultPointOfService$
    ).toBeObservable(expected);
  });
});
