/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { OrderEntry } from '@spartacus/cart/base/root';
import { QuickOrderFacade } from '@spartacus/cart/quick-order/root';
import { useFeatureStyles } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MediaComponent } from '../../../../../../../projects/storefrontlib/shared/components/media/media.component';
import { FeatureDirective } from '../../../../../../../projects/core/src/features-config/directives/feature.directive';
import { ItemCounterComponent } from '../../../../../../../projects/storefrontlib/shared/components/item-counter/item-counter.component';
import { TranslatePipe } from '../../../../../../../projects/core/src/i18n/translate.pipe';
import { UrlPipe } from '../../../../../../../projects/core/src/routing/configurable-routes/url-translation/url.pipe';
import { MockTranslatePipe } from '../../../../../../../projects/core/src/i18n/testing/mock-translate.pipe';

@Component({
    selector: '[cx-quick-order-item], cx-quick-order-item',
    templateUrl: './quick-order-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgClass,
        RouterLink,
        MediaComponent,
        FeatureDirective,
        ItemCounterComponent,
        TranslatePipe,
        UrlPipe,
        MockTranslatePipe,
    ],
})
export class QuickOrderItemComponent implements OnInit, OnDestroy {
  quantityControl: UntypedFormControl;

  get entry(): OrderEntry {
    return this._entry;
  }

  @Input('entry') set entry(value: OrderEntry) {
    this._entry = value;
    this.quantityControl = new UntypedFormControl(this.entry.quantity, {
      updateOn: 'blur',
    });
  }

  @Input()
  index: number;

  @Input()
  loading: boolean = false;

  protected _entry: OrderEntry;
  protected subscription = new Subscription();

  constructor(
    protected cd: ChangeDetectorRef,
    protected quickOrderService: QuickOrderFacade
  ) {
    useFeatureStyles('a11yQTY2Quantity');
  }

  ngOnInit(): void {
    this.subscription.add(
      this.quantityControl.valueChanges.subscribe(() => {
        this.quickOrderService.updateEntryQuantity(
          this.index,
          this.quantityControl.value
        );
      })
    );

    this.subscription.add(this.watchProductAdd());
  }

  removeEntry(): void {
    this.quickOrderService.softDeleteEntry(this.index);
    this.cd.detectChanges();
  }

  protected watchProductAdd(): Subscription {
    return this.quickOrderService.getProductAdded().subscribe((productCode) => {
      if (productCode === this.entry.product?.code) {
        this.quantityControl = new UntypedFormControl(this.entry.quantity);
        this.cd.detectChanges();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
