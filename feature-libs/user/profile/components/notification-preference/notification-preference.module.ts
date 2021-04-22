import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { NotificationPreferenceComponent } from './notification-preference.component';
import { NotificationPreferenceComponentService } from './notification-preference.service';

@NgModule({
  declarations: [NotificationPreferenceComponent],
  imports: [CommonModule, ReactiveFormsModule, SpinnerModule, I18nModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        NotificationPreferenceComponent: {
          component: NotificationPreferenceComponent,
          guards: [AuthGuard],
          providers: [
            {
              provide: NotificationPreferenceComponentService,
            },
          ],
        },
      },
    }),
  ],
})
export class NotificationPreferenceModule {}
