import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
} from '@spartacus/core';
import { B2BUserEditComponent } from './b2b-user-edit.component';
import { RouterModule } from '@angular/router';
import { CmsPageGuard } from '../../../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../../cms-structure/page/page-layout/page-layout.component';
import { B2BUserFormModule } from '../b2b-user-form/b2b-user-form.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'b2bUserEdit' },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        B2BUserEditComponent: {
          component: B2BUserEditComponent,
          guards: [AuthGuard],
        },
      },
    }),
    B2BUserFormModule,
    I18nModule,
  ],
  declarations: [B2BUserEditComponent],
  exports: [B2BUserEditComponent],
  entryComponents: [B2BUserEditComponent],
})
export class B2BUserEditModule {}
