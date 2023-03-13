/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OutletContextData } from '../../../../cms-structure/outlet/outlet.model';
import { TableHeaderOutletContext } from '../table.model';

@Component({
  selector: 'cx-table-data-cell',
  template: `{{ value$ | async }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableDataCellComponent {
  constructor(protected outlet: OutletContextData<TableHeaderOutletContext>) {}

  @HostBinding('attr.title')
  get value$(): Observable<string | undefined> {
    return combineLatest([this.field$, this.model$]).pipe(
      map(([field, model]) => (field ? model?.[field] : undefined))
    );
  }

  protected get model$(): Observable<any> {
    return this.outlet.context$.pipe(map((context) => context));
  }

  protected get field$(): Observable<string | undefined> {
    return this.outlet.context$.pipe(map((context) => context?._field));
  }
}
