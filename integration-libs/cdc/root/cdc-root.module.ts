import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { ConfigInitializerService, provideConfig } from '@spartacus/core';
import { LogoutGuard } from '@spartacus/storefront';
import { CdcAuthModule } from './auth/cdc-auth.module';
import { CdcComponentsModule } from './components/cdc-components.module';
import { CdcConfig } from './config/cdc-config';
import { CdcJsService } from './facade/cdc-js.service';
import { CdcLogoutGuard } from './guards/cdc-logout.guard';

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
  providers: [{ provide: LogoutGuard, useExisting: CdcLogoutGuard }],
  imports: [CommonModule, CdcAuthModule, CdcComponentsModule],
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
