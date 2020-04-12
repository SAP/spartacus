import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  CxDatePipe,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { InteractiveTableModule } from '../../../../shared/components/interactive-table/interactive-table.module';
import { B2BUserListComponent } from './b2b-user-list.component';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ManageB2BUserListComponent: {
          component: B2BUserListComponent,
          guards: [AuthGuard],
        },
      },
    }),
    RouterModule,
    UrlModule,
    I18nModule,
    InteractiveTableModule,
  ],
  declarations: [B2BUserListComponent],
  exports: [B2BUserListComponent],
  providers: [CxDatePipe],
  entryComponents: [B2BUserListComponent],
})
export class B2BUserListModule {}
