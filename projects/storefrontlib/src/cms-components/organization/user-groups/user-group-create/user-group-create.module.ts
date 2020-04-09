import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
} from '@spartacus/core';
import { UserGroupCreateComponent } from './user-group-create.component';
import { UserGroupFormModule } from '../user-group-form/user-group-form.module';
import { RouterModule } from '@angular/router';
import { CmsPageGuard } from '../../../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../../cms-structure/page/page-layout/page-layout.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'userGroupCreate' },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        UserGroupCreateComponent: {
          component: UserGroupCreateComponent,
          guards: [AuthGuard],
        },
      },
    }),
    UserGroupFormModule,
    I18nModule,
  ],
  declarations: [UserGroupCreateComponent],
  exports: [UserGroupCreateComponent],
  entryComponents: [UserGroupCreateComponent],
})
export class UserGroupCreateModule {}
