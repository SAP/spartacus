/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Inject, Injectable, Optional } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { SCHEMA_BUILDER } from './builders/tokens';
import * as i0 from "@angular/core";
import * as i1 from "./json-ld-script.factory";
/**
 * Factory service that is used to build the structured data for
 * all configured schema builders.
 */
export class StructuredDataFactory {
    constructor(scriptBuilder, builders) {
        this.scriptBuilder = scriptBuilder;
        this.builders = builders;
        this.subscription = new Subscription();
    }
    /**
     * Initiates the build of structured data by collecting all schema
     * builders.
     */
    build() {
        if (this.scriptBuilder.isJsonLdRequired() && this.builders) {
            this.subscription.add(this.collectSchemas().subscribe((schema) => {
                this.scriptBuilder.build(schema);
            }));
        }
    }
    /**
     * Collects all schema builders and observe their structured data.
     */
    collectSchemas() {
        return combineLatest(this.builders.map((builder) => builder.build()));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
StructuredDataFactory.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StructuredDataFactory, deps: [{ token: i1.JsonLdScriptFactory }, { token: SCHEMA_BUILDER, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
StructuredDataFactory.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StructuredDataFactory, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StructuredDataFactory, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.JsonLdScriptFactory }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [SCHEMA_BUILDER]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RydWN0dXJlZC1kYXRhLmZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1zdHJ1Y3R1cmUvc2VvL3N0cnVjdHVyZWQtZGF0YS9zdHJ1Y3R1cmVkLWRhdGEuZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQWEsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxhQUFhLEVBQWMsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRS9ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7O0FBR25EOzs7R0FHRztBQUlILE1BQU0sT0FBTyxxQkFBcUI7SUFDaEMsWUFDVSxhQUFrQyxFQUdsQyxRQUF5QjtRQUh6QixrQkFBYSxHQUFiLGFBQWEsQ0FBcUI7UUFHbEMsYUFBUSxHQUFSLFFBQVEsQ0FBaUI7UUFHekIsaUJBQVksR0FBaUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUZ2RCxDQUFDO0lBSUo7OztPQUdHO0lBQ0gsS0FBSztRQUNILElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDMUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQ25CLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFZLEVBQUUsRUFBRTtnQkFDL0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkMsQ0FBQyxDQUFDLENBQ0gsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ08sY0FBYztRQUN0QixPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7a0hBakNVLHFCQUFxQixxREFJdEIsY0FBYztzSEFKYixxQkFBcUIsY0FGcEIsTUFBTTsyRkFFUCxxQkFBcUI7a0JBSGpDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzswQkFJSSxRQUFROzswQkFDUixNQUFNOzJCQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE9uRGVzdHJveSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU2NoZW1hQnVpbGRlciB9IGZyb20gJy4vYnVpbGRlcnMvc2NoZW1hLmludGVyZmFjZSc7XG5pbXBvcnQgeyBTQ0hFTUFfQlVJTERFUiB9IGZyb20gJy4vYnVpbGRlcnMvdG9rZW5zJztcbmltcG9ydCB7IEpzb25MZFNjcmlwdEZhY3RvcnkgfSBmcm9tICcuL2pzb24tbGQtc2NyaXB0LmZhY3RvcnknO1xuXG4vKipcbiAqIEZhY3Rvcnkgc2VydmljZSB0aGF0IGlzIHVzZWQgdG8gYnVpbGQgdGhlIHN0cnVjdHVyZWQgZGF0YSBmb3JcbiAqIGFsbCBjb25maWd1cmVkIHNjaGVtYSBidWlsZGVycy5cbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFN0cnVjdHVyZWREYXRhRmFjdG9yeSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc2NyaXB0QnVpbGRlcjogSnNvbkxkU2NyaXB0RmFjdG9yeSxcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoU0NIRU1BX0JVSUxERVIpXG4gICAgcHJpdmF0ZSBidWlsZGVyczogU2NoZW1hQnVpbGRlcltdXG4gICkge31cblxuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgLyoqXG4gICAqIEluaXRpYXRlcyB0aGUgYnVpbGQgb2Ygc3RydWN0dXJlZCBkYXRhIGJ5IGNvbGxlY3RpbmcgYWxsIHNjaGVtYVxuICAgKiBidWlsZGVycy5cbiAgICovXG4gIGJ1aWxkKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNjcmlwdEJ1aWxkZXIuaXNKc29uTGRSZXF1aXJlZCgpICYmIHRoaXMuYnVpbGRlcnMpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgICAgdGhpcy5jb2xsZWN0U2NoZW1hcygpLnN1YnNjcmliZSgoc2NoZW1hOiB7fVtdKSA9PiB7XG4gICAgICAgICAgdGhpcy5zY3JpcHRCdWlsZGVyLmJ1aWxkKHNjaGVtYSk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb2xsZWN0cyBhbGwgc2NoZW1hIGJ1aWxkZXJzIGFuZCBvYnNlcnZlIHRoZWlyIHN0cnVjdHVyZWQgZGF0YS5cbiAgICovXG4gIHByb3RlY3RlZCBjb2xsZWN0U2NoZW1hcygpOiBPYnNlcnZhYmxlPGFueVtdPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QodGhpcy5idWlsZGVycy5tYXAoKGJ1aWxkZXIpID0+IGJ1aWxkZXIuYnVpbGQoKSkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19