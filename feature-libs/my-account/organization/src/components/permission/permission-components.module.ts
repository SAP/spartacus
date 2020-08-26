import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { OrganizationListModule } from '../shared/organization-list/organization-list.module';
import { PermissionCreateModule } from './create/permission-create.module';
import { PermissionDetailsModule } from './details/permission-details.module';
import { PermissionEditModule } from './edit/permission-edit.module';
import {
  permissionCmsConfig,
  permissionRoutingConfig,
  permissionTableConfigFactory,
} from './permission.config';

@NgModule({
  imports: [
    RouterModule,
    PermissionCreateModule,
    PermissionEditModule,
    PermissionDetailsModule,

    OrganizationListModule,
  ],
  providers: [
    provideDefaultConfig(permissionRoutingConfig),
    provideDefaultConfig(permissionCmsConfig),
    provideDefaultConfigFactory(permissionTableConfigFactory),
  ],
})
export class PermissionComponentsModule {}
