import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { CmsPageGuard } from '../../../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../../cms-structure/page/page-layout/page-layout.component';
import { InteractiveTableModule } from '../../../../shared/components/interactive-table/interactive-table.module';
import { FakeTabsModule } from '../../fake-tabs/fake-tabs.module';
import { UserAssignApproversComponent } from './user-assign-approvers.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'userAssignApprovers' },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        UserAssignApproversComponent: {
          component: UserAssignApproversComponent,
          guards: [AuthGuard],
        },
      },
    }),
    UrlModule,
    I18nModule,
    InteractiveTableModule,
    NgSelectModule,
    FormsModule,
    FakeTabsModule,
  ],
  declarations: [UserAssignApproversComponent],
  exports: [UserAssignApproversComponent],
  providers: [],
  entryComponents: [UserAssignApproversComponent],
})
export class UserAssignApproversModule {}
