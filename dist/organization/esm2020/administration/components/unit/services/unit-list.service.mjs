/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { ListService } from '../../shared/list/list.service';
import { OrganizationTableType } from '../../shared/organization.model';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
import * as i2 from "@spartacus/organization/administration/core";
import * as i3 from "./unit-item.service";
import * as i4 from "./unit-tree.service";
/**
 * Service to populate Unit data to `Table` data. Unit
 * data is driven by the table configuration, using the `OrganizationTables.UNIT`.
 */
export class UnitListService extends ListService {
    constructor(tableService, unitService, unitItemService, unitTreeService) {
        super(tableService);
        this.tableService = tableService;
        this.unitService = unitService;
        this.unitItemService = unitItemService;
        this.unitTreeService = unitTreeService;
        this.tableType = OrganizationTableType.UNIT;
    }
    load() {
        return this.unitService.getTree().pipe(switchMap((node) => this.unitItemService.key$.pipe(map((key) => {
            if (node) {
                this.unitTreeService.initialize(node, key);
            }
            return node;
        }))), switchMap((tree) => this.unitTreeService.treeToggle$.pipe(map(() => tree))), map((tree) => this.convertListItem(tree)));
    }
    convertListItem(unit, depthLevel = 0, pagination = { totalResults: 0 }) {
        let values = [];
        if (!unit) {
            return undefined;
        }
        const node = {
            ...unit,
            count: unit.children?.length ?? 0,
            expanded: this.unitTreeService.isExpanded(unit.id ?? '', depthLevel),
            depthLevel,
            // tmp, should be normalized
            uid: unit.id ?? '',
            children: [...(unit.children ?? [])].sort((unitA, unitB) => (unitA.name ?? '').localeCompare(unitB.name ?? '')),
        };
        values.push(node);
        pagination.totalResults++;
        node.children?.forEach((childUnit) => {
            const childList = this.convertListItem(childUnit, depthLevel + 1, pagination)?.values;
            if (node.expanded && childList && childList.length > 0) {
                values = values.concat(childList);
            }
        });
        return { values, pagination };
    }
    key() {
        return 'uid';
    }
}
UnitListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitListService, deps: [{ token: i1.TableService }, { token: i2.OrgUnitService }, { token: i3.UnitItemService }, { token: i4.UnitTreeService }], target: i0.ɵɵFactoryTarget.Injectable });
UnitListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.TableService }, { type: i2.OrgUnitService }, { type: i3.UnitItemService }, { type: i4.UnitTreeService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1saXN0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdW5pdC9zZXJ2aWNlcy91bml0LWxpc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVMzQyxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM3RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7Ozs7O0FBSXhFOzs7R0FHRztBQUlILE1BQU0sT0FBTyxlQUFnQixTQUFRLFdBQTRCO0lBRy9ELFlBQ1ksWUFBMEIsRUFDMUIsV0FBMkIsRUFDM0IsZUFBZ0MsRUFDaEMsZUFBZ0M7UUFFMUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBTFYsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1FBQzNCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFObEMsY0FBUyxHQUFHLHFCQUFxQixDQUFDLElBQUksQ0FBQztJQVNqRCxDQUFDO0lBRVMsSUFBSTtRQUNaLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQ3BDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQ2pCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDNUIsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDVixJQUFJLElBQUksRUFBRTtnQkFDUixJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDNUM7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUNILENBQ0YsRUFDRCxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUNqQixJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQ3ZELEVBQ0QsR0FBRyxDQUFDLENBQUMsSUFBNkIsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUNuRSxDQUFDO0lBQ0osQ0FBQztJQUVTLGVBQWUsQ0FDdkIsSUFBNkIsRUFDN0IsVUFBVSxHQUFHLENBQUMsRUFDZCxVQUFVLEdBQUcsRUFBRSxZQUFZLEVBQUUsQ0FBQyxFQUFFO1FBRWhDLElBQUksTUFBTSxHQUFzQixFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE9BQU8sU0FBUyxDQUFDO1NBQ2xCO1FBRUQsTUFBTSxJQUFJLEdBQW9CO1lBQzVCLEdBQUcsSUFBSTtZQUNQLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLE1BQU0sSUFBSSxDQUFDO1lBQ2pDLFFBQVEsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxVQUFVLENBQUM7WUFDcEUsVUFBVTtZQUNWLDRCQUE0QjtZQUM1QixHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFO1lBQ2xCLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQ3pELENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FDbkQ7U0FDRixDQUFDO1FBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQixVQUFVLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFMUIsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUNuQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUNwQyxTQUFTLEVBQ1QsVUFBVSxHQUFHLENBQUMsRUFDZCxVQUFVLENBQ1gsRUFBRSxNQUFNLENBQUM7WUFDVixJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksU0FBUyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUN0RCxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUNuQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsR0FBRztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7NEdBeEVVLGVBQWU7Z0hBQWYsZUFBZSxjQUZkLE1BQU07MkZBRVAsZUFBZTtrQkFIM0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFbnRpdGllc01vZGVsIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIEIyQlVuaXROb2RlLFxuICBCMkJVbml0VHJlZU5vZGUsXG4gIE9yZ1VuaXRTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb3JlJztcbmltcG9ydCB7IFRhYmxlU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IExpc3RTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2xpc3QvbGlzdC5zZXJ2aWNlJztcbmltcG9ydCB7IE9yZ2FuaXphdGlvblRhYmxlVHlwZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9vcmdhbml6YXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgVW5pdEl0ZW1TZXJ2aWNlIH0gZnJvbSAnLi91bml0LWl0ZW0uc2VydmljZSc7XG5pbXBvcnQgeyBVbml0VHJlZVNlcnZpY2UgfSBmcm9tICcuL3VuaXQtdHJlZS5zZXJ2aWNlJztcblxuLyoqXG4gKiBTZXJ2aWNlIHRvIHBvcHVsYXRlIFVuaXQgZGF0YSB0byBgVGFibGVgIGRhdGEuIFVuaXRcbiAqIGRhdGEgaXMgZHJpdmVuIGJ5IHRoZSB0YWJsZSBjb25maWd1cmF0aW9uLCB1c2luZyB0aGUgYE9yZ2FuaXphdGlvblRhYmxlcy5VTklUYC5cbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFVuaXRMaXN0U2VydmljZSBleHRlbmRzIExpc3RTZXJ2aWNlPEIyQlVuaXRUcmVlTm9kZT4ge1xuICBwcm90ZWN0ZWQgdGFibGVUeXBlID0gT3JnYW5pemF0aW9uVGFibGVUeXBlLlVOSVQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHRhYmxlU2VydmljZTogVGFibGVTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB1bml0U2VydmljZTogT3JnVW5pdFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHVuaXRJdGVtU2VydmljZTogVW5pdEl0ZW1TZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB1bml0VHJlZVNlcnZpY2U6IFVuaXRUcmVlU2VydmljZVxuICApIHtcbiAgICBzdXBlcih0YWJsZVNlcnZpY2UpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGxvYWQoKTogT2JzZXJ2YWJsZTxFbnRpdGllc01vZGVsPEIyQlVuaXRUcmVlTm9kZT4gfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gdGhpcy51bml0U2VydmljZS5nZXRUcmVlKCkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgobm9kZSkgPT5cbiAgICAgICAgdGhpcy51bml0SXRlbVNlcnZpY2Uua2V5JC5waXBlKFxuICAgICAgICAgIG1hcCgoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgICB0aGlzLnVuaXRUcmVlU2VydmljZS5pbml0aWFsaXplKG5vZGUsIGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICApLFxuICAgICAgc3dpdGNoTWFwKCh0cmVlKSA9PlxuICAgICAgICB0aGlzLnVuaXRUcmVlU2VydmljZS50cmVlVG9nZ2xlJC5waXBlKG1hcCgoKSA9PiB0cmVlKSlcbiAgICAgICksXG4gICAgICBtYXAoKHRyZWU6IEIyQlVuaXROb2RlIHwgdW5kZWZpbmVkKSA9PiB0aGlzLmNvbnZlcnRMaXN0SXRlbSh0cmVlKSlcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNvbnZlcnRMaXN0SXRlbShcbiAgICB1bml0OiBCMkJVbml0Tm9kZSB8IHVuZGVmaW5lZCxcbiAgICBkZXB0aExldmVsID0gMCxcbiAgICBwYWdpbmF0aW9uID0geyB0b3RhbFJlc3VsdHM6IDAgfVxuICApOiBFbnRpdGllc01vZGVsPEIyQlVuaXRUcmVlTm9kZT4gfCB1bmRlZmluZWQge1xuICAgIGxldCB2YWx1ZXM6IEIyQlVuaXRUcmVlTm9kZVtdID0gW107XG4gICAgaWYgKCF1bml0KSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNvbnN0IG5vZGU6IEIyQlVuaXRUcmVlTm9kZSA9IHtcbiAgICAgIC4uLnVuaXQsXG4gICAgICBjb3VudDogdW5pdC5jaGlsZHJlbj8ubGVuZ3RoID8/IDAsXG4gICAgICBleHBhbmRlZDogdGhpcy51bml0VHJlZVNlcnZpY2UuaXNFeHBhbmRlZCh1bml0LmlkID8/ICcnLCBkZXB0aExldmVsKSxcbiAgICAgIGRlcHRoTGV2ZWwsXG4gICAgICAvLyB0bXAsIHNob3VsZCBiZSBub3JtYWxpemVkXG4gICAgICB1aWQ6IHVuaXQuaWQgPz8gJycsXG4gICAgICBjaGlsZHJlbjogWy4uLih1bml0LmNoaWxkcmVuID8/IFtdKV0uc29ydCgodW5pdEEsIHVuaXRCKSA9PlxuICAgICAgICAodW5pdEEubmFtZSA/PyAnJykubG9jYWxlQ29tcGFyZSh1bml0Qi5uYW1lID8/ICcnKVxuICAgICAgKSxcbiAgICB9O1xuXG4gICAgdmFsdWVzLnB1c2gobm9kZSk7XG4gICAgcGFnaW5hdGlvbi50b3RhbFJlc3VsdHMrKztcblxuICAgIG5vZGUuY2hpbGRyZW4/LmZvckVhY2goKGNoaWxkVW5pdCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGRMaXN0ID0gdGhpcy5jb252ZXJ0TGlzdEl0ZW0oXG4gICAgICAgIGNoaWxkVW5pdCxcbiAgICAgICAgZGVwdGhMZXZlbCArIDEsXG4gICAgICAgIHBhZ2luYXRpb25cbiAgICAgICk/LnZhbHVlcztcbiAgICAgIGlmIChub2RlLmV4cGFuZGVkICYmIGNoaWxkTGlzdCAmJiBjaGlsZExpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICB2YWx1ZXMgPSB2YWx1ZXMuY29uY2F0KGNoaWxkTGlzdCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4geyB2YWx1ZXMsIHBhZ2luYXRpb24gfTtcbiAgfVxuXG4gIGtleSgpOiBzdHJpbmcge1xuICAgIHJldHVybiAndWlkJztcbiAgfVxufVxuIl19