/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, inject, isDevMode } from '@angular/core';
import { LoggerService } from '../logger';
import * as i0 from "@angular/core";
import * as i1 from "./config/i18n-config";
export class TranslationChunkService {
    constructor(config) {
        this.config = config;
        this.duplicates = {};
        this.chunks = {};
        this.logger = inject(LoggerService);
        this.KEY_SEPARATOR = '.';
        const chunks = (config.i18n && config.i18n.chunks) || {};
        Object.keys(chunks).forEach((chunk) => {
            chunks[chunk].forEach((key) => {
                if (this.chunks.hasOwnProperty(key)) {
                    if (!this.duplicates[key]) {
                        this.duplicates[key] = [this.chunks[key]];
                    }
                    this.duplicates[key].push(chunk);
                }
                else {
                    this.chunks[key] = chunk;
                }
            });
        });
        if (Object.keys(this.duplicates).length > 0 && isDevMode()) {
            this.warnDuplicates(this.duplicates);
        }
    }
    getChunkNameForKey(key) {
        const mainKey = (key || '').split(this.KEY_SEPARATOR)[0];
        const chunk = this.chunks && this.chunks[mainKey];
        if (!chunk) {
            return mainKey; // fallback to main key as a chunk
        }
        return chunk;
    }
    warnDuplicates(items) {
        const dupes = [];
        Object.keys(items).forEach((key) => {
            dupes.push(`* '${key}' found in chunks: ${items[key].join(', ')}. Used '${this.chunks[key]}.${key}'.`);
        });
        this.logger.warn(`Duplicated keys has been found in the config of i18n chunks:\n${dupes.join('\n')}`);
    }
}
TranslationChunkService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TranslationChunkService, deps: [{ token: i1.I18nConfig }], target: i0.ɵɵFactoryTarget.Injectable });
TranslationChunkService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TranslationChunkService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TranslationChunkService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.I18nConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRpb24tY2h1bmsuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2kxOG4vdHJhbnNsYXRpb24tY2h1bmsuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxXQUFXLENBQUM7OztBQU0xQyxNQUFNLE9BQU8sdUJBQXVCO0lBTWxDLFlBQXNCLE1BQWtCO1FBQWxCLFdBQU0sR0FBTixNQUFNLENBQVk7UUFMOUIsZUFBVSxHQUFnQyxFQUFFLENBQUM7UUFDN0MsV0FBTSxHQUE4QixFQUFFLENBQUM7UUFFdkMsV0FBTSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQXFCdEIsa0JBQWEsR0FBRyxHQUFHLENBQUM7UUFsQnJDLE1BQU0sTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6RCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3BDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDNUIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7cUJBQzNDO29CQUNELElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNsQztxQkFBTTtvQkFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztpQkFDMUI7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLFNBQVMsRUFBRSxFQUFFO1lBQzFELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3RDO0lBQ0gsQ0FBQztJQUlELGtCQUFrQixDQUFDLEdBQVc7UUFDNUIsTUFBTSxPQUFPLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFbEQsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLE9BQU8sT0FBTyxDQUFDLENBQUMsa0NBQWtDO1NBQ25EO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRU8sY0FBYyxDQUFDLEtBQWtDO1FBQ3ZELE1BQU0sS0FBSyxHQUFhLEVBQUUsQ0FBQztRQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ2pDLEtBQUssQ0FBQyxJQUFJLENBQ1IsTUFBTSxHQUFHLHNCQUFzQixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUNsRCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FDakIsSUFBSSxHQUFHLElBQUksQ0FDWixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDZCxpRUFBaUUsS0FBSyxDQUFDLElBQUksQ0FDekUsSUFBSSxDQUNMLEVBQUUsQ0FDSixDQUFDO0lBQ0osQ0FBQzs7b0hBbkRVLHVCQUF1Qjt3SEFBdkIsdUJBQXVCLGNBRnRCLE1BQU07MkZBRVAsdUJBQXVCO2tCQUhuQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIGluamVjdCwgaXNEZXZNb2RlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMb2dnZXJTZXJ2aWNlIH0gZnJvbSAnLi4vbG9nZ2VyJztcbmltcG9ydCB7IEkxOG5Db25maWcgfSBmcm9tICcuL2NvbmZpZy9pMThuLWNvbmZpZyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBUcmFuc2xhdGlvbkNodW5rU2VydmljZSB7XG4gIHByb3RlY3RlZCBkdXBsaWNhdGVzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZ1tdIH0gPSB7fTtcbiAgcHJvdGVjdGVkIGNodW5rczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9O1xuXG4gIHByb3RlY3RlZCBsb2dnZXIgPSBpbmplY3QoTG9nZ2VyU2VydmljZSk7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGNvbmZpZzogSTE4bkNvbmZpZykge1xuICAgIGNvbnN0IGNodW5rcyA9IChjb25maWcuaTE4biAmJiBjb25maWcuaTE4bi5jaHVua3MpIHx8IHt9O1xuICAgIE9iamVjdC5rZXlzKGNodW5rcykuZm9yRWFjaCgoY2h1bmspID0+IHtcbiAgICAgIGNodW5rc1tjaHVua10uZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmNodW5rcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgaWYgKCF0aGlzLmR1cGxpY2F0ZXNba2V5XSkge1xuICAgICAgICAgICAgdGhpcy5kdXBsaWNhdGVzW2tleV0gPSBbdGhpcy5jaHVua3Nba2V5XV07XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuZHVwbGljYXRlc1trZXldLnB1c2goY2h1bmspO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY2h1bmtzW2tleV0gPSBjaHVuaztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuZHVwbGljYXRlcykubGVuZ3RoID4gMCAmJiBpc0Rldk1vZGUoKSkge1xuICAgICAgdGhpcy53YXJuRHVwbGljYXRlcyh0aGlzLmR1cGxpY2F0ZXMpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCByZWFkb25seSBLRVlfU0VQQVJBVE9SID0gJy4nO1xuXG4gIGdldENodW5rTmFtZUZvcktleShrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgbWFpbktleSA9IChrZXkgfHwgJycpLnNwbGl0KHRoaXMuS0VZX1NFUEFSQVRPUilbMF07XG4gICAgY29uc3QgY2h1bmsgPSB0aGlzLmNodW5rcyAmJiB0aGlzLmNodW5rc1ttYWluS2V5XTtcblxuICAgIGlmICghY2h1bmspIHtcbiAgICAgIHJldHVybiBtYWluS2V5OyAvLyBmYWxsYmFjayB0byBtYWluIGtleSBhcyBhIGNodW5rXG4gICAgfVxuICAgIHJldHVybiBjaHVuaztcbiAgfVxuXG4gIHByaXZhdGUgd2FybkR1cGxpY2F0ZXMoaXRlbXM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nW10gfSk6IHZvaWQge1xuICAgIGNvbnN0IGR1cGVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIE9iamVjdC5rZXlzKGl0ZW1zKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGR1cGVzLnB1c2goXG4gICAgICAgIGAqICcke2tleX0nIGZvdW5kIGluIGNodW5rczogJHtpdGVtc1trZXldLmpvaW4oJywgJyl9LiBVc2VkICcke1xuICAgICAgICAgIHRoaXMuY2h1bmtzW2tleV1cbiAgICAgICAgfS4ke2tleX0nLmBcbiAgICAgICk7XG4gICAgfSk7XG4gICAgdGhpcy5sb2dnZXIud2FybihcbiAgICAgIGBEdXBsaWNhdGVkIGtleXMgaGFzIGJlZW4gZm91bmQgaW4gdGhlIGNvbmZpZyBvZiBpMThuIGNodW5rczpcXG4ke2R1cGVzLmpvaW4oXG4gICAgICAgICdcXG4nXG4gICAgICApfWBcbiAgICApO1xuICB9XG59XG4iXX0=