/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Builds the basic structured data for the product, see https://schema.org/product.
 * This builder includes data for sku number, name, description, brand and main image.
 */
export class JsonLdBaseProductBuilder {
    build(product) {
        return of({
            ...this.getProductBase(product),
            ...this.getProductBrand(product),
            ...this.getProductImage(product),
        });
    }
    /**
     * Returns the product sku, name and description.
     */
    getProductBase(product) {
        const result = { sku: product.code };
        if (product.name) {
            result.name = product.name;
        }
        if (product.summary) {
            result.description = product.summary;
        }
        return result;
    }
    /**
     * Returns the image object with the main product image url.
     *
     * If the image is not available, an empty object is returned.
     */
    getProductImage(product) {
        const image = product.images?.PRIMARY?.zoom?.url;
        return image ? { image } : {};
    }
    /**
     * Returns the brand object with the product manufacturer.
     *
     * If the brand is not available, an empty object is returned.
     */
    getProductBrand(product) {
        const brand = product.manufacturer;
        return brand ? { brand } : {};
    }
}
JsonLdBaseProductBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: JsonLdBaseProductBuilder, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
JsonLdBaseProductBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: JsonLdBaseProductBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: JsonLdBaseProductBuilder, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbmxkLWJhc2UtcHJvZHVjdC5idWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9jbXMtc3RydWN0dXJlL3Nlby9zdHJ1Y3R1cmVkLWRhdGEvYnVpbGRlcnMvcHJvZHVjdC9qc29ubGQtYmFzZS1wcm9kdWN0LmJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFHdEM7OztHQUdHO0FBSUgsTUFBTSxPQUFPLHdCQUF3QjtJQUNuQyxLQUFLLENBQUMsT0FBZ0I7UUFDcEIsT0FBTyxFQUFFLENBQUM7WUFDUixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDO1lBQy9CLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUM7WUFDaEMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQztTQUNqQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSyxjQUFjLENBQUMsT0FBZ0I7UUFDckMsTUFBTSxNQUFNLEdBQVEsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzFDLElBQUksT0FBTyxDQUFDLElBQUksRUFBRTtZQUNoQixNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7U0FDNUI7UUFDRCxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDbkIsTUFBTSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO1NBQ3RDO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDTyxlQUFlLENBQUMsT0FBZ0I7UUFDeEMsTUFBTSxLQUFLLEdBQVMsT0FBTyxDQUFDLE1BQU0sRUFBRSxPQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQztRQUN4RCxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7OztPQUlHO0lBQ08sZUFBZSxDQUFDLE9BQWdCO1FBQ3hDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFDbkMsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNoQyxDQUFDOztxSEF6Q1Usd0JBQXdCO3lIQUF4Qix3QkFBd0IsY0FGdkIsTUFBTTsyRkFFUCx3QkFBd0I7a0JBSHBDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSnNvbkxkQnVpbGRlciB9IGZyb20gJy4uL3NjaGVtYS5pbnRlcmZhY2UnO1xuXG4vKipcbiAqIEJ1aWxkcyB0aGUgYmFzaWMgc3RydWN0dXJlZCBkYXRhIGZvciB0aGUgcHJvZHVjdCwgc2VlIGh0dHBzOi8vc2NoZW1hLm9yZy9wcm9kdWN0LlxuICogVGhpcyBidWlsZGVyIGluY2x1ZGVzIGRhdGEgZm9yIHNrdSBudW1iZXIsIG5hbWUsIGRlc2NyaXB0aW9uLCBicmFuZCBhbmQgbWFpbiBpbWFnZS5cbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEpzb25MZEJhc2VQcm9kdWN0QnVpbGRlciBpbXBsZW1lbnRzIEpzb25MZEJ1aWxkZXI8UHJvZHVjdD4ge1xuICBidWlsZChwcm9kdWN0OiBQcm9kdWN0KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gb2Yoe1xuICAgICAgLi4udGhpcy5nZXRQcm9kdWN0QmFzZShwcm9kdWN0KSxcbiAgICAgIC4uLnRoaXMuZ2V0UHJvZHVjdEJyYW5kKHByb2R1Y3QpLFxuICAgICAgLi4udGhpcy5nZXRQcm9kdWN0SW1hZ2UocHJvZHVjdCksXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcHJvZHVjdCBza3UsIG5hbWUgYW5kIGRlc2NyaXB0aW9uLlxuICAgKi9cbiAgcHJpdmF0ZSBnZXRQcm9kdWN0QmFzZShwcm9kdWN0OiBQcm9kdWN0KSB7XG4gICAgY29uc3QgcmVzdWx0OiBhbnkgPSB7IHNrdTogcHJvZHVjdC5jb2RlIH07XG4gICAgaWYgKHByb2R1Y3QubmFtZSkge1xuICAgICAgcmVzdWx0Lm5hbWUgPSBwcm9kdWN0Lm5hbWU7XG4gICAgfVxuICAgIGlmIChwcm9kdWN0LnN1bW1hcnkpIHtcbiAgICAgIHJlc3VsdC5kZXNjcmlwdGlvbiA9IHByb2R1Y3Quc3VtbWFyeTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBpbWFnZSBvYmplY3Qgd2l0aCB0aGUgbWFpbiBwcm9kdWN0IGltYWdlIHVybC5cbiAgICpcbiAgICogSWYgdGhlIGltYWdlIGlzIG5vdCBhdmFpbGFibGUsIGFuIGVtcHR5IG9iamVjdCBpcyByZXR1cm5lZC5cbiAgICovXG4gIHByb3RlY3RlZCBnZXRQcm9kdWN0SW1hZ2UocHJvZHVjdDogUHJvZHVjdCk6IHsgaW1hZ2U/OiBzdHJpbmcgfSB7XG4gICAgY29uc3QgaW1hZ2UgPSAoPGFueT5wcm9kdWN0LmltYWdlcz8uUFJJTUFSWSk/Lnpvb20/LnVybDtcbiAgICByZXR1cm4gaW1hZ2UgPyB7IGltYWdlIH0gOiB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBicmFuZCBvYmplY3Qgd2l0aCB0aGUgcHJvZHVjdCBtYW51ZmFjdHVyZXIuXG4gICAqXG4gICAqIElmIHRoZSBicmFuZCBpcyBub3QgYXZhaWxhYmxlLCBhbiBlbXB0eSBvYmplY3QgaXMgcmV0dXJuZWQuXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0UHJvZHVjdEJyYW5kKHByb2R1Y3Q6IFByb2R1Y3QpOiB7IGJyYW5kPzogc3RyaW5nIH0ge1xuICAgIGNvbnN0IGJyYW5kID0gcHJvZHVjdC5tYW51ZmFjdHVyZXI7XG4gICAgcmV0dXJuIGJyYW5kID8geyBicmFuZCB9IDoge307XG4gIH1cbn1cbiJdfQ==