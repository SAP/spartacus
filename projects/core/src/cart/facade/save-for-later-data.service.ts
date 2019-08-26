import { Injectable } from '@angular/core';
import { CartDataService } from './cart-data.service';
import { Store } from '@ngrx/store';
import { StateWithCart } from '..';
import { AuthService } from '../../auth';

@Injectable()
export class SaveForLaterDataService extends CartDataService {
  private _customerId = '';

  constructor(
    protected store: Store<StateWithCart>,
    protected authService: AuthService
  ) {
    super(store, authService);
  }

  set customerId(val) {
    this._customerId = val;
  }

  get customerId(): string {
    return this._customerId;
  }
}
