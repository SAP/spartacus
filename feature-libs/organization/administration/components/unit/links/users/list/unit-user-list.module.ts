import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { ExplainDisableInfoModule } from '../../../../shared/detail/explain-disable-info/explain-disable-info.module';
import { SubListModule } from '../../../../shared/sub-list/sub-list.module';
import { UnitUserRolesCellComponent } from './unit-user-link-cell.component';
import { UnitUserListComponent } from './unit-user-list.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    RouterModule,
    UrlModule,
    SubListModule,
    ExplainDisableInfoModule,
  ],
  declarations: [UnitUserListComponent, UnitUserRolesCellComponent],
})
export class UnitUserListModule {}
