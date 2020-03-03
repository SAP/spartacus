import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
} from '@spartacus/core';
import { PermissionEditComponent } from './permission-edit.component';
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
        data: { cxRoute: 'permissionEdit' },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        PermissionEditComponent: {
          component: PermissionEditComponent,
          guards: [AuthGuard],
        },
      },
    }),
    PermissionFormModule,
    I18nModule,
  ],
  declarations: [PermissionEditComponent],
  exports: [PermissionEditComponent],
  entryComponents: [PermissionEditComponent],
})
export class PermissionEditModule {}
