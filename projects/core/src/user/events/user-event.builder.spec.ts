import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import { EventService } from '@spartacus/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
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

  it('UpdateUserAddressEvent', (done) => {
    const payload: any = { test: 'test' };

    eventService
      .get(UpdateUserAddressEvent)
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toEqual(jasmine.objectContaining(payload));
        done();
      });

    actions$.next({ type: UserActions.UPDATE_USER_ADDRESS, payload });
  });

  it('AddUserAddressEvent', (done) => {
    const payload: any = { test: 'test' };

    eventService
      .get(AddUserAddressEvent)
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toEqual(jasmine.objectContaining(payload));
        done();
      });

    actions$.next({ type: UserActions.ADD_USER_ADDRESS, payload });
  });

  it('DeleteUserAddressEvent', (done) => {
    const payload: any = { test: 'test' };

    eventService
      .get(DeleteUserAddressEvent)
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toEqual(jasmine.objectContaining(payload));
        done();
      });

    actions$.next({ type: UserActions.DELETE_USER_ADDRESS, payload });
  });
});
