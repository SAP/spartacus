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
import { Table2Module } from '../../../../shared/components/table/table.module';
import { B2BUserDetailsComponent } from './user-details.component';
import { FakeTabsModule } from '../../fake-tabs/fake-tabs.module';
import { ConfirmModalModule } from '../../../../shared/components/modal/confirm-modal/confirm-modal.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'userDetails' },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        UserDetailsComponent: {
          component: B2BUserDetailsComponent,
          guards: [AuthGuard],
        },
      },
    }),
    UrlModule,
    I18nModule,
    Table2Module,
    FakeTabsModule,
    ConfirmModalModule,
  ],
  declarations: [B2BUserDetailsComponent],
  exports: [B2BUserDetailsComponent],
  entryComponents: [B2BUserDetailsComponent],
})
export class B2BUserDetailsModule {}
