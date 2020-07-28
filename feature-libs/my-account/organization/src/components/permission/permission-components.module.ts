import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import {
  permissionRoutingConfig,
  permissionCmsConfig,
  permissionTableConfigFactory,
} from './permission.config';
import { PermissionListModule } from './list/permission-list.module';

@NgModule({
  imports: [RouterModule, PermissionListModule],
  providers: [
    provideDefaultConfig(permissionRoutingConfig),
    provideDefaultConfig(permissionCmsConfig),
    provideDefaultConfigFactory(permissionTableConfigFactory),
  ],
})
export class PermissionComponentsModule {}
