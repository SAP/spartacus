import { Observable } from 'rxjs';
import { Address, AddressValidation } from '../../../model/address.model';

export abstract class UserAddressAdapter {
  abstract loadAll(userId: string): Observable<Address[]>;

  abstract add(userId: string, address: Address): Observable<{}>;

  abstract update(
    userId: string,
    addressId: string,
    address: Address
  ): Observable<{}>;

  abstract verify(
    userId: string,
    address: Address
  ): Observable<AddressValidation>;

  abstract delete(userId: string, addressId: string): Observable<{}>;
}
