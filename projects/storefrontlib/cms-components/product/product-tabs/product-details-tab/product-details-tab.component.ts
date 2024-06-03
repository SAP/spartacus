/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CmsComponentWithChildren, CmsService, Product } from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { CmsComponentData } from '../../../../cms-structure/page/model/cms-component-data';
import { CurrentProductService } from '../../current-product.service';

@Component({
  selector: 'cx-product-details-tab',
  templateUrl: './product-details-tab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsTabComponent implements OnInit {
  product$: Observable<Product | null>;

  constructor(
    protected currentProductService: CurrentProductService,
    protected componentData: CmsComponentData<CmsComponentWithChildren>,
    protected cmsService: CmsService
  ) {}
  children$: Observable<any[]> = this.componentData.data$.pipe(
    switchMap((data) =>
      combineLatest(
        (data?.children ?? '').split(' ').map((component) =>
          this.cmsService.getComponentData<any>(component).pipe(
            distinctUntilChanged(),
            map((child) => {
              if (!child) {
                return undefined;
              }
              if (!child.flexType) {
                child = {
                  ...child,
                  flexType: child.typeCode,
                };
              }

              return child;
            })
          )
        )
      )
    )
  );

  ngOnInit() {
    this.product$ = this.currentProductService.getProduct();
  }
}
