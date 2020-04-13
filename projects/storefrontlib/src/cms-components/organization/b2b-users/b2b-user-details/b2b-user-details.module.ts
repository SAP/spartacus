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
import { B2BUserDetailsComponent } from './b2b-user-details.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'b2bUserDetails' },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        B2BUserDetailsComponent: {
          component: B2BUserDetailsComponent,
          guards: [AuthGuard],
        },
      },
    }),
    UrlModule,
    I18nModule,
    TableModule,
  ],
  declarations: [B2BUserDetailsComponent],
  exports: [B2BUserDetailsComponent],
  entryComponents: [B2BUserDetailsComponent],
})
export class B2BUserDetailsModule {}
