import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { UserGroupPermissionsComponent } from './user-group-permissions.component';
import { PageLayoutComponent } from '../../../../cms-structure/page/page-layout/page-layout.component';
import { CmsPageGuard } from '../../../../cms-structure/guards/cms-page.guard';
import { InteractiveTableModule } from '../../../../shared/components/interactive-table/interactive-table.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'userGroupPermissions' },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        UserGroupPermissionsComponent: {
          component: UserGroupPermissionsComponent,
          guards: [AuthGuard],
        },
      },
    }),
    UrlModule,
    I18nModule,
    InteractiveTableModule,
  ],
  declarations: [UserGroupPermissionsComponent],
  exports: [UserGroupPermissionsComponent],
  providers: [],
  entryComponents: [UserGroupPermissionsComponent],
})
export class UserGroupPermissionsModule {}
