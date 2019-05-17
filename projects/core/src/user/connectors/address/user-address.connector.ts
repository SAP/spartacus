import { Injectable } from '@angular/core';
import { UserAddressAdapter } from './user-address.adapter';
import { Observable } from 'rxjs';
import { Address, AddressValidation } from '../../../model/address.model';

@Injectable({
  providedIn: 'root',
})
export class UserAddressConnector {
  constructor(protected adapter: UserAddressAdapter) {}

  getAll(userId: string): Observable<Address[]> {
    return this.adapter.loadAll(userId);
  }

  add(userId: string, address: Address): Observable<{}> {
    return this.adapter.add(userId, address);
  }

  update(userId: string, addressId: string, address: Address): Observable<{}> {
    return this.adapter.update(userId, addressId, address);
  }

  verify(userId: string, address: Address): Observable<AddressValidation> {
    return this.adapter.verify(userId, address);
  }

  delete(userId: string, addressId: string): Observable<{}> {
    return this.adapter.delete(userId, addressId);
  }
}
