/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  LoadStatus,
  OrganizationItemStatus,
} from '@spartacus/organization/administration/core';
import {
  OutletContextData,
  TableDataOutletContext,
} from '@spartacus/storefront';
import { EMPTY, combineLatest, Observable, of } from 'rxjs';
import { filter, first, map, switchMap, take } from 'rxjs/operators';
import { ItemService } from '../item.service';
import { ListService } from '../list/list.service';
import { MessageService } from '../message/services/message.service';
import { BaseItem } from '../organization.model';
import { CellComponent } from '../table/cell.component';
import { SubListService } from './sub-list.service';

@Component({
  selector: 'cx-org-assign-cell',
  template: `
    <button
      type="button"
      *ngIf="hasItem$ | async"
      (click)="toggleAssign()"
      class="link"
    >
      {{ isAssigned ? 'unassign' : 'assign' }}
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignCellComponent<T extends BaseItem> extends CellComponent {
  constructor(
    protected outlet: OutletContextData<TableDataOutletContext>,
    protected organizationItemService: ItemService<T>,
    protected messageService: MessageService,
    protected organizationSubListService: ListService<T>
  ) {
    super(outlet);
  }

  get isAssigned$(item: any): boolean {
    return (item as any)?.selected;
  }

  toggleAssign() {
    // const isAssigned = this.isAssigned;
    combineLatest([
      this.organizationItemService.key$,
      this.link$,
      this.isAssigned$,
    ])
      .pipe(
        first(),
        switchMap(([key, link, isAssigned]) =>
          isAssigned ? this.unassign?.(key, link) : this.assign(key, link)
        ),
        take(1),
        filter(
          (data: OrganizationItemStatus<T>) =>
            data.status === LoadStatus.SUCCESS
        )
      )
      .subscribe((data) =>
        this.notify(data.item, isAssigned ? 'unassigned' : 'assigned')
      );
  }

  protected assign(
    key: string,
    linkKey: string
  ): Observable<OrganizationItemStatus<T>> {
    return (
      (this.organizationSubListService as SubListService<T>).assign?.(
        key,
        linkKey
      ) ?? EMPTY
    );
  }

  protected unassign(
    key: string,
    linkKey: string
  ): Observable<OrganizationItemStatus<T>> {
    return (
      (this.organizationSubListService as SubListService<T>).unassign?.(
        key,
        linkKey
      ) ?? EMPTY
    );
  }

  /**
   * Returns the key for the linked object.
   *
   * At the moment, we're using a generic approach to assign objects,
   * but the object do not have a normalized shape. Therefor, we need
   * to evaluate the context to return the right key for the associated
   * item.
   */
  protected get link$(): Observable<string> {
    return this.outlet.context$.pipe(
      map((context) => context?.code ?? context?.customerId ?? context?.uid)
    );
  }

  protected notify(item: any, state: string) {
    this.messageService.add({
      message: {
        key: `${this.organizationSubListService.viewType}.${state}`,
        params: {
          item,
        },
      },
    });
  }
}
