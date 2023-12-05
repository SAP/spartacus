/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { LANGUAGE_CONTEXT_ID } from '../providers/context-ids';
import * as i0 from "@angular/core";
import * as i1 from "../../state/services/state-persistence.service";
import * as i2 from "../facade/language.service";
import * as i3 from "../config/site-context-config";
export class LanguageStatePersistenceService {
    constructor(statePersistenceService, languageService, config) {
        this.statePersistenceService = statePersistenceService;
        this.languageService = languageService;
        this.config = config;
        this.initialized$ = new ReplaySubject(1);
    }
    /**
     * Initializes the synchronization of the active language with the local storage.
     *
     * @returns Observable that emits and completes when the value is read from the storage.
     */
    initSync() {
        this.statePersistenceService.syncWithStorage({
            key: LANGUAGE_CONTEXT_ID,
            state$: this.languageService.getActive(),
            onRead: (state) => this.onRead(state),
        });
        return this.initialized$;
    }
    onRead(valueFromStorage) {
        if (!this.languageService.isInitialized() && valueFromStorage) {
            this.languageService.setActive(valueFromStorage);
        }
        if (!this.initialized$.closed) {
            this.initialized$.next(undefined);
            this.initialized$.complete();
        }
    }
}
LanguageStatePersistenceService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LanguageStatePersistenceService, deps: [{ token: i1.StatePersistenceService }, { token: i2.LanguageService }, { token: i3.SiteContextConfig }], target: i0.ɵɵFactoryTarget.Injectable });
LanguageStatePersistenceService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LanguageStatePersistenceService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LanguageStatePersistenceService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.StatePersistenceService }, { type: i2.LanguageService }, { type: i3.SiteContextConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZ3VhZ2Utc3RhdGUtcGVyc2lzdGVuY2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL3NpdGUtY29udGV4dC9zZXJ2aWNlcy9sYW5ndWFnZS1zdGF0ZS1wZXJzaXN0ZW5jZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFJakQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7O0FBRy9ELE1BQU0sT0FBTywrQkFBK0I7SUFDMUMsWUFDWSx1QkFBZ0QsRUFDaEQsZUFBZ0MsRUFDaEMsTUFBeUI7UUFGekIsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF5QjtRQUNoRCxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFHM0IsaUJBQVksR0FBRyxJQUFJLGFBQWEsQ0FBVSxDQUFDLENBQUMsQ0FBQztJQUZwRCxDQUFDO0lBSUo7Ozs7T0FJRztJQUNJLFFBQVE7UUFDYixJQUFJLENBQUMsdUJBQXVCLENBQUMsZUFBZSxDQUFDO1lBQzNDLEdBQUcsRUFBRSxtQkFBbUI7WUFDeEIsTUFBTSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFO1lBQ3hDLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDdEMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFFUyxNQUFNLENBQUMsZ0JBQW9DO1FBQ25ELElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxJQUFJLGdCQUFnQixFQUFFO1lBQzdELElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDbEQ7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUM5QjtJQUNILENBQUM7OzRIQWhDVSwrQkFBK0I7Z0lBQS9CLCtCQUErQixjQURsQixNQUFNOzJGQUNuQiwrQkFBK0I7a0JBRDNDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU3RhdGVQZXJzaXN0ZW5jZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zdGF0ZS9zZXJ2aWNlcy9zdGF0ZS1wZXJzaXN0ZW5jZS5zZXJ2aWNlJztcbmltcG9ydCB7IFNpdGVDb250ZXh0Q29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL3NpdGUtY29udGV4dC1jb25maWcnO1xuaW1wb3J0IHsgTGFuZ3VhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vZmFjYWRlL2xhbmd1YWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTEFOR1VBR0VfQ09OVEVYVF9JRCB9IGZyb20gJy4uL3Byb3ZpZGVycy9jb250ZXh0LWlkcyc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgTGFuZ3VhZ2VTdGF0ZVBlcnNpc3RlbmNlU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBzdGF0ZVBlcnNpc3RlbmNlU2VydmljZTogU3RhdGVQZXJzaXN0ZW5jZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjb25maWc6IFNpdGVDb250ZXh0Q29uZmlnXG4gICkge31cblxuICBwcm90ZWN0ZWQgaW5pdGlhbGl6ZWQkID0gbmV3IFJlcGxheVN1YmplY3Q8dW5rbm93bj4oMSk7XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBzeW5jaHJvbml6YXRpb24gb2YgdGhlIGFjdGl2ZSBsYW5ndWFnZSB3aXRoIHRoZSBsb2NhbCBzdG9yYWdlLlxuICAgKlxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgYW5kIGNvbXBsZXRlcyB3aGVuIHRoZSB2YWx1ZSBpcyByZWFkIGZyb20gdGhlIHN0b3JhZ2UuXG4gICAqL1xuICBwdWJsaWMgaW5pdFN5bmMoKTogT2JzZXJ2YWJsZTx1bmtub3duPiB7XG4gICAgdGhpcy5zdGF0ZVBlcnNpc3RlbmNlU2VydmljZS5zeW5jV2l0aFN0b3JhZ2Uoe1xuICAgICAga2V5OiBMQU5HVUFHRV9DT05URVhUX0lELFxuICAgICAgc3RhdGUkOiB0aGlzLmxhbmd1YWdlU2VydmljZS5nZXRBY3RpdmUoKSxcbiAgICAgIG9uUmVhZDogKHN0YXRlKSA9PiB0aGlzLm9uUmVhZChzdGF0ZSksXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuaW5pdGlhbGl6ZWQkO1xuICB9XG5cbiAgcHJvdGVjdGVkIG9uUmVhZCh2YWx1ZUZyb21TdG9yYWdlOiBzdHJpbmcgfCB1bmRlZmluZWQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMubGFuZ3VhZ2VTZXJ2aWNlLmlzSW5pdGlhbGl6ZWQoKSAmJiB2YWx1ZUZyb21TdG9yYWdlKSB7XG4gICAgICB0aGlzLmxhbmd1YWdlU2VydmljZS5zZXRBY3RpdmUodmFsdWVGcm9tU3RvcmFnZSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmluaXRpYWxpemVkJC5jbG9zZWQpIHtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZWQkLm5leHQodW5kZWZpbmVkKTtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZWQkLmNvbXBsZXRlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=