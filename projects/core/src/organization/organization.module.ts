import { ModuleWithProviders, NgModule } from '@angular/core';
import { BudgetService } from './facade/budget.service';

import { OrganizationStoreModule } from './store/organization.module';

@NgModule({
  imports: [OrganizationStoreModule],
})
export class OrganizationModule {
  static forRoot(): ModuleWithProviders<OrganizationModule> {
    return {
      ngModule: OrganizationModule,
      providers: [
        BudgetService,
      ],
    };
  }
}
