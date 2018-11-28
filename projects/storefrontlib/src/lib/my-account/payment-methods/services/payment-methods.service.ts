import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AuthService } from '../../../auth';
import * as fromUserStore from '../../../user/store';

@Injectable()
export class PaymentMethodsService {
  readonly userId$ = this.authService.userToken$.pipe(map(data => data.userId));

  readonly paymentMethods$ = this.userStore.pipe(
    map(data => data['user'].payments.list)
  );

  readonly paymentMethodsLoading$ = this.userStore.pipe(
    map(data => data['user'].payments.isLoading)
  );

  constructor(
    private authService: AuthService,
    private userStore: Store<fromUserStore.UserState>
  ) {}

  loadUserPaymentMethods() {
    this.userId$.subscribe(userId =>
      this.userStore.dispatch(new fromUserStore.LoadUserPaymentMethods(userId))
    );

    return this.paymentMethods$;
  }

  setPaymentMethodAsDefault(paymentMethodId: string) {
    this.userId$.subscribe(userId =>
      this.userStore.dispatch(
        new fromUserStore.SetDefaultUserPaymentMethod({
          userId,
          paymentMethodId
        })
      )
    );
  }

  deleteUserPaymentMethod(paymentMethodId: string) {
    this.userId$.subscribe(userId =>
      this.userStore.dispatch(
        new fromUserStore.DeleteUserPaymentMethod({
          userId,
          paymentMethodId
        })
      )
    );
  }
}
