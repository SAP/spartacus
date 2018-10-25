import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

import * as fromCheckoutStore from '../../../../store';
import * as fromRouting from '../../../../../routing/store';
import * as fromUser from '../../../../../user/store';
import * as fromGlobalMessage from '../../../../../global-message/store';
import { CheckoutService } from '../../../../services/checkout.service';
import { GlobalMessageType } from '.././../../../../global-message/models/message.model';

import { SuggestedAddressDialogComponent } from './suggested-addresses-dialog/suggested-addresses-dialog.component';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  @Output()
  addAddress = new EventEmitter<any>();
  @Output()
  backToAddress = new EventEmitter<any>();

  addressVerifySub: Subscription;
  suggestedAddressModalRef: NgbModalRef;

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
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    // Fetching countries
    this.countries$ = this.store.pipe(
      select(fromUser.getAllDeliveryCountries),
      tap(countries => {
        // If the store is empty fetch countries. This is also used when changing language.
        if (Object.keys(countries).length === 0) {
          this.store.dispatch(new fromUser.LoadDeliveryCountries());
        }
      })
    );

    // Fetching titles
    this.titles$ = this.store.pipe(
      select(fromUser.getAllTitles),
      tap(titles => {
        // If the store is empty fetch titles. This is also used when changing language.
        if (Object.keys(titles).length === 0) {
          this.store.dispatch(new fromUser.LoadTitles());
        }
      })
    );

    // Fetching regions
    this.regions$ = this.store.pipe(
      select(fromUser.getAllRegions),
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
      .pipe(
        select(fromCheckoutStore.getAddressVerificationResults),
        filter(results => Object.keys(results).length !== 0)
      )
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

  titleSelected(title) {
    this.address['controls'].titleCode.setValue(title.code);
  }

  countrySelected(country) {
    this.address['controls'].country['controls'].isocode.setValue(
      country.isocode
    );
    this.store.dispatch(new fromUser.LoadRegions(country.isocode));
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

  verifyAddress() {
    this.checkoutService.verifyAddress(this.address.value);
  }

  openSuggestedAddress(results: any) {
    if (!this.suggestedAddressModalRef) {
      this.suggestedAddressModalRef = this.modalService.open(
        SuggestedAddressDialogComponent,
        { centered: true, size: 'lg' }
      );
      this.suggestedAddressModalRef.componentInstance.enteredAddress = this.address.value;
      this.suggestedAddressModalRef.componentInstance.suggestedAddresses =
        results.suggestedAddresses;
      this.suggestedAddressModalRef.result.then(address => {
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
        this.suggestedAddressModalRef = null;
      });
    }
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
