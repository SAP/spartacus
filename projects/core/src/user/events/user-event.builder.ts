import { Injectable } from '@angular/core';
import { StateEventService } from '../../state/event/state-event.service';
import { UserActions } from '../store/actions/index';
import {
  AddUserAddressSuccessEvent,
  DeleteUserAddressSuccessEvent,
  UpdateUserAddressSuccessEvent,
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
    this.updateUserAddressSuccessEvent();
    this.deleteUserAddressSuccessEvent();
    this.addUserAddressSuccessEvent();
  }

  /**
   * Register an address successfully updated event
   */
  protected updateUserAddressSuccessEvent(): void {
    this.stateEventService.register({
      action: UserActions.UPDATE_USER_ADDRESS,
      event: UpdateUserAddressSuccessEvent,
    });
  }

  protected addUserAddressSuccessEvent(): void {
    this.stateEventService.register({
      action: UserActions.ADD_USER_ADDRESS,
      event: AddUserAddressSuccessEvent,
    });
  }

  protected deleteUserAddressSuccessEvent(): void {
    this.stateEventService.register({
      action: UserActions.DELETE_USER_ADDRESS,
      event: DeleteUserAddressSuccessEvent,
    });
  }
}
