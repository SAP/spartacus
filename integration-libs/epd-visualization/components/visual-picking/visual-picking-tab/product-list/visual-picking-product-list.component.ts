/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, UrlPipe } from '@spartacus/core';
import { MediaComponent } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { CompactAddToCartComponent } from './compact-add-to-cart/compact-add-to-cart.component';
import { VisualPickingProductListItem } from './model/visual-picking-product-list-item.model';
import { PagedListComponent } from './paged-list/paged-list.component';
import { VisualPickingProductListService } from './visual-picking-product-list.service';

/**
 * @deprecated since v221121.5.0 - The epd-visualization integration library will be removed in the future.
 */
@Component({
  selector: 'cx-epd-visualization-product-list',
  templateUrl: './visual-picking-product-list.component.html',
  providers: [VisualPickingProductListService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PagedListComponent,
    NgIf,
    MediaComponent,
    RouterLink,
    CompactAddToCartComponent,
    AsyncPipe,
    UrlPipe,
    TranslatePipe,
  ],
})
export class VisualPickingProductListComponent implements OnInit {
  constructor(
    protected visualPickingProductListService: VisualPickingProductListService
  ) {}

  @Input() title: string;
  @Input() singleSelection = true;

  @Input()
  set selectedProductCodes(selectedProductCodes: string[]) {
    this.visualPickingProductListService.selectedProductCodes =
      selectedProductCodes;
  }
  get selectedProductCodes(): string[] {
    return this.visualPickingProductListService.selectedProductCodes;
  }
  @Output()
  selectedProductCodesChange =
    this.visualPickingProductListService.selectedProductCodesChange;

  get itemsPerSlide(): number {
    return this.visualPickingProductListService.itemsPerSlide;
  }
  set itemsPerSlide(itemsPerSlide: number) {
    this.visualPickingProductListService.itemsPerSlide = itemsPerSlide;
  }

  get activeSlideStartIndex(): number {
    return this.visualPickingProductListService.activeSlideStartIndex;
  }
  set activeSlideStartIndex(activeSlideStartIndex: number) {
    this.visualPickingProductListService.activeSlideStartIndex =
      activeSlideStartIndex;
  }

  get filteredItems$(): Observable<VisualPickingProductListItem[]> {
    return this.visualPickingProductListService.filteredItems$;
  }

  ngOnInit(): void {
    this.visualPickingProductListService.initialize();
  }
}
