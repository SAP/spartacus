import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { RouterModule } from '@angular/router';
import { PageLayoutComponent } from '../../../../cms-structure/page/page-layout/page-layout.component';
import { CmsPageGuard } from '../../../../cms-structure/guards/cms-page.guard';
import { TableModule } from '../../../../shared/components/table/table.module';
import { UserGroupDetailsComponent } from './user-group-details.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'userGroupDetails' },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        UserGroupDetailsComponent: {
          component: UserGroupDetailsComponent,
          guards: [AuthGuard],
        },
      },
    }),
    UrlModule,
    I18nModule,
    TableModule,
  ],
  declarations: [UserGroupDetailsComponent],
  exports: [UserGroupDetailsComponent],
  entryComponents: [UserGroupDetailsComponent],
})
export class UserGroupDetailsModule {}
