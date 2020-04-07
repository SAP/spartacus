import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
} from '@spartacus/core';
import { PermissionCreateComponent } from './permission-create.component';
import { PermissionFormModule } from '../permission-form/permission-form.module';
import { RouterModule } from '@angular/router';
import { CmsPageGuard } from '../../../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../../cms-structure/page/page-layout/page-layout.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'permissionCreate' },
      },
    ]),
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
  entryComponents: [PermissionCreateComponent],
})
export class PermissionCreateModule {}
