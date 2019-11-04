import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigInitializerService } from './config-initializer.service';

export function configInitializerFactory(
  configInitializer: ConfigInitializerService
) {
  const isReady = () => configInitializer.getStableConfig();
  return isReady;
}

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class ConfigInitializerModule {
  static forRoot(): ModuleWithProviders<ConfigInitializerModule> {
    return {
      ngModule: ConfigInitializerModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          multi: true,
          useFactory: configInitializerFactory,
          deps: [ConfigInitializerService],
        },
      ],
    };
  }
}
