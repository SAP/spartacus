import { NgModule } from '@angular/core';
import { FormModule } from './form/form.module';
import { ListModule } from './list/list.module';
import { SubListModule } from './sub-list/sub-list.module';

@NgModule({
  imports: [ListModule, SubListModule, FormModule],
})
export class SharedOrganizationModule {}
