/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  TemplateRef,
  inject,
  output,
  input,
} from '@angular/core';
import { Product, TranslatePipe } from '@spartacus/core';
import { BREAKPOINT, BreakpointService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AsmCustomer360ProductItemComponent } from '../asm-customer-360-product-item/asm-customer-360-product-item.component';
import { ProductItem } from './product-item.model';

@Component({
  selector: 'cx-asm-customer-360-product-listing',
  templateUrl: './asm-customer-360-product-listing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgTemplateOutlet,
    NgClass,
    AsmCustomer360ProductItemComponent,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class AsmCustomer360ProductListingComponent implements OnInit {
  protected breakpointService = inject(BreakpointService);

  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input()
  emptyResultDescription: string;

  readonly headerInactive = input<boolean>();

  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input()
  headerText: string;

  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input()
  products: Array<ProductItem | Product>;

  // TODO: Skipped for migration because:
  //  This input is used in a control flow expression (e.g. `@if` or `*ngIf`)
  //  and migrating would break narrowing currently.
  @Input()
  headerTemplate: TemplateRef<void>;

  readonly clickHeader = output<void>();

  readonly selectProduct = output<Product>();

  numberofColumns$: Observable<number>;

  showMore: boolean;

  ngOnInit(): void {
    this.numberofColumns$ = this.getNumberofColumns();
  }

  toggleShowMore(): void {
    this.showMore = !this.showMore;
  }

  protected getNumberofColumns(): Observable<number> {
    return this.breakpointService.breakpoint$.pipe(
      map((breakpoint) => {
        switch (breakpoint) {
          case BREAKPOINT.xl:
            return 3;
          case BREAKPOINT.lg:
            return 2;
          default:
            return 1;
        }
      })
    );
  }
}
