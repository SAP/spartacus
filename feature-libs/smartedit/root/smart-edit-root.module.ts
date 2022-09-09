import { APP_INITIALIZER, NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultSmartEditConfig } from './config/default-smart-edit-config';
import { interceptors } from './http-interceptors/index';
import { SmartEditLauncherService } from './services/smart-edit-launcher.service';

export function smartEditFactory(
  smartEditLauncherService: SmartEditLauncherService
): () => void {
  const isReady = () => {
    smartEditLauncherService.load();
  };
  return isReady;
}

@NgModule({
  providers: [
    ...interceptors,
    provideDefaultConfig(defaultSmartEditConfig),
    {
      provide: APP_INITIALIZER,
      useFactory: smartEditFactory,
      deps: [SmartEditLauncherService],
      multi: true,
    },
  ],
})
export class SmartEditRootModule {}
