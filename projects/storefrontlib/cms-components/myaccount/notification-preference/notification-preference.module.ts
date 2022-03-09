import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { NotificationPreferenceComponent } from './notification-preference.component';
import { RouterModule } from '@angular/router';
import { CmsPageGuard, PageLayoutComponent } from '../../../cms-structure';

@NgModule({
  declarations: [NotificationPreferenceComponent],
  imports: [
    CommonModule,
    SpinnerModule,
    I18nModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [AuthGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'notificationPreference' }
      },
    ]),
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        NotificationPreferenceComponent: {
          component: NotificationPreferenceComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  exports: [NotificationPreferenceComponent],
})
export class NotificationPreferenceModule {}
