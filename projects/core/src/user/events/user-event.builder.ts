import { Injectable } from '@angular/core';
import { StateEventService } from '../../state/event/state-event.service';
import { UserActions } from '../store/actions/index';
import {
  AddUserAddressEvent,
  DeleteUserAddressEvent,
  UpdateUserAddressEvent,
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
    this.updateUserAddressEvent();
    this.deleteUserAddressEvent();
    this.addUserAddressEvent();
  }

  /**
   * Register an address successfully updated event
   */
  protected updateUserAddressEvent(): void {
    this.stateEventService.register({
      action: UserActions.UPDATE_USER_ADDRESS,
      event: UpdateUserAddressEvent,
    });
  }

  protected addUserAddressEvent(): void {
    this.stateEventService.register({
      action: UserActions.ADD_USER_ADDRESS,
      event: AddUserAddressEvent,
    });
  }

  protected deleteUserAddressEvent(): void {
    this.stateEventService.register({
      action: UserActions.DELETE_USER_ADDRESS,
      event: DeleteUserAddressEvent,
    });
  }
}
