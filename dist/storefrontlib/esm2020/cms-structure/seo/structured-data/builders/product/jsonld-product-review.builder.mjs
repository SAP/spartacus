/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "../../../config";
/**
 * Builds the structured data for the product reviews, see https://schema.org/Review.
 * The data includes the aggregated product rating and the individual reviews.
 */
export class JsonLdProductReviewBuilder {
    constructor(reviewService, config) {
        this.reviewService = reviewService;
        this.config = config;
    }
    build(product) {
        return this.reviewService.getByProductCode(product.code ?? '').pipe(map((reviews) => reviews?.length > 0
            ? {
                aggregateRating: this.buildAggregatedReviews(product, reviews),
                review: reviews.map((review) => this.buildReviews(review)),
            }
            : {}));
    }
    buildAggregatedReviews(product, reviews) {
        const aggregated = {
            '@type': 'AggregateRating',
        };
        if (product.averageRating) {
            aggregated.ratingValue = product.averageRating;
        }
        if (reviews) {
            aggregated.ratingCount = reviews.filter((rev) => !!rev.rating).length;
            aggregated.reviewCount = reviews.filter((rev) => !!rev.comment).length;
        }
        return aggregated;
    }
    buildReviews(review) {
        const reviewSchema = {
            '@type': 'review',
        };
        if (review.principal && review.principal.name) {
            reviewSchema.author = review.principal.name;
        }
        if (review.date) {
            const date = new Date(review.date);
            reviewSchema.datePublished = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        }
        if (review.headline) {
            reviewSchema.name = review.headline;
        }
        if (review.comment) {
            reviewSchema.description = review.comment;
        }
        if (review.rating) {
            reviewSchema.reviewRating = {
                '@type': 'Rating',
                ratingValue: review.rating.toString(),
            };
        }
        return reviewSchema;
    }
}
JsonLdProductReviewBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: JsonLdProductReviewBuilder, deps: [{ token: i1.ProductReviewService }, { token: i2.SeoConfig }], target: i0.ɵɵFactoryTarget.Injectable });
JsonLdProductReviewBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: JsonLdProductReviewBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: JsonLdProductReviewBuilder, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ProductReviewService }, { type: i2.SeoConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbmxkLXByb2R1Y3QtcmV2aWV3LmJ1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1zdHJ1Y3R1cmUvc2VvL3N0cnVjdHVyZWQtZGF0YS9idWlsZGVycy9wcm9kdWN0L2pzb25sZC1wcm9kdWN0LXJldmlldy5idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUlyQzs7O0dBR0c7QUFJSCxNQUFNLE9BQU8sMEJBQTBCO0lBQ3JDLFlBQ1ksYUFBbUMsRUFDbkMsTUFBaUI7UUFEakIsa0JBQWEsR0FBYixhQUFhLENBQXNCO1FBQ25DLFdBQU0sR0FBTixNQUFNLENBQVc7SUFDMUIsQ0FBQztJQUVKLEtBQUssQ0FBQyxPQUFnQjtRQUNwQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQ2pFLEdBQUcsQ0FBQyxDQUFDLE9BQWlCLEVBQUUsRUFBRSxDQUN4QixPQUFPLEVBQUUsTUFBTSxHQUFHLENBQUM7WUFDakIsQ0FBQyxDQUFDO2dCQUNFLGVBQWUsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQztnQkFDOUQsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDM0Q7WUFDSCxDQUFDLENBQUMsRUFBRSxDQUNQLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFUyxzQkFBc0IsQ0FBQyxPQUFnQixFQUFFLE9BQWlCO1FBQ2xFLE1BQU0sVUFBVSxHQUFRO1lBQ3RCLE9BQU8sRUFBRSxpQkFBaUI7U0FDM0IsQ0FBQztRQUNGLElBQUksT0FBTyxDQUFDLGFBQWEsRUFBRTtZQUN6QixVQUFVLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7U0FDaEQ7UUFDRCxJQUFJLE9BQU8sRUFBRTtZQUNYLFVBQVUsQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDdEUsVUFBVSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQztTQUN4RTtRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7SUFFUyxZQUFZLENBQUMsTUFBYztRQUNuQyxNQUFNLFlBQVksR0FBUTtZQUN4QixPQUFPLEVBQUUsUUFBUTtTQUNsQixDQUFDO1FBRUYsSUFBSSxNQUFNLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFO1lBQzdDLFlBQVksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7U0FDN0M7UUFDRCxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDZixNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkMsWUFBWSxDQUFDLGFBQWEsR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFDaEQsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQ3BCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUM7U0FDdEI7UUFDRCxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFDbkIsWUFBWSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1NBQ3JDO1FBQ0QsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ2xCLFlBQVksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztTQUMzQztRQUNELElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUNqQixZQUFZLENBQUMsWUFBWSxHQUFHO2dCQUMxQixPQUFPLEVBQUUsUUFBUTtnQkFDakIsV0FBVyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO2FBQ3RDLENBQUM7U0FDSDtRQUVELE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7O3VIQTdEVSwwQkFBMEI7MkhBQTFCLDBCQUEwQixjQUZ6QixNQUFNOzJGQUVQLDBCQUEwQjtrQkFIdEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQcm9kdWN0LCBQcm9kdWN0UmV2aWV3U2VydmljZSwgUmV2aWV3IH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFNlb0NvbmZpZyB9IGZyb20gJy4uLy4uLy4uL2NvbmZpZyc7XG5pbXBvcnQgeyBKc29uTGRCdWlsZGVyIH0gZnJvbSAnLi4vc2NoZW1hLmludGVyZmFjZSc7XG5cbi8qKlxuICogQnVpbGRzIHRoZSBzdHJ1Y3R1cmVkIGRhdGEgZm9yIHRoZSBwcm9kdWN0IHJldmlld3MsIHNlZSBodHRwczovL3NjaGVtYS5vcmcvUmV2aWV3LlxuICogVGhlIGRhdGEgaW5jbHVkZXMgdGhlIGFnZ3JlZ2F0ZWQgcHJvZHVjdCByYXRpbmcgYW5kIHRoZSBpbmRpdmlkdWFsIHJldmlld3MuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBKc29uTGRQcm9kdWN0UmV2aWV3QnVpbGRlciBpbXBsZW1lbnRzIEpzb25MZEJ1aWxkZXI8UHJvZHVjdD4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgcmV2aWV3U2VydmljZTogUHJvZHVjdFJldmlld1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbmZpZzogU2VvQ29uZmlnXG4gICkge31cblxuICBidWlsZChwcm9kdWN0OiBQcm9kdWN0KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5yZXZpZXdTZXJ2aWNlLmdldEJ5UHJvZHVjdENvZGUocHJvZHVjdC5jb2RlID8/ICcnKS5waXBlKFxuICAgICAgbWFwKChyZXZpZXdzOiBSZXZpZXdbXSkgPT5cbiAgICAgICAgcmV2aWV3cz8ubGVuZ3RoID4gMFxuICAgICAgICAgID8ge1xuICAgICAgICAgICAgICBhZ2dyZWdhdGVSYXRpbmc6IHRoaXMuYnVpbGRBZ2dyZWdhdGVkUmV2aWV3cyhwcm9kdWN0LCByZXZpZXdzKSxcbiAgICAgICAgICAgICAgcmV2aWV3OiByZXZpZXdzLm1hcCgocmV2aWV3KSA9PiB0aGlzLmJ1aWxkUmV2aWV3cyhyZXZpZXcpKSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICA6IHt9XG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBidWlsZEFnZ3JlZ2F0ZWRSZXZpZXdzKHByb2R1Y3Q6IFByb2R1Y3QsIHJldmlld3M6IFJldmlld1tdKSB7XG4gICAgY29uc3QgYWdncmVnYXRlZDogYW55ID0ge1xuICAgICAgJ0B0eXBlJzogJ0FnZ3JlZ2F0ZVJhdGluZycsXG4gICAgfTtcbiAgICBpZiAocHJvZHVjdC5hdmVyYWdlUmF0aW5nKSB7XG4gICAgICBhZ2dyZWdhdGVkLnJhdGluZ1ZhbHVlID0gcHJvZHVjdC5hdmVyYWdlUmF0aW5nO1xuICAgIH1cbiAgICBpZiAocmV2aWV3cykge1xuICAgICAgYWdncmVnYXRlZC5yYXRpbmdDb3VudCA9IHJldmlld3MuZmlsdGVyKChyZXYpID0+ICEhcmV2LnJhdGluZykubGVuZ3RoO1xuICAgICAgYWdncmVnYXRlZC5yZXZpZXdDb3VudCA9IHJldmlld3MuZmlsdGVyKChyZXYpID0+ICEhcmV2LmNvbW1lbnQpLmxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIGFnZ3JlZ2F0ZWQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgYnVpbGRSZXZpZXdzKHJldmlldzogUmV2aWV3KSB7XG4gICAgY29uc3QgcmV2aWV3U2NoZW1hOiBhbnkgPSB7XG4gICAgICAnQHR5cGUnOiAncmV2aWV3JyxcbiAgICB9O1xuXG4gICAgaWYgKHJldmlldy5wcmluY2lwYWwgJiYgcmV2aWV3LnByaW5jaXBhbC5uYW1lKSB7XG4gICAgICByZXZpZXdTY2hlbWEuYXV0aG9yID0gcmV2aWV3LnByaW5jaXBhbC5uYW1lO1xuICAgIH1cbiAgICBpZiAocmV2aWV3LmRhdGUpIHtcbiAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShyZXZpZXcuZGF0ZSk7XG4gICAgICByZXZpZXdTY2hlbWEuZGF0ZVB1Ymxpc2hlZCA9IGAke2RhdGUuZ2V0RnVsbFllYXIoKX0tJHtcbiAgICAgICAgZGF0ZS5nZXRNb250aCgpICsgMVxuICAgICAgfS0ke2RhdGUuZ2V0RGF0ZSgpfWA7XG4gICAgfVxuICAgIGlmIChyZXZpZXcuaGVhZGxpbmUpIHtcbiAgICAgIHJldmlld1NjaGVtYS5uYW1lID0gcmV2aWV3LmhlYWRsaW5lO1xuICAgIH1cbiAgICBpZiAocmV2aWV3LmNvbW1lbnQpIHtcbiAgICAgIHJldmlld1NjaGVtYS5kZXNjcmlwdGlvbiA9IHJldmlldy5jb21tZW50O1xuICAgIH1cbiAgICBpZiAocmV2aWV3LnJhdGluZykge1xuICAgICAgcmV2aWV3U2NoZW1hLnJldmlld1JhdGluZyA9IHtcbiAgICAgICAgJ0B0eXBlJzogJ1JhdGluZycsXG4gICAgICAgIHJhdGluZ1ZhbHVlOiByZXZpZXcucmF0aW5nLnRvU3RyaW5nKCksXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiByZXZpZXdTY2hlbWE7XG4gIH1cbn1cbiJdfQ==