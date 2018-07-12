import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  Input
} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromCheckoutStore from '../../../store';
import * as fromRouting from '../../../../routing/store';
import * as fromUser from '../../../../user/store';

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
  newAddress = false;

  @Input() existingAddresses;
  @Output() addAddress = new EventEmitter<any>();
  @Output() verifyAddress = new EventEmitter<any>();

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
    protected dialog: MatDialog
  ) {}

  ngOnInit() {
    this.countries$ = this.store.select(fromUser.getAllDeliveryCountries).pipe(
      tap(countries => {
        if (Object.keys(countries).length === 0) {
          this.store.dispatch(new fromUser.LoadDeliveryCountries());
        }
      })
    );

    this.titles$ = this.store.select(fromUser.getAllTitles).pipe(
      tap(titles => {
        if (Object.keys(titles).length === 0) {
          this.store.dispatch(new fromUser.LoadTitles());
        }
      })
    );
  }

  toggleDefaultAddress() {
    this.address.value.defaultAddress = !this.address.value.defaultAddress;
  }

  addressSelected(address) {
    this.addAddress.emit({ address: address, newAddress: false });
  }

  addNewAddress() {
    this.newAddress = true;
  }

  next() {
    this.verifyAddress.emit(this.address.value);
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
        this.addAddress.emit({ address: address, newAddress: true });
      }
    });
  }

  back() {
    if (this.newAddress) {
      this.newAddress = false;
    } else {
      this.store.dispatch(
        new fromRouting.Go({
          path: ['/cart']
        })
      );
    }
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
  }
}
