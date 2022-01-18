import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { map, switchMap, take, tap } from 'rxjs/operators';
import {
  ModalRef,
  ModalService,
} from '../../../../shared/components/modal/index';
import { sortTitles } from '../../../../shared/utils/forms/title-utils';
import { SuggestedAddressDialogComponent } from './suggested-addresses-dialog/suggested-addresses-dialog.component';

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

  addressVerifySub: Subscription;
  regionsSub: Subscription;
  suggestedAddressModalRef: ModalRef;

  addressForm: FormGroup = this.fb.group({
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
    defaultAddress: [false],
  });

  constructor(
    protected fb: FormBuilder,
    protected userService: UserService,
    protected userAddressService: UserAddressService,
    protected globalMessageService: GlobalMessageService,
    protected modalService: ModalService,
    protected translation: TranslationService
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
          regionControl.enable();
        } else {
          regionControl.disable();
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
        results.errors.errors.some(
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

  countrySelected(country: Country): void {
    this.addressForm.get('country')?.get('isocode')?.setValue(country.isocode);
    this.selectedCountry$.next(country.isocode);
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
      if (this.addressForm.get('region').value.isocode) {
        this.regionsSub = this.regions$.pipe(take(1)).subscribe((regions) => {
          const obj = regions.find(
            (region) =>
              region.isocode ===
              this.addressForm.controls['region'].value.isocode
          );
          Object.assign(this.addressForm.value.region, {
            isocodeShort: obj.isocodeShort,
          });
        });
      }

      if (this.addressForm.dirty) {
        this.userAddressService
          .verifyAddress(this.addressForm.value)
          .subscribe((result) => {
            this.handleAddressVerificationResults(result);
          });
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
    if (!this.suggestedAddressModalRef) {
      this.suggestedAddressModalRef = this.modalService.open(
        SuggestedAddressDialogComponent,
        { centered: true, size: 'lg' }
      );
      this.suggestedAddressModalRef.componentInstance.enteredAddress =
        this.addressForm.value;
      this.suggestedAddressModalRef.componentInstance.suggestedAddresses =
        results.suggestedAddresses;
      this.suggestedAddressModalRef.result
        .then((address) => {
          if (address) {
            address = Object.assign(
              {
                titleCode: this.addressForm.value.titleCode,
                phone: this.addressForm.value.phone,
                selected: true,
              },
              address
            );
            this.submitAddress.emit(address);
          }
          this.suggestedAddressModalRef = null;
        })
        .catch(() => {
          // this  callback is called when modal is closed with Esc key or clicking backdrop
          const address = Object.assign(
            {
              selected: true,
            },
            this.addressForm.value
          );
          this.submitAddress.emit(address);
          this.suggestedAddressModalRef = null;
        });
    }
  }

  ngOnDestroy() {
    if (this.addressVerifySub) {
      this.addressVerifySub.unsubscribe();
    }

    if (this.regionsSub) {
      this.regionsSub.unsubscribe();
    }
  }
}
