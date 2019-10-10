import { DOCUMENT } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CxTransferState } from '../util/cx-transfer-state';
import { ExternalConfig } from './external-config';

export const EXTERNAL_CONFIG_TRANSFER_STATE_SCRIPT_ID = 'external-config';

export function transferStateExternalConfig(
  config: ExternalConfig,
  document: Document
) {
  const result = () => {
    CxTransferState.transfer(
      EXTERNAL_CONFIG_TRANSFER_STATE_SCRIPT_ID,
      config,
      document
    );
  };
  return result;
}
@NgModule()
export class ServerExternalConfigModule {
  /**
   * Loading and calculating the external config before bootstrapping the Angular is expensive, because it's blocking.
   *
   * When it's already calculated in SSR, for optimization this module transfers it via JSON script in the rendered document to the browser.
   */
  static forRoot(): ModuleWithProviders<ServerExternalConfigModule> {
    return {
      ngModule: ServerExternalConfigModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          multi: true,
          useFactory: transferStateExternalConfig,
          deps: [ExternalConfig, DOCUMENT],
        },
      ],
    };
  }
}
