import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigInitializerService } from './config-initializer.service';
import { provideConfig } from '../config.module';

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
        provideConfig({
          initializing: true,
        }),
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
