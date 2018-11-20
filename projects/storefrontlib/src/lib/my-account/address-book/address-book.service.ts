import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as fromUserStore from '../../user/store';
import { AuthService } from '../../auth';

@Injectable()
export class AddressBookService {
  readonly userId$ = this.authService.userToken$.pipe(map(data => data.userId));

  readonly addresses$ = this.userStore.pipe(
    map(data => data['user'].addresses.list)
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
}
