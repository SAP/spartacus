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
import { tap, take, filter } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromCheckoutStore from '../../../store';
import * as fromRouting from '../../../../routing/store';
import { MatDialog } from '@angular/material';
import { SuggestedAddressDialogComponent } from './suggested-addresses-dialog/suggested-addresses-dialog.component';
import { CheckoutService } from '../../../services';
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
  // addressVerificationResults$: Observable<any>;
  subscription: Subscription;

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
    this.checkoutService.verifyAddress(this.address.value);

    this.subscription = this.store
      .select(fromCheckoutStore.getAddressVerificationResults)
      .pipe(filter(results => Object.keys(results).length !== 0), take(1))
      .subscribe(results => {
        if (results.decision === 'ACCEPT') {
          this.addAddress.emit(this.address.value);
        } else if (results.decision === 'REJECT') {
          // will be shown in global message
          console.log('Invalid Address');
          this.store.dispatch(
            new fromCheckoutStore.ClearAddressVerificationResults()
          );
        } else if (results.decision === 'REVIEW') {
          this.openSuggestedAddress(results);
        }
      });
  }

  private openSuggestedAddress(results: any) {
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
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.store.dispatch(
      new fromCheckoutStore.ClearAddressVerificationResults()
    );
  }
}
