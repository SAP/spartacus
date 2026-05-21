/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Address,
  GlobalMessageService,
  GlobalMessageType,
  LanguageService,
  TranslatePipe,
  TranslationService,
} from '@spartacus/core';
import {
  Card,
  CardComponent,
  getAddressNumbers,
  SpinnerComponent,
} from '@spartacus/storefront';
import { combineLatest, Observable, Subscription } from 'rxjs';
import {
  map,
  filter,
  pairwise,
  skip,
  withLatestFrom,
  take,
} from 'rxjs/operators';
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
export class AddressBookComponent implements OnInit, OnDestroy {
  addresses$: Observable<Address[]>;
  cards$: Observable<Card[]>;
  addressesStateLoading$: Observable<boolean>;
  currentAddress: Address;

  showAddAddressForm = false;
  showEditAddressForm = false;
  editCard: string | null;

  private subscription = new Subscription();

  constructor(
    public service: AddressBookComponentService,
    protected translation: TranslationService,
    protected globalMessageService: GlobalMessageService,
    protected languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.addresses$ = this.service.getAddresses();
    this.addressesStateLoading$ = this.service.getAddressesStateLoading();
    this.service.loadAddresses();

    this.subscription.add(
      this.languageService
        .getActive()
        .pipe(skip(1))
        .subscribe(() => this.service.loadAddresses())
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
    if (!address) {
      this.showAddAddressForm = false;
      return;
    }
    this.service.addUserAddress(address);
    this.subscription.add(
      this.service
        .getAddressesStateLoading()
        .pipe(
          pairwise(),
          filter(([prev, curr]) => prev === true && curr === false),
          take(1),
          withLatestFrom(this.service.getAddressesError())
        )
        .subscribe(([_, hasError]) => {
          if (!hasError) {
            this.showAddAddressForm = false;
          }
        })
    );
  }

  addAddressCancel(): void {
    this.showAddAddressForm = false;
  }

  editAddressSubmit(address: Address): void {
    if (!address) {
      this.showEditAddressForm = false;
      return;
    }
    if (this.currentAddress['id']) {
      this.service.updateUserAddress(this.currentAddress['id'], address);
      this.subscription.add(
        this.service
          .getAddressesStateLoading()
          .pipe(
            pairwise(),
            filter(([prev, curr]) => prev === true && curr === false),
            take(1),
            withLatestFrom(this.service.getAddressesError())
          )
          .subscribe(([_, hasError]) => {
            if (!hasError) {
              this.showEditAddressForm = false;
            }
          })
      );
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
          const actions: { name: string; event: string }[] = [];
          if (!address.defaultAddress) {
            actions.push({ name: setAsDefaultText, event: 'default' });
          }
          actions.push({ name: textEdit, event: 'edit' });
          actions.push({ name: textDelete, event: 'delete' });

          const numbers = getAddressNumbers(address, textPhone, textMobile);
          const locationLine = this.buildLocationLine(address);
          const districtName =
            address.country?.isocode === 'CN'
              ? address.cityDistrict?.name || address.district || ''
              : '';

          return {
            role: 'application',
            textBold: address.firstName + ' ' + address.lastName,
            text: [
              address.line1,
              address.line2,
              locationLine,
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

  protected buildLocationLine(address: Address): string {
    if (address.country?.isocode === 'CN') {
      const cnRegion = address.region?.name || address.region?.isocode || '';
      const townName = address.city?.name || address.town || '';
      const countryName =
        address.country?.name || address.country?.isocode || '';
      return [townName, cnRegion, countryName].filter(Boolean).join(', ');
    }
    let region = '';
    if (address.region && address.region.isocode) {
      region = address.region.isocode + ', ';
    }
    return address.town + ', ' + region + address.country?.isocode;
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
