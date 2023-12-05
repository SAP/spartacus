/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../../config/occ-config";
export class ProductImageNormalizer {
    constructor(config) {
        this.config = config;
    }
    convert(source, target) {
        if (target === undefined) {
            target = { ...source };
        }
        if (source.images) {
            target.images = this.normalize(source.images);
        }
        return target;
    }
    /**
     * @desc
     * Creates the image structure we'd like to have. Instead of
     * having a single list with all images despite type and format
     * we create a proper structure. With that we can do:
     * - images.primary.thumnail.url
     * - images.GALLERY[0].thumnail.url
     */
    normalize(source) {
        const images = {};
        if (source) {
            for (const image of source) {
                const isList = this.hasGalleryIndex(image);
                if (image.imageType) {
                    if (!images.hasOwnProperty(image.imageType)) {
                        images[image.imageType] = isList ? [] : {};
                    }
                    const imageContainer = this.getImageContainer(isList, images, image);
                    const targetImage = { ...image };
                    targetImage.url = this.normalizeImageUrl(targetImage.url ?? '');
                    if (image.format) {
                        imageContainer[image.format] = targetImage;
                    }
                }
            }
        }
        return images;
    }
    getImageContainer(isList, images, image) {
        if (isList) {
            const imageGroups = this.getImageGroups(images, image);
            return imageGroups[image.galleryIndex];
        }
        else {
            return images[image.imageType];
        }
    }
    getImageGroups(images, image) {
        const imageGroups = images[image.imageType];
        if (!imageGroups[image.galleryIndex]) {
            imageGroups[image.galleryIndex] = {};
        }
        return imageGroups;
    }
    /**
     * Traditionally, in an on-prem world, medias and other backend related calls
     * are hosted at the same platform, but in a cloud setup, applications are are
     * typically distributed cross different environments. For media, we use the
     * `backend.media.baseUrl` by default, but fallback to `backend.occ.baseUrl`
     * if none provided.
     */
    normalizeImageUrl(url) {
        if (new RegExp(/^(http|data:image|\/\/)/i).test(url)) {
            return url;
        }
        return ((this.config.backend?.media?.baseUrl ||
            this.config.backend?.occ?.baseUrl ||
            '') + url);
    }
    hasGalleryIndex(image) {
        const galleryIndex = image.galleryIndex ?? false;
        return galleryIndex !== false;
    }
}
ProductImageNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductImageNormalizer, deps: [{ token: i1.OccConfig }], target: i0.ɵɵFactoryTarget.Injectable });
ProductImageNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductImageNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductImageNormalizer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.OccConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1pbWFnZS1ub3JtYWxpemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvb2NjL2FkYXB0ZXJzL3Byb2R1Y3QvY29udmVydGVycy9wcm9kdWN0LWltYWdlLW5vcm1hbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQVEzQyxNQUFNLE9BQU8sc0JBQXNCO0lBQ2pDLFlBQXNCLE1BQWlCO1FBQWpCLFdBQU0sR0FBTixNQUFNLENBQVc7SUFBRyxDQUFDO0lBRTNDLE9BQU8sQ0FBQyxNQUFtQixFQUFFLE1BQWdCO1FBQzNDLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUN4QixNQUFNLEdBQUcsRUFBRSxHQUFJLE1BQWMsRUFBYSxDQUFDO1NBQzVDO1FBQ0QsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ2pCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDL0M7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILFNBQVMsQ0FBQyxNQUFtQjtRQUMzQixNQUFNLE1BQU0sR0FBVyxFQUFFLENBQUM7UUFDMUIsSUFBSSxNQUFNLEVBQUU7WUFDVixLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sRUFBRTtnQkFDMUIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDM0MsSUFBSSxLQUFLLENBQUMsU0FBUyxFQUFFO29CQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUU7d0JBQzNDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztxQkFDNUM7b0JBRUQsTUFBTSxjQUFjLEdBQWUsSUFBSSxDQUFDLGlCQUFpQixDQUN2RCxNQUFNLEVBQ04sTUFBTSxFQUNOLEtBQUssQ0FDTixDQUFDO29CQUVGLE1BQU0sV0FBVyxHQUFHLEVBQUUsR0FBRyxLQUFLLEVBQUUsQ0FBQztvQkFDakMsV0FBVyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQztvQkFDaEUsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO3dCQUNoQixjQUFjLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFdBQVcsQ0FBQztxQkFDNUM7aUJBQ0Y7YUFDRjtTQUNGO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVTLGlCQUFpQixDQUN6QixNQUFlLEVBQ2YsTUFBYyxFQUNkLEtBQXNCO1FBRXRCLElBQUksTUFBTSxFQUFFO1lBQ1YsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDdkQsT0FBTyxXQUFXLENBQUMsS0FBSyxDQUFDLFlBQXNCLENBQUMsQ0FBQztTQUNsRDthQUFNO1lBQ0wsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBZSxDQUFDO1NBQzlDO0lBQ0gsQ0FBQztJQUVTLGNBQWMsQ0FBQyxNQUFjLEVBQUUsS0FBc0I7UUFDN0QsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQWlCLENBQUM7UUFDNUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsWUFBc0IsQ0FBQyxFQUFFO1lBQzlDLFdBQVcsQ0FBQyxLQUFLLENBQUMsWUFBc0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNoRDtRQUNELE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSyxpQkFBaUIsQ0FBQyxHQUFXO1FBQ25DLElBQUksSUFBSSxNQUFNLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDcEQsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUNELE9BQU8sQ0FDTCxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPO1lBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxPQUFPO1lBQ2pDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FDWixDQUFDO0lBQ0osQ0FBQztJQUVPLGVBQWUsQ0FBQyxLQUFnQjtRQUN0QyxNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsWUFBWSxJQUFJLEtBQUssQ0FBQztRQUNqRCxPQUFPLFlBQVksS0FBSyxLQUFLLENBQUM7SUFDaEMsQ0FBQzs7bUhBMUZVLHNCQUFzQjt1SEFBdEIsc0JBQXNCLGNBRFQsTUFBTTsyRkFDbkIsc0JBQXNCO2tCQURsQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEltYWdlR3JvdXAsIEltYWdlcyB9IGZyb20gJy4uLy4uLy4uLy4uL21vZGVsL2ltYWdlLm1vZGVsJztcbmltcG9ydCB7IFByb2R1Y3QgfSBmcm9tICcuLi8uLi8uLi8uLi9tb2RlbC9wcm9kdWN0Lm1vZGVsJztcbmltcG9ydCB7IENvbnZlcnRlciB9IGZyb20gJy4uLy4uLy4uLy4uL3V0aWwvY29udmVydGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2NjQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vY29uZmlnL29jYy1jb25maWcnO1xuaW1wb3J0IHsgT2NjIH0gZnJvbSAnLi4vLi4vLi4vb2NjLW1vZGVscy9vY2MubW9kZWxzJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBQcm9kdWN0SW1hZ2VOb3JtYWxpemVyIGltcGxlbWVudHMgQ29udmVydGVyPE9jYy5Qcm9kdWN0LCBQcm9kdWN0PiB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBjb25maWc6IE9jY0NvbmZpZykge31cblxuICBjb252ZXJ0KHNvdXJjZTogT2NjLlByb2R1Y3QsIHRhcmdldD86IFByb2R1Y3QpOiBQcm9kdWN0IHtcbiAgICBpZiAodGFyZ2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRhcmdldCA9IHsgLi4uKHNvdXJjZSBhcyBhbnkpIH0gYXMgUHJvZHVjdDtcbiAgICB9XG4gICAgaWYgKHNvdXJjZS5pbWFnZXMpIHtcbiAgICAgIHRhcmdldC5pbWFnZXMgPSB0aGlzLm5vcm1hbGl6ZShzb3VyY2UuaW1hZ2VzKTtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY1xuICAgKiBDcmVhdGVzIHRoZSBpbWFnZSBzdHJ1Y3R1cmUgd2UnZCBsaWtlIHRvIGhhdmUuIEluc3RlYWQgb2ZcbiAgICogaGF2aW5nIGEgc2luZ2xlIGxpc3Qgd2l0aCBhbGwgaW1hZ2VzIGRlc3BpdGUgdHlwZSBhbmQgZm9ybWF0XG4gICAqIHdlIGNyZWF0ZSBhIHByb3BlciBzdHJ1Y3R1cmUuIFdpdGggdGhhdCB3ZSBjYW4gZG86XG4gICAqIC0gaW1hZ2VzLnByaW1hcnkudGh1bW5haWwudXJsXG4gICAqIC0gaW1hZ2VzLkdBTExFUllbMF0udGh1bW5haWwudXJsXG4gICAqL1xuICBub3JtYWxpemUoc291cmNlOiBPY2MuSW1hZ2VbXSk6IEltYWdlcyB7XG4gICAgY29uc3QgaW1hZ2VzOiBJbWFnZXMgPSB7fTtcbiAgICBpZiAoc291cmNlKSB7XG4gICAgICBmb3IgKGNvbnN0IGltYWdlIG9mIHNvdXJjZSkge1xuICAgICAgICBjb25zdCBpc0xpc3QgPSB0aGlzLmhhc0dhbGxlcnlJbmRleChpbWFnZSk7XG4gICAgICAgIGlmIChpbWFnZS5pbWFnZVR5cGUpIHtcbiAgICAgICAgICBpZiAoIWltYWdlcy5oYXNPd25Qcm9wZXJ0eShpbWFnZS5pbWFnZVR5cGUpKSB7XG4gICAgICAgICAgICBpbWFnZXNbaW1hZ2UuaW1hZ2VUeXBlXSA9IGlzTGlzdCA/IFtdIDoge307XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgaW1hZ2VDb250YWluZXI6IEltYWdlR3JvdXAgPSB0aGlzLmdldEltYWdlQ29udGFpbmVyKFxuICAgICAgICAgICAgaXNMaXN0LFxuICAgICAgICAgICAgaW1hZ2VzLFxuICAgICAgICAgICAgaW1hZ2VcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgY29uc3QgdGFyZ2V0SW1hZ2UgPSB7IC4uLmltYWdlIH07XG4gICAgICAgICAgdGFyZ2V0SW1hZ2UudXJsID0gdGhpcy5ub3JtYWxpemVJbWFnZVVybCh0YXJnZXRJbWFnZS51cmwgPz8gJycpO1xuICAgICAgICAgIGlmIChpbWFnZS5mb3JtYXQpIHtcbiAgICAgICAgICAgIGltYWdlQ29udGFpbmVyW2ltYWdlLmZvcm1hdF0gPSB0YXJnZXRJbWFnZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGltYWdlcztcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRJbWFnZUNvbnRhaW5lcihcbiAgICBpc0xpc3Q6IGJvb2xlYW4sXG4gICAgaW1hZ2VzOiBJbWFnZXMsXG4gICAgaW1hZ2U6IE9jYy5JbWFnZSB8IGFueVxuICApIHtcbiAgICBpZiAoaXNMaXN0KSB7XG4gICAgICBjb25zdCBpbWFnZUdyb3VwcyA9IHRoaXMuZ2V0SW1hZ2VHcm91cHMoaW1hZ2VzLCBpbWFnZSk7XG4gICAgICByZXR1cm4gaW1hZ2VHcm91cHNbaW1hZ2UuZ2FsbGVyeUluZGV4IGFzIG51bWJlcl07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBpbWFnZXNbaW1hZ2UuaW1hZ2VUeXBlXSBhcyBJbWFnZUdyb3VwO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRJbWFnZUdyb3VwcyhpbWFnZXM6IEltYWdlcywgaW1hZ2U6IE9jYy5JbWFnZSB8IGFueSkge1xuICAgIGNvbnN0IGltYWdlR3JvdXBzID0gaW1hZ2VzW2ltYWdlLmltYWdlVHlwZV0gYXMgSW1hZ2VHcm91cFtdO1xuICAgIGlmICghaW1hZ2VHcm91cHNbaW1hZ2UuZ2FsbGVyeUluZGV4IGFzIG51bWJlcl0pIHtcbiAgICAgIGltYWdlR3JvdXBzW2ltYWdlLmdhbGxlcnlJbmRleCBhcyBudW1iZXJdID0ge307XG4gICAgfVxuICAgIHJldHVybiBpbWFnZUdyb3VwcztcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFkaXRpb25hbGx5LCBpbiBhbiBvbi1wcmVtIHdvcmxkLCBtZWRpYXMgYW5kIG90aGVyIGJhY2tlbmQgcmVsYXRlZCBjYWxsc1xuICAgKiBhcmUgaG9zdGVkIGF0IHRoZSBzYW1lIHBsYXRmb3JtLCBidXQgaW4gYSBjbG91ZCBzZXR1cCwgYXBwbGljYXRpb25zIGFyZSBhcmVcbiAgICogdHlwaWNhbGx5IGRpc3RyaWJ1dGVkIGNyb3NzIGRpZmZlcmVudCBlbnZpcm9ubWVudHMuIEZvciBtZWRpYSwgd2UgdXNlIHRoZVxuICAgKiBgYmFja2VuZC5tZWRpYS5iYXNlVXJsYCBieSBkZWZhdWx0LCBidXQgZmFsbGJhY2sgdG8gYGJhY2tlbmQub2NjLmJhc2VVcmxgXG4gICAqIGlmIG5vbmUgcHJvdmlkZWQuXG4gICAqL1xuICBwcml2YXRlIG5vcm1hbGl6ZUltYWdlVXJsKHVybDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAobmV3IFJlZ0V4cCgvXihodHRwfGRhdGE6aW1hZ2V8XFwvXFwvKS9pKS50ZXN0KHVybCkpIHtcbiAgICAgIHJldHVybiB1cmw7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICAodGhpcy5jb25maWcuYmFja2VuZD8ubWVkaWE/LmJhc2VVcmwgfHxcbiAgICAgICAgdGhpcy5jb25maWcuYmFja2VuZD8ub2NjPy5iYXNlVXJsIHx8XG4gICAgICAgICcnKSArIHVybFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGhhc0dhbGxlcnlJbmRleChpbWFnZTogT2NjLkltYWdlKSB7XG4gICAgY29uc3QgZ2FsbGVyeUluZGV4ID0gaW1hZ2UuZ2FsbGVyeUluZGV4ID8/IGZhbHNlO1xuICAgIHJldHVybiBnYWxsZXJ5SW5kZXggIT09IGZhbHNlO1xuICB9XG59XG4iXX0=