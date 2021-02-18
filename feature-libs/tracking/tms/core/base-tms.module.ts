import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { TmsService } from './services/tms.service';

/**
 * The factory that conditionally (based on the configuration) starts collecting events
 */
export function tmsFactory(service: TmsService): () => void {
  const result = () => service.collect();
  return result;
}

@NgModule({})
export class BaseTmsModule {
  static forRoot(): ModuleWithProviders<BaseTmsModule> {
    return {
      ngModule: BaseTmsModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: tmsFactory,
          deps: [TmsService],
          multi: true,
        },
      ],
    };
  }
}
