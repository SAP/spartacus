import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import { EventService } from '@spartacus/core';
import { firstValueFrom, Subject } from 'rxjs';
import { UserActions } from '../store';
import { UserEventBuilder } from './user-event.builder';
import {
  AddUserAddressEvent,
  DeleteUserAddressEvent,
  UpdateUserAddressEvent,
} from './user.events';

interface ActionWithPayload extends Action {
  payload: any;
}

describe('UserEventBuilder', () => {
  let eventService: EventService;
  let actions$: Subject<ActionWithPayload>;

  beforeEach(() => {
    actions$ = new Subject();
    TestBed.configureTestingModule({
      providers: [
        UserEventBuilder,
        { provide: ActionsSubject, useValue: actions$ },
      ],
    });

    TestBed.inject(UserEventBuilder); // register events
    eventService = TestBed.inject(EventService);
  });

  it('UpdateUserAddressEvent', async () => {
    const payload: any = { test: 'test' };
    const resultPromise = firstValueFrom(eventService.get(UpdateUserAddressEvent));
    actions$.next({ type: UserActions.UPDATE_USER_ADDRESS, payload });
    const result = await resultPromise;
    expect(result).toEqual(expect.objectContaining(payload));
  });

  it('AddUserAddressEvent', async () => {
    const payload: any = { test: 'test' };
    const resultPromise = firstValueFrom(eventService.get(AddUserAddressEvent));
    actions$.next({ type: UserActions.ADD_USER_ADDRESS, payload });
    const result = await resultPromise;
    expect(result).toEqual(expect.objectContaining(payload));
  });

  it('DeleteUserAddressEvent', async () => {
    const payload: any = { test: 'test' };
    const resultPromise = firstValueFrom(eventService.get(DeleteUserAddressEvent));
    actions$.next({ type: UserActions.DELETE_USER_ADDRESS, payload });
    const result = await resultPromise;
    expect(result).toEqual(expect.objectContaining(payload));
  });
});
