/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../config/occ-config";
export class LoadingScopesService {
    constructor(config) {
        this.config = config;
    }
    /**
     * Aims to expand scopes based on loading scopes config.
     *
     * I.e. if 'details' scope includes 'list' scope by configuration, it'll return ['details', 'list']
     *
     * If scope data overlaps with each other, the data should be merged in the order of scopes provided,
     * i.e. the last scope is merged last, overwriting parts of the data already provided by preceding scope.
     * It should apply also to implicit scopes (that are included by configuration).
     *
     * @param model
     * @param scopes
     */
    expand(model, scopes) {
        const scopesConfig = this.config?.backend?.loadingScopes?.[model];
        if (scopesConfig) {
            const expandedScopes = [...scopes];
            let i = expandedScopes.length;
            while (i > 0) {
                i--;
                const includedScopes = scopesConfig[expandedScopes[i]]?.include;
                if (includedScopes) {
                    for (const includedScope of includedScopes) {
                        if (!expandedScopes.includes(includedScope)) {
                            expandedScopes.splice(i, 0, includedScope);
                            i++;
                        }
                    }
                }
            }
            return expandedScopes;
        }
        return scopes;
    }
    /**
     * Return maxAge for product scope in milliseconds
     *
     * @param model
     * @param scope
     */
    getMaxAge(model, scope) {
        const configuredMaxAge = this.config.backend?.loadingScopes?.[model]?.[scope]?.maxAge ?? 0;
        return configuredMaxAge * 1000;
    }
    /**
     *
     * Returns the configured triggers for which to reload the product.
     *
     * @param model for which to look up the scopes (usually a 'product')
     * @param scope for which to look up the config
     * @returns the configured triggers, or an empty array if not configured
     */
    getReloadTriggers(model, scope) {
        return this.config.backend?.loadingScopes?.[model]?.[scope]?.reloadOn ?? [];
    }
}
LoadingScopesService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoadingScopesService, deps: [{ token: i1.OccConfig }], target: i0.ɵɵFactoryTarget.Injectable });
LoadingScopesService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoadingScopesService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoadingScopesService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.OccConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1zY29wZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL29jYy9zZXJ2aWNlcy9sb2FkaW5nLXNjb3Blcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFRLE1BQU0sZUFBZSxDQUFDOzs7QUFPakQsTUFBTSxPQUFPLG9CQUFvQjtJQUMvQixZQUFzQixNQUFpQjtRQUFqQixXQUFNLEdBQU4sTUFBTSxDQUFXO0lBQUcsQ0FBQztJQUUzQzs7Ozs7Ozs7Ozs7T0FXRztJQUNILE1BQU0sQ0FBQyxLQUFhLEVBQUUsTUFBZ0I7UUFDcEMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFbEUsSUFBSSxZQUFZLEVBQUU7WUFDaEIsTUFBTSxjQUFjLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUM7WUFFOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNaLENBQUMsRUFBRSxDQUFDO2dCQUNKLE1BQU0sY0FBYyxHQUFHLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUM7Z0JBQ2hFLElBQUksY0FBYyxFQUFFO29CQUNsQixLQUFLLE1BQU0sYUFBYSxJQUFJLGNBQWMsRUFBRTt3QkFDMUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUU7NEJBQzNDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQzs0QkFDM0MsQ0FBQyxFQUFFLENBQUM7eUJBQ0w7cUJBQ0Y7aUJBQ0Y7YUFDRjtZQUVELE9BQU8sY0FBYyxDQUFDO1NBQ3ZCO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsU0FBUyxDQUFDLEtBQWEsRUFBRSxLQUFhO1FBQ3BDLE1BQU0sZ0JBQWdCLEdBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsTUFBTSxJQUFJLENBQUMsQ0FBQztRQUNwRSxPQUFPLGdCQUFnQixHQUFHLElBQUksQ0FBQztJQUNqQyxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILGlCQUFpQixDQUFDLEtBQWEsRUFBRSxLQUFhO1FBQzVDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxRQUFRLElBQUksRUFBRSxDQUFDO0lBQzlFLENBQUM7O2lIQS9EVSxvQkFBb0I7cUhBQXBCLG9CQUFvQixjQUZuQixNQUFNOzJGQUVQLG9CQUFvQjtrQkFIaEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDeEV2ZW50IH0gZnJvbSAnLi4vLi4vZXZlbnQvY3gtZXZlbnQnO1xuaW1wb3J0IHsgT2NjQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL29jYy1jb25maWcnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgTG9hZGluZ1Njb3Blc1NlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgY29uZmlnOiBPY2NDb25maWcpIHt9XG5cbiAgLyoqXG4gICAqIEFpbXMgdG8gZXhwYW5kIHNjb3BlcyBiYXNlZCBvbiBsb2FkaW5nIHNjb3BlcyBjb25maWcuXG4gICAqXG4gICAqIEkuZS4gaWYgJ2RldGFpbHMnIHNjb3BlIGluY2x1ZGVzICdsaXN0JyBzY29wZSBieSBjb25maWd1cmF0aW9uLCBpdCdsbCByZXR1cm4gWydkZXRhaWxzJywgJ2xpc3QnXVxuICAgKlxuICAgKiBJZiBzY29wZSBkYXRhIG92ZXJsYXBzIHdpdGggZWFjaCBvdGhlciwgdGhlIGRhdGEgc2hvdWxkIGJlIG1lcmdlZCBpbiB0aGUgb3JkZXIgb2Ygc2NvcGVzIHByb3ZpZGVkLFxuICAgKiBpLmUuIHRoZSBsYXN0IHNjb3BlIGlzIG1lcmdlZCBsYXN0LCBvdmVyd3JpdGluZyBwYXJ0cyBvZiB0aGUgZGF0YSBhbHJlYWR5IHByb3ZpZGVkIGJ5IHByZWNlZGluZyBzY29wZS5cbiAgICogSXQgc2hvdWxkIGFwcGx5IGFsc28gdG8gaW1wbGljaXQgc2NvcGVzICh0aGF0IGFyZSBpbmNsdWRlZCBieSBjb25maWd1cmF0aW9uKS5cbiAgICpcbiAgICogQHBhcmFtIG1vZGVsXG4gICAqIEBwYXJhbSBzY29wZXNcbiAgICovXG4gIGV4cGFuZChtb2RlbDogc3RyaW5nLCBzY29wZXM6IHN0cmluZ1tdKTogc3RyaW5nW10ge1xuICAgIGNvbnN0IHNjb3Blc0NvbmZpZyA9IHRoaXMuY29uZmlnPy5iYWNrZW5kPy5sb2FkaW5nU2NvcGVzPy5bbW9kZWxdO1xuXG4gICAgaWYgKHNjb3Blc0NvbmZpZykge1xuICAgICAgY29uc3QgZXhwYW5kZWRTY29wZXMgPSBbLi4uc2NvcGVzXTtcbiAgICAgIGxldCBpID0gZXhwYW5kZWRTY29wZXMubGVuZ3RoO1xuXG4gICAgICB3aGlsZSAoaSA+IDApIHtcbiAgICAgICAgaS0tO1xuICAgICAgICBjb25zdCBpbmNsdWRlZFNjb3BlcyA9IHNjb3Blc0NvbmZpZ1tleHBhbmRlZFNjb3Blc1tpXV0/LmluY2x1ZGU7XG4gICAgICAgIGlmIChpbmNsdWRlZFNjb3Blcykge1xuICAgICAgICAgIGZvciAoY29uc3QgaW5jbHVkZWRTY29wZSBvZiBpbmNsdWRlZFNjb3Blcykge1xuICAgICAgICAgICAgaWYgKCFleHBhbmRlZFNjb3Blcy5pbmNsdWRlcyhpbmNsdWRlZFNjb3BlKSkge1xuICAgICAgICAgICAgICBleHBhbmRlZFNjb3Blcy5zcGxpY2UoaSwgMCwgaW5jbHVkZWRTY29wZSk7XG4gICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGV4cGFuZGVkU2NvcGVzO1xuICAgIH1cblxuICAgIHJldHVybiBzY29wZXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIG1heEFnZSBmb3IgcHJvZHVjdCBzY29wZSBpbiBtaWxsaXNlY29uZHNcbiAgICpcbiAgICogQHBhcmFtIG1vZGVsXG4gICAqIEBwYXJhbSBzY29wZVxuICAgKi9cbiAgZ2V0TWF4QWdlKG1vZGVsOiBzdHJpbmcsIHNjb3BlOiBzdHJpbmcpOiBudW1iZXIge1xuICAgIGNvbnN0IGNvbmZpZ3VyZWRNYXhBZ2UgPVxuICAgICAgdGhpcy5jb25maWcuYmFja2VuZD8ubG9hZGluZ1Njb3Blcz8uW21vZGVsXT8uW3Njb3BlXT8ubWF4QWdlID8/IDA7XG4gICAgcmV0dXJuIGNvbmZpZ3VyZWRNYXhBZ2UgKiAxMDAwO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIFJldHVybnMgdGhlIGNvbmZpZ3VyZWQgdHJpZ2dlcnMgZm9yIHdoaWNoIHRvIHJlbG9hZCB0aGUgcHJvZHVjdC5cbiAgICpcbiAgICogQHBhcmFtIG1vZGVsIGZvciB3aGljaCB0byBsb29rIHVwIHRoZSBzY29wZXMgKHVzdWFsbHkgYSAncHJvZHVjdCcpXG4gICAqIEBwYXJhbSBzY29wZSBmb3Igd2hpY2ggdG8gbG9vayB1cCB0aGUgY29uZmlnXG4gICAqIEByZXR1cm5zIHRoZSBjb25maWd1cmVkIHRyaWdnZXJzLCBvciBhbiBlbXB0eSBhcnJheSBpZiBub3QgY29uZmlndXJlZFxuICAgKi9cbiAgZ2V0UmVsb2FkVHJpZ2dlcnMobW9kZWw6IHN0cmluZywgc2NvcGU6IHN0cmluZyk6IFR5cGU8Q3hFdmVudD5bXSB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmJhY2tlbmQ/LmxvYWRpbmdTY29wZXM/Llttb2RlbF0/LltzY29wZV0/LnJlbG9hZE9uID8/IFtdO1xuICB9XG59XG4iXX0=