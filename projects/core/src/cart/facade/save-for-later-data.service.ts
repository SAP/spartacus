import { Injectable } from '@angular/core';
import { CartDataService } from './cart-data.service';

@Injectable()
export class SaveForLaterDataService extends CartDataService {
  private _customerId = '';

  constructor() {
    super();
  }

  set customerId(val) {
    this._customerId = val;
  }

  get customerId(): string {
    return this._customerId;
  }
}
