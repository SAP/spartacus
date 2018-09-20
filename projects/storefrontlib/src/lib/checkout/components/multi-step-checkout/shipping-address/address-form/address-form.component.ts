import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

import * as fromCheckoutStore from '../../../../store';
import * as fromRouting from '../../../../../routing/store';
import * as fromUser from '../../../../../user/store';
import * as fromGlobalMessage from '../../../../../global-message/store';
import { CheckoutService } from '../../../../services/checkout.service';
import { GlobalMessageType } from '.././../../../../global-message/models/message.model';

import { MatDialog } from '@angular/material';
import { SuggestedAddressDialogComponent } from './suggested-addresses-dialog/suggested-addresses-dialog.component';

@Component({
  selector: 'y-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressFormComponent implements OnInit, OnDestroy {
  countries$: Observable<any>;
  titles$: Observable<any>;
  regions$: Observable<any>;

  @Output() addAddress = new EventEmitter<any>();
  @Output() backToAddress = new EventEmitter<any>();

  addressVerifySub: Subscription;

  address: FormGroup = this.fb.group({
    defaultAddress: [false],
    titleCode: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    line1: ['', Validators.required],
    line2: [''],
    town: ['', Validators.required],
    region: this.fb.group({
      isocode: ['', Validators.required]
    }),
    country: this.fb.group({
      isocode: ['', Validators.required]
    }),
    postalCode: ['', Validators.required],
    phone: ''
  });

  constructor(
    protected store: Store<fromRouting.State>,
    private fb: FormBuilder,
    protected checkoutService: CheckoutService,
    protected dialog: MatDialog
  ) {}

  ngOnInit() {
    // Fetching countries
    this.countries$ = this.store.select(fromUser.getAllDeliveryCountries).pipe(
      tap(countries => {
        // If the store is empty fetch countries. This is also used when changing language.
        if (Object.keys(countries).length === 0) {
          this.store.dispatch(new fromUser.LoadDeliveryCountries());
        }
      })
    );

    // Fetching titles
    this.titles$ = this.store.select(fromUser.getAllTitles).pipe(
      tap(titles => {
        // If the store is empty fetch titles. This is also used when changing language.
        if (Object.keys(titles).length === 0) {
          this.store.dispatch(new fromUser.LoadTitles());
        }
      })
    );

    // Fetching regions
    this.regions$ = this.store.select(fromUser.getAllRegions).pipe(
      tap(regions => {
        const regionControl = this.address.get('region.isocode');

        // If the store is empty fetch regions. This is also used when changing language.
        if (Object.keys(regions).length === 0) {
          regionControl.disable();
          const countryIsoCode = this.address.get('country.isocode').value;
          if (countryIsoCode) {
            this.store.dispatch(new fromUser.LoadRegions(countryIsoCode));
          }
        } else {
          regionControl.enable();
        }
      })
    );

    // verify the new added address
    this.addressVerifySub = this.store
      .select(fromCheckoutStore.getAddressVerificationResults)
      .pipe(filter(results => Object.keys(results).length !== 0))
      .subscribe((results: any) => {
        if (results === 'FAIL') {
          this.store.dispatch(
            new fromCheckoutStore.ClearAddressVerificationResults()
          );
        } else if (results.decision === 'ACCEPT') {
          this.addAddress.emit(this.address.value);
        } else if (results.decision === 'REJECT') {
          this.store.dispatch(
            new fromGlobalMessage.AddMessage({
              type: GlobalMessageType.MSG_TYPE_ERROR,
              text: 'Invalid Address'
            })
          );
          this.store.dispatch(
            new fromCheckoutStore.ClearAddressVerificationResults()
          );
        } else if (results.decision === 'REVIEW') {
          this.openSuggestedAddress(results);
        }
      });
  }

  onCountryChange(countryIsoCode): void {
    this.store.dispatch(new fromUser.LoadRegions(countryIsoCode));
  }

  titleSelected(title) {
    this.address['controls'].titleCode.setValue(title.code);
  }

  countrySelected(country) {
    this.address['controls'].country['controls'].isocode.setValue(
      country.isocode
    );
  }

  regionSelected(region) {
    this.address['controls'].region['controls'].isocode.setValue(
      region.isocode
    );
  }

  toggleDefaultAddress() {
    this.address.value.defaultAddress = !this.address.value.defaultAddress;
  }

  back() {
    this.backToAddress.emit();
  }

  verfiyAddress() {
    this.checkoutService.verifyAddress(this.address.value);
  }

  openSuggestedAddress(results: any) {
    const dialogRef = this.dialog.open(SuggestedAddressDialogComponent, {
      data: {
        entered: this.address.value,
        suggested: results.suggestedAddresses
      }
    });

    dialogRef.afterClosed().subscribe(address => {
      this.store.dispatch(
        new fromCheckoutStore.ClearAddressVerificationResults()
      );
      if (address) {
        address = Object.assign(
          {
            titleCode: this.address.value.titleCode,
            phone: this.address.value.phone,
            selected: true
          },
          address
        );
        this.addAddress.emit(address);
      }
    });
  }

  required(name: string) {
    return (
      this.address.get(`${name}`).hasError('required') &&
      this.address.get(`${name}`).touched
    );
  }

  notSelected(name: string) {
    return (
      this.address.get(`${name}`).dirty && !this.address.get(`${name}`).value
    );
  }

  ngOnDestroy() {
    this.store.dispatch(
      new fromCheckoutStore.ClearAddressVerificationResults()
    );

    if (this.addressVerifySub) {
      this.addressVerifySub.unsubscribe();
    }
  }
}
