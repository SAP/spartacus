import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { ConfigInitializerService, provideConfig } from '@spartacus/core';
import { CdcConfig } from './config/cdc-config';
import { CdcJsService } from './facade/cdc-js.service';

export function cdcJsFactory(
  cdcJsService: CdcJsService,
  configInit: ConfigInitializerService
) {
  const func = () =>
    configInit.getStableConfig('context', 'cdc').then(() => {
      cdcJsService.initialize();
    });
  return func;
}

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class CdcRootModule {
  static forRoot(config: CdcConfig): ModuleWithProviders<CdcRootModule> {
    return {
      ngModule: CdcRootModule,
      providers: [
        provideConfig(config),
        {
          provide: APP_INITIALIZER,
          useFactory: cdcJsFactory,
          deps: [CdcJsService, ConfigInitializerService],
          multi: true,
        },
      ],
    };
  }
}
