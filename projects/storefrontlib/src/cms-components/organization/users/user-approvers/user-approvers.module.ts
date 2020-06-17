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
import { UserApproversComponent } from './user-approvers.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'userApprovers' },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        UserApproversComponent: {
          component: UserApproversComponent,
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
  declarations: [UserApproversComponent],
  exports: [UserApproversComponent],
  providers: [],
  entryComponents: [UserApproversComponent],
})
export class UserApproversModule {}
