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
import { UserAssignUserGroupsComponent } from './user-assign-user-groups.component';
import { PageLayoutComponent } from '../../../../cms-structure/page/page-layout/page-layout.component';
import { CmsPageGuard } from '../../../../cms-structure/guards/cms-page.guard';
import { InteractiveTableModule } from '../../../../shared/components/interactive-table/interactive-table.module';
import { FakeTabsModule } from '../../fake-tabs/fake-tabs.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'userAssignUserGroups' },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        UserAssignUserGroupsComponent: {
          component: UserAssignUserGroupsComponent,
          guards: [AuthGuard],
        },
      },
    }),
    UrlModule,
    I18nModule,
    InteractiveTableModule,
    FakeTabsModule,
  ],
  declarations: [UserAssignUserGroupsComponent],
  exports: [UserAssignUserGroupsComponent],
  providers: [],
  entryComponents: [UserAssignUserGroupsComponent],
})
export class UserAssignUserGroupsModule {}
