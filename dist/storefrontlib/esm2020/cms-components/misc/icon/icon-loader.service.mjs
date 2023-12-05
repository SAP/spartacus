/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, SecurityContext } from '@angular/core';
import { IconResourceType, } from './icon.model';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "./icon.model";
import * as i3 from "@angular/platform-browser";
export class IconLoaderService {
    constructor(winRef, iconConfig, sanitizer) {
        this.winRef = winRef;
        this.iconConfig = iconConfig;
        this.sanitizer = sanitizer;
        this.loadedResources = [];
    }
    /**
     * Returns an html fragment which can be added to the DOM in a safe way.
     */
    getHtml(type) {
        if (this.isResourceType(type, IconResourceType.SVG)) {
            const url = this.sanitizer.sanitize(SecurityContext.URL, this.getSvgPath(type) || null);
            if (url) {
                const useElement = this.winRef.document.createElement('use');
                useElement.setAttribute('xlink:href', url);
                const svgElement = this.winRef.document.createElement('svg');
                svgElement.appendChild(useElement);
                return this.sanitizer.bypassSecurityTrustHtml(svgElement.outerHTML);
            }
        }
        if (this.isResourceType(type, IconResourceType.TEXT)) {
            const symbol = this.getSymbol(type);
            if (symbol) {
                const helperDiv = this.winRef.document.createElement('div');
                helperDiv.textContent = symbol;
                return this.sanitizer.bypassSecurityTrustHtml(helperDiv.innerHTML);
            }
        }
    }
    /**
     * Return the direction for which the icon should mirror (ltr vs rtl). The icon direction
     * is configurable, but optional, as only a few icons should be flipped for rtl direction.
     */
    getFlipDirection(type) {
        return this.config?.flipDirection?.[type];
    }
    /**
     *
     * Returns the symbol class(es) for the icon type.
     */
    getStyleClasses(iconType) {
        return this.getSymbol(iconType) || '';
    }
    /**
     * Indicates whether the given `ICON_TYPE` is configured for
     * the given `IconResourceType`.
     */
    isResourceType(iconType, resourceType) {
        return (this.config?.resources !== undefined &&
            !!this.config.resources.find((res) => res.types && res.type === resourceType && res.types.includes(iconType)));
    }
    /**
     * Returns the path to the svg link. The link supports path names
     * as well, if the config a[[s been setup to support a svg file path.
     * Additionally, the icon prefix will be taken into account to prefix the
     * icon IDs in the SVG.
     */
    getSvgPath(iconType) {
        const svgResource = this.config?.resources?.find((res) => res.type === IconResourceType.SVG &&
            res.types &&
            res.types.includes(iconType));
        if (svgResource) {
            return svgResource.url
                ? `${svgResource.url}#${this.getSymbol(iconType)}`
                : `#${this.getSymbol(iconType)}`;
        }
    }
    /**
     * Loads the resource url (if any) for the given icon.
     * The icon will only be loaded once.
     *
     * NOTE: this is not working when the shadow is used as there's
     * no head element available and the link must be loaded for every
     * web component.
     */
    addLinkResource(iconType) {
        const resource = this.findResource(iconType, IconResourceType.LINK);
        if (resource?.url && !this.loadedResources.includes(resource.url)) {
            this.loadedResources.push(resource.url);
            // using DOM APIs, so need to sanitize our URLs manually
            const sanitizedUrl = this.sanitizer.sanitize(SecurityContext.URL, resource.url);
            if (sanitizedUrl) {
                const head = this.winRef.document.getElementsByTagName('head')[0];
                const link = this.winRef.document.createElement('link');
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = sanitizedUrl;
                head.appendChild(link);
            }
        }
    }
    findResource(iconType, resourceType) {
        if (!this.config?.resources) {
            return;
        }
        let resource = this.config.resources.find((res) => res.type === resourceType && res.types && res.types.includes(iconType));
        // no specific resource found, let's try to find a one-size-fits-all resource
        if (!resource) {
            resource = this.config.resources.find((res) => (res.type === resourceType && !res.types) ||
                (res.types && res.types.length === 0));
        }
        return resource;
    }
    getSymbol(iconType) {
        if (this.config && this.config.symbols && this.config.symbols[iconType]) {
            return this.config.symbols[iconType];
        }
    }
    get config() {
        return this.iconConfig.icon;
    }
}
IconLoaderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: IconLoaderService, deps: [{ token: i1.WindowRef }, { token: i2.IconConfig }, { token: i3.DomSanitizer }], target: i0.ɵɵFactoryTarget.Injectable });
IconLoaderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: IconLoaderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: IconLoaderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.WindowRef }, { type: i2.IconConfig }, { type: i3.DomSanitizer }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi1sb2FkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvbWlzYy9pY29uL2ljb24tbG9hZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTVELE9BQU8sRUFJTCxnQkFBZ0IsR0FFakIsTUFBTSxjQUFjLENBQUM7Ozs7O0FBS3RCLE1BQU0sT0FBTyxpQkFBaUI7SUFFNUIsWUFDWSxNQUFpQixFQUNqQixVQUFzQixFQUN0QixTQUF1QjtRQUZ2QixXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2pCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsY0FBUyxHQUFULFNBQVMsQ0FBYztRQUozQixvQkFBZSxHQUFhLEVBQUUsQ0FBQztJQUtwQyxDQUFDO0lBRUo7O09BRUc7SUFDSCxPQUFPLENBQUMsSUFBd0I7UUFDOUIsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNuRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FDakMsZUFBZSxDQUFDLEdBQUcsRUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQzlCLENBQUM7WUFDRixJQUFJLEdBQUcsRUFBRTtnQkFDUCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzdELFVBQVUsQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUMzQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FB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LENBQUMsQ0FBQyxDQUN4QyxDQUFDO1NBQ0g7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRUQsU0FBUyxDQUFDLFFBQTRCO1FBQ3BDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN2RSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3RDO0lBQ0gsQ0FBQztJQUVELElBQVksTUFBTTtRQUNoQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO0lBQzlCLENBQUM7OzhHQXBKVSxpQkFBaUI7a0hBQWpCLGlCQUFpQixjQUZoQixNQUFNOzJGQUVQLGlCQUFpQjtrQkFIN0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBTZWN1cml0eUNvbnRleHQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZUh0bWwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IFdpbmRvd1JlZiB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBEaXJlY3Rpb25Nb2RlIH0gZnJvbSAnLi4vLi4vLi4vbGF5b3V0L2RpcmVjdGlvbi9jb25maWcvZGlyZWN0aW9uLm1vZGVsJztcbmltcG9ydCB7XG4gIEljb25Db25maWcsXG4gIEljb25Db25maWdSZXNvdXJjZSxcbiAgSWNvbk9wdGlvbnMsXG4gIEljb25SZXNvdXJjZVR5cGUsXG4gIElDT05fVFlQRSxcbn0gZnJvbSAnLi9pY29uLm1vZGVsJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEljb25Mb2FkZXJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBsb2FkZWRSZXNvdXJjZXM6IHN0cmluZ1tdID0gW107XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCB3aW5SZWY6IFdpbmRvd1JlZixcbiAgICBwcm90ZWN0ZWQgaWNvbkNvbmZpZzogSWNvbkNvbmZpZyxcbiAgICBwcm90ZWN0ZWQgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXJcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIGh0bWwgZnJhZ21lbnQgd2hpY2ggY2FuIGJlIGFkZGVkIHRvIHRoZSBET00gaW4gYSBzYWZlIHdheS5cbiAgICovXG4gIGdldEh0bWwodHlwZTogSUNPTl9UWVBFIHwgc3RyaW5nKTogU2FmZUh0bWwgfCB1bmRlZmluZWQge1xuICAgIGlmICh0aGlzLmlzUmVzb3VyY2VUeXBlKHR5cGUsIEljb25SZXNvdXJjZVR5cGUuU1ZHKSkge1xuICAgICAgY29uc3QgdXJsID0gdGhpcy5zYW5pdGl6ZXIuc2FuaXRpemUoXG4gICAgICAgIFNlY3VyaXR5Q29udGV4dC5VUkwsXG4gICAgICAgIHRoaXMuZ2V0U3ZnUGF0aCh0eXBlKSB8fCBudWxsXG4gICAgICApO1xuICAgICAgaWYgKHVybCkge1xuICAgICAgICBjb25zdCB1c2VFbGVtZW50ID0gdGhpcy53aW5SZWYuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndXNlJyk7XG4gICAgICAgIHVzZUVsZW1lbnQuc2V0QXR0cmlidXRlKCd4bGluazpocmVmJywgdXJsKTtcbiAgICAgICAgY29uc3Qgc3ZnRWxlbWVudCA9IHRoaXMud2luUmVmLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N2ZycpO1xuICAgICAgICBzdmdFbGVtZW50LmFwcGVuZENoaWxkKHVzZUVsZW1lbnQpO1xuICAgICAgICByZXR1cm4gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwoc3ZnRWxlbWVudC5vdXRlckhUTUwpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5pc1Jlc291cmNlVHlwZSh0eXBlLCBJY29uUmVzb3VyY2VUeXBlLlRFWFQpKSB7XG4gICAgICBjb25zdCBzeW1ib2wgPSB0aGlzLmdldFN5bWJvbCh0eXBlKTtcbiAgICAgIGlmIChzeW1ib2wpIHtcbiAgICAgICAgY29uc3QgaGVscGVyRGl2ID0gdGhpcy53aW5SZWYuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGhlbHBlckRpdi50ZXh0Q29udGVudCA9IHN5bWJvbDtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKGhlbHBlckRpdi5pbm5lckhUTUwpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGRpcmVjdGlvbiBmb3Igd2hpY2ggdGhlIGljb24gc2hvdWxkIG1pcnJvciAobHRyIHZzIHJ0bCkuIFRoZSBpY29uIGRpcmVjdGlvblxuICAgKiBpcyBjb25maWd1cmFibGUsIGJ1dCBvcHRpb25hbCwgYXMgb25seSBhIGZldyBpY29ucyBzaG91bGQgYmUgZmxpcHBlZCBmb3IgcnRsIGRpcmVjdGlvbi5cbiAgICovXG4gIGdldEZsaXBEaXJlY3Rpb24odHlwZTogSUNPTl9UWVBFIHwgc3RyaW5nKTogRGlyZWN0aW9uTW9kZSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnPy5mbGlwRGlyZWN0aW9uPy5bdHlwZV07XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogUmV0dXJucyB0aGUgc3ltYm9sIGNsYXNzKGVzKSBmb3IgdGhlIGljb24gdHlwZS5cbiAgICovXG4gIGdldFN0eWxlQ2xhc3NlcyhpY29uVHlwZTogSUNPTl9UWVBFIHwgc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5nZXRTeW1ib2woaWNvblR5cGUpIHx8ICcnO1xuICB9XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBnaXZlbiBgSUNPTl9UWVBFYCBpcyBjb25maWd1cmVkIGZvclxuICAgKiB0aGUgZ2l2ZW4gYEljb25SZXNvdXJjZVR5cGVgLlxuICAgKi9cbiAgcHJpdmF0ZSBpc1Jlc291cmNlVHlwZShcbiAgICBpY29uVHlwZTogSUNPTl9UWVBFIHwgc3RyaW5nLFxuICAgIHJlc291cmNlVHlwZTogSWNvblJlc291cmNlVHlwZVxuICApOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5jb25maWc/LnJlc291cmNlcyAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAhIXRoaXMuY29uZmlnLnJlc291cmNlcy5maW5kKFxuICAgICAgICAocmVzKSA9PlxuICAgICAgICAgIHJlcy50eXBlcyAmJiByZXMudHlwZSA9PT0gcmVzb3VyY2VUeXBlICYmIHJlcy50eXBlcy5pbmNsdWRlcyhpY29uVHlwZSlcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHBhdGggdG8gdGhlIHN2ZyBsaW5rLiBUaGUgbGluayBzdXBwb3J0cyBwYXRoIG5hbWVzXG4gICAqIGFzIHdlbGwsIGlmIHRoZSBjb25maWcgYVtbcyBiZWVuIHNldHVwIHRvIHN1cHBvcnQgYSBzdmcgZmlsZSBwYXRoLlxuICAgKiBBZGRpdGlvbmFsbHksIHRoZSBpY29uIHByZWZpeCB3aWxsIGJlIHRha2VuIGludG8gYWNjb3VudCB0byBwcmVmaXggdGhlXG4gICAqIGljb24gSURzIGluIHRoZSBTVkcuXG4gICAqL1xuICBwcml2YXRlIGdldFN2Z1BhdGgoaWNvblR5cGU6IElDT05fVFlQRSB8IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3Qgc3ZnUmVzb3VyY2UgPSB0aGlzLmNvbmZpZz8ucmVzb3VyY2VzPy5maW5kKFxuICAgICAgKHJlcykgPT5cbiAgICAgICAgcmVzLnR5cGUgPT09IEljb25SZXNvdXJjZVR5cGUuU1ZHICYmXG4gICAgICAgIHJlcy50eXBlcyAmJlxuICAgICAgICByZXMudHlwZXMuaW5jbHVkZXMoaWNvblR5cGUpXG4gICAgKTtcbiAgICBpZiAoc3ZnUmVzb3VyY2UpIHtcbiAgICAgIHJldHVybiBzdmdSZXNvdXJjZS51cmxcbiAgICAgICAgPyBgJHtzdmdSZXNvdXJjZS51cmx9IyR7dGhpcy5nZXRTeW1ib2woaWNvblR5cGUpfWBcbiAgICAgICAgOiBgIyR7dGhpcy5nZXRTeW1ib2woaWNvblR5cGUpfWA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIExvYWRzIHRoZSByZXNvdXJjZSB1cmwgKGlmIGFueSkgZm9yIHRoZSBnaXZlbiBpY29uLlxuICAgKiBUaGUgaWNvbiB3aWxsIG9ubHkgYmUgbG9hZGVkIG9uY2UuXG4gICAqXG4gICAqIE5PVEU6IHRoaXMgaXMgbm90IHdvcmtpbmcgd2hlbiB0aGUgc2hhZG93IGlzIHVzZWQgYXMgdGhlcmUnc1xuICAgKiBubyBoZWFkIGVsZW1lbnQgYXZhaWxhYmxlIGFuZCB0aGUgbGluayBtdXN0IGJlIGxvYWRlZCBmb3IgZXZlcnlcbiAgICogd2ViIGNvbXBvbmVudC5cbiAgICovXG4gIGFkZExpbmtSZXNvdXJjZShpY29uVHlwZTogSUNPTl9UWVBFIHwgc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgcmVzb3VyY2UgPSB0aGlzLmZpbmRSZXNvdXJjZShpY29uVHlwZSwgSWNvblJlc291cmNlVHlwZS5MSU5LKTtcblxuICAgIGlmIChyZXNvdXJjZT8udXJsICYmICF0aGlzLmxvYWRlZFJlc291cmNlcy5pbmNsdWRlcyhyZXNvdXJjZS51cmwpKSB7XG4gICAgICB0aGlzLmxvYWRlZFJlc291cmNlcy5wdXNoKHJlc291cmNlLnVybCk7XG4gICAgICAvLyB1c2luZyBET00gQVBJcywgc28gbmVlZCB0byBzYW5pdGl6ZSBvdXIgVVJMcyBtYW51YWxseVxuICAgICAgY29uc3Qgc2FuaXRpemVkVXJsID0gdGhpcy5zYW5pdGl6ZXIuc2FuaXRpemUoXG4gICAgICAgIFNlY3VyaXR5Q29udGV4dC5VUkwsXG4gICAgICAgIHJlc291cmNlLnVybFxuICAgICAgKTtcbiAgICAgIGlmIChzYW5pdGl6ZWRVcmwpIHtcbiAgICAgICAgY29uc3QgaGVhZCA9IHRoaXMud2luUmVmLmRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gICAgICAgIGNvbnN0IGxpbmsgPSB0aGlzLndpblJlZi5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gICAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgICAgICBsaW5rLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgICAgICBsaW5rLmhyZWYgPSBzYW5pdGl6ZWRVcmw7XG4gICAgICAgIGhlYWQuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBmaW5kUmVzb3VyY2UoXG4gICAgaWNvblR5cGU6IElDT05fVFlQRSB8IHN0cmluZyxcbiAgICByZXNvdXJjZVR5cGU6IEljb25SZXNvdXJjZVR5cGVcbiAgKTogSWNvbkNvbmZpZ1Jlc291cmNlIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIXRoaXMuY29uZmlnPy5yZXNvdXJjZXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgcmVzb3VyY2UgPSB0aGlzLmNvbmZpZy5yZXNvdXJjZXMuZmluZChcbiAgICAgIChyZXMpID0+XG4gICAgICAgIHJlcy50eXBlID09PSByZXNvdXJjZVR5cGUgJiYgcmVzLnR5cGVzICYmIHJlcy50eXBlcy5pbmNsdWRlcyhpY29uVHlwZSlcbiAgICApO1xuICAgIC8vIG5vIHNwZWNpZmljIHJlc291cmNlIGZvdW5kLCBsZXQncyB0cnkgdG8gZmluZCBhIG9uZS1zaXplLWZpdHMtYWxsIHJlc291cmNlXG4gICAgaWYgKCFyZXNvdXJjZSkge1xuICAgICAgcmVzb3VyY2UgPSB0aGlzLmNvbmZpZy5yZXNvdXJjZXMuZmluZChcbiAgICAgICAgKHJlcykgPT5cbiAgICAgICAgICAocmVzLnR5cGUgPT09IHJlc291cmNlVHlwZSAmJiAhcmVzLnR5cGVzKSB8fFxuICAgICAgICAgIChyZXMudHlwZXMgJiYgcmVzLnR5cGVzLmxlbmd0aCA9PT0gMClcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiByZXNvdXJjZTtcbiAgfVxuXG4gIGdldFN5bWJvbChpY29uVHlwZTogSUNPTl9UWVBFIHwgc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuY29uZmlnICYmIHRoaXMuY29uZmlnLnN5bWJvbHMgJiYgdGhpcy5jb25maWcuc3ltYm9sc1tpY29uVHlwZV0pIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5zeW1ib2xzW2ljb25UeXBlXTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldCBjb25maWcoKTogSWNvbk9wdGlvbnMgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmljb25Db25maWcuaWNvbjtcbiAgfVxufVxuIl19