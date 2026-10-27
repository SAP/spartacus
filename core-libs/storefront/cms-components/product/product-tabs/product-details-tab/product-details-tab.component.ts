/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CmsComponentWithChildren, CmsService, Product } from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { OutletDirective } from '../../../../cms-structure/outlet/outlet.directive';
import { ComponentWrapperDirective } from '../../../../cms-structure/page/component/component-wrapper.directive';
import { CmsComponentData } from '../../../../cms-structure/page/model/cms-component-data';
import { CurrentProductService } from '../../current-product.service';

@Component({
  selector: 'cx-product-details-tab',
  templateUrl: './product-details-tab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OutletDirective, ComponentWrapperDirective, AsyncPipe],
})
export class ProductDetailsTabComponent implements OnInit {
  protected currentProductService = inject(CurrentProductService);
  protected componentData =
    inject<CmsComponentData<CmsComponentWithChildren>>(CmsComponentData);
  protected cmsService = inject(CmsService);

  product$: Observable<Product | null>;
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
