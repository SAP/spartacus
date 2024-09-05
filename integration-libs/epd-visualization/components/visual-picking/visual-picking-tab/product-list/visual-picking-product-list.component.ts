/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { VisualPickingProductListItem } from './model/visual-picking-product-list-item.model';
import { VisualPickingProductListService } from './visual-picking-product-list.service';
import { UrlModule, I18nModule } from '@spartacus/core';
import { CompactAddToCartComponent } from './compact-add-to-cart/compact-add-to-cart.component';
import { RouterLink } from '@angular/router';
import { MediaModule } from '@spartacus/storefront';
import { NgIf, AsyncPipe } from '@angular/common';
import { PagedListComponent } from './paged-list/paged-list.component';

@Component({
    selector: 'cx-epd-visualization-product-list',
    templateUrl: './visual-picking-product-list.component.html',
    providers: [VisualPickingProductListService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        PagedListComponent,
        NgIf,
        MediaModule,
        RouterLink,
        CompactAddToCartComponent,
        AsyncPipe,
        UrlModule,
        I18nModule,
    ],
})
export class VisualPickingProductListComponent implements OnInit {
  constructor(
    protected visualPickingProductListService: VisualPickingProductListService
  ) {}

  @Input() title: string;
  @Input() singleSelection = true;

  @Input('selectedProductCodes')
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
