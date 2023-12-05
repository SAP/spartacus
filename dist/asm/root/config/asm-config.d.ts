import { User } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { CustomerListColumnActionType } from '../model/customer-list.model';
import * as i0 from "@angular/core";
export declare abstract class AsmConfig {
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
        userIdHttpHeader?: {
            /**
             * To fix certain features when a customer agent is emulating a user, we must send a header called
             * "sap-commerce-cloud-user-id" to the backend fetching certain data as the user, rather than the
             * agent. However, the header will break instances of Commerce Cloud who do not allow requests with
             * this header. (For example, the configuration "corsfilter.commercewebservices.allowedHeaders" will
             * need to allow it.)
             *
             * Enabling this feature will send the emulated user's IDs on requests that need it as context.
             */
            enable?: boolean;
        };
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AsmConfig>;
}
declare module '@spartacus/core' {
    interface Config extends AsmConfig {
    }
}
