import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { ManageUnitsListComponent } from './unit-list.component';
import { InteractiveTableModule } from '../../../../shared/components/interactive-table/interactive-table.module';
import { NavigationModule } from '../../../navigation/navigation/navigation.module';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ManageUnitsListComponent: {
          component: ManageUnitsListComponent,
          guards: [AuthGuard],
        },
      },
    }),
    RouterModule,
    UrlModule,
    I18nModule,
    InteractiveTableModule,
    NavigationModule,
  ],
  declarations: [ManageUnitsListComponent],
  exports: [ManageUnitsListComponent],
  entryComponents: [ManageUnitsListComponent],
})
export class UnitListModule {}
