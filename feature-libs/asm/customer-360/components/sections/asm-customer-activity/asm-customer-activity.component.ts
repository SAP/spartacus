/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AsmConfig } from '@spartacus/asm/root';
import { TranslationService, UrlCommand } from '@spartacus/core';
import { combineLatest, forkJoin, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { CustomerTableColumn } from '../../asm-customer-table/asm-customer-table.model';
import { Customer360SectionContext } from '../customer-360-section-context.model';
import { GeneralEntry, ValueLocalization } from './asm-customer-activity.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-activity',
  templateUrl: './asm-customer-activity.component.html',
})
export class AsmCustomerActivityComponent implements OnInit {
  private PAGE_SIZE = 10;

  pageSize: number;
  entries$: Observable<Array<GeneralEntry>>;
  columns: Array<CustomerTableColumn> = [
    {
      property: 'type',
      text: 'type',
      i18nTextKey: 'customer360.activity.type',
    },
    {
      property: 'id',
      text: 'id',
      i18nTextKey: 'customer360.activity.id',
      navigatable: true,
    },
    {
      property: 'description',
      text: 'description',
      i18nTextKey: 'customer360.activity.description',
    },
    {
      property: 'category',
      text: 'status',
      i18nTextKey: 'customer360.activity.status',
    },
    {
      property: 'created',
      text: 'created',
      i18nTextKey: 'customer360.activity.created',
      isDate: true,
    },
    {
      property: 'updated',
      text: 'updated',
      i18nTextKey: 'customer360.activity.updated',
      isDate: true,
    },
  ];
  transformedEntries: Array<any>;
  localizedValues: Array<ValueLocalization> = [];

  constructor(
    protected asmConfig: AsmConfig,
    protected translationService: TranslationService,
    protected sectionContext: Customer360SectionContext<void>
  ) {}

  ngOnInit(): void {
    // Notes:  we are sorting table locally so we need to translate all possible value
    // before pass them to the table component. e.g. type, description, status? ...etc
    let entries: Array<GeneralEntry> = [];

    this.entries$ = combineLatest([
      this.sectionContext.config$,
      this.sectionContext.orderHistory$,
      this.sectionContext.activeCart$,
      this.sectionContext.savedCarts$,
    ]).pipe(
      switchMap(([config, orderHistory, activeCart, savedCarts]) => {
        this.pageSize = config.pageSize || this.PAGE_SIZE;
        entries = [];
        // notes: active cart does not have date
        if (activeCart) {
          entries.push({
            typeId: 'activeCart',
            id: activeCart.code,
            created: undefined,
            category: '',
          });
          this.saveLocalization(
            activeCart.code,
            'type',
            'customer360.activity.cart'
          );
          this.saveLocalization(
            activeCart.code,
            'description',
            'customer360.activity.numberOfCartItems',
            {
              count: activeCart.totalItems ?? 0,
            }
          );
        }

        savedCarts?.forEach((cart) => {
          entries.push({
            typeId: 'savedCart',
            id: cart.code,
            created: cart?.saveTime
              ? Date.parse(String(cart?.saveTime))
              : undefined,
            category: '',
          });
          this.saveLocalization(
            cart.code,
            'type',
            'customer360.activity.savedCart'
          );
          this.saveLocalization(
            cart.code,
            'description',
            'customer360.activity.numberOfCartItems',
            {
              count: cart.totalItems ?? 0,
            }
          );
        });
        // Notes: order history order doesn't have totalItems
        orderHistory.orders?.forEach((order) => {
          entries.push({
            typeId: 'orderHistory',
            id: order.code,
            created: order?.placed
              ? Date.parse(String(order?.placed))
              : undefined,
            category: order.statusDisplay,
          });
          this.saveLocalization(
            order.code,
            'type',
            'customer360.activity.order'
          );
        });
        return this.getLocalizations().pipe(
          map((valueLocalizations) => {
            valueLocalizations.forEach((valueLocalization) => {
              const entry = entries.find(
                (item) => item.id === valueLocalization.id
              );
              if (entry && valueLocalization.propertyName) {
                entry[valueLocalization.propertyName] = valueLocalization.value;
              }
            });
            return entries;
          })
        );
      })
    );
  }

  itemSelected(entry: GeneralEntry | undefined): void {
    if (entry) {
      let urlCommand: UrlCommand;
      if (entry.typeId === 'savedCart') {
        urlCommand = {
          cxRoute: 'savedCartsDetails',
          params: { savedCartId: entry?.id },
        };
      } else if (entry.typeId === 'activeCart') {
        urlCommand = {
          cxRoute: 'cart',
        };
      } else if (entry.typeId === 'orderHistory') {
        urlCommand = {
          cxRoute: 'orderDetails',
          params: { code: entry?.id },
        };
      }
      if (urlCommand) {
        this.sectionContext.navigate$.next(urlCommand);
      }
    }
  }

  private getLocalizations(): Observable<Array<ValueLocalization>> {
    const translateRequests: Array<Observable<string>> = [];
    // avoid duplicate calls
    const filtredLocalizedValue = this.localizedValues.filter(
      (item) => !item.value
    );

    filtredLocalizedValue.forEach((valueLocalization) => {
      translateRequests.push(
        this.translationService
          .translate(valueLocalization.i18nNameKey, valueLocalization.options)
          .pipe(take(1))
      );
    });

    if (translateRequests.length) {
      return forkJoin(translateRequests).pipe(
        map((localizations) => {
          localizations.forEach((item, index) => {
            filtredLocalizedValue[index].value = item;
            const orgIndex = this.localizedValues.findIndex(
              (orgItem) =>
                orgItem.i18nNameKey ===
                  filtredLocalizedValue[index].i18nNameKey &&
                orgItem.options === filtredLocalizedValue[index].options
            );
            this.localizedValues[orgIndex].value = item;
          });
          return this.localizedValues;
        })
      );
    } else {
      return of(this.localizedValues);
    }
  }

  private saveLocalization(
    id: string | undefined,
    propertyName: string,
    i18nNameKey: string,
    options?: any
  ): void {
    const localizedValue = this.localizedValues.find(
      (item) => item.id === id && item.propertyName === propertyName
    );
    if (!localizedValue) {
      this.localizedValues.push({
        i18nNameKey: i18nNameKey,
        options: options,
        propertyName: propertyName,
        id: id,
      });
    }
  }
}
