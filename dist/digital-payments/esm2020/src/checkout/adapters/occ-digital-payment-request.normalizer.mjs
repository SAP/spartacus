/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class OccDpRequestNormalizer {
    convert(source, target) {
        if (target === undefined) {
            target = { ...source };
        }
        target.url = source.postUrl;
        target.sessionId = source?.parameters?.entry?.find((it) => it.key === 'session_id')?.value;
        target.signature = source?.parameters?.entry?.find((it) => it.key === 'signature')?.value;
        return target;
    }
}
OccDpRequestNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccDpRequestNormalizer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccDpRequestNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccDpRequestNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccDpRequestNormalizer, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWRpZ2l0YWwtcGF5bWVudC1yZXF1ZXN0Lm5vcm1hbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2RpZ2l0YWwtcGF5bWVudHMvc3JjL2NoZWNrb3V0L2FkYXB0ZXJzL29jYy1kaWdpdGFsLXBheW1lbnQtcmVxdWVzdC5ub3JtYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVEzQyxNQUFNLE9BQU8sc0JBQXNCO0lBR2pDLE9BQU8sQ0FDTCxNQUEyQixFQUMzQixNQUF3QjtRQUV4QixJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDeEIsTUFBTSxHQUFHLEVBQUUsR0FBSSxNQUFjLEVBQUUsQ0FBQztTQUNqQztRQUNELE1BQU0sQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUM1QixNQUFNLENBQUMsU0FBUyxHQUFHLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FDaEQsQ0FBQyxFQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssWUFBWSxDQUNyQyxFQUFFLEtBQUssQ0FBQztRQUNULE1BQU0sQ0FBQyxTQUFTLEdBQUcsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUNoRCxDQUFDLEVBQU8sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxXQUFXLENBQ3BDLEVBQUUsS0FBSyxDQUFDO1FBQ1QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7bUhBbEJVLHNCQUFzQjt1SEFBdEIsc0JBQXNCLGNBRnJCLE1BQU07MkZBRVAsc0JBQXNCO2tCQUhsQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnZlcnRlciB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBEcFBheW1lbnRSZXF1ZXN0IH0gZnJvbSAnLi4vbW9kZWxzJztcbmltcG9ydCB7IE9jY0RwUGF5bWVudFJlcXVlc3QgfSBmcm9tICcuL29jYy5tb2RlbHMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgT2NjRHBSZXF1ZXN0Tm9ybWFsaXplclxuICBpbXBsZW1lbnRzIENvbnZlcnRlcjxPY2NEcFBheW1lbnRSZXF1ZXN0LCBEcFBheW1lbnRSZXF1ZXN0Plxue1xuICBjb252ZXJ0KFxuICAgIHNvdXJjZTogT2NjRHBQYXltZW50UmVxdWVzdCxcbiAgICB0YXJnZXQ6IERwUGF5bWVudFJlcXVlc3RcbiAgKTogRHBQYXltZW50UmVxdWVzdCB7XG4gICAgaWYgKHRhcmdldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0YXJnZXQgPSB7IC4uLihzb3VyY2UgYXMgYW55KSB9O1xuICAgIH1cbiAgICB0YXJnZXQudXJsID0gc291cmNlLnBvc3RVcmw7XG4gICAgdGFyZ2V0LnNlc3Npb25JZCA9IHNvdXJjZT8ucGFyYW1ldGVycz8uZW50cnk/LmZpbmQoXG4gICAgICAoaXQ6IGFueSkgPT4gaXQua2V5ID09PSAnc2Vzc2lvbl9pZCdcbiAgICApPy52YWx1ZTtcbiAgICB0YXJnZXQuc2lnbmF0dXJlID0gc291cmNlPy5wYXJhbWV0ZXJzPy5lbnRyeT8uZmluZChcbiAgICAgIChpdDogYW55KSA9PiBpdC5rZXkgPT09ICdzaWduYXR1cmUnXG4gICAgKT8udmFsdWU7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxufVxuIl19