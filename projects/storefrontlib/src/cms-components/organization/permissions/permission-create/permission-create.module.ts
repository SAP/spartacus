import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  CxDatePipe,
  I18nModule,
  UserService,
} from '@spartacus/core';
import { PermissionCreateComponent } from './permission-create.component';
import { PermissionFormModule } from '../permission-form/permission-form.module';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        PermissionCreateComponent: {
          component: PermissionCreateComponent,
          guards: [AuthGuard],
        },
      },
    }),
    PermissionFormModule,
    I18nModule,
  ],
  declarations: [PermissionCreateComponent],
  exports: [PermissionCreateComponent],
  providers: [UserService, CxDatePipe],
  entryComponents: [PermissionCreateComponent],
})
export class PermissionCreateModule {}
