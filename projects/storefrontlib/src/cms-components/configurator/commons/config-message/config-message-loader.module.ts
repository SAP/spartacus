import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { PageComponentModule } from '../../../../cms-structure/page/component/page-component.module';
import { ConfigMessageEnablerService } from './service/config-message-enabler.service';

@NgModule({
  imports: [CommonModule, PageComponentModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: bannerFactory,
      deps: [ConfigMessageEnablerService],
      multi: true,
    },
  ],
})
export class ConfigurationMessageLoaderModule {}

export function bannerFactory(
  configMessageEnable: ConfigMessageEnablerService
) {
  const isReady = () => {
    configMessageEnable.load();
  };
  return isReady;
}
