/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { OrderEntry, OrderEntryGroup } from '@spartacus/cart/base/root';
import { FeatureConfigService, FeatureDirective, TranslatePipe } from '@spartacus/core';
import { ReturnRequest } from '@spartacus/order/root';
import { HierarchyComponentService, HierarchyModule, HierarchyNode, MediaComponent } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { ReturnRequestService } from '../return-request.service';
@Component({
  selector: 'cx-return-request-items',
  templateUrl: './return-request-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgFor, MediaComponent, AsyncPipe, TranslatePipe, FeatureDirective, HierarchyModule],
})
export class ReturnRequestItemsComponent implements OnInit {
  entryGroups$: Observable<OrderEntryGroup[]>;
  requestOrderEntryGroups$: Observable<OrderEntryGroup[]>;
  bundles$: Observable<HierarchyNode[]>;
  entries$: Observable<OrderEntry[]>;
  private featureConfig = inject(FeatureConfigService);
  returnRequest$: Observable<ReturnRequest> =
    this.returnRequestService.getReturnRequest();
  constructor(
    protected returnRequestService: ReturnRequestService,
    protected hierarchyService: HierarchyComponentService
  ) {}

  ngOnInit(): void {
    if (this.featureConfig.isEnabled('enableBundles')) {
      this.entryGroups$ = this.returnRequestService.getOrderEntryGroups();
      this.requestOrderEntryGroups$ =
        this.returnRequestService.getRequestOrderEntryGroups(
          this.returnRequest$,
          this.entryGroups$
        );
      this.entries$ = this.hierarchyService.getEntriesFromGroups(
        this.requestOrderEntryGroups$
      );
      this.bundles$ = this.hierarchyService.getBundlesFromGroups(
        this.requestOrderEntryGroups$
      );
    }
  }
}