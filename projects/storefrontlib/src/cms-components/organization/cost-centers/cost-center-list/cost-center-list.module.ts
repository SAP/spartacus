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
import { CostCenterListComponent } from './cost-center-list.component';
import { InteractiveTableModule } from '../../../../shared/components/interactive-table/interactive-table.module';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ManageCostCentersListComponent: {
          component: CostCenterListComponent,
          guards: [AuthGuard],
        },
      },
    }),
    RouterModule,
    UrlModule,
    I18nModule,
    InteractiveTableModule,
  ],
  declarations: [CostCenterListComponent],
  exports: [CostCenterListComponent],
  entryComponents: [CostCenterListComponent],
})
export class CostCenterListModule {}
