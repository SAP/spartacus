/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, inject, isDevMode } from '@angular/core';
import { LoggerService } from '@spartacus/core';
import { ConfigurationInfoFields, ConfigurationInfoSpecialFields, } from '../../core/model/common-configurator.model';
import * as i0 from "@angular/core";
/**
 * Service for mapping of the CPQ line items from order entry
 */
export class ConfiguratorCartEntryBundleInfoService {
    constructor() {
        this.logger = inject(LoggerService);
    }
    /**
     * Retrieves the CPQ line items for an order entry
     *
     * @param {OrderEntry} entry - Order entry
     * @returns {LineItem[]} - Line item array
     */
    retrieveLineItems(entry) {
        let lineItems = [];
        if (entry.configurationInfos) {
            const configurationInfos = entry.configurationInfos.filter((configurationInfo) => configurationInfo &&
                (configurationInfo.configurationLabel ||
                    configurationInfo.configurationValue));
            const firstLabel = configurationInfos[0]?.configurationLabel;
            const firstValue = configurationInfos[0]?.configurationValue;
            if (firstLabel !== ConfigurationInfoSpecialFields.VERSION) {
                configurationInfos.forEach((configurationInfo) => lineItems.push(this.prepareLineItem(configurationInfo)));
            }
            else if (firstLabel === ConfigurationInfoSpecialFields.VERSION &&
                Number(firstValue) >= 2) {
                lineItems = this.processConfigurationInfos(configurationInfos);
            }
            else {
                this.logWarning('Wrong ConfigurationInfo version');
            }
        }
        return lineItems;
    }
    prepareLineItem(configurationInfo) {
        const quantityAndPrice = configurationInfo.configurationValue
            ? configurationInfo.configurationValue.split('x')
            : [];
        return {
            name: configurationInfo.configurationLabel
                ? this.removeDelimiter(configurationInfo.configurationLabel)
                : '',
            formattedQuantity: quantityAndPrice.length >= 1 ? quantityAndPrice[0].trim() : '',
            formattedPrice: quantityAndPrice.length >= 2 ? quantityAndPrice[1].trim() : '',
        };
    }
    removeDelimiter(label) {
        let preparedLabel = label.trim();
        const lastCharacter = preparedLabel.charAt(preparedLabel.length - 1);
        if (lastCharacter === ':') {
            preparedLabel = preparedLabel.substring(0, preparedLabel.length - 1);
        }
        return preparedLabel;
    }
    processConfigurationInfos(configurationInfos) {
        const lineItemMap = new Map();
        configurationInfos.forEach((configurationInfo) => this.processConfigurationInfoEntry(lineItemMap, configurationInfo));
        // sort
        const lineItemMapSorted = new Map(Array.from(lineItemMap).sort((a, b) => {
            return a[0] - b[0];
        }));
        // convert to array
        const lineItems = Array.from(lineItemMapSorted.values());
        return lineItems;
    }
    processConfigurationInfoEntry(lineItemMap, configurationInfo) {
        if (configurationInfo.configurationLabel) {
            const configurationInfoSplit = configurationInfo.configurationLabel.split(ConfigurationInfoSpecialFields.LINE_ITEM_DELIMITER);
            if (configurationInfoSplit[0] === ConfigurationInfoSpecialFields.LINE_ITEM) {
                const configurationInfoValue = configurationInfo.configurationValue
                    ? configurationInfo.configurationValue
                    : '';
                this.addLineItemData(lineItemMap, configurationInfoSplit, configurationInfoValue);
            }
        }
    }
    addLineItemData(lineItemMap, configurationInfoSplit, configurationInfoValue) {
        if (configurationInfoSplit.length === 3) {
            const lineItemNumber = Number(configurationInfoSplit[1]);
            let lineItem;
            switch (configurationInfoSplit[2]) {
                case ConfigurationInfoFields.NAME:
                    lineItem = this.getOrCreateLineItem(lineItemMap, lineItemNumber);
                    lineItem.name = configurationInfoValue;
                    break;
                case ConfigurationInfoFields.QTY:
                    lineItem = this.getOrCreateLineItem(lineItemMap, lineItemNumber);
                    lineItem.formattedQuantity = configurationInfoValue;
                    break;
                case ConfigurationInfoFields.FORMATTED_PRICE:
                    lineItem = this.getOrCreateLineItem(lineItemMap, lineItemNumber);
                    lineItem.formattedPrice = configurationInfoValue;
                    break;
                case ConfigurationInfoFields.KEY:
                case ConfigurationInfoFields.PRICE_VALUE:
                    break;
                default: {
                    this.logWarning('Wrong LineItem format');
                }
            }
        }
        else {
            this.logWarning('Wrong LineItem format');
        }
    }
    getOrCreateLineItem(lineItemMap, lineItemNumber) {
        const lineItem = lineItemMap.get(lineItemNumber) ?? {
            name: '',
            formattedQuantity: '',
            formattedPrice: '',
        };
        if (!lineItemMap.get(lineItemNumber)) {
            lineItemMap.set(lineItemNumber, lineItem);
        }
        return lineItem;
    }
    logWarning(text) {
        if (isDevMode()) {
            this.logger.warn(text);
        }
    }
}
ConfiguratorCartEntryBundleInfoService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCartEntryBundleInfoService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorCartEntryBundleInfoService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCartEntryBundleInfoService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCartEntryBundleInfoService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWNhcnQtZW50cnktYnVuZGxlLWluZm8uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9jb21tb24vY29tcG9uZW50cy9jb25maWd1cmF0b3ItY2FydC1lbnRyeS1idW5kbGUtaW5mby9jb25maWd1cmF0b3ItY2FydC1lbnRyeS1idW5kbGUtaW5mby5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2hELE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsOEJBQThCLEdBQy9CLE1BQU0sNENBQTRDLENBQUM7O0FBR3BEOztHQUVHO0FBRUgsTUFBTSxPQUFPLHNDQUFzQztJQURuRDtRQUVZLFdBQU0sR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7S0FpSzFDO0lBL0pDOzs7OztPQUtHO0lBQ0gsaUJBQWlCLENBQUMsS0FBaUI7UUFDakMsSUFBSSxTQUFTLEdBQWUsRUFBRSxDQUFDO1FBQy9CLElBQUksS0FBSyxDQUFDLGtCQUFrQixFQUFFO1lBQzVCLE1BQU0sa0JBQWtCLEdBQ3RCLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQzdCLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxDQUNwQixpQkFBaUI7Z0JBQ2pCLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCO29CQUNuQyxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxDQUMxQyxDQUFDO1lBQ0osTUFBTSxVQUFVLEdBQUcsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLEVBQUUsa0JBQWtCLENBQUM7WUFDN0QsTUFBTSxVQUFVLEdBQUcsa0JBQWtCLENBQUMsQ0FB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IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgaW5qZWN0LCBpc0Rldk1vZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9yZGVyRW50cnkgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7IExvZ2dlclNlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ29uZmlndXJhdGlvbkluZm8sXG4gIENvbmZpZ3VyYXRpb25JbmZvRmllbGRzLFxuICBDb25maWd1cmF0aW9uSW5mb1NwZWNpYWxGaWVsZHMsXG59IGZyb20gJy4uLy4uL2NvcmUvbW9kZWwvY29tbW9uLWNvbmZpZ3VyYXRvci5tb2RlbCc7XG5pbXBvcnQgeyBMaW5lSXRlbSB9IGZyb20gJy4vY29uZmlndXJhdG9yLWNhcnQtZW50cnktYnVuZGxlLWluZm8ubW9kZWwnO1xuXG4vKipcbiAqIFNlcnZpY2UgZm9yIG1hcHBpbmcgb2YgdGhlIENQUSBsaW5lIGl0ZW1zIGZyb20gb3JkZXIgZW50cnlcbiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0b3JDYXJ0RW50cnlCdW5kbGVJbmZvU2VydmljZSB7XG4gIHByb3RlY3RlZCBsb2dnZXIgPSBpbmplY3QoTG9nZ2VyU2VydmljZSk7XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyB0aGUgQ1BRIGxpbmUgaXRlbXMgZm9yIGFuIG9yZGVyIGVudHJ5XG4gICAqXG4gICAqIEBwYXJhbSB7T3JkZXJFbnRyeX0gZW50cnkgLSBPcmRlciBlbnRyeVxuICAgKiBAcmV0dXJucyB7TGluZUl0ZW1bXX0gLSBMaW5lIGl0ZW0gYXJyYXlcbiAgICovXG4gIHJldHJpZXZlTGluZUl0ZW1zKGVudHJ5OiBPcmRlckVudHJ5KTogTGluZUl0ZW1bXSB7XG4gICAgbGV0IGxpbmVJdGVtczogTGluZUl0ZW1bXSA9IFtdO1xuICAgIGlmIChlbnRyeS5jb25maWd1cmF0aW9uSW5mb3MpIHtcbiAgICAgIGNvbnN0IGNvbmZpZ3VyYXRpb25JbmZvczogQ29uZmlndXJhdGlvbkluZm9bXSA9XG4gICAgICAgIGVudHJ5LmNvbmZpZ3VyYXRpb25JbmZvcy5maWx0ZXIoXG4gICAgICAgICAgKGNvbmZpZ3VyYXRpb25JbmZvKSA9PlxuICAgICAgICAgICAgY29uZmlndXJhdGlvbkluZm8gJiZcbiAgICAgICAgICAgIChjb25maWd1cmF0aW9uSW5mby5jb25maWd1cmF0aW9uTGFiZWwgfHxcbiAgICAgICAgICAgICAgY29uZmlndXJhdGlvbkluZm8uY29uZmlndXJhdGlvblZhbHVlKVxuICAgICAgICApO1xuICAgICAgY29uc3QgZmlyc3RMYWJlbCA9IGNvbmZpZ3VyYXRpb25JbmZvc1swXT8uY29uZmlndXJhdGlvbkxhYmVsO1xuICAgICAgY29uc3QgZmlyc3RWYWx1ZSA9IGNvbmZpZ3VyYXRpb25JbmZvc1swXT8uY29uZmlndXJhdGlvblZhbHVlO1xuXG4gICAgICBpZiAoZmlyc3RMYWJlbCAhPT0gQ29uZmlndXJhdGlvbkluZm9TcGVjaWFsRmllbGRzLlZFUlNJT04pIHtcbiAgICAgICAgY29uZmlndXJhdGlvbkluZm9zLmZvckVhY2goKGNvbmZpZ3VyYXRpb25JbmZvKSA9PlxuICAgICAgICAgIGxpbmVJdGVtcy5wdXNoKHRoaXMucHJlcGFyZUxpbmVJdGVtKGNvbmZpZ3VyYXRpb25JbmZvKSlcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIGZpcnN0TGFiZWwgPT09IENvbmZpZ3VyYXRpb25JbmZvU3BlY2lhbEZpZWxkcy5WRVJTSU9OICYmXG4gICAgICAgIE51bWJlcihmaXJzdFZhbHVlKSA+PSAyXG4gICAgICApIHtcbiAgICAgICAgbGluZUl0ZW1zID0gdGhpcy5wcm9jZXNzQ29uZmlndXJhdGlvbkluZm9zKGNvbmZpZ3VyYXRpb25JbmZvcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxvZ1dhcm5pbmcoJ1dyb25nIENvbmZpZ3VyYXRpb25JbmZvIHZlcnNpb24nKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGxpbmVJdGVtcztcbiAgfVxuXG4gIHByb3RlY3RlZCBwcmVwYXJlTGluZUl0ZW0oY29uZmlndXJhdGlvbkluZm86IENvbmZpZ3VyYXRpb25JbmZvKTogTGluZUl0ZW0ge1xuICAgIGNvbnN0IHF1YW50aXR5QW5kUHJpY2U6IHN0cmluZ1tdID0gY29uZmlndXJhdGlvbkluZm8uY29uZmlndXJhdGlvblZhbHVlXG4gICAgICA/IGNvbmZpZ3VyYXRpb25JbmZvLmNvbmZpZ3VyYXRpb25WYWx1ZS5zcGxpdCgneCcpXG4gICAgICA6IFtdO1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiBjb25maWd1cmF0aW9uSW5mby5jb25maWd1cmF0aW9uTGFiZWxcbiAgICAgICAgPyB0aGlzLnJlbW92ZURlbGltaXRlcihjb25maWd1cmF0aW9uSW5mby5jb25maWd1cmF0aW9uTGFiZWwpXG4gICAgICAgIDogJycsXG4gICAgICBmb3JtYXR0ZWRRdWFudGl0eTpcbiAgICAgICAgcXVhbnRpdHlBbmRQcmljZS5sZW5ndGggPj0gMSA/IHF1YW50aXR5QW5kUHJpY2VbMF0udHJpbSgpIDogJycsXG4gICAgICBmb3JtYXR0ZWRQcmljZTpcbiAgICAgICAgcXVhbnRpdHlBbmRQcmljZS5sZW5ndGggPj0gMiA/IHF1YW50aXR5QW5kUHJpY2VbMV0udHJpbSgpIDogJycsXG4gICAgfTtcbiAgfVxuXG4gIHByb3RlY3RlZCByZW1vdmVEZWxpbWl0ZXIobGFiZWw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgbGV0IHByZXBhcmVkTGFiZWw6IHN0cmluZyA9IGxhYmVsLnRyaW0oKTtcblxuICAgIGNvbnN0IGxhc3RDaGFyYWN0ZXI6IHN0cmluZyA9IHByZXBhcmVkTGFiZWwuY2hhckF0KFxuICAgICAgcHJlcGFyZWRMYWJlbC5sZW5ndGggLSAxXG4gICAgKTtcbiAgICBpZiAobGFzdENoYXJhY3RlciA9PT0gJzonKSB7XG4gICAgICBwcmVwYXJlZExhYmVsID0gcHJlcGFyZWRMYWJlbC5zdWJzdHJpbmcoMCwgcHJlcGFyZWRMYWJlbC5sZW5ndGggLSAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJlcGFyZWRMYWJlbDtcbiAgfVxuXG4gIHByb3RlY3RlZCBwcm9jZXNzQ29uZmlndXJhdGlvbkluZm9zKFxuICAgIGNvbmZpZ3VyYXRpb25JbmZvczogQ29uZmlndXJhdGlvbkluZm9bXVxuICApOiBMaW5lSXRlbVtdIHtcbiAgICBjb25zdCBsaW5lSXRlbU1hcDogTWFwPG51bWJlciwgTGluZUl0ZW0+ID0gbmV3IE1hcCgpO1xuICAgIGNvbmZpZ3VyYXRpb25JbmZvcy5mb3JFYWNoKChjb25maWd1cmF0aW9uSW5mbykgPT5cbiAgICAgIHRoaXMucHJvY2Vzc0NvbmZpZ3VyYXRpb25JbmZvRW50cnkobGluZUl0ZW1NYXAsIGNvbmZpZ3VyYXRpb25JbmZvKVxuICAgICk7XG4gICAgLy8gc29ydFxuICAgIGNvbnN0IGxpbmVJdGVtTWFwU29ydGVkOiBNYXA8bnVtYmVyLCBMaW5lSXRlbT4gPSBuZXcgTWFwPG51bWJlciwgTGluZUl0ZW0+KFxuICAgICAgQXJyYXkuZnJvbShsaW5lSXRlbU1hcCkuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICByZXR1cm4gYVswXSAtIGJbMF07XG4gICAgICB9KVxuICAgICk7XG4gICAgLy8gY29udmVydCB0byBhcnJheVxuICAgIGNvbnN0IGxpbmVJdGVtczogTGluZUl0ZW1bXSA9IEFycmF5LmZyb20obGluZUl0ZW1NYXBTb3J0ZWQudmFsdWVzKCkpO1xuICAgIHJldHVybiBsaW5lSXRlbXM7XG4gIH1cblxuICBwcm90ZWN0ZWQgcHJvY2Vzc0NvbmZpZ3VyYXRpb25JbmZvRW50cnkoXG4gICAgbGluZUl0ZW1NYXA6IE1hcDxudW1iZXIsIExpbmVJdGVtPixcbiAgICBjb25maWd1cmF0aW9uSW5mbzogQ29uZmlndXJhdGlvbkluZm9cbiAgKTogdm9pZCB7XG4gICAgaWYgKGNvbmZpZ3VyYXRpb25JbmZvLmNvbmZpZ3VyYXRpb25MYWJlbCkge1xuICAgICAgY29uc3QgY29uZmlndXJhdGlvbkluZm9TcGxpdDogc3RyaW5nW10gPVxuICAgICAgICBjb25maWd1cmF0aW9uSW5mby5jb25maWd1cmF0aW9uTGFiZWwuc3BsaXQoXG4gICAgICAgICAgQ29uZmlndXJhdGlvbkluZm9TcGVjaWFsRmllbGRzLkxJTkVfSVRFTV9ERUxJTUlURVJcbiAgICAgICAgKTtcbiAgICAgIGlmIChcbiAgICAgICAgY29uZmlndXJhdGlvbkluZm9TcGxpdFswXSA9PT0gQ29uZmlndXJhdGlvbkluZm9TcGVjaWFsRmllbGRzLkxJTkVfSVRFTVxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IGNvbmZpZ3VyYXRpb25JbmZvVmFsdWU6IHN0cmluZyA9XG4gICAgICAgICAgY29uZmlndXJhdGlvbkluZm8uY29uZmlndXJhdGlvblZhbHVlXG4gICAgICAgICAgICA/IGNvbmZpZ3VyYXRpb25JbmZvLmNvbmZpZ3VyYXRpb25WYWx1ZVxuICAgICAgICAgICAgOiAnJztcbiAgICAgICAgdGhpcy5hZGRMaW5lSXRlbURhdGEoXG4gICAgICAgICAgbGluZUl0ZW1NYXAsXG4gICAgICAgICAgY29uZmlndXJhdGlvbkluZm9TcGxpdCxcbiAgICAgICAgICBjb25maWd1cmF0aW9uSW5mb1ZhbHVlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGFkZExpbmVJdGVtRGF0YShcbiAgICBsaW5lSXRlbU1hcDogTWFwPG51bWJlciwgTGluZUl0ZW0+LFxuICAgIGNvbmZpZ3VyYXRpb25JbmZvU3BsaXQ6IHN0cmluZ1tdLFxuICAgIGNvbmZpZ3VyYXRpb25JbmZvVmFsdWU6IHN0cmluZ1xuICApOiB2b2lkIHtcbiAgICBpZiAoY29uZmlndXJhdGlvbkluZm9TcGxpdC5sZW5ndGggPT09IDMpIHtcbiAgICAgIGNvbnN0IGxpbmVJdGVtTnVtYmVyOiBudW1iZXIgPSBOdW1iZXIoY29uZmlndXJhdGlvbkluZm9TcGxpdFsxXSk7XG4gICAgICBsZXQgbGluZUl0ZW06IExpbmVJdGVtO1xuICAgICAgc3dpdGNoIChjb25maWd1cmF0aW9uSW5mb1NwbGl0WzJdKSB7XG4gICAgICAgIGNhc2UgQ29uZmlndXJhdGlvbkluZm9GaWVsZHMuTkFNRTpcbiAgICAgICAgICBsaW5lSXRlbSA9IHRoaXMuZ2V0T3JDcmVhdGVMaW5lSXRlbShsaW5lSXRlbU1hcCwgbGluZUl0ZW1OdW1iZXIpO1xuICAgICAgICAgIGxpbmVJdGVtLm5hbWUgPSBjb25maWd1cmF0aW9uSW5mb1ZhbHVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIENvbmZpZ3VyYXRpb25JbmZvRmllbGRzLlFUWTpcbiAgICAgICAgICBsaW5lSXRlbSA9IHRoaXMuZ2V0T3JDcmVhdGVMaW5lSXRlbShsaW5lSXRlbU1hcCwgbGluZUl0ZW1OdW1iZXIpO1xuICAgICAgICAgIGxpbmVJdGVtLmZvcm1hdHRlZFF1YW50aXR5ID0gY29uZmlndXJhdGlvbkluZm9WYWx1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBDb25maWd1cmF0aW9uSW5mb0ZpZWxkcy5GT1JNQVRURURfUFJJQ0U6XG4gICAgICAgICAgbGluZUl0ZW0gPSB0aGlzLmdldE9yQ3JlYXRlTGluZUl0ZW0obGluZUl0ZW1NYXAsIGxpbmVJdGVtTnVtYmVyKTtcbiAgICAgICAgICBsaW5lSXRlbS5mb3JtYXR0ZWRQcmljZSA9IGNvbmZpZ3VyYXRpb25JbmZvVmFsdWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQ29uZmlndXJhdGlvbkluZm9GaWVsZHMuS0VZOlxuICAgICAgICBjYXNlIENvbmZpZ3VyYXRpb25JbmZvRmllbGRzLlBSSUNFX1ZBTFVFOlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgdGhpcy5sb2dXYXJuaW5nKCdXcm9uZyBMaW5lSXRlbSBmb3JtYXQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxvZ1dhcm5pbmcoJ1dyb25nIExpbmVJdGVtIGZvcm1hdCcpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRPckNyZWF0ZUxpbmVJdGVtKFxuICAgIGxpbmVJdGVtTWFwOiBNYXA8bnVtYmVyLCBMaW5lSXRlbT4sXG4gICAgbGluZUl0ZW1OdW1iZXI6IG51bWJlclxuICApOiBMaW5lSXRlbSB7XG4gICAgY29uc3QgbGluZUl0ZW06IExpbmVJdGVtID0gbGluZUl0ZW1NYXAuZ2V0KGxpbmVJdGVtTnVtYmVyKSA/PyB7XG4gICAgICBuYW1lOiAnJyxcbiAgICAgIGZvcm1hdHRlZFF1YW50aXR5OiAnJyxcbiAgICAgIGZvcm1hdHRlZFByaWNlOiAnJyxcbiAgICB9O1xuICAgIGlmICghbGluZUl0ZW1NYXAuZ2V0KGxpbmVJdGVtTnVtYmVyKSkge1xuICAgICAgbGluZUl0ZW1NYXAuc2V0KGxpbmVJdGVtTnVtYmVyLCBsaW5lSXRlbSk7XG4gICAgfVxuICAgIHJldHVybiBsaW5lSXRlbTtcbiAgfVxuXG4gIHByb3RlY3RlZCBsb2dXYXJuaW5nKHRleHQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChpc0Rldk1vZGUoKSkge1xuICAgICAgdGhpcy5sb2dnZXIud2Fybih0ZXh0KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==