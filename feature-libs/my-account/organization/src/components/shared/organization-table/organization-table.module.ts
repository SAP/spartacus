import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { ActiveLinkCellComponent } from './active-link/active-link-cell.component';
import { AmountCellComponent } from './amount/amount-cell.component';
import { DateRangeCellComponent } from './date-range/date-range-cell.component';
import { LimitCellComponent } from './limit/limit-cell.component';
import { OrganizationCellComponent } from './organization-cell.component';
import { RolesCellComponent } from './roles/roles-cell.component';
import { StatusCellComponent } from './status/status-cell.component';
import { UnitCellComponent } from './unit/unit-cell.component';
import { ToggleLinkCellComponent } from './toggle-link/toggle-link-cell.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlTestingModule,
    I18nModule,
    IconModule,
  ],
  declarations: [
    OrganizationCellComponent,
    ToggleLinkCellComponent,
    ActiveLinkCellComponent,
    AmountCellComponent,
    DateRangeCellComponent,
    LimitCellComponent,
    RolesCellComponent,
    StatusCellComponent,
    UnitCellComponent,
  ],
})
export class OrganizationTableModule {}
