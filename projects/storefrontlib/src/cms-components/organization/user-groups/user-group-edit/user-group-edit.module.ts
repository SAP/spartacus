import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
} from '@spartacus/core';
import { UserGroupEditComponent } from './user-group-edit.component';
import { RouterModule } from '@angular/router';
import { CmsPageGuard } from '../../../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../../cms-structure/page/page-layout/page-layout.component';
import { UserGroupFormModule } from '../user-group-form/user-group-form.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'userGroupEdit' },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        UserGroupEditComponent: {
          component: UserGroupEditComponent,
          guards: [AuthGuard],
        },
      },
    }),
    UserGroupFormModule,
    I18nModule,
  ],
  declarations: [UserGroupEditComponent],
  exports: [UserGroupEditComponent],
  entryComponents: [UserGroupEditComponent],
})
export class UserGroupEditModule {}
