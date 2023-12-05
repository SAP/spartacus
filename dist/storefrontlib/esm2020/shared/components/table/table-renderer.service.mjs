/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../../cms-structure/outlet/outlet.service";
import * as i2 from "./config/table.config";
/**
 * The table renderer service adds a component for each table cells (th and td)
 * based on a fine grained configuration. Each table type can configure both global
 * components for headers and cells as well as individual components for field
 * specific cells.
 *
 * The components are added to the outlet slots for the corresponding cells. The table
 * structure and data is added to the outlet context.
 */
export class TableRendererService {
    constructor(outletService, componentFactoryResolver, config) {
        this.outletService = outletService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.config = config;
        // keep a list of outletRefs to avoid recreation
        this.outletRefs = new Map();
    }
    /**
     * Adds the configured table component for the header and data.
     */
    add(structure) {
        structure?.cells?.forEach((field) => {
            const thRenderer = this.getHeaderRenderer(structure, field);
            if (thRenderer) {
                const ref = this.getHeaderOutletRef(structure.type, field);
                this.render(ref, thRenderer);
            }
            const tdRenderer = this.getDataRenderer(structure, field);
            if (tdRenderer) {
                const ref = this.getDataOutletRef(structure.type, field);
                this.render(ref, tdRenderer);
            }
        });
    }
    render(outletRef, renderer) {
        if (this.outletRefs.has(outletRef)) {
            return;
        }
        this.outletRefs.set(outletRef, true);
        const template = this.componentFactoryResolver.resolveComponentFactory(renderer);
        this.outletService.add(outletRef, template);
    }
    /**
     * Returns the header render component for the given field.
     */
    getHeaderRenderer(structure, field) {
        return (structure.options?.cells?.[field]?.headerComponent ||
            structure.options?.headerComponent ||
            this.config.tableOptions?.headerComponent);
    }
    /**
     * Returns the data render component for the given field.
     */
    getDataRenderer(structure, field) {
        return (structure.options?.cells?.[field]?.dataComponent ||
            structure.options?.dataComponent ||
            this.config.tableOptions?.dataComponent);
    }
    /**
     * Returns the header (th) outlet reference for the given field.
     *
     * The outlet reference is generated as:
     * `table.[tableType].header.[field]`
     */
    getHeaderOutletRef(type, field) {
        return `table.${type}.header.${field}`;
    }
    /**
     * Returns the header (th) outlet context for the given field.
     */
    getHeaderOutletContext(type, options, i18nRoot, field) {
        return {
            _type: type,
            _options: options,
            _field: field,
            _i18nRoot: i18nRoot,
        };
    }
    /**
     * Returns the data (td) outlet reference for the given field.
     *
     * The field is generated as:
     * `table.[tableType].data.[tableField]`
     */
    getDataOutletRef(type, field) {
        return `table.${type}.data.${field}`;
    }
    /**
     * Returns the data (td) outlet context for the given field.
     */
    getDataOutletContext(type, options, i18nRoot, field, data) {
        return {
            ...data,
            _type: type,
            _options: options,
            _field: field,
            _i18nRoot: i18nRoot,
        };
    }
}
TableRendererService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TableRendererService, deps: [{ token: i1.OutletService }, { token: i0.ComponentFactoryResolver }, { token: i2.TableConfig }], target: i0.ɵɵFactoryTarget.Injectable });
TableRendererService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TableRendererService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TableRendererService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.OutletService }, { type: i0.ComponentFactoryResolver }, { type: i2.TableConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtcmVuZGVyZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvc2hhcmVkL2NvbXBvbmVudHMvdGFibGUvdGFibGUtcmVuZGVyZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUE0QixVQUFVLEVBQVEsTUFBTSxlQUFlLENBQUM7Ozs7QUFVM0U7Ozs7Ozs7O0dBUUc7QUFJSCxNQUFNLE9BQU8sb0JBQW9CO0lBSS9CLFlBQ1ksYUFBNEIsRUFDNUIsd0JBQWtELEVBQ2xELE1BQW1CO1FBRm5CLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQsV0FBTSxHQUFOLE1BQU0sQ0FBYTtRQU4vQixnREFBZ0Q7UUFDdEMsZUFBVSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7SUFNOUIsQ0FBQztJQUVKOztPQUVHO0lBQ0gsR0FBRyxDQUFDLFNBQXlCO1FBQzNCLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDbEMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM1RCxJQUFJLFVBQVUsRUFBRTtnQkFDZCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDM0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7YUFDOUI7WUFDRCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMxRCxJQUFJLFVBQVUsRUFBRTtnQkFDZCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDekQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7YUFDOUI7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFUyxNQUFNLENBQUMsU0FBaUIsRUFBRSxRQUFtQjtRQUNyRCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ2xDLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyQyxNQUFNLFFBQVEsR0FDWixJQUFJLENBQUMsd0JBQXdCLENBQUMsdUJBQXVCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFPLFFBQVEsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRDs7T0FFRztJQUNPLGlCQUFpQixDQUN6QixTQUF5QixFQUN6QixLQUFhO1FBRWIsT0FBTyxDQUNMLFNBQVMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsZUFBZTtZQUNsRCxTQUFTLENBQUMsT0FBTyxFQUFFLGVBQWU7WUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsZUFBZSxDQUMxQyxDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ08sZUFBZSxDQUN2QixTQUF5QixFQUN6QixLQUFhO1FBRWIsT0FBTyxDQUNMLFNBQVMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsYUFBYTtZQUNoRCxTQUFTLENBQUMsT0FBTyxFQUFFLGFBQWE7WUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUN4QyxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsa0JBQWtCLENBQUMsSUFBWSxFQUFFLEtBQWE7UUFDNUMsT0FBTyxTQUFTLElBQUksV0FBVyxLQUFLLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxzQkFBc0IsQ0FDcEIsSUFBWSxFQUNaLE9BQWlDLEVBQ2pDLFFBQWdCLEVBQ2hCLEtBQWE7UUFFYixPQUFPO1lBQ0wsS0FBSyxFQUFFLElBQUk7WUFDWCxRQUFRLEVBQUUsT0FBTztZQUNqQixNQUFNLEVBQUUsS0FBSztZQUNiLFNBQVMsRUFBRSxRQUFRO1NBQ3BCLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxnQkFBZ0IsQ0FBQyxJQUFZLEVBQUUsS0FBYTtRQUMxQyxPQUFPLFNBQVMsSUFBSSxTQUFTLEtBQUssRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFFRDs7T0FFRztJQUNILG9CQUFvQixDQUNsQixJQUFZLEVBQ1osT0FBaUMsRUFDakMsUUFBZ0IsRUFDaEIsS0FBYSxFQUNiLElBQVM7UUFFVCxPQUFPO1lBQ0wsR0FBRyxJQUFJO1lBQ1AsS0FBSyxFQUFFLElBQUk7WUFDWCxRQUFRLEVBQUUsT0FBTztZQUNqQixNQUFNLEVBQUUsS0FBSztZQUNiLFNBQVMsRUFBRSxRQUFRO1NBQ3BCLENBQUM7SUFDSixDQUFDOztpSEF4SFUsb0JBQW9CO3FIQUFwQixvQkFBb0IsY0FGbkIsTUFBTTsyRkFFUCxvQkFBb0I7a0JBSGhDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBJbmplY3RhYmxlLCBUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPdXRsZXRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vY21zLXN0cnVjdHVyZS9vdXRsZXQvb3V0bGV0LnNlcnZpY2UnO1xuaW1wb3J0IHsgVGFibGVDb25maWcgfSBmcm9tICcuL2NvbmZpZy90YWJsZS5jb25maWcnO1xuaW1wb3J0IHtcbiAgVGFibGVEYXRhT3V0bGV0Q29udGV4dCxcbiAgVGFibGVIZWFkZXJPdXRsZXRDb250ZXh0LFxuICBUYWJsZU9wdGlvbnMsXG4gIFRhYmxlU3RydWN0dXJlLFxufSBmcm9tICcuL3RhYmxlLm1vZGVsJztcblxuLyoqXG4gKiBUaGUgdGFibGUgcmVuZGVyZXIgc2VydmljZSBhZGRzIGEgY29tcG9uZW50IGZvciBlYWNoIHRhYmxlIGNlbGxzICh0aCBhbmQgdGQpXG4gKiBiYXNlZCBvbiBhIGZpbmUgZ3JhaW5lZCBjb25maWd1cmF0aW9uLiBFYWNoIHRhYmxlIHR5cGUgY2FuIGNvbmZpZ3VyZSBib3RoIGdsb2JhbFxuICogY29tcG9uZW50cyBmb3IgaGVhZGVycyBhbmQgY2VsbHMgYXMgd2VsbCBhcyBpbmRpdmlkdWFsIGNvbXBvbmVudHMgZm9yIGZpZWxkXG4gKiBzcGVjaWZpYyBjZWxscy5cbiAqXG4gKiBUaGUgY29tcG9uZW50cyBhcmUgYWRkZWQgdG8gdGhlIG91dGxldCBzbG90cyBmb3IgdGhlIGNvcnJlc3BvbmRpbmcgY2VsbHMuIFRoZSB0YWJsZVxuICogc3RydWN0dXJlIGFuZCBkYXRhIGlzIGFkZGVkIHRvIHRoZSBvdXRsZXQgY29udGV4dC5cbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFRhYmxlUmVuZGVyZXJTZXJ2aWNlIHtcbiAgLy8ga2VlcCBhIGxpc3Qgb2Ygb3V0bGV0UmVmcyB0byBhdm9pZCByZWNyZWF0aW9uXG4gIHByb3RlY3RlZCBvdXRsZXRSZWZzID0gbmV3IE1hcCgpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBvdXRsZXRTZXJ2aWNlOiBPdXRsZXRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcm90ZWN0ZWQgY29uZmlnOiBUYWJsZUNvbmZpZ1xuICApIHt9XG5cbiAgLyoqXG4gICAqIEFkZHMgdGhlIGNvbmZpZ3VyZWQgdGFibGUgY29tcG9uZW50IGZvciB0aGUgaGVhZGVyIGFuZCBkYXRhLlxuICAgKi9cbiAgYWRkKHN0cnVjdHVyZTogVGFibGVTdHJ1Y3R1cmUpOiB2b2lkIHtcbiAgICBzdHJ1Y3R1cmU/LmNlbGxzPy5mb3JFYWNoKChmaWVsZCkgPT4ge1xuICAgICAgY29uc3QgdGhSZW5kZXJlciA9IHRoaXMuZ2V0SGVhZGVyUmVuZGVyZXIoc3RydWN0dXJlLCBmaWVsZCk7XG4gICAgICBpZiAodGhSZW5kZXJlcikge1xuICAgICAgICBjb25zdCByZWYgPSB0aGlzLmdldEhlYWRlck91dGxldFJlZihzdHJ1Y3R1cmUudHlwZSwgZmllbGQpO1xuICAgICAgICB0aGlzLnJlbmRlcihyZWYsIHRoUmVuZGVyZXIpO1xuICAgICAgfVxuICAgICAgY29uc3QgdGRSZW5kZXJlciA9IHRoaXMuZ2V0RGF0YVJlbmRlcmVyKHN0cnVjdHVyZSwgZmllbGQpO1xuICAgICAgaWYgKHRkUmVuZGVyZXIpIHtcbiAgICAgICAgY29uc3QgcmVmID0gdGhpcy5nZXREYXRhT3V0bGV0UmVmKHN0cnVjdHVyZS50eXBlLCBmaWVsZCk7XG4gICAgICAgIHRoaXMucmVuZGVyKHJlZiwgdGRSZW5kZXJlcik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVuZGVyKG91dGxldFJlZjogc3RyaW5nLCByZW5kZXJlcjogVHlwZTxhbnk+KSB7XG4gICAgaWYgKHRoaXMub3V0bGV0UmVmcy5oYXMob3V0bGV0UmVmKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm91dGxldFJlZnMuc2V0KG91dGxldFJlZiwgdHJ1ZSk7XG4gICAgY29uc3QgdGVtcGxhdGUgPVxuICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkocmVuZGVyZXIpO1xuICAgIHRoaXMub3V0bGV0U2VydmljZS5hZGQob3V0bGV0UmVmLCA8YW55PnRlbXBsYXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBoZWFkZXIgcmVuZGVyIGNvbXBvbmVudCBmb3IgdGhlIGdpdmVuIGZpZWxkLlxuICAgKi9cbiAgcHJvdGVjdGVkIGdldEhlYWRlclJlbmRlcmVyKFxuICAgIHN0cnVjdHVyZTogVGFibGVTdHJ1Y3R1cmUsXG4gICAgZmllbGQ6IHN0cmluZ1xuICApOiBUeXBlPGFueT4gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiAoXG4gICAgICBzdHJ1Y3R1cmUub3B0aW9ucz8uY2VsbHM/LltmaWVsZF0/LmhlYWRlckNvbXBvbmVudCB8fFxuICAgICAgc3RydWN0dXJlLm9wdGlvbnM/LmhlYWRlckNvbXBvbmVudCB8fFxuICAgICAgdGhpcy5jb25maWcudGFibGVPcHRpb25zPy5oZWFkZXJDb21wb25lbnRcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGRhdGEgcmVuZGVyIGNvbXBvbmVudCBmb3IgdGhlIGdpdmVuIGZpZWxkLlxuICAgKi9cbiAgcHJvdGVjdGVkIGdldERhdGFSZW5kZXJlcihcbiAgICBzdHJ1Y3R1cmU6IFRhYmxlU3RydWN0dXJlLFxuICAgIGZpZWxkOiBzdHJpbmdcbiAgKTogVHlwZTxhbnk+IHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gKFxuICAgICAgc3RydWN0dXJlLm9wdGlvbnM/LmNlbGxzPy5bZmllbGRdPy5kYXRhQ29tcG9uZW50IHx8XG4gICAgICBzdHJ1Y3R1cmUub3B0aW9ucz8uZGF0YUNvbXBvbmVudCB8fFxuICAgICAgdGhpcy5jb25maWcudGFibGVPcHRpb25zPy5kYXRhQ29tcG9uZW50XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBoZWFkZXIgKHRoKSBvdXRsZXQgcmVmZXJlbmNlIGZvciB0aGUgZ2l2ZW4gZmllbGQuXG4gICAqXG4gICAqIFRoZSBvdXRsZXQgcmVmZXJlbmNlIGlzIGdlbmVyYXRlZCBhczpcbiAgICogYHRhYmxlLlt0YWJsZVR5cGVdLmhlYWRlci5bZmllbGRdYFxuICAgKi9cbiAgZ2V0SGVhZGVyT3V0bGV0UmVmKHR5cGU6IHN0cmluZywgZmllbGQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGB0YWJsZS4ke3R5cGV9LmhlYWRlci4ke2ZpZWxkfWA7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgaGVhZGVyICh0aCkgb3V0bGV0IGNvbnRleHQgZm9yIHRoZSBnaXZlbiBmaWVsZC5cbiAgICovXG4gIGdldEhlYWRlck91dGxldENvbnRleHQoXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIG9wdGlvbnM6IFRhYmxlT3B0aW9ucyB8IHVuZGVmaW5lZCxcbiAgICBpMThuUm9vdDogc3RyaW5nLFxuICAgIGZpZWxkOiBzdHJpbmdcbiAgKTogVGFibGVIZWFkZXJPdXRsZXRDb250ZXh0IHtcbiAgICByZXR1cm4ge1xuICAgICAgX3R5cGU6IHR5cGUsXG4gICAgICBfb3B0aW9uczogb3B0aW9ucyxcbiAgICAgIF9maWVsZDogZmllbGQsXG4gICAgICBfaTE4blJvb3Q6IGkxOG5Sb290LFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZGF0YSAodGQpIG91dGxldCByZWZlcmVuY2UgZm9yIHRoZSBnaXZlbiBmaWVsZC5cbiAgICpcbiAgICogVGhlIGZpZWxkIGlzIGdlbmVyYXRlZCBhczpcbiAgICogYHRhYmxlLlt0YWJsZVR5cGVdLmRhdGEuW3RhYmxlRmllbGRdYFxuICAgKi9cbiAgZ2V0RGF0YU91dGxldFJlZih0eXBlOiBzdHJpbmcsIGZpZWxkOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBgdGFibGUuJHt0eXBlfS5kYXRhLiR7ZmllbGR9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBkYXRhICh0ZCkgb3V0bGV0IGNvbnRleHQgZm9yIHRoZSBnaXZlbiBmaWVsZC5cbiAgICovXG4gIGdldERhdGFPdXRsZXRDb250ZXh0KFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBvcHRpb25zOiBUYWJsZU9wdGlvbnMgfCB1bmRlZmluZWQsXG4gICAgaTE4blJvb3Q6IHN0cmluZyxcbiAgICBmaWVsZDogc3RyaW5nLFxuICAgIGRhdGE6IGFueVxuICApOiBUYWJsZURhdGFPdXRsZXRDb250ZXh0IHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uZGF0YSxcbiAgICAgIF90eXBlOiB0eXBlLFxuICAgICAgX29wdGlvbnM6IG9wdGlvbnMsXG4gICAgICBfZmllbGQ6IGZpZWxkLFxuICAgICAgX2kxOG5Sb290OiBpMThuUm9vdCxcbiAgICB9O1xuICB9XG59XG4iXX0=