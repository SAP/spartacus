/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { PromotionLocation, } from '@spartacus/cart/base/root';
import { OCC_USER_ID_ANONYMOUS } from '@spartacus/core';
import { EMPTY } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderEntryStatus, } from '../../core/model/common-configurator.model';
import { ConfiguratorModelUtils } from './configurator-model-utils';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
/**
 * Utilities for generic configuration
 */
export class CommonConfiguratorUtilsService {
    constructor(userIdService) {
        this.userIdService = userIdService;
    }
    /**
     * Compiles a unique key for a configuration owner and sets it into the 'key'
     * attribute
     * @param {CommonConfigurator.Owner }owner - Specifies the owner of a product configuration
     */
    setOwnerKey(owner) {
        owner.key = ConfiguratorModelUtils.getOwnerKey(owner.type, owner.id);
    }
    /**
     * Composes owner ID from document ID and entry number
     * @param {string} documentId - ID of document the entry is part of, like the order or quote code
     * @param {string} entryNumber - Entry number
     * @returns {string} - owner ID
     */
    getComposedOwnerId(documentId, entryNumber) {
        return documentId + '+' + entryNumber;
    }
    /**
     * Decomposes an owner ID into documentId and entryNumber
     * @param {string} ownerId - ID of owner
     * @returns {any} object containing documentId and entryNumber
     */
    decomposeOwnerId(ownerId) {
        const parts = ownerId.split('+');
        if (parts.length !== 2) {
            throw new Error('We only expect 2 parts in ownerId, separated by +, but was: ' + ownerId);
        }
        const result = { documentId: parts[0], entryNumber: parts[1] };
        return result;
    }
    /**
     * Gets cart ID (which can be either its guid or its code)
     * @param {Cart} cart - Cart
     * @returns {string} - Cart identifier
     */
    getCartId(cart) {
        const cartId = cart?.user?.uid === OCC_USER_ID_ANONYMOUS ? cart.guid : cart?.code;
        if (!cartId) {
            throw new Error('Cart ID is not defined');
        }
        return cartId;
    }
    /**
     * Verifies whether the item has any issues.
     *
     * @param {OrderEntry} cartItem - Cart item
     * @returns {boolean} - whether there are any issues
     */
    hasIssues(cartItem) {
        return this.getNumberOfIssues(cartItem) > 0;
    }
    /**
     * Retrieves the number of issues at the cart item.
     *
     * @param {OrderEntry} cartItem - Cart item
     * @returns {number} - the number of issues at the cart item
     */
    getNumberOfIssues(cartItem) {
        let numberOfIssues = 0;
        cartItem?.statusSummaryList?.forEach((statusSummary) => {
            if (statusSummary.status === OrderEntryStatus.Error) {
                const numberOfIssuesFromStatus = statusSummary.numberOfIssues;
                numberOfIssues = numberOfIssuesFromStatus
                    ? numberOfIssuesFromStatus
                    : 0;
            }
        });
        return numberOfIssues;
    }
    /**
     * Verifies whether the configurator type is an attribute based one.
     *
     * @param {string} configuratorType - Configurator type
     * @returns {boolean} - 'True' if the expected configurator type, otherwise 'false'
     */
    isAttributeBasedConfigurator(configuratorType) {
        if (configuratorType) {
            return (configuratorType === "CPQCONFIGURATOR" /* ConfiguratorType.VARIANT */ ||
                configuratorType === "TEXTFIELD" /* ConfiguratorType.TEXTFIELD */);
        }
        return false;
    }
    /**
     * Verifies whether the configurator type is a bundle based one.
     *
     * @param {string} configuratorType - Configurator type
     * @returns {boolean} - 'True' if the expected configurator type, otherwise 'fasle'
     */
    isBundleBasedConfigurator(configuratorType) {
        if (configuratorType) {
            return configuratorType === "CLOUDCPQCONFIGURATOR" /* ConfiguratorType.CPQ */;
        }
        return false;
    }
    /**
     * Determines whether we are in the context of an active cart
     * @param cartItemContext Cart item context
     * @returns Item part of an active cart?
     */
    isActiveCartContext(cartItemContext) {
        return (cartItemContext?.location$ ?? EMPTY).pipe(map((location) => location !== PromotionLocation.SaveForLater &&
            location !== PromotionLocation.SavedCart));
    }
    /**
     * Reads slots from layout config, taking the breakpoint into account
     * @param layoutConfig Layout config
     * @param templateName Page template name
     * @param sectionName Section name like 'header'
     * @param breakPoint Current breakpoint
     * @returns Array of slots
     */
    getSlotsFromLayoutConfiguration(layoutConfig, templateName, sectionName, breakPoint) {
        const slots = layoutConfig.layoutSlots;
        if (slots) {
            const slotsForTemplate = (slots[templateName]);
            const slotGroupForSection = (slotsForTemplate[sectionName]);
            const slotConfigForBreakpoint = (slotGroupForSection[breakPoint]);
            return slotConfigForBreakpoint['slots'];
        }
        else {
            return [];
        }
    }
}
CommonConfiguratorUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CommonConfiguratorUtilsService, deps: [{ token: i1.UserIdService }], target: i0.ɵɵFactoryTarget.Injectable });
CommonConfiguratorUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CommonConfiguratorUtilsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CommonConfiguratorUtilsService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.UserIdService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLWNvbmZpZ3VyYXRvci11dGlscy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL2NvbW1vbi9zaGFyZWQvdXRpbHMvY29tbW9uLWNvbmZpZ3VyYXRvci11dGlscy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFJTCxpQkFBaUIsR0FDbEIsTUFBTSwyQkFBMkIsQ0FBQztBQUNuQyxPQUFPLEVBQUUscUJBQXFCLEVBQWlCLE1BQU0saUJBQWlCLENBQUM7QUFRdkUsT0FBTyxFQUFFLEtBQUssRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUN6QyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUdMLGdCQUFnQixHQUNqQixNQUFNLDRDQUE0QyxDQUFDO0FBQ3BELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7QUFFcEU7O0dBRUc7QUFFSCxNQUFNLE9BQU8sOEJBQThCO0lBQ3pDLFlBQXNCLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQUcsQ0FBQztJQUN0RDs7OztPQUlHO0lBQ0gsV0FBVyxDQUFDLEtBQStCO1FBQ3pDLEtBQUssQ0FBQyxHQUFHLEdBQUcsc0JBQXNCLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILGtCQUFrQixDQUFDLFVBQWtCLEVBQUUsV0FBbUI7UUFDeEQsT0FBTyxVQUFVLEdBQUcsR0FBRyxHQUFHLFdBQVcsQ0FBQztJQUN4QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGdCQUFnQixDQUFD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LENBQ3RELG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxDQUNoQyxDQUFDO1lBQ0YsT0FBaUIsdUJBQXVCLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDbkQ7YUFBTTtZQUNMLE9BQU8sRUFBRSxDQUFDO1NBQ1g7SUFDSCxDQUFDOzsySEExSlUsOEJBQThCOytIQUE5Qiw4QkFBOEIsY0FEakIsTUFBTTsyRkFDbkIsOEJBQThCO2tCQUQxQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENhcnQsXG4gIENhcnRJdGVtQ29udGV4dCxcbiAgT3JkZXJFbnRyeSxcbiAgUHJvbW90aW9uTG9jYXRpb24sXG59IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHsgT0NDX1VTRVJfSURfQU5PTllNT1VTLCBVc2VySWRTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIEJSRUFLUE9JTlQsXG4gIExheW91dENvbmZpZyxcbiAgTGF5b3V0U2xvdENvbmZpZyxcbiAgU2xvdENvbmZpZyxcbiAgU2xvdEdyb3VwLFxufSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgRU1QVFksIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7XG4gIENvbW1vbkNvbmZpZ3VyYXRvcixcbiAgQ29uZmlndXJhdG9yVHlwZSxcbiAgT3JkZXJFbnRyeVN0YXR1cyxcbn0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbC9jb21tb24tY29uZmlndXJhdG9yLm1vZGVsJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvck1vZGVsVXRpbHMgfSBmcm9tICcuL2NvbmZpZ3VyYXRvci1tb2RlbC11dGlscyc7XG5cbi8qKlxuICogVXRpbGl0aWVzIGZvciBnZW5lcmljIGNvbmZpZ3VyYXRpb25cbiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBDb21tb25Db25maWd1cmF0b3JVdGlsc1NlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgdXNlcklkU2VydmljZTogVXNlcklkU2VydmljZSkge31cbiAgLyoqXG4gICAqIENvbXBpbGVzIGEgdW5pcXVlIGtleSBmb3IgYSBjb25maWd1cmF0aW9uIG93bmVyIGFuZCBzZXRzIGl0IGludG8gdGhlICdrZXknXG4gICAqIGF0dHJpYnV0ZVxuICAgKiBAcGFyYW0ge0NvbW1vbkNvbmZpZ3VyYXRvci5Pd25lciB9b3duZXIgLSBTcGVjaWZpZXMgdGhlIG93bmVyIG9mIGEgcHJvZHVjdCBjb25maWd1cmF0aW9uXG4gICAqL1xuICBzZXRPd25lcktleShvd25lcjogQ29tbW9uQ29uZmlndXJhdG9yLk93bmVyKSB7XG4gICAgb3duZXIua2V5ID0gQ29uZmlndXJhdG9yTW9kZWxVdGlscy5nZXRPd25lcktleShvd25lci50eXBlLCBvd25lci5pZCk7XG4gIH1cblxuICAvKipcbiAgICogQ29tcG9zZXMgb3duZXIgSUQgZnJvbSBkb2N1bWVudCBJRCBhbmQgZW50cnkgbnVtYmVyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBkb2N1bWVudElkIC0gSUQgb2YgZG9jdW1lbnQgdGhlIGVudHJ5IGlzIHBhcnQgb2YsIGxpa2UgdGhlIG9yZGVyIG9yIHF1b3RlIGNvZGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGVudHJ5TnVtYmVyIC0gRW50cnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IC0gb3duZXIgSURcbiAgICovXG4gIGdldENvbXBvc2VkT3duZXJJZChkb2N1bWVudElkOiBzdHJpbmcsIGVudHJ5TnVtYmVyOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiBkb2N1bWVudElkICsgJysnICsgZW50cnlOdW1iZXI7XG4gIH1cblxuICAvKipcbiAgICogRGVjb21wb3NlcyBhbiBvd25lciBJRCBpbnRvIGRvY3VtZW50SWQgYW5kIGVudHJ5TnVtYmVyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvd25lcklkIC0gSUQgb2Ygb3duZXJcbiAgICogQHJldHVybnMge2FueX0gb2JqZWN0IGNvbnRhaW5pbmcgZG9jdW1lbnRJZCBhbmQgZW50cnlOdW1iZXJcbiAgICovXG4gIGRlY29tcG9zZU93bmVySWQob3duZXJJZDogc3RyaW5nKTogYW55IHtcbiAgICBjb25zdCBwYXJ0czogc3RyaW5nW10gPSBvd25lcklkLnNwbGl0KCcrJyk7XG4gICAgaWYgKHBhcnRzLmxlbmd0aCAhPT0gMikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnV2Ugb25seSBleHBlY3QgMiBwYXJ0cyBpbiBvd25lcklkLCBzZXBhcmF0ZWQgYnkgKywgYnV0IHdhczogJyArIG93bmVySWRcbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdCA9IHsgZG9jdW1lbnRJZDogcGFydHNbMF0sIGVudHJ5TnVtYmVyOiBwYXJ0c1sxXSB9O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgLyoqXG4gICAqIEdldHMgY2FydCBJRCAod2hpY2ggY2FuIGJlIGVpdGhlciBpdHMgZ3VpZCBvciBpdHMgY29kZSlcbiAgICogQHBhcmFtIHtDYXJ0fSBjYXJ0IC0gQ2FydFxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSAtIENhcnQgaWRlbnRpZmllclxuICAgKi9cbiAgZ2V0Q2FydElkKGNhcnQ/OiBDYXJ0KTogc3RyaW5nIHtcbiAgICBjb25zdCBjYXJ0SWQgPVxuICAgICAgY2FydD8udXNlcj8udWlkID09PSBPQ0NfVVNFUl9JRF9BTk9OWU1PVVMgPyBjYXJ0Lmd1aWQgOiBjYXJ0Py5jb2RlO1xuICAgIGlmICghY2FydElkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhcnQgSUQgaXMgbm90IGRlZmluZWQnKTtcbiAgICB9XG4gICAgcmV0dXJuIGNhcnRJZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBWZXJpZmllcyB3aGV0aGVyIHRoZSBpdGVtIGhhcyBhbnkgaXNzdWVzLlxuICAgKlxuICAgKiBAcGFyYW0ge09yZGVyRW50cnl9IGNhcnRJdGVtIC0gQ2FydCBpdGVtXG4gICAqIEByZXR1cm5zIHtib29sZWFufSAtIHdoZXRoZXIgdGhlcmUgYXJlIGFueSBpc3N1ZXNcbiAgICovXG4gIGhhc0lzc3VlcyhjYXJ0SXRlbTogT3JkZXJFbnRyeSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmdldE51bWJlck9mSXNzdWVzKGNhcnRJdGVtKSA+IDA7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSBudW1iZXIgb2YgaXNzdWVzIGF0IHRoZSBjYXJ0IGl0ZW0uXG4gICAqXG4gICAqIEBwYXJhbSB7T3JkZXJFbnRyeX0gY2FydEl0ZW0gLSBDYXJ0IGl0ZW1cbiAgICogQHJldHVybnMge251bWJlcn0gLSB0aGUgbnVtYmVyIG9mIGlzc3VlcyBhdCB0aGUgY2FydCBpdGVtXG4gICAqL1xuICBnZXROdW1iZXJPZklzc3VlcyhjYXJ0SXRlbTogT3JkZXJFbnRyeSk6IG51bWJlciB7XG4gICAgbGV0IG51bWJlck9mSXNzdWVzID0gMDtcbiAgICBjYXJ0SXRlbT8uc3RhdHVzU3VtbWFyeUxpc3Q/LmZvckVhY2goKHN0YXR1c1N1bW1hcnkpID0+IHtcbiAgICAgIGlmIChzdGF0dXNTdW1tYXJ5LnN0YXR1cyA9PT0gT3JkZXJFbnRyeVN0YXR1cy5FcnJvcikge1xuICAgICAgICBjb25zdCBudW1iZXJPZklzc3Vlc0Zyb21TdGF0dXMgPSBzdGF0dXNTdW1tYXJ5Lm51bWJlck9mSXNzdWVzO1xuICAgICAgICBudW1iZXJPZklzc3VlcyA9IG51bWJlck9mSXNzdWVzRnJvbVN0YXR1c1xuICAgICAgICAgID8gbnVtYmVyT2ZJc3N1ZXNGcm9tU3RhdHVzXG4gICAgICAgICAgOiAwO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBudW1iZXJPZklzc3VlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBWZXJpZmllcyB3aGV0aGVyIHRoZSBjb25maWd1cmF0b3IgdHlwZSBpcyBhbiBhdHRyaWJ1dGUgYmFzZWQgb25lLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29uZmlndXJhdG9yVHlwZSAtIENvbmZpZ3VyYXRvciB0eXBlXG4gICAqIEByZXR1cm5zIHtib29sZWFufSAtICdUcnVlJyBpZiB0aGUgZXhwZWN0ZWQgY29uZmlndXJhdG9yIHR5cGUsIG90aGVyd2lzZSAnZmFsc2UnXG4gICAqL1xuICBpc0F0dHJpYnV0ZUJhc2VkQ29uZmlndXJhdG9yKGNvbmZpZ3VyYXRvclR5cGU6IHN0cmluZyB8IHVuZGVmaW5lZCk6IGJvb2xlYW4ge1xuICAgIGlmIChjb25maWd1cmF0b3JUeXBlKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBjb25maWd1cmF0b3JUeXBlID09PSBDb25maWd1cmF0b3JUeXBlLlZBUklBTlQgfHxcbiAgICAgICAgY29uZmlndXJhdG9yVHlwZSA9PT0gQ29uZmlndXJhdG9yVHlwZS5URVhURklFTERcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWZXJpZmllcyB3aGV0aGVyIHRoZSBjb25maWd1cmF0b3IgdHlwZSBpcyBhIGJ1bmRsZSBiYXNlZCBvbmUuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb25maWd1cmF0b3JUeXBlIC0gQ29uZmlndXJhdG9yIHR5cGVcbiAgICogQHJldHVybnMge2Jvb2xlYW59IC0gJ1RydWUnIGlmIHRoZSBleHBlY3RlZCBjb25maWd1cmF0b3IgdHlwZSwgb3RoZXJ3aXNlICdmYXNsZSdcbiAgICovXG4gIGlzQnVuZGxlQmFzZWRDb25maWd1cmF0b3IoY29uZmlndXJhdG9yVHlwZTogc3RyaW5nIHwgdW5kZWZpbmVkKTogYm9vbGVhbiB7XG4gICAgaWYgKGNvbmZpZ3VyYXRvclR5cGUpIHtcbiAgICAgIHJldHVybiBjb25maWd1cmF0b3JUeXBlID09PSBDb25maWd1cmF0b3JUeXBlLkNQUTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgd2hldGhlciB3ZSBhcmUgaW4gdGhlIGNvbnRleHQgb2YgYW4gYWN0aXZlIGNhcnRcbiAgICogQHBhcmFtIGNhcnRJdGVtQ29udGV4dCBDYXJ0IGl0ZW0gY29udGV4dFxuICAgKiBAcmV0dXJucyBJdGVtIHBhcnQgb2YgYW4gYWN0aXZlIGNhcnQ/XG4gICAqL1xuICBpc0FjdGl2ZUNhcnRDb250ZXh0KFxuICAgIGNhcnRJdGVtQ29udGV4dDogQ2FydEl0ZW1Db250ZXh0IHwgdW5kZWZpbmVkXG4gICk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoY2FydEl0ZW1Db250ZXh0Py5sb2NhdGlvbiQgPz8gRU1QVFkpLnBpcGUoXG4gICAgICBtYXAoXG4gICAgICAgIChsb2NhdGlvbikgPT5cbiAgICAgICAgICBsb2NhdGlvbiAhPT0gUHJvbW90aW9uTG9jYXRpb24uU2F2ZUZvckxhdGVyICYmXG4gICAgICAgICAgbG9jYXRpb24gIT09IFByb21vdGlvbkxvY2F0aW9uLlNhdmVkQ2FydFxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmVhZHMgc2xvdHMgZnJvbSBsYXlvdXQgY29uZmlnLCB0YWtpbmcgdGhlIGJyZWFrcG9pbnQgaW50byBhY2NvdW50XG4gICAqIEBwYXJhbSBsYXlvdXRDb25maWcgTGF5b3V0IGNvbmZpZ1xuICAgKiBAcGFyYW0gdGVtcGxhdGVOYW1lIFBhZ2UgdGVtcGxhdGUgbmFtZVxuICAgKiBAcGFyYW0gc2VjdGlvbk5hbWUgU2VjdGlvbiBuYW1lIGxpa2UgJ2hlYWRlcidcbiAgICogQHBhcmFtIGJyZWFrUG9pbnQgQ3VycmVudCBicmVha3BvaW50XG4gICAqIEByZXR1cm5zIEFycmF5IG9mIHNsb3RzXG4gICAqL1xuICBnZXRTbG90c0Zyb21MYXlvdXRDb25maWd1cmF0aW9uKFxuICAgIGxheW91dENvbmZpZzogTGF5b3V0Q29uZmlnLFxuICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgIHNlY3Rpb25OYW1lOiBzdHJpbmcsXG4gICAgYnJlYWtQb2ludDogQlJFQUtQT0lOVC5sZyB8IEJSRUFLUE9JTlQubWQgfCBCUkVBS1BPSU5ULnNtIHwgQlJFQUtQT0lOVC54c1xuICApOiBzdHJpbmdbXSB7XG4gICAgY29uc3Qgc2xvdHMgPSBsYXlvdXRDb25maWcubGF5b3V0U2xvdHM7XG4gICAgaWYgKHNsb3RzKSB7XG4gICAgICBjb25zdCBzbG90c0ZvclRlbXBsYXRlOiBMYXlvdXRTbG90Q29uZmlnID0gPExheW91dFNsb3RDb25maWc+KFxuICAgICAgICBzbG90c1t0ZW1wbGF0ZU5hbWVdXG4gICAgICApO1xuICAgICAgY29uc3Qgc2xvdEdyb3VwRm9yU2VjdGlvbjogU2xvdEdyb3VwID0gPFNsb3RHcm91cD4oXG4gICAgICAgIHNsb3RzRm9yVGVtcGxhdGVbc2VjdGlvbk5hbWVdXG4gICAgICApO1xuICAgICAgY29uc3Qgc2xvdENvbmZpZ0ZvckJyZWFrcG9pbnQ6IFNsb3RDb25maWcgPSA8U2xvdENvbmZpZz4oXG4gICAgICAgIHNsb3RHcm91cEZvclNlY3Rpb25bYnJlYWtQb2ludF1cbiAgICAgICk7XG4gICAgICByZXR1cm4gPHN0cmluZ1tdPnNsb3RDb25maWdGb3JCcmVha3BvaW50WydzbG90cyddO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9XG59XG4iXX0=