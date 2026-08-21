/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import {
  Address,
  AddressValidation,
  City,
  CityDistrict,
  Country,
  ErrorModel,
  FeatureDirective,
  FeatureToggles,
  GlobalMessageService,
  GlobalMessageType,
  HierarchicalAddressConfig,
  LanguageService,
  Region,
  Title,
  TranslatePipe,
  TranslationService,
  UserAddressService,
} from '@spartacus/core';
import {
  FocusConfig,
  FocusDirective,
  FocusFirstInvalidFieldDirective,
  FormErrorsComponent,
  FormRequiredAsterisksComponent,
  FormRequiredLegendComponent,
  LAUNCH_CALLER,
  LaunchDialogService,
  NgSelectA11yDirective,
  sortTitles,
} from '@spartacus/storefront';
// eslint-disable-next-line @nx/workspace-no-self-public-api-import -- ESLint is misfiring here: core and root are not the same library — they're separate entry points
import { UserProfileFacade } from '@spartacus/user/profile/root';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  of,
  Subscription,
} from 'rxjs';
import {
  filter,
  map,
  shareReplay,
  skip,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'cx-address-form',
  templateUrl: './address-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormRequiredLegendComponent,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgTemplateOutlet,
    FormRequiredAsterisksComponent,
    NgSelectComponent,
    NgSelectA11yDirective,
    FormErrorsComponent,
    AsyncPipe,
    FeatureDirective,
    FocusDirective,
    FocusFirstInvalidFieldDirective,
    TranslatePipe,
  ],
})
export class AddressFormComponent implements OnInit, OnDestroy {
  protected languageService = inject(LanguageService);
  protected cdr = inject(ChangeDetectorRef);
  private featureToggles = inject(FeatureToggles);
  protected hierarchicalAddressConfig = inject(HierarchicalAddressConfig);
  protected elementRef = inject(ElementRef);

  countries$: Observable<Country[]>;
  titles$: Observable<Title[]>;
  regions$: Observable<Region[]>;
  selectedCountry$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  selectedRegion$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  selectedCity$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  isHierarchicalAddressFormat = false;
  cities: City[] = [];
  districts: CityDistrict[] = [];
  addresses$: Observable<Address[]>;

  /**
   * Drives the `cxFocus` autofocus host. Autofocus starts disabled and is
   * enabled (with a `refreshFocus` token to re-trigger the directive) only once
   * the country data has loaded, so focus lands on the country select rather
   * than whichever field wins the async render race.
   */
  focusConfig: FocusConfig = { autofocus: false };

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

  @Input()
  countries: Observable<Country[]>;

  @Output()
  submitAddress = new EventEmitter<any>();

  @Output()
  backToAddress = new EventEmitter<any>();

  @ViewChild('submit') element: ElementRef;

