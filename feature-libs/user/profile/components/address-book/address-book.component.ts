/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  Address,
  GlobalMessageService,
  GlobalMessageType,
  TranslatePipe,
  TranslationService,
} from '@spartacus/core';
import {
  Card,
  CardComponent,
  getAddressNumbers,
  SpinnerComponent,
} from '@spartacus/storefront';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddressBookComponentService } from './address-book.component.service';
import { AddressFormComponent } from './address-form/address-form.component';

@Component({
  selector: 'cx-address-book',
  templateUrl: './address-book.component.html',
  imports: [
    NgIf,
    NgFor,
    CardComponent,
    AddressFormComponent,
    SpinnerComponent,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class AddressBookComponent implements OnInit {
  addresses$: Observable<Address[]>;
  cards$: Observable<Card[]>;
  addressesStateLoading$: Observable<boolean>;
  currentAddress: Address;

  showAddAddressForm = false;
  showEditAddressForm = false;
  editCard: string | null;

  constructor(
    public service: AddressBookComponentService,
    protected translation: TranslationService,
    protected globalMessageService: GlobalMessageService
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
    if (address && this.currentAddress['id']) {
      this.service.updateUserAddress(this.currentAddress['id'], address);
    }
  }

  editAddressCancel(): void {
    this.showEditAddressForm = false;
  }

  getCardContent(address: Address): Observable<Card> {
    return combineLatest([
      this.translation.translate('addressCard.default'),
      this.translation.translate('addressCard.setAsDefault'),
      this.translation.translate('common.delete'),
      this.translation.translate('common.edit'),
      this.translation.translate('addressBook.areYouSureToDeleteAddress'),
      this.translation.translate('addressCard.phoneNumber'),
      this.translation.translate('addressCard.mobileNumber'),
    ]).pipe(
      map(
        ([
          defaultText,
          setAsDefaultText,
          textDelete,
          textEdit,
          textVerifyDeleteMsg,
          textPhone,
          textMobile,
        ]) => {
          const region = this.buildRegion(address);
          const countryName = address.country?.name || address.country?.isocode || '';
          const townName = address.city?.name || address.town || '';
          const districtName =
            address.cityDistrict?.name || address.district || '';

          const actions: { name: string; event: string }[] = [];
          if (!address.defaultAddress) {
            actions.push({ name: setAsDefaultText, event: 'default' });
          }
          actions.push({ name: textEdit, event: 'edit' });
          actions.push({ name: textDelete, event: 'delete' });

          const numbers = getAddressNumbers(address, textPhone, textMobile);

          const locationParts = [townName, region, countryName]
            .filter(Boolean)
            .join(', ');

          return {
            role: 'application',
            textBold: address.firstName + ' ' + address.lastName,
            text: [
              address.line1,
              address.line2,
              locationParts,
              districtName,
              address.postalCode,
              numbers,
            ].filter(Boolean) as string[],
            actions: actions,
            header: address.defaultAddress ? `✓ ${defaultText}` : '',
            deleteMsg: textVerifyDeleteMsg,
            label: address.defaultAddress
              ? 'addressBook.defaultDeliveryAddress'
              : 'addressBook.additionalDeliveryAddress',
          } as Card;
        }
      )
    );
  }

  private buildRegion(address: Address): string {
    return address.region?.name || address.region?.isocode || '';
  }

  setAddressAsDefault(address: Address): void {
    this.service.setAddressAsDefault(address.id ?? '');
    this.globalMessageService.add(
      {
        key: 'addressMessages.setAsDefaultSuccessfully',
        params: { streetAddress: address.line1 },
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
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
