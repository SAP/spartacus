/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, } from '@angular/core';
import { filter, map, scan, startWith } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./lazy-modules.service";
const NOT_FOUND_SYMBOL = {};
/**
 * UnifiedInjector provides a way to get instances of tokens not only once, from the root injector,
 * but also from lazy loaded module injectors that can be initialized over time.
 */
export class UnifiedInjector {
    constructor(rootInjector, lazyModules) {
        this.rootInjector = rootInjector;
        this.lazyModules = lazyModules;
        /**
         * Gather all the injectors, with the root injector as a first one
         *
         */
        this.injectors$ = this.lazyModules.modules$.pipe(map((moduleRef) => moduleRef.injector), startWith(this.rootInjector));
    }
    /**
     * Gen instances for specified tokens.
     *
     * When notFoundValue is provided, it will consistently emit once per injector,
     * even if injector doesn't contain instances for specified token.
     * Otherwise, emissions will only involve cases, where new instances will be found.
     *
     * @param token
     * @param notFoundValue
     */
    get(token, notFoundValue) {
        return this.injectors$.pipe(map((injector, index) => injector.get(token, notFoundValue ?? NOT_FOUND_SYMBOL, 
        // we want to get only Self instances from all injectors except the
        // first one, which is a root injector
        index ? { self: true } : undefined)), filter((instance) => instance !== NOT_FOUND_SYMBOL));
    }
    getMulti(token) {
        return this.get(token, []).pipe(filter((instances) => {
            if (!Array.isArray(instances)) {
                throw new Error(`Multi-providers mixed with single providers for ${token.toString()}!`);
            }
            return instances.length > 0;
        }), scan((acc, services) => [...acc, ...services], []));
    }
}
UnifiedInjector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnifiedInjector, deps: [{ token: i0.Injector }, { token: i1.LazyModulesService }], target: i0.ɵɵFactoryTarget.Injectable });
UnifiedInjector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnifiedInjector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnifiedInjector, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.LazyModulesService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pZmllZC1pbmplY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2xhenktbG9hZGluZy91bmlmaWVkLWluamVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBRUwsVUFBVSxHQUlYLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBRzlELE1BQU0sZ0JBQWdCLEdBQVEsRUFBRSxDQUFDO0FBRWpDOzs7R0FHRztBQUlILE1BQU0sT0FBTyxlQUFlO0lBVTFCLFlBQ1ksWUFBc0IsRUFDdEIsV0FBK0I7UUFEL0IsaUJBQVksR0FBWixZQUFZLENBQVU7UUFDdEIsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBWDNDOzs7V0FHRztRQUNNLGVBQVUsR0FBeUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUN4RSxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFDdEMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FDN0IsQ0FBQztJQUtDLENBQUM7SUFFSjs7Ozs7Ozs7O09BU0c7SUFDSCxHQUFHLENBQ0QsS0FBb0QsRUFDcEQsYUFBaUI7UUFFakIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FDekIsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQ3RCLFFBQVEsQ0FBQyxHQUFHLENBQ1YsS0FBSyxFQUNMLGFBQWEsSUFBSSxnQkFBZ0I7UUFDakMsbUVBQW1FO1FBQ25FLHNDQUFzQztRQUN0QyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQ25DLENBQ0YsRUFDRCxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVEsS0FBSyxnQkFBZ0IsQ0FBQyxDQUNwRCxDQUFDO0lBQ0osQ0FBQztJQVdELFFBQVEsQ0FDTixLQUEwRDtRQUUxRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FDN0IsTUFBTSxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQzdCLE1BQU0sSUFBSSxLQUFLLENBQ2IsbURBQW1ELEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUN2RSxDQUFDO2FBQ0g7WUFDRCxPQUFPLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxFQUNGLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FDbkQsQ0FBQztJQUNKLENBQUM7OzRHQWxFVSxlQUFlO2dIQUFmLGVBQWUsY0FGZCxNQUFNOzJGQUVQLGVBQWU7a0JBSDNCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQWJzdHJhY3RUeXBlLFxuICBJbmplY3RhYmxlLFxuICBJbmplY3Rpb25Ub2tlbixcbiAgSW5qZWN0b3IsXG4gIFR5cGUsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAsIHNjYW4sIHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IExhenlNb2R1bGVzU2VydmljZSB9IGZyb20gJy4vbGF6eS1tb2R1bGVzLnNlcnZpY2UnO1xuXG5jb25zdCBOT1RfRk9VTkRfU1lNQk9MOiBhbnkgPSB7fTtcblxuLyoqXG4gKiBVbmlmaWVkSW5qZWN0b3IgcHJvdmlkZXMgYSB3YXkgdG8gZ2V0IGluc3RhbmNlcyBvZiB0b2tlbnMgbm90IG9ubHkgb25jZSwgZnJvbSB0aGUgcm9vdCBpbmplY3RvcixcbiAqIGJ1dCBhbHNvIGZyb20gbGF6eSBsb2FkZWQgbW9kdWxlIGluamVjdG9ycyB0aGF0IGNhbiBiZSBpbml0aWFsaXplZCBvdmVyIHRpbWUuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBVbmlmaWVkSW5qZWN0b3Ige1xuICAvKipcbiAgICogR2F0aGVyIGFsbCB0aGUgaW5qZWN0b3JzLCB3aXRoIHRoZSByb290IGluamVjdG9yIGFzIGEgZmlyc3Qgb25lXG4gICAqXG4gICAqL1xuICByZWFkb25seSBpbmplY3RvcnMkOiBPYnNlcnZhYmxlPEluamVjdG9yPiA9IHRoaXMubGF6eU1vZHVsZXMubW9kdWxlcyQucGlwZShcbiAgICBtYXAoKG1vZHVsZVJlZikgPT4gbW9kdWxlUmVmLmluamVjdG9yKSxcbiAgICBzdGFydFdpdGgodGhpcy5yb290SW5qZWN0b3IpXG4gICk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHJvb3RJbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJvdGVjdGVkIGxhenlNb2R1bGVzOiBMYXp5TW9kdWxlc1NlcnZpY2VcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBHZW4gaW5zdGFuY2VzIGZvciBzcGVjaWZpZWQgdG9rZW5zLlxuICAgKlxuICAgKiBXaGVuIG5vdEZvdW5kVmFsdWUgaXMgcHJvdmlkZWQsIGl0IHdpbGwgY29uc2lzdGVudGx5IGVtaXQgb25jZSBwZXIgaW5qZWN0b3IsXG4gICAqIGV2ZW4gaWYgaW5qZWN0b3IgZG9lc24ndCBjb250YWluIGluc3RhbmNlcyBmb3Igc3BlY2lmaWVkIHRva2VuLlxuICAgKiBPdGhlcndpc2UsIGVtaXNzaW9ucyB3aWxsIG9ubHkgaW52b2x2ZSBjYXNlcywgd2hlcmUgbmV3IGluc3RhbmNlcyB3aWxsIGJlIGZvdW5kLlxuICAgKlxuICAgKiBAcGFyYW0gdG9rZW5cbiAgICogQHBhcmFtIG5vdEZvdW5kVmFsdWVcbiAgICovXG4gIGdldDxUPihcbiAgICB0b2tlbjogVHlwZTxUPiB8IEluamVjdGlvblRva2VuPFQ+IHwgQWJzdHJhY3RUeXBlPFQ+LFxuICAgIG5vdEZvdW5kVmFsdWU/OiBUXG4gICk6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiB0aGlzLmluamVjdG9ycyQucGlwZShcbiAgICAgIG1hcCgoaW5qZWN0b3IsIGluZGV4KSA9PlxuICAgICAgICBpbmplY3Rvci5nZXQ8VD4oXG4gICAgICAgICAgdG9rZW4sXG4gICAgICAgICAgbm90Rm91bmRWYWx1ZSA/PyBOT1RfRk9VTkRfU1lNQk9MLFxuICAgICAgICAgIC8vIHdlIHdhbnQgdG8gZ2V0IG9ubHkgU2VsZiBpbnN0YW5jZXMgZnJvbSBhbGwgaW5qZWN0b3JzIGV4Y2VwdCB0aGVcbiAgICAgICAgICAvLyBmaXJzdCBvbmUsIHdoaWNoIGlzIGEgcm9vdCBpbmplY3RvclxuICAgICAgICAgIGluZGV4ID8geyBzZWxmOiB0cnVlIH0gOiB1bmRlZmluZWRcbiAgICAgICAgKVxuICAgICAgKSxcbiAgICAgIGZpbHRlcigoaW5zdGFuY2UpID0+IGluc3RhbmNlICE9PSBOT1RfRk9VTkRfU1lNQk9MKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IG11bHRpIHByb3ZpZGVkIGluc3RhbmNlcyBmb3IgYSBzcGVjaWZpZWQgdG9rZW5cbiAgICpcbiAgICogQHBhcmFtIHRva2VuXG4gICAqL1xuICBnZXRNdWx0aTxUPihcbiAgICB0b2tlbjogVHlwZTxUPiB8IEluamVjdGlvblRva2VuPFQ+IHwgQWJzdHJhY3RUeXBlPFQ+XG4gICk6IE9ic2VydmFibGU8VFtdPjtcbiAgZ2V0TXVsdGk8VD4odG9rZW46IGFueSk6IE9ic2VydmFibGU8VD47XG4gIGdldE11bHRpPFQ+KFxuICAgIHRva2VuOiBUeXBlPFQ+IHwgSW5qZWN0aW9uVG9rZW48VD4gfCBBYnN0cmFjdFR5cGU8VD4gfCBhbnlcbiAgKTogT2JzZXJ2YWJsZTxUW10+IHtcbiAgICByZXR1cm4gdGhpcy5nZXQodG9rZW4sIFtdKS5waXBlKFxuICAgICAgZmlsdGVyKChpbnN0YW5jZXMpID0+IHtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGluc3RhbmNlcykpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBgTXVsdGktcHJvdmlkZXJzIG1peGVkIHdpdGggc2luZ2xlIHByb3ZpZGVycyBmb3IgJHt0b2tlbi50b1N0cmluZygpfSFgXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5zdGFuY2VzLmxlbmd0aCA+IDA7XG4gICAgICB9KSxcbiAgICAgIHNjYW4oKGFjYywgc2VydmljZXMpID0+IFsuLi5hY2MsIC4uLnNlcnZpY2VzXSwgW10pXG4gICAgKTtcbiAgfVxufVxuIl19