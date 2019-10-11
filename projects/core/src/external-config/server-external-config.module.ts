import { DOCUMENT } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { TransferData } from '../util/transfer-data';
import { ExternalConfig } from './external-config';

export const EXTERNAL_CONFIG_TRANSFER_SCRIPT_ID = 'cx-external-config';

export function transferExternalConfig(
  config: ExternalConfig,
  document: Document
) {
  const result = () => {
    TransferData.transfer(EXTERNAL_CONFIG_TRANSFER_SCRIPT_ID, config, document);
  };
  return result;
}

@NgModule()
export class ServerExternalConfigModule {
  /**
   * Transfers the External Config from SSR to the browser via JSON script in the DOM.
   *
   * The reason to transfer this config is to avoid duplicate loading and calculation
   * of this config both in SSR and then in the browser.
   */
  static forRoot(): ModuleWithProviders<ServerExternalConfigModule> {
    return {
      ngModule: ServerExternalConfigModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          multi: true,
          useFactory: transferExternalConfig,
          deps: [ExternalConfig, DOCUMENT],
        },
      ],
    };
  }
}
