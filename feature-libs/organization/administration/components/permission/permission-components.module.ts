import { NgModule } from '@angular/core';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { SharedOrganizationModule } from '../shared/shared-organization.module';
import { PermissionDetailsModule } from './details/permission-details.module';
import { PermissionFormModule } from './form/permission-form.module';
import {
  permissionCmsConfig,
  permissionTableConfigFactory,
} from './permission.config';

@NgModule({
  imports: [
    SharedOrganizationModule,
    PermissionDetailsModule,
    PermissionFormModule,
  ],
  providers: [
    provideDefaultConfig(permissionCmsConfig),
    provideDefaultConfigFactory(permissionTableConfigFactory),
  ],
})
export class PermissionComponentsModule {}
