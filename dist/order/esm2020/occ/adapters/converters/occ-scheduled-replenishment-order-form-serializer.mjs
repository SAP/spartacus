/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { TimeUtils } from '@spartacus/core';
import * as i0 from "@angular/core";
export class OccScheduledReplenishmentOrderFormSerializer {
    convert(source, target) {
        if (target === undefined) {
            target = { ...source };
        }
        if (source.replenishmentStartDate) {
            target.replenishmentStartDate = this.convertDate(source.replenishmentStartDate);
        }
        return target;
    }
    /**
     * Adds the current timestamp (including timezone offset) to a date string in the format YYYY-mm-dd
     * @Example
     * Converts 2021-10-15 to 2021-10-15T15:38:05-05:00
     */
    convertDate(date) {
        const localTime = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hourCycle: 'h23',
        });
        return `${date}T${localTime}:00${TimeUtils.getLocalTimezoneOffset()}`;
    }
}
OccScheduledReplenishmentOrderFormSerializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccScheduledReplenishmentOrderFormSerializer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccScheduledReplenishmentOrderFormSerializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccScheduledReplenishmentOrderFormSerializer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccScheduledReplenishmentOrderFormSerializer, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLXNjaGVkdWxlZC1yZXBsZW5pc2htZW50LW9yZGVyLWZvcm0tc2VyaWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmRlci9vY2MvYWRhcHRlcnMvY29udmVydGVycy9vY2Mtc2NoZWR1bGVkLXJlcGxlbmlzaG1lbnQtb3JkZXItZm9ybS1zZXJpYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBa0IsU0FBUyxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBTTVELE1BQU0sT0FBTyw0Q0FBNEM7SUFJdkQsT0FBTyxDQUNMLE1BQXFDLEVBQ3JDLE1BQWtDO1FBRWxDLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUN4QixNQUFNLEdBQUcsRUFBRSxHQUFJLE1BQWMsRUFBK0IsQ0FBQztTQUM5RDtRQUVELElBQUksTUFBTSxDQUFDLHNCQUFzQixFQUFFO1lBQ2pDLE1BQU0sQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUM5QyxNQUFNLENBQUMsc0JBQXNCLENBQzlCLENBQUM7U0FDSDtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssV0FBVyxDQUFDLElBQVk7UUFDOUIsTUFBTSxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLEVBQUU7WUFDbEQsSUFBSSxFQUFFLFNBQVM7WUFDZixNQUFNLEVBQUUsU0FBUztZQUNqQixTQUFTLEVBQUUsS0FBSztTQUNqQixDQUFDLENBQUM7UUFDSCxPQUFPLEdBQUcsSUFBSSxJQUFJLFNBQVMsTUFBTSxTQUFTLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxDQUFDO0lBQ3hFLENBQUM7O3lJQWpDVSw0Q0FBNEM7NklBQTVDLDRDQUE0QyxjQUYzQyxNQUFNOzJGQUVQLDRDQUE0QztrQkFIeEQsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIsIE9jYywgVGltZVV0aWxzIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFNjaGVkdWxlUmVwbGVuaXNobWVudEZvcm0gfSBmcm9tICdAc3BhcnRhY3VzL29yZGVyL3Jvb3QnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgT2NjU2NoZWR1bGVkUmVwbGVuaXNobWVudE9yZGVyRm9ybVNlcmlhbGl6ZXJcbiAgaW1wbGVtZW50c1xuICAgIENvbnZlcnRlcjxPY2MuU2NoZWR1bGVSZXBsZW5pc2htZW50Rm9ybSwgU2NoZWR1bGVSZXBsZW5pc2htZW50Rm9ybT5cbntcbiAgY29udmVydChcbiAgICBzb3VyY2U6IE9jYy5TY2hlZHVsZVJlcGxlbmlzaG1lbnRGb3JtLFxuICAgIHRhcmdldD86IFNjaGVkdWxlUmVwbGVuaXNobWVudEZvcm1cbiAgKTogU2NoZWR1bGVSZXBsZW5pc2htZW50Rm9ybSB7XG4gICAgaWYgKHRhcmdldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0YXJnZXQgPSB7IC4uLihzb3VyY2UgYXMgYW55KSB9IGFzIFNjaGVkdWxlUmVwbGVuaXNobWVudEZvcm07XG4gICAgfVxuXG4gICAgaWYgKHNvdXJjZS5yZXBsZW5pc2htZW50U3RhcnREYXRlKSB7XG4gICAgICB0YXJnZXQucmVwbGVuaXNobWVudFN0YXJ0RGF0ZSA9IHRoaXMuY29udmVydERhdGUoXG4gICAgICAgIHNvdXJjZS5yZXBsZW5pc2htZW50U3RhcnREYXRlXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyB0aGUgY3VycmVudCB0aW1lc3RhbXAgKGluY2x1ZGluZyB0aW1lem9uZSBvZmZzZXQpIHRvIGEgZGF0ZSBzdHJpbmcgaW4gdGhlIGZvcm1hdCBZWVlZLW1tLWRkXG4gICAqIEBFeGFtcGxlXG4gICAqIENvbnZlcnRzIDIwMjEtMTAtMTUgdG8gMjAyMS0xMC0xNVQxNTozODowNS0wNTowMFxuICAgKi9cbiAgcHJpdmF0ZSBjb252ZXJ0RGF0ZShkYXRlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IGxvY2FsVGltZSA9IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKFtdLCB7XG4gICAgICBob3VyOiAnMi1kaWdpdCcsXG4gICAgICBtaW51dGU6ICcyLWRpZ2l0JyxcbiAgICAgIGhvdXJDeWNsZTogJ2gyMycsXG4gICAgfSk7XG4gICAgcmV0dXJuIGAke2RhdGV9VCR7bG9jYWxUaW1lfTowMCR7VGltZVV0aWxzLmdldExvY2FsVGltZXpvbmVPZmZzZXQoKX1gO1xuICB9XG59XG4iXX0=