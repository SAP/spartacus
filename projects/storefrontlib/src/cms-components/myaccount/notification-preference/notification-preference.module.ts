import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationPreferenceComponent } from './components/notification-preference.component';
import { UserService } from '@spartacus/core';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
@NgModule({
  declarations: [NotificationPreferenceComponent],
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        NotificationPreferenceComponent: {
          selector: 'cx-notification-preference',
        },
      },
    }),
    SpinnerModule,
    I18nModule,
  ],
  exports: [NotificationPreferenceComponent],
  providers: [UserService],
  entryComponents: [NotificationPreferenceComponent],
})
export class NotificationPreferenceModule {}
