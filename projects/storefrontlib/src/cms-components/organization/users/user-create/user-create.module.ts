import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
} from '@spartacus/core';
import { B2BUserCreateComponent } from './user-create.component';
import { B2BUserFormModule } from '../user-form/user-form.module';
import { RouterModule } from '@angular/router';
import { CmsPageGuard } from '../../../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../../cms-structure/page/page-layout/page-layout.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'userCreate' },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        UserCreateComponent: {
          component: B2BUserCreateComponent,
          guards: [AuthGuard],
        },
      },
    }),
    B2BUserFormModule,
    I18nModule,
  ],
  declarations: [B2BUserCreateComponent],
  exports: [B2BUserCreateComponent],
  entryComponents: [B2BUserCreateComponent],
})
export class B2BUserCreateModule {}
