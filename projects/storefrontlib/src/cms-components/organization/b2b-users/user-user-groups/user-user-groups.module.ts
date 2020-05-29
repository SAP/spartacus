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
import { UserUserGroupsComponent } from './user-user-groups.component';
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
        data: { cxRoute: 'userUserGroups' },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        UserUserGroupsComponent: {
          component: UserUserGroupsComponent,
          guards: [AuthGuard],
        },
      },
    }),
    UrlModule,
    I18nModule,
    InteractiveTableModule,
    FakeTabsModule,
  ],
  declarations: [UserUserGroupsComponent],
  exports: [UserUserGroupsComponent],
  providers: [],
  entryComponents: [UserUserGroupsComponent],
})
export class UserUserGroupsModule {}
