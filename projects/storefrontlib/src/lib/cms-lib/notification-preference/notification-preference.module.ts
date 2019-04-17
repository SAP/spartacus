import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationPreferenceComponent } from './components/notification-preference.component';
import { UserService } from '@spartacus/core';
import { CmsConfig, ConfigModule, UrlTranslationModule } from '@spartacus/core';
import { ComponentsModule } from '../../ui/components/components.module';
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
    UrlTranslationModule,
    ComponentsModule,
  ],
  exports: [NotificationPreferenceComponent],
  providers: [UserService],
  entryComponents: [NotificationPreferenceComponent],
})
export class NotificationPreferenceModule {}
