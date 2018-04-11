import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { tap, take, skip } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromCheckoutStore from '../../../store';
import * as fromRouting from '../../../../routing/store';
import { MatDialog } from '@angular/material';
import { SuggestedAddressDialogComponent } from './suggested-addresses-dialog/suggested-addresses-dialog.component';
import { CheckoutService } from '../../../services';
import * as fromStore from '../../../store';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'y-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressFormComponent implements OnInit, OnDestroy {
  countries$: Observable<any>;
  titles$: Observable<any>;
  addressVerificationResults$: Observable<any>;
  addressVerificationResultsSub: Subscription;

  @Output() addAddress = new EventEmitter<any>();

  address: FormGroup = this.fb.group({
    defaultAddress: [false],
    titleCode: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    line1: ['', Validators.required],
    line2: ['', Validators.required],
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
    protected dialog: MatDialog,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit() {
    this.countries$ = this.store
      .select(fromCheckoutStore.getAllDeliveryCountries)
      .pipe(
        tap(countries => {
          if (Object.keys(countries).length === 0) {
            this.store.dispatch(new fromCheckoutStore.LoadDeliveryCountries());
          }
        })
      );

    this.titles$ = this.store.select(fromCheckoutStore.getAllTitles).pipe(
      tap(titles => {
        if (Object.keys(titles).length === 0) {
          this.store.dispatch(new fromCheckoutStore.LoadTitles());
        }
      })
    );
  }

  next() {
    this.address.value.region.isocode =
      this.address.value.region.isocode.indexOf('-') > -1
        ? this.address.value.region.isocode
        : this.address.value.country.isocode +
          '-' +
          this.address.value.region.isocode;

    this.checkoutService.loadAddressVerificationResults(this.address.value);

    this.addressVerificationResults$ = this.store.select(
      fromStore.getAddressVerificationResultsEntities
    );

    this.addressVerificationResultsSub = this.addressVerificationResults$
      .pipe(
        take(2),
        skip(1),
        tap(results => {
          console.log(results);
          if (results && Object.keys(results).length !== 0) {
            if (results && results.decision === 'ACCEPT') {
              this.addAddress.emit(this.address.value);
            } else if (results && results.decision === 'REJECT') {
              console.log('Invalid Address');
            } else if (results && results.decision === 'REVIEW') {
              const dialogRef = this.dialog.open(
                SuggestedAddressDialogComponent,
                {
                  data: {
                    address: this.address.value,
                    addressVerificationResults$: this
                      .addressVerificationResults$
                  }
                }
              );

              const sub = dialogRef.componentInstance.onSelectedAddress.subscribe(
                address => {
                  if (address.selected) {
                    this.addAddress.emit(address);
                  }
                }
              );

              dialogRef.afterClosed().subscribe(() => {
                this.addressVerificationResultsSub.unsubscribe();
                sub.unsubscribe();
              });
            }
          }
        })
      )
      .subscribe();
  }

  back() {
    this.store.dispatch(
      new fromRouting.Go({
        path: ['/cart']
      })
    );
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
    if (this.addressVerificationResultsSub) {
      this.addressVerificationResultsSub.unsubscribe();
    }

    this.store.dispatch(new fromStore.ClearAddressVerificationResults());
  }
}
