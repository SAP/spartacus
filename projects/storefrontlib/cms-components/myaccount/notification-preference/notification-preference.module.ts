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

@NgModule({
  declarations: [NotificationPreferenceComponent],
  imports: [CommonModule, SpinnerModule, I18nModule],
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
