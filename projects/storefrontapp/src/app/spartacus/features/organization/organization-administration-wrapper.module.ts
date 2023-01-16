import { CdcUserDetailsModule } from 'integration-libs/cdc/manage-users/user-details/cdc-user-details.module';
import { CdcListModule } from 'integration-libs/cdc/manage-users/manage-users-list/cdc-list.module';
import { environment } from 'projects/storefrontapp/src/environments/environment';
import { NgModule, Type } from '@angular/core';
import { AdministrationModule } from '@spartacus/organization';

const extensions: Type<any>[] = [];
if (environment.cdc) {
  extensions.push(CdcUserDetailsModule);
  extensions.push(CdcListModule);
}
@NgModule({
  imports: [AdministrationModule, ...extensions],
})
export class AdministrationWrapperModule {}
