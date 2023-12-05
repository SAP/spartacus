import { OrderEntry } from '@spartacus/cart/base/root';
import { LoggerService } from '@spartacus/core';
import { ConfigurationInfo } from '../../core/model/common-configurator.model';
import { LineItem } from './configurator-cart-entry-bundle-info.model';
import * as i0 from "@angular/core";
/**
 * Service for mapping of the CPQ line items from order entry
 */
export declare class ConfiguratorCartEntryBundleInfoService {
    protected logger: LoggerService;
    /**
     * Retrieves the CPQ line items for an order entry
     *
     * @param {OrderEntry} entry - Order entry
     * @returns {LineItem[]} - Line item array
     */
    retrieveLineItems(entry: OrderEntry): LineItem[];
    protected prepareLineItem(configurationInfo: ConfigurationInfo): LineItem;
    protected removeDelimiter(label: string): string;
    protected processConfigurationInfos(configurationInfos: ConfigurationInfo[]): LineItem[];
    protected processConfigurationInfoEntry(lineItemMap: Map<number, LineItem>, configurationInfo: ConfigurationInfo): void;
    protected addLineItemData(lineItemMap: Map<number, LineItem>, configurationInfoSplit: string[], configurationInfoValue: string): void;
    protected getOrCreateLineItem(lineItemMap: Map<number, LineItem>, lineItemNumber: number): LineItem;
    protected logWarning(text: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorCartEntryBundleInfoService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfiguratorCartEntryBundleInfoService>;
}
