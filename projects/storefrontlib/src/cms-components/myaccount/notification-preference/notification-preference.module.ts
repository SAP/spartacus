import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { NotificationPreferenceComponent } from './notification-preference.component';

@NgModule({
  declarations: [NotificationPreferenceComponent],
  imports: [
    CommonModule,
    SpinnerModule,
    I18nModule,
    UrlModule,
    // RouterModule.forChild([
    //   {
    //     path: null,
    //     canActivate: [AuthGuard, CmsPageGuard],
    //     component: PageLayoutComponent,
    //     data: { cxRoute: 'notificationPreference' },
    //   },
    // ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        NotificationPreferenceComponent: {
          component: NotificationPreferenceComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  exports: [NotificationPreferenceComponent],
  entryComponents: [NotificationPreferenceComponent],
})
export class NotificationPreferenceModule {}
