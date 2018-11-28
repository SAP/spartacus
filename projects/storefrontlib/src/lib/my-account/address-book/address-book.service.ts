import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AuthService } from '../../auth';
import * as fromUserStore from '../../user/store';

@Injectable()
export class AddressBookService {
  readonly userId$ = this.authService.userToken$.pipe(map(data => data.userId));

  readonly addresses$ = this.userStore.pipe(
    map(data => data['user'].addresses)
  );

  constructor(
    private authService: AuthService,
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
}
