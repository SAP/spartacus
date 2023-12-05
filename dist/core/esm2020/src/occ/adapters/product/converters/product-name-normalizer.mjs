/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../../config/occ-config";
export class ProductNameNormalizer {
    constructor(config) {
        this.config = config;
        /**
         * A pretty url should not have any encoded characters, which is why we replace
         * the following character in the product title.
         *
         * See https://developers.google.com/maps/documentation/urls/url-encoding for more
         * information on the characters.
         */
        this.reservedSlugCharacters = ` !*'();:@&=+$,/?%#[]`;
        this.slugChar = '-';
        // created the regex only once
        this.slugRegex = new RegExp(`[${this.reservedSlugCharacters.split('').join('\\')}]`, 'g');
        this.sanitizeMultipleSlugChars = new RegExp(`${this.slugChar}+`, 'g');
    }
    convert(source, target) {
        target = target ?? { ...source };
        if (source.name) {
            target.name = this.normalize(source.name);
            target.slug = this.normalizeSlug(source.name);
            target.nameHtml = source.name;
        }
        return target;
    }
    /**
     * Sanitizes the name so that the name doesn't contain html elements.
     */
    normalize(name) {
        return name.replace(/<[^>]*>/g, '');
    }
    /**
     * Provides a title slug for the pretty URL.
     *
     * The name is sanitized from html, trimmed, converted to lowercase and special characters
     * which are encoded are replaced by the slug char (dash by default).
     */
    normalizeSlug(name) {
        return this.normalize(name)
            .trim()
            .toLowerCase()
            .replace(this.slugRegex, this.slugChar)
            .replace(this.sanitizeMultipleSlugChars, this.slugChar);
    }
}
ProductNameNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductNameNormalizer, deps: [{ token: i1.OccConfig }], target: i0.ɵɵFactoryTarget.Injectable });
ProductNameNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductNameNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductNameNormalizer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.OccConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1uYW1lLW5vcm1hbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9vY2MvYWRhcHRlcnMvcHJvZHVjdC9jb252ZXJ0ZXJzL3Byb2R1Y3QtbmFtZS1ub3JtYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFPM0MsTUFBTSxPQUFPLHFCQUFxQjtJQUNoQyxZQUFzQixNQUFpQjtRQUFqQixXQUFNLEdBQU4sTUFBTSxDQUFXO1FBb0J2Qzs7Ozs7O1dBTUc7UUFDTywyQkFBc0IsR0FBRyxzQkFBc0IsQ0FBQztRQUNoRCxhQUFRLEdBQUcsR0FBRyxDQUFDO1FBRXpCLDhCQUE4QjtRQUN0QixjQUFTLEdBQUcsSUFBSSxNQUFNLENBQzVCLElBQUksSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFDdkQsR0FBRyxDQUNKLENBQUM7UUFDTSw4QkFBeUIsR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQW5DL0IsQ0FBQztJQUUzQyxPQUFPLENBQUMsTUFBbUIsRUFBRSxNQUFnQjtRQUMzQyxNQUFNLEdBQUcsTUFBTSxJQUFJLEVBQUUsR0FBSSxNQUFzQyxFQUFFLENBQUM7UUFFbEUsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQ2YsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxQyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztTQUMvQjtRQUNELE9BQU8sTUFBaUIsQ0FBQztJQUMzQixDQUFDO0lBRUQ7O09BRUc7SUFDTyxTQUFTLENBQUMsSUFBWTtRQUM5QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFtQkQ7Ozs7O09BS0c7SUFDTyxhQUFhLENBQUMsSUFBWTtRQUNsQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO2FBQ3hCLElBQUksRUFBRTthQUNOLFdBQVcsRUFBRTthQUNiLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUM7YUFDdEMsT0FBTyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUQsQ0FBQzs7a0hBbERVLHFCQUFxQjtzSEFBckIscUJBQXFCLGNBRFIsTUFBTTsyRkFDbkIscUJBQXFCO2tCQURqQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFByb2R1Y3QgfSBmcm9tICcuLi8uLi8uLi8uLi9tb2RlbC9wcm9kdWN0Lm1vZGVsJztcbmltcG9ydCB7IENvbnZlcnRlciB9IGZyb20gJy4uLy4uLy4uLy4uL3V0aWwvY29udmVydGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2NjQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vY29uZmlnL29jYy1jb25maWcnO1xuaW1wb3J0IHsgT2NjIH0gZnJvbSAnLi4vLi4vLi4vb2NjLW1vZGVscy9vY2MubW9kZWxzJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBQcm9kdWN0TmFtZU5vcm1hbGl6ZXIgaW1wbGVtZW50cyBDb252ZXJ0ZXI8T2NjLlByb2R1Y3QsIFByb2R1Y3Q+IHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGNvbmZpZzogT2NjQ29uZmlnKSB7fVxuXG4gIGNvbnZlcnQoc291cmNlOiBPY2MuUHJvZHVjdCwgdGFyZ2V0PzogUHJvZHVjdCk6IFByb2R1Y3Qge1xuICAgIHRhcmdldCA9IHRhcmdldCA/PyB7IC4uLihzb3VyY2UgYXMgdW5rbm93biBhcyBQYXJ0aWFsPFByb2R1Y3Q+KSB9O1xuXG4gICAgaWYgKHNvdXJjZS5uYW1lKSB7XG4gICAgICB0YXJnZXQubmFtZSA9IHRoaXMubm9ybWFsaXplKHNvdXJjZS5uYW1lKTtcbiAgICAgIHRhcmdldC5zbHVnID0gdGhpcy5ub3JtYWxpemVTbHVnKHNvdXJjZS5uYW1lKTtcbiAgICAgIHRhcmdldC5uYW1lSHRtbCA9IHNvdXJjZS5uYW1lO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0IGFzIFByb2R1Y3Q7XG4gIH1cblxuICAvKipcbiAgICogU2FuaXRpemVzIHRoZSBuYW1lIHNvIHRoYXQgdGhlIG5hbWUgZG9lc24ndCBjb250YWluIGh0bWwgZWxlbWVudHMuXG4gICAqL1xuICBwcm90ZWN0ZWQgbm9ybWFsaXplKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIG5hbWUucmVwbGFjZSgvPFtePl0qPi9nLCAnJyk7XG4gIH1cblxuICAvKipcbiAgICogQSBwcmV0dHkgdXJsIHNob3VsZCBub3QgaGF2ZSBhbnkgZW5jb2RlZCBjaGFyYWN0ZXJzLCB3aGljaCBpcyB3aHkgd2UgcmVwbGFjZVxuICAgKiB0aGUgZm9sbG93aW5nIGNoYXJhY3RlciBpbiB0aGUgcHJvZHVjdCB0aXRsZS5cbiAgICpcbiAgICogU2VlIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL21hcHMvZG9jdW1lbnRhdGlvbi91cmxzL3VybC1lbmNvZGluZyBmb3IgbW9yZVxuICAgKiBpbmZvcm1hdGlvbiBvbiB0aGUgY2hhcmFjdGVycy5cbiAgICovXG4gIHByb3RlY3RlZCByZXNlcnZlZFNsdWdDaGFyYWN0ZXJzID0gYCAhKicoKTs6QCY9KyQsLz8lI1tdYDtcbiAgcHJvdGVjdGVkIHNsdWdDaGFyID0gJy0nO1xuXG4gIC8vIGNyZWF0ZWQgdGhlIHJlZ2V4IG9ubHkgb25jZVxuICBwcml2YXRlIHNsdWdSZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgYFske3RoaXMucmVzZXJ2ZWRTbHVnQ2hhcmFjdGVycy5zcGxpdCgnJykuam9pbignXFxcXCcpfV1gLFxuICAgICdnJ1xuICApO1xuICBwcml2YXRlIHNhbml0aXplTXVsdGlwbGVTbHVnQ2hhcnMgPSBuZXcgUmVnRXhwKGAke3RoaXMuc2x1Z0NoYXJ9K2AsICdnJyk7XG5cbiAgLyoqXG4gICAqIFByb3ZpZGVzIGEgdGl0bGUgc2x1ZyBmb3IgdGhlIHByZXR0eSBVUkwuXG4gICAqXG4gICAqIFRoZSBuYW1lIGlzIHNhbml0aXplZCBmcm9tIGh0bWwsIHRyaW1tZWQsIGNvbnZlcnRlZCB0byBsb3dlcmNhc2UgYW5kIHNwZWNpYWwgY2hhcmFjdGVyc1xuICAgKiB3aGljaCBhcmUgZW5jb2RlZCBhcmUgcmVwbGFjZWQgYnkgdGhlIHNsdWcgY2hhciAoZGFzaCBieSBkZWZhdWx0KS5cbiAgICovXG4gIHByb3RlY3RlZCBub3JtYWxpemVTbHVnKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubm9ybWFsaXplKG5hbWUpXG4gICAgICAudHJpbSgpXG4gICAgICAudG9Mb3dlckNhc2UoKVxuICAgICAgLnJlcGxhY2UodGhpcy5zbHVnUmVnZXgsIHRoaXMuc2x1Z0NoYXIpXG4gICAgICAucmVwbGFjZSh0aGlzLnNhbml0aXplTXVsdGlwbGVTbHVnQ2hhcnMsIHRoaXMuc2x1Z0NoYXIpO1xuICB9XG59XG4iXX0=