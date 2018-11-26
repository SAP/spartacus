import { Injectable } from '@angular/core';
import { Store, ActionsSubject } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AuthService } from '../../auth';
import { GlobalMessageService } from '../../global-message/facade/global-message.service';
import { GlobalMessageType } from '../../global-message/models/message.model';
import * as fromUserStore from '../../user/store';
import * as actionTypes from '../../user/store/actions/user-addresses.action';
@Injectable()
export class AddressBookService {
  readonly userId$ = this.authService.userToken$.pipe(map(data => data.userId));

  readonly addresses$ = this.userStore.pipe(
    map(data => data['user'].addresses.list)
  );

  constructor(
    private authService: AuthService,
    private messagesService: GlobalMessageService,
    private actions: ActionsSubject,
    private userStore: Store<fromUserStore.UserState>
  ) {}

  loadUserAddresses() {
    this.userId$.subscribe(userId =>
      this.userStore.dispatch(new fromUserStore.LoadUserAddresses(userId))
    );

    return this.addresses$;
  }

  addUserAddress(address) {
    this.userId$.subscribe(userId =>
      this.userStore.dispatch(
        new fromUserStore.AddUserAddress({
          userId: userId,
          address: address
        })
      )
    );
  }

  setAddressAsDefault(addressId: string) {
    this.userId$.subscribe(userId =>
      this.userStore.dispatch(
        new fromUserStore.UpdateUserAddress({
          userId: userId,
          addressId: addressId,
          address: { defaultAddress: true }
        })
      )
    );
  }

  updateUserAddress(addressId: string, address) {
    this.userId$.subscribe(userId =>
      this.userStore.dispatch(
        new fromUserStore.UpdateUserAddress({
          userId: userId,
          addressId: addressId,
          address: address
        })
      )
    );
  }

  deleteUserAddress(addressId: string) {
    this.userId$.subscribe(userId =>
      this.userStore.dispatch(
        new fromUserStore.DeleteUserAddress({
          userId: userId,
          addressId: addressId
        })
      )
    );
  }

  // @TODO: Move this part into component
  handleActionsEvents() {
    return this.actions.subscribe(action => {
      switch (action.type) {
        case actionTypes.DELETE_USER_ADDRESS_SUCCESS: {
          this.messagesService.add({
            type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
            text: 'Address deleted successfully!'
          });
          this.loadUserAddresses();
          break;
        }

        case actionTypes.ADD_USER_ADDRESS_SUCCESS: {
          this.messagesService.add({
            type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
            text: 'New address was added successfully!'
          });
          this.loadUserAddresses();
          // @TODO: Close form area
          break;
        }

        case actionTypes.UPDATE_USER_ADDRESS_SUCCESS: {
          this.loadUserAddresses();
          break;
        }
      }
    });
  }
}
