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
import { PermissionEditComponent } from './permission-edit.component';
import { PermissionFormModule } from '../permission-form/permission-form.module';
import { RouterModule } from '@angular/router';
import { CmsPageGuard } from '../../../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../../cms-structure/page/page-layout/page-layout.component';
import { suffixUrlMatcher } from '../../../../cms-structure/routing/suffix-routes/suffix-url-matcher';

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
      {
        matcher: suffixUrlMatcher,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: {
          cxSuffixUrlMatcher: {
            marker: 'p',
            paramName: 'permissionCode',
          },
        },
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
  providers: [UserService, CxDatePipe],
  entryComponents: [PermissionEditComponent],
})
export class PermissionEditModule {}
