/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { AddToCartComponent } from '@spartacus/cart/base/components/add-to-cart';
import {
  Cart,
  CartOutlets,
  CartType,
  DeleteCartSuccessEvent as DeleteSavedCartSuccessEvent,
  PromotionLocation,
  OrderEntry,
  OrderEntryGroup,
  ActiveCartFacade,
} from '@spartacus/cart/base/root';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import {
  HierarchyComponentService,
  HierarchyModule,
  HierarchyNode,
} from '@spartacus/storefront';
import {
  EventService,
  FeaturesConfigModule,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  TranslatePipe,
  TranslationService,
  FeatureConfigService,
} from '@spartacus/core';
import { OutletDirective, SpinnerComponent } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, take, tap, filter, pluck } from 'rxjs/operators';
import { SavedCartDetailsService } from '../saved-cart-details.service';

@Component({
  selector: 'cx-saved-cart-details-items',
  templateUrl: './saved-cart-details-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgFor,
    NgClass,
    OutletDirective,
    AddToCartComponent,
    SpinnerComponent,
    AsyncPipe,
    TranslatePipe,
    HierarchyModule,
    FeaturesConfigModule,
  ],
})
export class SavedCartDetailsItemsComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  readonly CartOutlets = CartOutlets;
  readonly CartType = CartType;
  CartLocation = PromotionLocation;

  buyItAgainTranslation$: Observable<string>;

  cartLoaded$: Observable<boolean> = this.savedCartDetailsService
    .getSavedCartId()
    .pipe(switchMap((cartId) => this.savedCartService.isStable(cartId)));

  savedCart$: Observable<Cart | undefined> = this.savedCartDetailsService
    .getCartDetails()
    .pipe(
      tap((cart) => {
        if ((cart?.entries ?? []).length <= 0 && !!cart?.code) {
          this.savedCartService.deleteSavedCart(cart.code);
        }
      })
    );
  entries$: Observable<OrderEntry[]>;
  bundles$: Observable<HierarchyNode[]>;
  entryGroups$: Observable<OrderEntryGroup[]>;
  private featureConfig = inject(FeatureConfigService);

  constructor(
    protected savedCartDetailsService: SavedCartDetailsService,
    protected savedCartService: SavedCartFacade,
    protected eventSercvice: EventService,
    protected globalMessageService: GlobalMessageService,
    protected routingService: RoutingService,
    protected translation: TranslationService,
    protected hierarchyService: HierarchyComponentService,
    protected activeCartService: ActiveCartFacade
  ) {}

  ngOnInit(): void {
    if (this.featureConfig.isEnabled('enableBundles')) {
      // The user has enabled feature toggle "enableBundles"
      // which makes the cart use the new entry groups feature to provide bundle support.
      this.entryGroups$ = this.savedCartDetailsService.getSaveEntryGroups();
      this.entries$ = this.hierarchyService.getEntriesFromGroups(
        this.entryGroups$
      );
      this.bundles$ = this.hierarchyService.getBundlesFromGroups(
        this.entryGroups$
      );
    } else {
      this.entries$ = this.savedCartDetailsService.getCartDetails().pipe(
        pluck('entries'),
        filter((entries: any) => entries.length > 0)
      );
    }

    this.subscription.add(
      this.eventSercvice
        .get(DeleteSavedCartSuccessEvent)
        .pipe(
          take(1),
          map(() => true)
        )
        .subscribe((success) => this.onDeleteComplete(success))
    );

    this.buyItAgainTranslation$ = this.translation.translate(
      'addToCart.addToActiveCart'
    );
  }

  onDeleteComplete(success: boolean): void {
    if (success) {
      this.routingService.go({ cxRoute: 'savedCarts' });
      this.globalMessageService.add(
        {
          key: 'savedCartDialog.deleteCartSuccess',
        },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    }
  }

  removeBundle(entryGroupNumber: any): void {
    this.activeCartService.removeEntryGroup(entryGroupNumber);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
