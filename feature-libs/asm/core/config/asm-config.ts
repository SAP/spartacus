import { Injectable } from '@angular/core';
import { CustomerListColumnActionType } from '@spartacus/asm/root';
import { Config, OccConfig, User } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class AsmConfig extends OccConfig {
  asm?: {
    agentSessionTimer?: {
      startingDelayInSeconds?: number;
    };
    customerSearch?: {
      maxResults?: number;
    };
    customerList?: {
      pageSize?: number;
      showAvatar?: boolean;
      columns?: {
        headerLocalizationKey: string;
        icon?: {
          symbol?: ICON_TYPE;
          captionLocalizationKey?: string;
        };
        renderer?: (customer: User) => string;
        actionType?: CustomerListColumnActionType;
      }[];
    };
  };
}

declare module '@spartacus/core' {
  interface Config extends AsmConfig {}
}
