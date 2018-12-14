import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CheckoutService } from '../../../../facade/checkout.service';
import {
  GlobalMessageService,
  GlobalMessageType,
  UserService
} from '@spartacus/core';

import { SuggestedAddressDialogComponent } from './suggested-addresses-dialog/suggested-addresses-dialog.component';
import { Address } from '@spartacus/core';

@Component({
  selector: 'cx-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressFormComponent implements OnInit, OnDestroy {
  countries$: Observable<any>;
  titles$: Observable<any>;
  regions$: Observable<any>;

  @Input()
  addressData: Address;

  @Input()
  actionBtnLabel: string;

  @Input()
  cancelBtnLabel: string;

  @Input()
  setAsDefaultField: boolean;

  @Output()
  addAddress = new EventEmitter<any>();

  @Output()
  backToAddress = new EventEmitter<any>();

  addressVerifySub: Subscription;
  suggestedAddressModalRef: NgbModalRef;

  address: FormGroup = this.fb.group({
    defaultAddress: [false],
    titleCode: [null, Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    line1: ['', Validators.required],
    line2: [''],
    town: ['', Validators.required],
    region: this.fb.group({
      isocode: [null, Validators.required]
    }),
    country: this.fb.group({
      isocode: [null, Validators.required]
    }),
    postalCode: ['', Validators.required],
    phone: ''
  });

  constructor(
    private fb: FormBuilder,
    protected checkoutService: CheckoutService,
    protected userService: UserService,
    protected globalMessageService: GlobalMessageService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    // Fetching countries
    this.countries$ = this.userService.getDeliveryCountries().pipe(
      tap(countries => {
        if (Object.keys(countries).length === 0) {
          this.userService.loadDeliveryCountries();
        }
      })
    );

    // Fetching titles
    this.titles$ = this.userService.getTitles().pipe(
      tap(titles => {
        if (Object.keys(titles).length === 0) {
          this.userService.loadTitles();
        }
      })
    );

    // Fetching regions
    this.regions$ = this.userService.getRegions().pipe(
      tap(regions => {
        const regionControl = this.address.get('region.isocode');

        if (Object.keys(regions).length === 0) {
          regionControl.disable();
          const countryIsoCode = this.address.get('country.isocode').value;
          if (countryIsoCode) {
            this.userService.loadRegions(countryIsoCode);
          }
        } else {
          regionControl.enable();
        }
      })
    );

    // verify the new added address
    this.addressVerifySub = this.checkoutService.addressVerificationResults$.subscribe(
      (results: any) => {
        if (results === 'FAIL') {
          this.checkoutService.clearAddressVerificationResults();
        } else if (results.decision === 'ACCEPT') {
          this.addAddress.emit(this.address.value);
        } else if (results.decision === 'REJECT') {
          this.globalMessageService.add({
            type: GlobalMessageType.MSG_TYPE_ERROR,
            text: 'Invalid Address'
          });
          this.checkoutService.clearAddressVerificationResults();
        } else if (results.decision === 'REVIEW') {
          this.openSuggestedAddress(results);
        }
      }
    );

    if (this.addressData) {
      this.address.patchValue(this.addressData);

      this.countrySelected(this.addressData.country);
      if (this.addressData.region) {
        this.regionSelected(this.addressData.region);
      }
    }
  }

  titleSelected(title) {
    this.address['controls'].titleCode.setValue(title.code);
  }

  countrySelected(country) {
    this.address['controls'].country['controls'].isocode.setValue(
      country.isocode
    );
    this.userService.loadRegions(country.isocode);
  }

  regionSelected(region) {
    this.address['controls'].region['controls'].isocode.setValue(
      region.isocode
    );
  }

  toggleDefaultAddress() {
    this.address['controls'].defaultAddress.setValue(
      this.address.value.defaultAddress
    );
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
      this.suggestedAddressModalRef.result
        .then(address => {
          this.checkoutService.clearAddressVerificationResults();
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
        })
        .catch(() => {
          // this  callback is called when modal is closed with Esc key or clicking backdrop
          this.checkoutService.clearAddressVerificationResults();
          const address = Object.assign(
            {
              selected: true
            },
            this.address.value
          );
          this.addAddress.emit(address);
          this.suggestedAddressModalRef = null;
        });
    }
  }

  ngOnDestroy() {
    this.checkoutService.clearAddressVerificationResults();

    if (this.addressVerifySub) {
      this.addressVerifySub.unsubscribe();
    }
  }
}
