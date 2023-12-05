/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { Config } from '../../config/config-tokens';
import { SiteContextConfig } from '../../site-context/config/site-context-config';
import * as i0 from "@angular/core";
export class OccConfig extends SiteContextConfig {
}
OccConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfig, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
OccConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfig, providedIn: 'root', useExisting: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfig, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useExisting: Config,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL29jYy9jb25maWcvb2NjLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0NBQStDLENBQUM7O0FBK0JsRixNQUFNLE9BQWdCLFNBQVUsU0FBUSxpQkFBaUI7O3NHQUFuQyxTQUFTOzBHQUFULFNBQVMsY0FIakIsTUFBTSxlQUNMLE1BQU07MkZBRUMsU0FBUztrQkFKOUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtvQkFDbEIsV0FBVyxFQUFFLE1BQU07aUJBQ3BCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29uZmlnL2NvbmZpZy10b2tlbnMnO1xuaW1wb3J0IHsgU2l0ZUNvbnRleHRDb25maWcgfSBmcm9tICcuLi8uLi9zaXRlLWNvbnRleHQvY29uZmlnL3NpdGUtY29udGV4dC1jb25maWcnO1xuaW1wb3J0IHsgT2NjRW5kcG9pbnRzIH0gZnJvbSAnLi4vb2NjLW1vZGVscy9vY2MtZW5kcG9pbnRzLm1vZGVsJztcbmltcG9ydCB7IExvYWRpbmdTY29wZXMgfSBmcm9tICcuL2xvYWRpbmctc2NvcGVzLWNvbmZpZyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmFja2VuZENvbmZpZyB7XG4gIG9jYz86IHtcbiAgICBiYXNlVXJsPzogc3RyaW5nO1xuICAgIHByZWZpeD86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgd2hldGhlciBvciBub3QgY3Jvc3Mtc2l0ZSBBY2Nlc3MtQ29udHJvbCByZXF1ZXN0cyBzaG91bGQgYmUgbWFkZVxuICAgICAqIHVzaW5nIGNyZWRlbnRpYWxzIHN1Y2ggYXMgY29va2llcywgYXV0aG9yaXphdGlvbiBoZWFkZXJzIG9yIFRMUyBjbGllbnQgY2VydGlmaWNhdGVzXG4gICAgICovXG4gICAgdXNlV2l0aENyZWRlbnRpYWxzPzogYm9vbGVhbjtcblxuICAgIGVuZHBvaW50cz86IE9jY0VuZHBvaW50cztcbiAgfTtcbiAgbWVkaWE/OiB7XG4gICAgLyoqXG4gICAgICogTWVkaWEgVVJMcyBhcmUgdHlwaWNhbGx5IHJlbGF0aXZlLCBzbyB0aGF0IHRoZSBob3N0IGNhbiBiZSBjb25maWd1cmVkLlxuICAgICAqIENvbmZpZ3VyYWJsZSBtZWRpYSBiYXNlVVJMcyBhcmUgdXNlZnVsIGZvciBTRU8sIG11bHRpLXNpdGUsXG4gICAgICogc3dpdGNoaW5nIGVudmlyb25tZW50cywgZXRjLlxuICAgICAqL1xuICAgIGJhc2VVcmw/OiBzdHJpbmc7XG4gIH07XG4gIGxvYWRpbmdTY29wZXM/OiBMb2FkaW5nU2NvcGVzO1xufVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290JyxcbiAgdXNlRXhpc3Rpbmc6IENvbmZpZyxcbn0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgT2NjQ29uZmlnIGV4dGVuZHMgU2l0ZUNvbnRleHRDb25maWcge1xuICBiYWNrZW5kPzogQmFja2VuZENvbmZpZztcbn1cblxuZGVjbGFyZSBtb2R1bGUgJy4uLy4uL2NvbmZpZy9jb25maWctdG9rZW5zJyB7XG4gIGludGVyZmFjZSBDb25maWcgZXh0ZW5kcyBPY2NDb25maWcge31cbn1cbiJdfQ==