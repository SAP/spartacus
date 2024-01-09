/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  Address,
  AddressValidation,
  Country,
  ErrorModel,
  GlobalMessageService,
  GlobalMessageType,
  Region,
  Title,
  TranslationService,
  UserAddressService,
  UserService,
} from '@spartacus/core';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { LAUNCH_CALLER, LaunchDialogService } from '../../../../layout';
import { sortTitles } from '../../../../shared/utils/forms/title-utils';

@Component({
  selector: 'cx-address-form',
  templateUrl: './address-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressFormComponent implements OnInit, OnDestroy {
  countries$: Observable<Country[]>;
  titles$: Observable<Title[]>;
  regions$: Observable<Region[]>;
  selectedCountry$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  addresses$: Observable<Address[]>;

  @Input()
  addressData: Address;

  @Input()
  actionBtnLabel: string;

  @Input()
  cancelBtnLabel: string;

  @Input()
  setAsDefaultField = true;

  @Input()
  showTitleCode: boolean;

  @Input()
  showCancelBtn = true;

  @Output()
  submitAddress = new EventEmitter<any>();

  @Output()
  backToAddress = new EventEmitter<any>();

  @ViewChild('submit') element: ElementRef;

  subscription: Subscription = new Subscription();

  addressForm: UntypedFormGroup = this.fb.group({
    country: this.fb.group({
      isocode: [null, Validators.required],
    }),
    titleCode: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    line1: ['', Validators.required],
    line2: [''],
    town: ['', Validators.required],
    region: this.fb.group({
      isocode: [null, Validators.required],
    }),
    postalCode: ['', Validators.required],
    phone: '',
    cellphone: '',
    defaultAddress: [false],
  });

  constructor(
    protected fb: UntypedFormBuilder,
    protected userService: UserService,
    protected userAddressService: UserAddressService,
    protected globalMessageService: GlobalMessageService,
    protected translation: TranslationService,
    protected launchDialogService: LaunchDialogService
  ) {}

  ngOnInit() {
    // Fetching countries
    this.countries$ = this.userAddressService.getDeliveryCountries().pipe(
      tap((countries: Country[]) => {
        if (Object.keys(countries).length === 0) {
          this.userAddressService.loadDeliveryCountries();
        }
      })
    );

    // Fetching titles
    this.titles$ = this.getTitles();

    // Fetching regions
    this.regions$ = this.selectedCountry$.pipe(
      switchMap((country) => this.userAddressService.getRegions(country)),
      tap((regions: Region[]) => {
        const regionControl = this.addressForm.get('region.isocode');
        if (regions && regions.length > 0) {
          regionControl?.enable();
        } else {
          regionControl?.disable();
        }
      })
    );

    if (this.addressData && Object.keys(this.addressData).length !== 0) {
      this.addressForm.patchValue(this.addressData);

      this.countrySelected(this.addressData.country);
      if (this.addressData.region) {
        this.regionSelected(this.addressData.region);
      }
    }

    this.addresses$ = this.userAddressService.getAddresses();
  }

  getTitles(): Observable<Title[]> {
    return combineLatest([
      this.translation.translate('addressForm.defaultTitle'),
      this.userService.getTitles(),
    ]).pipe(
      map(([noneTitleText, titles]) => {
        const noneTitle = { code: '', name: noneTitleText };
        titles.sort(sortTitles);
        return [noneTitle, ...titles];
      })
    );
  }

  protected handleAddressVerificationResults(results: AddressValidation) {
    if (results.decision === 'ACCEPT') {
      this.submitAddress.emit(this.addressForm.value);
    } else if (results.decision === 'REJECT') {
      // TODO: Workaround: allow server for decide is titleCode mandatory (if yes, provide personalized message)
      if (
        results.errors?.errors.some(
          (error: ErrorModel) => error.subject === 'titleCode'
        )
      ) {
        this.globalMessageService.add(
          { key: 'addressForm.titleRequired' },
          GlobalMessageType.MSG_TYPE_ERROR
        );
      } else {
        this.globalMessageService.add(
          { key: 'addressForm.invalidAddress' },
          GlobalMessageType.MSG_TYPE_ERROR
        );
      }
    } else if (results.decision === 'REVIEW') {
      this.openSuggestedAddress(results);
    }
  }

  countrySelected(country: Country | undefined): void {
    this.addressForm.get('country')?.get('isocode')?.setValue(country?.isocode);
    this.selectedCountry$.next(country?.isocode ?? '');
  }

  regionSelected(region: Region): void {
    this.addressForm.get('region')?.get('isocode')?.setValue(region.isocode);
  }

  toggleDefaultAddress(): void {
    this.addressForm['controls'].defaultAddress.setValue(
      this.addressForm.value.defaultAddress
    );
  }

  back(): void {
    this.backToAddress.emit();
  }

  verifyAddress(): void {
    if (this.addressForm.valid) {
      const regionControl = this.addressForm.get('region');
      const isocode = regionControl?.value?.isocode;

      if (isocode) {
        this.regions$.pipe(take(1)).subscribe((regions: Region[]) => {
          if (regions.length) {
            const selectedRegion = regions.find(
              (region: Region) => region.isocode === isocode
            );
            regionControl?.patchValue({
              isocodeShort: selectedRegion?.isocodeShort,
            });
          } else {
            regionControl?.reset();
          }
        });
      }

      if (this.addressForm.dirty) {
        this.subscription.add(
          this.userAddressService
            .verifyAddress(this.addressForm.value)
            .subscribe((value) => {
              this.handleAddressVerificationResults(value);
            })
        );
      } else {
        // address form value not changed
        // ignore duplicate address
        this.submitAddress.emit(undefined);
      }
    } else {
      this.addressForm.markAllAsTouched();
    }
  }

  openSuggestedAddress(results: AddressValidation): void {
    this.launchDialogService.openDialogAndSubscribe(
      LAUNCH_CALLER.SUGGESTED_ADDRESSES,
      this.element,
      {
        enteredAddress: this.addressForm.value,
        suggestedAddresses: results.suggestedAddresses,
      }
    );
    this.subscription.add(
      this.launchDialogService.dialogClose
        .pipe(filter((result) => Boolean(result)))
        .subscribe((result) => {
          if (typeof result === 'object') {
            const address = {
              ...result,
              titleCode: this.addressForm.value.titleCode,
              phone: this.addressForm.value.phone,
              selected: true,
            };
            this.submitAddress.emit(address);
          }
        })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
