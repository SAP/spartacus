import { DOCUMENT } from '@angular/common';
import {
  APP_INITIALIZER,
  ModuleWithProviders,
  NgModule,
  Optional,
} from '@angular/core';
import { TransferData } from '../util/transfer-data';
import { ExternalConfig } from './external-config';

export const EXTERNAL_CONFIG_TRANSFER_ID = 'cx-external-config';

export function transferExternalConfig(
  document: Document,
  config?: ExternalConfig
) {
  const result = () => {
    if (config) {
      TransferData.transfer(EXTERNAL_CONFIG_TRANSFER_ID, config, document);
    }
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
          deps: [DOCUMENT, [new Optional(), ExternalConfig]],
        },
      ],
    };
  }
}
