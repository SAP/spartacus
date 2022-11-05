import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard, CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { UnitLevelOrdersViewerGuard } from '../../core/guards';
import {
  UnitLevelOrderOverviewComponent,
  UnitLevelOrderOverviewModule,
} from './unit-level-order-overview';

@NgModule({
  imports: [CommonModule, UnitLevelOrderOverviewModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        UnitLevelOrderDetailsOverviewComponent: {
          component: UnitLevelOrderOverviewComponent,
          guards: [AuthGuard, UnitLevelOrdersViewerGuard],
        },
      },
    }),
  ],
})
export class UnitLevelOrderDetailModule {}
