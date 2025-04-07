/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  ElementRef,
  inject,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FeatureConfigService, Product } from '@spartacus/core';

import {
  AugmentedPointOfService,
  getProperty,
  IntendedPickupLocationFacade,
  PickupLocationsSearchFacade,
  PickupOption,
  PickupOptionFacade,
  PreferredStoreFacade,
  RequiredDeepPath,
} from '@spartacus/pickup-in-store/root';
import {
  CurrentProductService,
  LAUNCH_CALLER,
  LaunchDialogService,
} from '@spartacus/storefront';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import {
  concatMap,
  filter,
  map,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';

/** Custom type guard to ensure we have a product a defined code */
function isProductWithCode(
  product: Product | null
): product is RequiredDeepPath<Product, 'code'> {
  return !!product?.code;
}

/**
 * A container component of the pair of the pickup options radio buttons for cart entry.
 */
@Component({
  selector: 'cx-cart-pickup-options-container',
  templateUrl: 'pdp-pickup-options-container.component.html',
  standalone: false,
})
export class PdpPickupOptionsContainerComponent implements OnInit, OnDestroy {
  // TODO: Remove element reference once 'a11yDialogTriggerRefocus' feature flag is removed.
  /**
   * @deprecated since 2211.28.0
   * This reference does not point to any element and will be removed at earliest convinience.
   * The 'triggerElement' is passed through 'PickupOptionChange' event instead.
   */
  @ViewChild('open') element: ElementRef;
  @Output() intendedPickupChange = new EventEmitter<
    AugmentedPointOfService | undefined
  >();
  subscription = new Subscription();

  availableForPickup = false;
  displayPickupLocation$: Observable<string | undefined>;
  pickupOption$: Observable<PickupOption>;
  intendedPickupLocation$: Observable<AugmentedPointOfService | undefined>;
  private productCode: string;
  private displayNameIsSet = false;

  private featureConfigService = inject(FeatureConfigService);
  constructor(
    protected currentProductService: CurrentProductService,
    protected intendedPickupLocationService: IntendedPickupLocationFacade,
    protected launchDialogService: LaunchDialogService,
    protected pickupOptionFacade: PickupOptionFacade,
    protected preferredStoreFacade: PreferredStoreFacade,
    protected pickupLocationsSearchService: PickupLocationsSearchFacade,
    protected vcr: ViewContainerRef
  ) {
    // Intentional empty constructor
  }

  ngOnInit() {
    this.pickupOptionFacade.setPageContext('PDP');
    const productCode$ = this.currentProductService.getProduct().pipe(
      filter(isProductWithCode),
      map((product) => {
        this.productCode = product.code;
        this.availableForPickup = !!product.availableForPickup;
        return this.productCode;
      }),
      tap(
        (productCode) =>
          (this.pickupOption$ =
            this.intendedPickupLocationService.getPickupOption(productCode))
      )
    );

    this.displayPickupLocation$ = this.currentProductService.getProduct().pipe(
      filter(isProductWithCode),
      map((product) => product.code),
      switchMap((productCode) =>
        this.intendedPickupLocationService
          .getIntendedLocation(productCode)
          .pipe(map((intendedLocation) => ({ intendedLocation, productCode })))
      ),
      switchMap(({ intendedLocation, productCode }) => {
        if (intendedLocation?.displayName) {
          this.displayNameIsSet = true;
          return of(getProperty(intendedLocation, 'displayName'));
        }

        this.setIntendedPickupLocation(productCode);
        return of(undefined);
      })
    );

    this.intendedPickupLocation$ = this.currentProductService.getProduct().pipe(
      filter(isProductWithCode),
      map((product) => product.code),
      switchMap((productCode) =>
        this.intendedPickupLocationService.getIntendedLocation(productCode)
      )
    );

    this.subscription.add(
      this.intendedPickupLocation$.subscribe(this.intendedPickupChange)
    );

    this.subscription.add(
      combineLatest([
        productCode$,
        this.launchDialogService.dialogClose.pipe(
          filter((reason) => reason !== undefined),
          startWith(undefined)
        ),
      ])
        .pipe(
          switchMap(([productCode]) =>
            this.intendedPickupLocationService.getIntendedLocation(productCode)
          )
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setIntendedPickupLocation(productCode: string) {
    this.subscription.add(
      this.preferredStoreFacade
        .getPreferredStoreWithProductInStock(productCode)
        .pipe(
          map(({ name }) => name),
          tap((storeName) =>
            this.pickupLocationsSearchService.loadStoreDetails(storeName)
          ),
          concatMap((storeName: string) =>
            this.pickupLocationsSearchService.getStoreDetails(storeName)
          ),
          filter((storeDetails) => !!storeDetails)
        )
        .subscribe((storeDetails) => {
          this.intendedPickupLocationService.setIntendedLocation(productCode, {
            ...storeDetails,
            pickupOption: 'delivery',
          });
        })
    );
  }

  // TODO: Make argument required once 'a11yDialogTriggerRefocus' feature flag is removed.
  /**
   * @deprecated since 2211.28.0 - The use of TriggerElement param will become mandatory.
   * @param triggerElement - The reference of element that triggered the dialog. Used to refocus on it after the dialog is closed.
   */
  openDialog(triggerElement?: ElementRef): void {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.PICKUP_IN_STORE,
      this.featureConfigService.isEnabled('a11yDialogTriggerRefocus')
        ? triggerElement
        : this.element,
      this.vcr,
      { productCode: this.productCode }
    );

    if (dialog) {
      dialog.pipe(take(1)).subscribe();
    }
  }

  // TODO: Remove 'PickupOption' argument type once 'a11yDialogTriggerRefocus' feature flag is removed.
  /**
   * @deprecated since 2211.28.0 - Use event param instead of option.
   * @param event - Object containing the selected option and the element that triggered the change.
   */
  onPickupOptionChange(option: PickupOption): void;
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  onPickupOptionChange(event: {
    option: PickupOption;
    triggerElement: ElementRef;
  }): void;
  onPickupOptionChange(
    event: { option: PickupOption; triggerElement: ElementRef } | PickupOption
  ): void {
    const handleChange = (
      option: PickupOption,
      triggerElement?: ElementRef
    ) => {
      if (!this.featureConfigService.isEnabled('a11yPickupOptionsTabs')) {
        if (option === 'delivery') {
          return;
        }
        if (!this.displayNameIsSet) {
          this.openDialog(triggerElement);
        }
      }
    };
    if (
      this.featureConfigService.isEnabled('a11yDialogTriggerRefocus') &&
      typeof event === 'object'
    ) {
      const { option, triggerElement = undefined } = event;
      this.intendedPickupLocationService.setPickupOption(
        this.productCode,
        option
      );
      handleChange(option, triggerElement);
    } else if (typeof event === 'string') {
      this.intendedPickupLocationService.setPickupOption(
        this.productCode,
        event
      );
      handleChange(event);
    }
  }
}
