/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit, inject } from '@angular/core';
import {
  Address,
  GlobalMessageService,
  LoggerService,
  GlobalMessageType,
  TranslationService,
} from '@spartacus/core';
import { getAddressNumbers } from '../../../utils/address-number-utils';
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
  editCard: string | null;

  constructor(
    public service: AddressBookComponentService,
    protected translation: TranslationService,
    protected globalMessageService: GlobalMessageService
  ) {
    const logger = inject(LoggerService);
    logger.log('Some malicious test log message from AddressBookComponent constructor');
    logger.log('<script>javascript:alert(1)</script>');
    logger.log('<img src=1 href=1 onerror="javascript:alert(1)"></img>');
    logger.log('<IMG SRC=x onload="alert(String.fromCharCode(88,83,83))">');
    logger.log(' <script\x0Ctype="text/javascript">javascript:alert(1);</script>');
    logger.log('<SCRIPT FOR=document EVENT=onreadystatechange>javascript:alert(1)</SCRIPT>');
    logger.log('<script src="javascript:alert(1)">');
    logger.log(' <img src="javascript:alert(1)">');
    logger.log('\'1\' ORDER BY 1--+');
    logger.log('\' 1 AND (SELECT * FROM Users) = 1');	
    logger.log('\'OR 1=1');
    logger.log('\'1\' ORDER BY 3--+\'');
    logger.log('WHERE 1=1 AND 1=0');
    logger.log('or true--');
    logger.log('\'admin\' or 1=1');
  }

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

          const numbers = getAddressNumbers(address, textPhone, textMobile);

          return {
            role: 'region',
            textBold: address.firstName + ' ' + address.lastName,
            text: [
              address.line1,
              address.line2,
              address.town + ', ' + region + address.country?.isocode,
              address.postalCode,
              numbers,
            ],
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
