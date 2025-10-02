/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject } from '@angular/core';
import { CartItemContext } from '@spartacus/cart/base/root';
import { useFeatureStyles } from '@spartacus/core';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CartItemContextSource } from '../cart-item/model/cart-item-context-source.model';
import { CartItemListComponentService } from './cart-item-list-row.component.service';
import { OutletDirective } from '../../../../../../projects/storefrontlib/cms-structure/outlet/outlet.directive';
import { CartItemValidationWarningComponent } from '../../validation/cart-item-warning/cart-item-validation-warning.component';
import { NgIf, NgFor, NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MediaComponent } from '../../../../../../projects/storefrontlib/shared/components/media/media.component';
import { PromotionsComponent } from '../../../../../../projects/storefrontlib/cms-components/misc/promotions/promotions.component';
import { FeatureDirective } from '@spartacus/core';
import { ItemCounterComponent } from '../../../../../../projects/storefrontlib/shared/components/item-counter/item-counter.component';
import { AtMessageDirective } from '../../../../../../projects/storefrontlib/shared/components/assistive-technology-message/assistive-technology-message.directive';
import { TranslatePipe } from '@spartacus/core';
import { UrlPipe } from '@spartacus/core';
import { MockTranslatePipe } from '@spartacus/core';

@Component({
  selector: '[cx-cart-item-list-row], cx-cart-item-list-row',
  templateUrl: './cart-item-list-row.component.html',
  providers: [
    CartItemContextSource,
    { provide: CartItemContext, useExisting: CartItemContextSource },
  ],
  imports: [
    OutletDirective,
    CartItemValidationWarningComponent,
    NgIf,
    RouterLink,
    MediaComponent,
    PromotionsComponent,
    NgFor,
    FeatureDirective,
    ItemCounterComponent,
    NgTemplateOutlet,
    AtMessageDirective,
    TranslatePipe,
    UrlPipe,
    MockTranslatePipe,
  ],
})
export class CartItemListRowComponent extends CartItemComponent {
  protected componentService = inject(CartItemListComponentService);
  isFlagQuote = this.componentService.showBasePriceWithDiscount();
  constructor(cartItemContextSource: CartItemContextSource) {
    super(cartItemContextSource);
    useFeatureStyles('a11yQTY2Quantity');
  }
}
