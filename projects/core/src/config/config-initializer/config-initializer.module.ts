import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigInitializerService } from './config-initializer.service';
import { ConfigChunk } from '../config.module';

function configInitializerFactory(configInitializer: ConfigInitializerService) {
  return async () => configInitializer.initialize();
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
          provide: ConfigChunk,
          multi: true,
          useValue: {
            initializing: true,
          },
        },
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
