import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { ActiveLinkCellComponent } from './active-link/active-link-cell.component';
import { AmountCellComponent } from './amount/amount-cell.component';
import { DateRangeCellComponent } from './date-range/date-range-cell.component';
import { LimitCellComponent } from './limit/limit-cell.component';
import { CellComponent } from './cell.component';
import { RolesCellComponent } from './roles/roles-cell.component';
import { StatusCellComponent } from './status/status-cell.component';
import { UnitCellComponent } from './unit/unit-cell.component';

@NgModule({
  imports: [CommonModule, RouterModule, UrlModule, I18nModule, IconModule],
  declarations: [
    CellComponent,
    ActiveLinkCellComponent,
    AmountCellComponent,
    DateRangeCellComponent,
    LimitCellComponent,
    RolesCellComponent,
    StatusCellComponent,
    UnitCellComponent,
  ],
})
export class CellModule {}
