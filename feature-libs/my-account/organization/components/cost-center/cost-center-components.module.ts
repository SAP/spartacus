import { NgModule } from '@angular/core';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { SharedOrganizationModule } from '../shared/shared-organization.module';
import { CostCenterBudgetsModule } from './budgets/cost-centers-budgets.module';
import {
  costCenterCmsConfig,
  costCenterRoutingConfig,
  costCenterTableConfigFactory,
} from './cost-center.config';
import { CostCenterDetailsModule } from './details/cost-center-details.module';
import { CostCenterFormModule } from './form/cost-center-form.module';

@NgModule({
  imports: [
    SharedOrganizationModule,
    CostCenterDetailsModule,
    CostCenterFormModule,
    CostCenterBudgetsModule,
  ],
  providers: [
    provideDefaultConfig(costCenterRoutingConfig),
    provideDefaultConfig(costCenterCmsConfig),
    provideDefaultConfigFactory(costCenterTableConfigFactory),
  ],
})
export class CostCenterComponentsModule {}
