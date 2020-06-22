import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  RoutingConfig,
} from '@spartacus/core';
import { CostCenterCreateComponent } from './cost-center-create/cost-center-create.component';
import { CostCenterCreateModule } from './cost-center-create/cost-center-create.module';
import { CostCenterDetailsComponent } from './cost-center-details/cost-center-details.component';
import { CostCenterDetailsModule } from './cost-center-details/cost-center-details.module';
import { CostCenterListComponent } from './cost-center-list/cost-center-list.component';
import { CostCenterListModule } from './cost-center-list/cost-center-list.module';
import { CostCenterComponent } from './cost-center.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    ConfigModule.withConfig({
      routing: {
        routes: {
          costCenter: {
            paths: ['organization/cost-centers'],
          },
          costCenterDetails: {
            paths: ['organization/cost-centers/:code'],
          },
        },
      },
    } as RoutingConfig),

    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ManageCostCentersListComponent: {
          component: CostCenterComponent,
          childRoutes: [
            {
              path: '',
              component: CostCenterListComponent,
            },
            {
              path: 'create',
              component: CostCenterCreateComponent,
            },
            {
              path: ':code',
              component: CostCenterDetailsComponent,
            },
          ],
          guards: [AuthGuard],
        },
      },
    }),

    CostCenterListModule,
    CostCenterCreateModule,
    CostCenterDetailsModule,
  ],
  declarations: [CostCenterComponent],
})
export class Outdated_CostCenterModule {}
