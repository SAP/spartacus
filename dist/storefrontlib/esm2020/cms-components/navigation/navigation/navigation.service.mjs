/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { combineLatest, EMPTY } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class NavigationService {
    constructor(cmsService, semanticPathService) {
        this.cmsService = cmsService;
        this.semanticPathService = semanticPathService;
    }
    createNavigation(data$) {
        return combineLatest([data$, this.getNavigationNode(data$)]).pipe(map(([data, nav]) => {
            return {
                title: data.name,
                children: [nav],
            };
        }));
    }
    /**
     * returns an observable with the `NavigationNode` for the given `CmsNavigationComponent`.
     * This function will load the navigation underlying entries and children if they haven't been
     * loaded so far.
     */
    getNavigationNode(data$) {
        if (!data$) {
            return EMPTY;
        }
        return data$.pipe(filter((data) => !!data), switchMap((data) => {
            const navigation = data.navigationNode ? data.navigationNode : data;
            return this.cmsService
                .getNavigationEntryItems(navigation.uid ?? '')
                .pipe(tap((items) => {
                if (items === undefined) {
                    this.loadNavigationEntryItems(navigation, true);
                    return;
                }
                // we should check whether the existing node items are what expected
                const expectedItems = [];
                this.loadNavigationEntryItems(navigation, false, expectedItems);
                const existingItems = Object.keys(items).map((key) => items[key].uid ?? '');
                const missingItems = expectedItems.filter((it) => it.id && !existingItems.includes(it.id));
                if (missingItems.length > 0) {
                    this.cmsService.loadNavigationItems(navigation.uid ?? '', missingItems);
                }
            }), filter(Boolean), map((items) => this.populateNavigationNode(navigation, items) ?? {}));
        }));
    }
    /**
     * Loads all navigation entry items' type and id. Dispatch action to load all these items
     * @param nodeData
     * @param root
     * @param itemsList
     */
    loadNavigationEntryItems(nodeData, root, itemsList = []) {
        if (nodeData.entries && nodeData.entries.length > 0) {
            nodeData.entries.forEach((entry) => {
                itemsList.push({
                    superType: entry.itemSuperType,
                    id: entry.itemId,
                });
            });
        }
        if (nodeData.children && nodeData.children.length > 0) {
            nodeData.children.forEach((child) => this.loadNavigationEntryItems(child, false, itemsList));
        }
        if (root && nodeData.uid) {
            this.cmsService.loadNavigationItems(nodeData.uid, itemsList);
        }
    }
    /**
     * Create a new node tree for the view
     * @param nodeData
     * @param items
     */
    populateNavigationNode(nodeData, items) {
        const node = {};
        if (nodeData.title) {
            // the node title will be populated by the first entry (if any)
            // if there's no nodeData.title available
            node.title = nodeData.title;
        }
        // populate style classes to apply CMS driven styling
        if (nodeData.styleClasses) {
            node.styleClasses = nodeData.styleClasses;
        }
        // populate style attributes to apply CMS driven styling
        if (nodeData.styleAttributes) {
            node.styleAttributes = nodeData.styleAttributes;
        }
        if (nodeData.entries && nodeData.entries.length > 0) {
            this.populateLink(node, nodeData.entries[0], items);
        }
        if (nodeData.children?.length > 0) {
            const children = nodeData.children
                .map((child) => this.populateNavigationNode(child, items))
                .filter(Boolean);
            if (children.length > 0) {
                node.children = children;
            }
        }
        // return null in case there are no children
        return Object.keys(node).length === 0 ? null : node;
    }
    /**
     * The node link is driven by the first entry.
     */
    populateLink(node, entry, items) {
        const item = items[`${entry.itemId}_${entry.itemSuperType}`];
        // now we only consider CMSLinkComponent
        if (item && entry.itemType === 'CMSLinkComponent') {
            if (!node.title) {
                node.title = item.linkName;
            }
            const url = this.getLink(item);
            // only populate the node link if we have a visible node
            if (node.title && url) {
                node.url = url;
                // the backend provide boolean value for the target
                // in case the link should be opened in a new window
                if (item.target === 'true' || item.target === true) {
                    node.target = '_blank';
                }
            }
            // populate style classes to apply CMS driven styling
            if (item.styleClasses) {
                node.styleClasses = item.styleClasses;
            }
            // populate style attributes to apply CMS driven styling
            if (item.styleAttributes) {
                node.styleAttributes = item.styleAttributes;
            }
        }
    }
    /**
     *
     * Gets the URL or link to a related item (category),
     * also taking into account content pages (contentPageLabelOrId)
     * and product pages (productCode)
     */
    getLink(item) {
        if (item.url) {
            return item.url;
        }
        else if (item.contentPageLabelOrId) {
            return item.contentPageLabelOrId;
        }
        else if (item.categoryCode) {
            return this.semanticPathService.transform({
                cxRoute: 'category',
                params: {
                    code: item.categoryCode,
                    name: item.name,
                },
            });
        }
        else if (item.productCode) {
            return this.semanticPathService.transform({
                cxRoute: 'product',
                params: {
                    code: item.productCode,
                    name: item.name,
                },
            });
        }
    }
}
NavigationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NavigationService, deps: [{ token: i1.CmsService }, { token: i1.SemanticPathService }], target: i0.ɵɵFactoryTarget.Injectable });
NavigationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NavigationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NavigationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CmsService }, { type: i1.SemanticPathService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9jbXMtY29tcG9uZW50cy9uYXZpZ2F0aW9uL25hdmlnYXRpb24vbmF2aWdhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTzNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ3hELE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBTTdELE1BQU0sT0FBTyxpQkFBaUI7SUFDNUIsWUFDWSxVQUFzQixFQUN0QixtQkFBd0M7UUFEeEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO0lBQ2pELENBQUM7SUFFRyxnQkFBZ0IsQ0FDckIsS0FBeUM7UUFFekMsT0FBTyxhQUFhLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQy9ELEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUU7WUFDbEIsT0FBTztnQkFDTCxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0JBQ2hCLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQzthQUNoQixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksaUJBQWlCLENBQ3RCLEtBQXlDO1FBRXpDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUNmLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUN4QixTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNqQixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDcEUsT0FBTyxJQUFJLENBQUMsVUFBVTtpQkFDbkIsdUJBQXVCLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7aUJBQzdDLElBQUksQ0FDSCxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDWixJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7b0JBQ3ZCLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ2hELE9BQU87aUJBQ1I7Z0JBQ0Qsb0VBQW9FO2dCQUNwRSxNQUFNLGFBQWEsR0FHYixFQUFFLENBQUM7Z0JBQ1QsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUM7Z0JBQ2hFLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUMxQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQzlCLENBQUM7Z0JBQ0YsTUFBTSxZQUFZLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FDdkMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FDaEQsQ0FBQztnQkFDRixJQUFJLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUNqQyxVQUFVLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFDcEIsWUFBWSxDQUNiLENBQUM7aUJBQ0g7WUFDSCxDQUFDLENBQUMsRUFDRixNQUFNLENBQUMsT0FBTyxDQUFDLEVBQ2YsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUNyRSxDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLHdCQUF3QixDQUM5QixRQUEyQixFQUMzQixJQUFhLEVBQ2IsWUFBeUUsRUFBRTtRQUUzRSxJQUFJLFFBQVEsQ0FBQyxPQUFPLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ25ELFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ2pDLFNBQVMsQ0FBQyxJQUFJLENBQUM7b0JBQ2IsU0FBUyxFQUFFLEtBQUssQ0FBQyxhQUFhO29CQUM5QixFQUFFLEVBQUUsS0FBSyxDQUFDLE1BQU07aUJBQ2pCLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3JELFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FDbEMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQ3ZELENBQUM7U0FDSDtRQUVELElBQUksSUFBSSxJQUFJLFFBQVEsQ0FBQyxHQUFHLEVBQUU7WUFDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQzlEO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxzQkFBc0IsQ0FDNUIsUUFBYSxFQUNiLEtBQVU7UUFFVixNQUFNLElBQUksR0FBbUIsRUFBRSxDQUFDO1FBRWhDLElBQUksUUFBUSxDQUFDLEtBQUssRUFBRTtZQUNsQiwrREFBK0Q7WUFDL0QseUNBQXlDO1lBQ3pDLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztTQUM3QjtRQUVELHFEQUFxRDtRQUNyRCxJQUFJLFFBQVEsQ0FBQyxZQUFZLEVBQUU7WUFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDO1NBQzNDO1FBQ0Qsd0RBQXdEO1FBQ3hELElBQUksUUFBUSxDQUFDLGVBQWUsRUFBRTtZQUM1QixJQUFJLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUM7U0FDakQ7UUFFRCxJQUFJLFFBQVEsQ0FBQyxPQUFPLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ25ELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDckQ7UUFFRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLEVBQUUsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNqQyxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUTtpQkFDL0IsR0FBRyxDQUFDLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO2lCQUM5RCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbkIsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7YUFDMUI7U0FDRjtRQUVELDRDQUE0QztRQUM1QyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDdEQsQ0FBQztJQUVEOztPQUVHO0lBQ0ssWUFBWSxDQUFDLElBQW9CLEVBQUUsS0FBVSxFQUFFLEtBQVU7UUFDL0QsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztRQUU3RCx3Q0FBd0M7UUFDeEMsSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyxrQkFBa0IsRUFBRTtZQUNqRCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDZixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7YUFDNUI7WUFDRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9CLHdEQUF3RDtZQUN4RCxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksR0FBRyxFQUFFO2dCQUNyQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztnQkFDZixtREFBbUQ7Z0JBQ25ELG9EQUFvRDtnQkFDcEQsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRTtvQkFDbEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7aUJBQ3hCO2FBQ0Y7WUFDRCxxREFBcUQ7WUFDckQsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNyQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7YUFDdkM7WUFDRCx3REFBd0Q7WUFDeEQsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUN4QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7YUFDN0M7U0FDRjtJQUNILENBQUM7SUFFRDs7Ozs7T0FLRztJQUNPLE9BQU8sQ0FBQyxJQUFTO1FBQ3pCLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNaLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztTQUNqQjthQUFNLElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFO1lBQ3BDLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDO1NBQ2xDO2FBQU0sSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQzVCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQztnQkFDeEMsT0FBTyxFQUFFLFVBQVU7Z0JBQ25CLE1BQU0sRUFBRTtvQkFDTixJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVk7b0JBQ3ZCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtpQkFDaEI7YUFDRixDQUFDLENBQUM7U0FDSjthQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUMzQixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUM7Z0JBQ3hDLE9BQU8sRUFBRSxTQUFTO2dCQUNsQixNQUFNLEVBQUU7b0JBQ04sSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXO29CQUN0QixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7aUJBQ2hCO2FBQ0YsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOzs4R0ExTVUsaUJBQWlCO2tIQUFqQixpQkFBaUIsY0FGaEIsTUFBTTsyRkFFUCxpQkFBaUI7a0JBSDdCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ21zTmF2aWdhdGlvbkNvbXBvbmVudCxcbiAgQ21zTmF2aWdhdGlvbk5vZGUsXG4gIENtc1NlcnZpY2UsXG4gIFNlbWFudGljUGF0aFNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBFTVBUWSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAsIHN3aXRjaE1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbk5vZGUgfSBmcm9tICcuL25hdmlnYXRpb24tbm9kZS5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjbXNTZXJ2aWNlOiBDbXNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBzZW1hbnRpY1BhdGhTZXJ2aWNlOiBTZW1hbnRpY1BhdGhTZXJ2aWNlXG4gICkge31cblxuICBwdWJsaWMgY3JlYXRlTmF2aWdhdGlvbihcbiAgICBkYXRhJDogT2JzZXJ2YWJsZTxDbXNOYXZpZ2F0aW9uQ29tcG9uZW50PlxuICApOiBPYnNlcnZhYmxlPE5hdmlnYXRpb25Ob2RlPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoW2RhdGEkLCB0aGlzLmdldE5hdmlnYXRpb25Ob2RlKGRhdGEkKV0pLnBpcGUoXG4gICAgICBtYXAoKFtkYXRhLCBuYXZdKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdGl0bGU6IGRhdGEubmFtZSxcbiAgICAgICAgICBjaGlsZHJlbjogW25hdl0sXG4gICAgICAgIH07XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogcmV0dXJucyBhbiBvYnNlcnZhYmxlIHdpdGggdGhlIGBOYXZpZ2F0aW9uTm9kZWAgZm9yIHRoZSBnaXZlbiBgQ21zTmF2aWdhdGlvbkNvbXBvbmVudGAuXG4gICAqIFRoaXMgZnVuY3Rpb24gd2lsbCBsb2FkIHRoZSBuYXZpZ2F0aW9uIHVuZGVybHlpbmcgZW50cmllcyBhbmQgY2hpbGRyZW4gaWYgdGhleSBoYXZlbid0IGJlZW5cbiAgICogbG9hZGVkIHNvIGZhci5cbiAgICovXG4gIHB1YmxpYyBnZXROYXZpZ2F0aW9uTm9kZShcbiAgICBkYXRhJDogT2JzZXJ2YWJsZTxDbXNOYXZpZ2F0aW9uQ29tcG9uZW50PlxuICApOiBPYnNlcnZhYmxlPE5hdmlnYXRpb25Ob2RlPiB7XG4gICAgaWYgKCFkYXRhJCkge1xuICAgICAgcmV0dXJuIEVNUFRZO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YSQucGlwZShcbiAgICAgIGZpbHRlcigoZGF0YSkgPT4gISFkYXRhKSxcbiAgICAgIHN3aXRjaE1hcCgoZGF0YSkgPT4ge1xuICAgICAgICBjb25zdCBuYXZpZ2F0aW9uID0gZGF0YS5uYXZpZ2F0aW9uTm9kZSA/IGRhdGEubmF2aWdhdGlvbk5vZGUgOiBkYXRhO1xuICAgICAgICByZXR1cm4gdGhpcy5jbXNTZXJ2aWNlXG4gICAgICAgICAgLmdldE5hdmlnYXRpb25FbnRyeUl0ZW1zKG5hdmlnYXRpb24udWlkID8/ICcnKVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgdGFwKChpdGVtcykgPT4ge1xuICAgICAgICAgICAgICBpZiAoaXRlbXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZE5hdmlnYXRpb25FbnRyeUl0ZW1zKG5hdmlnYXRpb24sIHRydWUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyB3ZSBzaG91bGQgY2hlY2sgd2hldGhlciB0aGUgZXhpc3Rpbmcgbm9kZSBpdGVtcyBhcmUgd2hhdCBleHBlY3RlZFxuICAgICAgICAgICAgICBjb25zdCBleHBlY3RlZEl0ZW1zOiB7XG4gICAgICAgICAgICAgICAgc3VwZXJUeXBlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgaWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgfVtdID0gW107XG4gICAgICAgICAgICAgIHRoaXMubG9hZE5hdmlnYXRpb25FbnRyeUl0ZW1zKG5hdmlnYXRpb24sIGZhbHNlLCBleHBlY3RlZEl0ZW1zKTtcbiAgICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdJdGVtcyA9IE9iamVjdC5rZXlzKGl0ZW1zKS5tYXAoXG4gICAgICAgICAgICAgICAgKGtleSkgPT4gaXRlbXNba2V5XS51aWQgPz8gJydcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgY29uc3QgbWlzc2luZ0l0ZW1zID0gZXhwZWN0ZWRJdGVtcy5maWx0ZXIoXG4gICAgICAgICAgICAgICAgKGl0KSA9PiBpdC5pZCAmJiAhZXhpc3RpbmdJdGVtcy5pbmNsdWRlcyhpdC5pZClcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgaWYgKG1pc3NpbmdJdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbXNTZXJ2aWNlLmxvYWROYXZpZ2F0aW9uSXRlbXMoXG4gICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uLnVpZCA/PyAnJyxcbiAgICAgICAgICAgICAgICAgIG1pc3NpbmdJdGVtc1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgZmlsdGVyKEJvb2xlYW4pLFxuICAgICAgICAgICAgbWFwKChpdGVtcykgPT4gdGhpcy5wb3B1bGF0ZU5hdmlnYXRpb25Ob2RlKG5hdmlnYXRpb24sIGl0ZW1zKSA/PyB7fSlcbiAgICAgICAgICApO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWRzIGFsbCBuYXZpZ2F0aW9uIGVudHJ5IGl0ZW1zJyB0eXBlIGFuZCBpZC4gRGlzcGF0Y2ggYWN0aW9uIHRvIGxvYWQgYWxsIHRoZXNlIGl0ZW1zXG4gICAqIEBwYXJhbSBub2RlRGF0YVxuICAgKiBAcGFyYW0gcm9vdFxuICAgKiBAcGFyYW0gaXRlbXNMaXN0XG4gICAqL1xuICBwcml2YXRlIGxvYWROYXZpZ2F0aW9uRW50cnlJdGVtcyhcbiAgICBub2RlRGF0YTogQ21zTmF2aWdhdGlvbk5vZGUsXG4gICAgcm9vdDogYm9vbGVhbixcbiAgICBpdGVtc0xpc3Q6IHsgc3VwZXJUeXBlOiBzdHJpbmcgfCB1bmRlZmluZWQ7IGlkOiBzdHJpbmcgfCB1bmRlZmluZWQgfVtdID0gW11cbiAgKTogdm9pZCB7XG4gICAgaWYgKG5vZGVEYXRhLmVudHJpZXMgJiYgbm9kZURhdGEuZW50cmllcy5sZW5ndGggPiAwKSB7XG4gICAgICBub2RlRGF0YS5lbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICAgIGl0ZW1zTGlzdC5wdXNoKHtcbiAgICAgICAgICBzdXBlclR5cGU6IGVudHJ5Lml0ZW1TdXBlclR5cGUsXG4gICAgICAgICAgaWQ6IGVudHJ5Lml0ZW1JZCxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAobm9kZURhdGEuY2hpbGRyZW4gJiYgbm9kZURhdGEuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgbm9kZURhdGEuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+XG4gICAgICAgIHRoaXMubG9hZE5hdmlnYXRpb25FbnRyeUl0ZW1zKGNoaWxkLCBmYWxzZSwgaXRlbXNMaXN0KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAocm9vdCAmJiBub2RlRGF0YS51aWQpIHtcbiAgICAgIHRoaXMuY21zU2VydmljZS5sb2FkTmF2aWdhdGlvbkl0ZW1zKG5vZGVEYXRhLnVpZCwgaXRlbXNMaXN0KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IG5vZGUgdHJlZSBmb3IgdGhlIHZpZXdcbiAgICogQHBhcmFtIG5vZGVEYXRhXG4gICAqIEBwYXJhbSBpdGVtc1xuICAgKi9cbiAgcHJpdmF0ZSBwb3B1bGF0ZU5hdmlnYXRpb25Ob2RlKFxuICAgIG5vZGVEYXRhOiBhbnksXG4gICAgaXRlbXM6IGFueVxuICApOiBOYXZpZ2F0aW9uTm9kZSB8IG51bGwge1xuICAgIGNvbnN0IG5vZGU6IE5hdmlnYXRpb25Ob2RlID0ge307XG5cbiAgICBpZiAobm9kZURhdGEudGl0bGUpIHtcbiAgICAgIC8vIHRoZSBub2RlIHRpdGxlIHdpbGwgYmUgcG9wdWxhdGVkIGJ5IHRoZSBmaXJzdCBlbnRyeSAoaWYgYW55KVxuICAgICAgLy8gaWYgdGhlcmUncyBubyBub2RlRGF0YS50aXRsZSBhdmFpbGFibGVcbiAgICAgIG5vZGUudGl0bGUgPSBub2RlRGF0YS50aXRsZTtcbiAgICB9XG5cbiAgICAvLyBwb3B1bGF0ZSBzdHlsZSBjbGFzc2VzIHRvIGFwcGx5IENNUyBkcml2ZW4gc3R5bGluZ1xuICAgIGlmIChub2RlRGF0YS5zdHlsZUNsYXNzZXMpIHtcbiAgICAgIG5vZGUuc3R5bGVDbGFzc2VzID0gbm9kZURhdGEuc3R5bGVDbGFzc2VzO1xuICAgIH1cbiAgICAvLyBwb3B1bGF0ZSBzdHlsZSBhdHRyaWJ1dGVzIHRvIGFwcGx5IENNUyBkcml2ZW4gc3R5bGluZ1xuICAgIGlmIChub2RlRGF0YS5zdHlsZUF0dHJpYnV0ZXMpIHtcbiAgICAgIG5vZGUuc3R5bGVBdHRyaWJ1dGVzID0gbm9kZURhdGEuc3R5bGVBdHRyaWJ1dGVzO1xuICAgIH1cblxuICAgIGlmIChub2RlRGF0YS5lbnRyaWVzICYmIG5vZGVEYXRhLmVudHJpZXMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5wb3B1bGF0ZUxpbmsobm9kZSwgbm9kZURhdGEuZW50cmllc1swXSwgaXRlbXMpO1xuICAgIH1cblxuICAgIGlmIChub2RlRGF0YS5jaGlsZHJlbj8ubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgY2hpbGRyZW4gPSBub2RlRGF0YS5jaGlsZHJlblxuICAgICAgICAubWFwKChjaGlsZDogYW55KSA9PiB0aGlzLnBvcHVsYXRlTmF2aWdhdGlvbk5vZGUoY2hpbGQsIGl0ZW1zKSlcbiAgICAgICAgLmZpbHRlcihCb29sZWFuKTtcbiAgICAgIGlmIChjaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIG5vZGUuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZXR1cm4gbnVsbCBpbiBjYXNlIHRoZXJlIGFyZSBubyBjaGlsZHJlblxuICAgIHJldHVybiBPYmplY3Qua2V5cyhub2RlKS5sZW5ndGggPT09IDAgPyBudWxsIDogbm9kZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbm9kZSBsaW5rIGlzIGRyaXZlbiBieSB0aGUgZmlyc3QgZW50cnkuXG4gICAqL1xuICBwcml2YXRlIHBvcHVsYXRlTGluayhub2RlOiBOYXZpZ2F0aW9uTm9kZSwgZW50cnk6IGFueSwgaXRlbXM6IGFueSkge1xuICAgIGNvbnN0IGl0ZW0gPSBpdGVtc1tgJHtlbnRyeS5pdGVtSWR9XyR7ZW50cnkuaXRlbVN1cGVyVHlwZX1gXTtcblxuICAgIC8vIG5vdyB3ZSBvbmx5IGNvbnNpZGVyIENNU0xpbmtDb21wb25lbnRcbiAgICBpZiAoaXRlbSAmJiBlbnRyeS5pdGVtVHlwZSA9PT0gJ0NNU0xpbmtDb21wb25lbnQnKSB7XG4gICAgICBpZiAoIW5vZGUudGl0bGUpIHtcbiAgICAgICAgbm9kZS50aXRsZSA9IGl0ZW0ubGlua05hbWU7XG4gICAgICB9XG4gICAgICBjb25zdCB1cmwgPSB0aGlzLmdldExpbmsoaXRlbSk7XG4gICAgICAvLyBvbmx5IHBvcHVsYXRlIHRoZSBub2RlIGxpbmsgaWYgd2UgaGF2ZSBhIHZpc2libGUgbm9kZVxuICAgICAgaWYgKG5vZGUudGl0bGUgJiYgdXJsKSB7XG4gICAgICAgIG5vZGUudXJsID0gdXJsO1xuICAgICAgICAvLyB0aGUgYmFja2VuZCBwcm92aWRlIGJvb2xlYW4gdmFsdWUgZm9yIHRoZSB0YXJnZXRcbiAgICAgICAgLy8gaW4gY2FzZSB0aGUgbGluayBzaG91bGQgYmUgb3BlbmVkIGluIGEgbmV3IHdpbmRvd1xuICAgICAgICBpZiAoaXRlbS50YXJnZXQgPT09ICd0cnVlJyB8fCBpdGVtLnRhcmdldCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIG5vZGUudGFyZ2V0ID0gJ19ibGFuayc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIHBvcHVsYXRlIHN0eWxlIGNsYXNzZXMgdG8gYXBwbHkgQ01TIGRyaXZlbiBzdHlsaW5nXG4gICAgICBpZiAoaXRlbS5zdHlsZUNsYXNzZXMpIHtcbiAgICAgICAgbm9kZS5zdHlsZUNsYXNzZXMgPSBpdGVtLnN0eWxlQ2xhc3NlcztcbiAgICAgIH1cbiAgICAgIC8vIHBvcHVsYXRlIHN0eWxlIGF0dHJpYnV0ZXMgdG8gYXBwbHkgQ01TIGRyaXZlbiBzdHlsaW5nXG4gICAgICBpZiAoaXRlbS5zdHlsZUF0dHJpYnV0ZXMpIHtcbiAgICAgICAgbm9kZS5zdHlsZUF0dHJpYnV0ZXMgPSBpdGVtLnN0eWxlQXR0cmlidXRlcztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogR2V0cyB0aGUgVVJMIG9yIGxpbmsgdG8gYSByZWxhdGVkIGl0ZW0gKGNhdGVnb3J5KSxcbiAgICogYWxzbyB0YWtpbmcgaW50byBhY2NvdW50IGNvbnRlbnQgcGFnZXMgKGNvbnRlbnRQYWdlTGFiZWxPcklkKVxuICAgKiBhbmQgcHJvZHVjdCBwYWdlcyAocHJvZHVjdENvZGUpXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0TGluayhpdGVtOiBhbnkpOiBzdHJpbmcgfCBzdHJpbmdbXSB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKGl0ZW0udXJsKSB7XG4gICAgICByZXR1cm4gaXRlbS51cmw7XG4gICAgfSBlbHNlIGlmIChpdGVtLmNvbnRlbnRQYWdlTGFiZWxPcklkKSB7XG4gICAgICByZXR1cm4gaXRlbS5jb250ZW50UGFnZUxhYmVsT3JJZDtcbiAgICB9IGVsc2UgaWYgKGl0ZW0uY2F0ZWdvcnlDb2RlKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZW1hbnRpY1BhdGhTZXJ2aWNlLnRyYW5zZm9ybSh7XG4gICAgICAgIGN4Um91dGU6ICdjYXRlZ29yeScsXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIGNvZGU6IGl0ZW0uY2F0ZWdvcnlDb2RlLFxuICAgICAgICAgIG5hbWU6IGl0ZW0ubmFtZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoaXRlbS5wcm9kdWN0Q29kZSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2VtYW50aWNQYXRoU2VydmljZS50cmFuc2Zvcm0oe1xuICAgICAgICBjeFJvdXRlOiAncHJvZHVjdCcsXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIGNvZGU6IGl0ZW0ucHJvZHVjdENvZGUsXG4gICAgICAgICAgbmFtZTogaXRlbS5uYW1lLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbi8vIENIRUNLIFNPTkFSXG4iXX0=