  @ViewChild(FocusFirstInvalidFieldDirective)
  protected firstInvalidFieldFocus?: FocusFirstInvalidFieldDirective;

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
    district: [null],
    postalCode: ['', Validators.required],
    phone: '',
    cellphone: '',
    defaultAddress: [false],
  });

  constructor(
    protected fb: UntypedFormBuilder,
    protected userAddressService: UserAddressService,
    protected globalMessageService: GlobalMessageService,
    protected translation: TranslationService,
    protected launchDialogService: LaunchDialogService,
    protected userProfileFacade: UserProfileFacade
  ) {}

  ngOnInit() {
    // Fetching countries if no data stream was provided.
    // `shareReplay` so the template's async pipe and the autofocus subscription
    // below share a single execution (no duplicate `loadDeliveryCountries()`).
    this.countries$ = (
      this.countries ||
      this.userAddressService.getDeliveryCountries().pipe(
        tap((countries: Country[]) => {
          if (Object.keys(countries).length === 0) {
            this.userAddressService.loadDeliveryCountries();
          }
        })
      )
    ).pipe(shareReplay({ bufferSize: 1, refCount: true }));

    // Initial focus (form load): enable autofocus only once the country data
    // has loaded, so the `cxFocus` host focuses the country select instead of
    // whichever field wins the async render race between `countries$` and
    // `titles$`. This is intentionally data-driven rather than DOM-driven; the
    // post-submit counterpart, `focusFirstInvalidField()`, has to query the DOM
    // instead because it needs the *specific* invalid field, not just the first.
    if (this.featureToggles.a11yAddressFormInitialFocus) {
      this.subscription.add(
        this.countries$
          .pipe(
            filter((countries) => !!countries?.length),
            take(1)
          )
          .subscribe(() => {
            // The `countries$` emission and the change detection that renders
            // the country select happen in the same tick; defer to a macrotask
            // so the select exists in the DOM before `refreshFocus` re-triggers
            // the directive's focus logic and picks the first focusable field.
            setTimeout(() => {
              // Don't steal focus if the user has already engaged with the
              // form — this matters when country data loads slowly or a custom
              // template renders a different (non-country) first field, where
              // the deferred refresh would otherwise yank focus back to the top.
              const active = document.activeElement;
              const host = this.elementRef.nativeElement as HTMLElement;
              if (active && active !== document.body && host.contains(active)) {
                return;
              }
              this.focusConfig = { autofocus: true, refreshFocus: {} };
              this.cdr.markForCheck();
            });
          })
      );
    }

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
      if (this.featureToggles.enableHierarchicalAddressFormat) {
        this.countrySelected(this.addressData.country);
        this.addressForm.patchValue(this.addressData);
      } else {
        this.addressForm.patchValue(this.addressData);
        this.countrySelected(this.addressData.country);
      }

      if (this.addressData.region) {
        this.regionSelected(this.addressData.region);
      }
    }

    this.addresses$ = this.userAddressService.getAddresses();

    if (this.featureToggles.enableHierarchicalAddressFormat) {
      this.initCitiesSubscription();
      this.initDistrictsSubscription();
      this.initLanguageSubscription();
    }
  }

  protected initCitiesSubscription(): void {
    this.subscription.add(
      this.selectedRegion$
        .pipe(
          switchMap((regionIsocode) => {
            if (!this.isHierarchicalAddressFormat || !regionIsocode) {
              return of([]);
            }
            return this.userAddressService.getCities(regionIsocode);
          })
        )
        .subscribe((cities) => {
          this.cities = cities;
          const townControl = this.addressForm.get('town');
          if (this.isHierarchicalAddressFormat && !this.selectedRegion$.value) {
            townControl?.disable();
          } else {
            townControl?.enable();
          }
          if (
            this.addressData?.city?.isocode &&
            !this.selectedCity$.value &&
            this.selectedRegion$.value === this.addressData.region?.isocode
          ) {
            this.selectedCity$.next(this.addressData.city.isocode);
            this.addressForm
              .get('town')
              ?.setValue(this.addressData.city.isocode);
          }
          this.cdr.markForCheck();
        })
    );
  }

  protected initDistrictsSubscription(): void {
    this.subscription.add(
      this.selectedCity$
        .pipe(
          switchMap((cityIsocode) => {
            if (!this.isHierarchicalAddressFormat) {
              return of([]);
            }
            return this.userAddressService.getDistricts(cityIsocode);
          })
        )
        .subscribe((districts) => {
          this.districts = districts;
          if (
            this.addressData?.cityDistrict?.isocode &&
            this.selectedCity$.value === this.addressData.city?.isocode
          ) {
            this.addressForm
              .get('district')
              ?.setValue(this.addressData.cityDistrict.isocode);
          }
          this.cdr.markForCheck();
        })
    );
  }

  protected initLanguageSubscription(): void {
    this.subscription.add(
      this.languageService
        .getActive()
        .pipe(skip(1))
        .subscribe(() => {
          if (this.isHierarchicalAddressFormat) {
            this.userAddressService.clearRegions();
            if (this.selectedRegion$.value) {
              this.userAddressService.clearCities();
            }
            if (this.selectedCity$.value) {
              this.userAddressService.clearDistricts();
            }
          }
        })
    );
  }

  getTitles(): Observable<Title[]> {
    return combineLatest([
      this.translation.translate('addressForm.defaultTitle'),
      this.userProfileFacade.getTitles(),
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

    if (!this.featureToggles.enableHierarchicalAddressFormat) {
      return;
    }

    this.isHierarchicalAddressFormat = (
      this.hierarchicalAddressConfig.hierarchicalAddress
        ?.countriesUsingHierarchicalAddressFormat ?? []
    ).includes(country?.isocode ?? '');

    const cellphoneControl = this.addressForm.get('cellphone');
    const districtControl = this.addressForm.get('district');
    const townControl = this.addressForm.get('town');

    this.addressForm.get('region')?.get('isocode')?.reset();
    townControl?.reset();
    districtControl?.reset();
    this.selectedRegion$.next('');
    this.selectedCity$.next('');

    if (this.isHierarchicalAddressFormat) {
      cellphoneControl?.setValidators([Validators.required]);
      districtControl?.setValidators([Validators.required]);
    } else {
      cellphoneControl?.clearValidators();
      districtControl?.clearValidators();
      townControl?.enable();
      districtControl?.enable();
    }
    cellphoneControl?.updateValueAndValidity();
    districtControl?.updateValueAndValidity();
  }

  regionSelected(region: Region): void {
    this.addressForm.get('region')?.get('isocode')?.setValue(region.isocode);
    if (
      this.featureToggles.enableHierarchicalAddressFormat &&
      this.isHierarchicalAddressFormat
    ) {
      this.selectedRegion$.next(region.isocode ?? '');
      this.addressForm.get('town')?.reset();
      this.selectedCity$.next('');
      this.addressForm.get('district')?.reset();
    }
  }

  citySelected(city: City | undefined): void {
    if (city?.isocode) {
      this.selectedCity$.next(city.isocode);
      this.addressForm.get('district')?.reset();
    }
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
        if (
          this.featureToggles.enableHierarchicalAddressFormat &&
          this.isHierarchicalAddressFormat
        ) {
          this.submitAddress.emit(this.addressForm.value);
        } else {
          this.subscription.add(
            this.userAddressService
              .verifyAddress(this.addressForm.value)
              .subscribe((value) => {
                this.handleAddressVerificationResults(value);
              })
          );
        }
      } else {
        // address form value not changed
        // ignore duplicate address
        this.submitAddress.emit(undefined);
      }
    } else {
      this.addressForm.markAllAsTouched();
      this.globalMessageService.add(
        { key: 'formErrors.globalMessage' },
        GlobalMessageType.MSG_TYPE_ASSISTIVE
      );
      if (this.featureToggles.a11yAddressFormInitialFocus) {
        this.firstInvalidFieldFocus?.focusFirstInvalidField();
      }
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
