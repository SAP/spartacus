import { Component, OnInit } from '@angular/core';
import { Address, TranslationService } from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Card } from '../../../shared/components/card';
import { AddressBookComponentService } from './address-book.component.service';

@Component({
  selector: 'cx-address-book',
  templateUrl: './address-book.component.html',
})
export class AddressBookComponent implements OnInit {
  addresses$: Observable<Address[]>;
  cards$: Observable<Card[]>;
  addressesStateLoading$: Observable<boolean>;
  currentAddress: Address;

  showAddAddressForm = false;
  showEditAddressForm = false;
  editCard: string;

  constructor(
    public service: AddressBookComponentService,
    protected translation: TranslationService
  ) {}

  ngOnInit(): void {
    this.addresses$ = this.service.getAddresses();
    this.addressesStateLoading$ = this.service.getAddressesStateLoading();
    this.service.loadAddresses();
  }

  addAddressButtonHandle(): void {
    this.showEditAddressForm = false;
    this.showAddAddressForm = true;
  }

  editAddressButtonHandle(address: Address): void {
    this.showAddAddressForm = false;
    this.showEditAddressForm = true;
    this.currentAddress = address;
  }

  addAddressSubmit(address: Address): void {
    this.showAddAddressForm = false;
    this.service.addUserAddress(address);
  }

  addAddressCancel(): void {
    this.showAddAddressForm = false;
  }

  editAddressSubmit(address: Address): void {
    this.showEditAddressForm = false;
    this.service.updateUserAddress(this.currentAddress['id'], address);
  }

  editAddressCancel(): void {
    this.showEditAddressForm = false;
  }

  getCardContent(address: Address) {
    return combineLatest([
      this.translation.translate('addressCard.default'),
      this.translation.translate('addressCard.setAsDefault'),
      this.translation.translate('common.delete'),
      this.translation.translate('common.edit'),
      this.translation.translate('addressBook.areYouSureToDeleteAddress'),
    ]).pipe(
      map(
        ([
          defaultText,
          setAsDefaultText,
          textDelete,
          textEdit,
          textVerifyDeleteMsg,
        ]) => {
          let region = '';

          if (address.region && address.region.isocode) {
            region = address.region.isocode + ', ';
          }

          const actions: { name: string; event: string }[] = [];
          if (!address.defaultAddress) {
            actions.push({ name: setAsDefaultText, event: 'default' });
          }
          actions.push({ name: textEdit, event: 'edit' });
          actions.push({ name: textDelete, event: 'delete' });

          return {
            textBold: address.firstName + ' ' + address.lastName,
            text: [
              address.line1,
              address.line2,
              address.town + ', ' + region + address.country.isocode,
              address.postalCode,
              address.phone,
            ],
            actions: actions,
            header: address.defaultAddress ? `✓ ${defaultText}` : '',
            deleteMsg: textVerifyDeleteMsg,
            label: address.defaultAddress
              ? 'addressBook.defaultShippingAddress'
              : 'addressBook.additionalShippingAddress',
          };
        }
      )
    );
  }

  setAddressAsDefault(addressId: string): void {
    this.service.setAddressAsDefault(addressId);
  }

  deleteAddress(addressId: string): void {
    this.service.deleteUserAddress(addressId);
  }

  setEdit(addressId: string): void {
    if (this.editCard !== addressId) {
      this.editCard = addressId;
    } else {
      this.deleteAddress(addressId);
    }
  }

  cancelCard(): void {
    this.editCard = null;
  }
}
