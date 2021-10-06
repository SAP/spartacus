import { NgModule } from '@angular/core';
import { AdministrationComponentsModule } from '@spartacus/organization/administration/components';
import { AdministrationCoreModule } from '@spartacus/organization/administration/core';
import { AdministrationOccModule } from '@spartacus/organization/administration/occ';

@NgModule({
  imports: [
    AdministrationCoreModule.forRoot(),
    AdministrationOccModule,
    AdministrationComponentsModule,
  ],
})
export class AdministrationModule {}
