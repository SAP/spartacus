import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { TmsConfig } from './config/tms-config';
import { TmsService } from './services/tms.service';

/**
 * The factory that conditionally (based on the configuration) starts collecting events
 */
export function tmsFactory(service: TmsService): () => void {
  const result = () => service.collect();
  return result;
}

@NgModule({})
export class TmsCoreModule {
  static forRoot(config?: TmsConfig): ModuleWithProviders<TmsCoreModule> {
    return {
      ngModule: TmsCoreModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: tmsFactory,
          deps: [TmsService],
          multi: true,
        },
        provideConfig(config),
      ],
    };
  }
}
