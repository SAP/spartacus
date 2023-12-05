/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { inject, Inject, Injectable, isDevMode, Optional, } from '@angular/core';
import { LoggerService, resolveApplicable, } from '@spartacus/core';
import { ComponentHandler } from '../handlers/component-handler';
import * as i0 from "@angular/core";
/**
 * Responsible for obtaining component handler for specified component mapping
 */
export class ComponentHandlerService {
    constructor(handlers) {
        this.handlers = handlers;
        this.logger = inject(LoggerService);
        this.invalidMappings = new Set();
    }
    /**
     * Get best matching component handler
     *
     * @param componentMapping
     */
    resolve(componentMapping) {
        const handler = resolveApplicable(this.handlers, [componentMapping]);
        if (isDevMode() && !handler) {
            if (!this.invalidMappings.has(componentMapping)) {
                this.invalidMappings.add(componentMapping);
                this.logger.warn("Can't resolve handler for component mapping: ", componentMapping);
            }
        }
        return handler;
    }
    /**
     * Get launcher for specified component mapping
     *
     * @param componentMapping
     * @param viewContainerRef
     * @param elementInjector
     */
    getLauncher(componentMapping, viewContainerRef, elementInjector, module) {
        return this.resolve(componentMapping)?.launcher(componentMapping, viewContainerRef, elementInjector, module);
    }
}
ComponentHandlerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ComponentHandlerService, deps: [{ token: ComponentHandler, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
ComponentHandlerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ComponentHandlerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ComponentHandlerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [ComponentHandler]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LWhhbmRsZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLXN0cnVjdHVyZS9wYWdlL2NvbXBvbmVudC9zZXJ2aWNlcy9jb21wb25lbnQtaGFuZGxlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBR0wsTUFBTSxFQUNOLE1BQU0sRUFDTixVQUFVLEVBRVYsU0FBUyxFQUVULFFBQVEsR0FFVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBRUwsYUFBYSxFQUNiLGlCQUFpQixHQUNsQixNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLCtCQUErQixDQUFDOztBQUVqRTs7R0FFRztBQUlILE1BQU0sT0FBTyx1QkFBdUI7SUFHbEMsWUFHWSxRQUE0QjtRQUE1QixhQUFRLEdBQVIsUUFBUSxDQUFvQjtRQUw5QixXQUFNLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBUS9CLG9CQUFlLEdBQUcsSUFBSSxHQUFHLEVBQTRCLENBQUM7SUFGN0QsQ0FBQztJQUlKOzs7O09BSUc7SUFDTyxPQUFPLENBQ2YsZ0JBQXFDO1FBRXJDLE1BQU0sT0FBTyxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7UUFFckUsSUFBSSxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtnQkFDL0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQ2QsK0NBQStDLEVBQy9DLGdCQUFnQixDQUNqQixDQUFDO2FBQ0g7U0FDRjtRQUVELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxXQUFXLENBQ1QsZ0JBQXFDLEVBQ3JDLGdCQUFrQyxFQUNsQyxlQUEwQixFQUMxQixNQUF5QjtRQUl6QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxRQUFRLENBQzdDLGdCQUFnQixFQUNoQixnQkFBZ0IsRUFDaEIsZUFBZSxFQUNmLE1BQU0sQ0FDUCxDQUFDO0lBQ0osQ0FBQzs7b0hBdkRVLHVCQUF1QixrQkFLeEIsZ0JBQWdCO3dIQUxmLHVCQUF1QixjQUZ0QixNQUFNOzJGQUVQLHVCQUF1QjtrQkFIbkMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzBCQUtJLFFBQVE7OzBCQUNSLE1BQU07MkJBQUMsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ29tcG9uZW50UmVmLFxuICBFbGVtZW50UmVmLFxuICBpbmplY3QsXG4gIEluamVjdCxcbiAgSW5qZWN0YWJsZSxcbiAgSW5qZWN0b3IsXG4gIGlzRGV2TW9kZSxcbiAgTmdNb2R1bGVSZWYsXG4gIE9wdGlvbmFsLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENtc0NvbXBvbmVudE1hcHBpbmcsXG4gIExvZ2dlclNlcnZpY2UsXG4gIHJlc29sdmVBcHBsaWNhYmxlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29tcG9uZW50SGFuZGxlciB9IGZyb20gJy4uL2hhbmRsZXJzL2NvbXBvbmVudC1oYW5kbGVyJztcblxuLyoqXG4gKiBSZXNwb25zaWJsZSBmb3Igb2J0YWluaW5nIGNvbXBvbmVudCBoYW5kbGVyIGZvciBzcGVjaWZpZWQgY29tcG9uZW50IG1hcHBpbmdcbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENvbXBvbmVudEhhbmRsZXJTZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIGxvZ2dlciA9IGluamVjdChMb2dnZXJTZXJ2aWNlKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoQ29tcG9uZW50SGFuZGxlcilcbiAgICBwcm90ZWN0ZWQgaGFuZGxlcnM6IENvbXBvbmVudEhhbmRsZXJbXVxuICApIHt9XG5cbiAgcHJvdGVjdGVkIGludmFsaWRNYXBwaW5ncyA9IG5ldyBTZXQ8Q21zQ29tcG9uZW50TWFwcGluZzxhbnk+PigpO1xuXG4gIC8qKlxuICAgKiBHZXQgYmVzdCBtYXRjaGluZyBjb21wb25lbnQgaGFuZGxlclxuICAgKlxuICAgKiBAcGFyYW0gY29tcG9uZW50TWFwcGluZ1xuICAgKi9cbiAgcHJvdGVjdGVkIHJlc29sdmUoXG4gICAgY29tcG9uZW50TWFwcGluZzogQ21zQ29tcG9uZW50TWFwcGluZ1xuICApOiBDb21wb25lbnRIYW5kbGVyIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBoYW5kbGVyID0gcmVzb2x2ZUFwcGxpY2FibGUodGhpcy5oYW5kbGVycywgW2NvbXBvbmVudE1hcHBpbmddKTtcblxuICAgIGlmIChpc0Rldk1vZGUoKSAmJiAhaGFuZGxlcikge1xuICAgICAgaWYgKCF0aGlzLmludmFsaWRNYXBwaW5ncy5oYXMoY29tcG9uZW50TWFwcGluZykpIHtcbiAgICAgICAgdGhpcy5pbnZhbGlkTWFwcGluZ3MuYWRkKGNvbXBvbmVudE1hcHBpbmcpO1xuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKFxuICAgICAgICAgIFwiQ2FuJ3QgcmVzb2x2ZSBoYW5kbGVyIGZvciBjb21wb25lbnQgbWFwcGluZzogXCIsXG4gICAgICAgICAgY29tcG9uZW50TWFwcGluZ1xuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBoYW5kbGVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBsYXVuY2hlciBmb3Igc3BlY2lmaWVkIGNvbXBvbmVudCBtYXBwaW5nXG4gICAqXG4gICAqIEBwYXJhbSBjb21wb25lbnRNYXBwaW5nXG4gICAqIEBwYXJhbSB2aWV3Q29udGFpbmVyUmVmXG4gICAqIEBwYXJhbSBlbGVtZW50SW5qZWN0b3JcbiAgICovXG4gIGdldExhdW5jaGVyKFxuICAgIGNvbXBvbmVudE1hcHBpbmc6IENtc0NvbXBvbmVudE1hcHBpbmcsXG4gICAgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBlbGVtZW50SW5qZWN0b3I/OiBJbmplY3RvcixcbiAgICBtb2R1bGU/OiBOZ01vZHVsZVJlZjxhbnk+XG4gICk6XG4gICAgfCBPYnNlcnZhYmxlPHsgZWxlbWVudFJlZjogRWxlbWVudFJlZjsgY29tcG9uZW50UmVmPzogQ29tcG9uZW50UmVmPGFueT4gfT5cbiAgICB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMucmVzb2x2ZShjb21wb25lbnRNYXBwaW5nKT8ubGF1bmNoZXIoXG4gICAgICBjb21wb25lbnRNYXBwaW5nLFxuICAgICAgdmlld0NvbnRhaW5lclJlZixcbiAgICAgIGVsZW1lbnRJbmplY3RvcixcbiAgICAgIG1vZHVsZVxuICAgICk7XG4gIH1cbn1cbiJdfQ==