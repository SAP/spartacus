import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { UnitListComponent } from './unit-list.component';
import { IconModule } from '@spartacus/storefront';
import { ListModule } from '../../shared/list/list.module';
import { ToggleLinkCellComponent } from './toggle-link/toggle-link-cell.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    I18nModule,
    IconModule,
    ListModule,
  ],
  declarations: [UnitListComponent, ToggleLinkCellComponent],
})
export class UnitListModule {}
