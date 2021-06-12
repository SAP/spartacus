import { Injectable } from '@angular/core';
import { StateEventService } from '../../state/event/state-event.service';
import { UserActions } from '../store/actions/index';
import {
  UserAddressCreateEvent,
  UserAddressDeleteEvent,
  UserAddressUpdateEvent,
} from './user.events';

@Injectable()
export class UserEventBuilder {
  constructor(protected stateEventService: StateEventService) {
    this.register();
  }

  /**
   * Registers user events
   */
  protected register(): void {
    this.userAddressUpdateEvent();
    this.userAddressDeleteEvent();
    this.userAddressCreateEvent();
  }

  /**
   * Register an address successfully updated event
   */
  protected userAddressUpdateEvent(): void {
    this.stateEventService.register({
      action: UserActions.UPDATE_USER_ADDRESS_SUCCESS,
      event: UserAddressUpdateEvent,
    });
  }

  protected userAddressCreateEvent(): void {
    this.stateEventService.register({
      action: UserActions.ADD_USER_ADDRESS_SUCCESS,
      event: UserAddressCreateEvent,
    });
  }

  protected userAddressDeleteEvent(): void {
    this.stateEventService.register({
      action: UserActions.DELETE_USER_ADDRESS_SUCCESS,
      event: UserAddressDeleteEvent,
    });
  }
}
