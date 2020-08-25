import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { PermissionCreateModule } from './create/permission-create.module';
import { PermissionDetailsModule } from './details/permission-details.module';
import { PermissionEditModule } from './edit/permission-edit.module';
import { PermissionListModule } from './list/permission-list.module';
import {
  permissionCmsConfig,
  permissionRoutingConfig,
  permissionTableConfigFactory,
} from './permission.config';

@NgModule({
  imports: [
    RouterModule,
    PermissionListModule,
    PermissionCreateModule,
    PermissionEditModule,
    PermissionDetailsModule,
  ],
  providers: [
    provideDefaultConfig(permissionRoutingConfig),
    provideDefaultConfig(permissionCmsConfig),
    provideDefaultConfigFactory(permissionTableConfigFactory),
  ],
})
export class PermissionComponentsModule {}
