import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { PermissionDetailsComponent } from './permission-details.component';
import { RouterModule } from '@angular/router';
import { PageLayoutComponent } from '../../../../cms-structure/page/page-layout/page-layout.component';
import { CmsPageGuard } from '../../../../cms-structure/guards/cms-page.guard';
import { ConfirmModalModule } from '../../../../shared/components/modal/confirm-modal/confirm-modal.module';
import { FakeTabsModule } from '../../fake-tabs/fake-tabs.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'permissionDetails' },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        PermissionDetailsComponent: {
          component: PermissionDetailsComponent,
          guards: [AuthGuard],
        },
      },
    }),
    UrlModule,
    I18nModule,
    ConfirmModalModule,
    FakeTabsModule,
  ],
  declarations: [PermissionDetailsComponent],
  exports: [PermissionDetailsComponent],
  entryComponents: [PermissionDetailsComponent],
})
export class PermissionDetailsModule {}
