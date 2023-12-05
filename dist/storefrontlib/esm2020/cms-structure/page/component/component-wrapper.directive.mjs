/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectorRef, Directive, EventEmitter, Input, Output, } from '@angular/core';
import { isNotUndefined, } from '@spartacus/core';
import { filter, finalize, tap } from 'rxjs/operators';
import { ComponentCreateEvent, ComponentDestroyEvent, } from './events/component.event';
import * as i0 from "@angular/core";
import * as i1 from "../../services/cms-components.service";
import * as i2 from "@spartacus/core";
import * as i3 from "./services/component-handler.service";
import * as i4 from "./services/cms-injector.service";
/**
 * Directive used to facilitate instantiation of CMS driven dynamic components
 */
export class ComponentWrapperDirective {
    constructor(vcr, cmsComponentsService, injector, dynamicAttributeService, renderer, componentHandler, cmsInjector, eventService) {
        this.vcr = vcr;
        this.cmsComponentsService = cmsComponentsService;
        this.injector = injector;
        this.dynamicAttributeService = dynamicAttributeService;
        this.renderer = renderer;
        this.componentHandler = componentHandler;
        this.cmsInjector = cmsInjector;
        this.eventService = eventService;
        this.cxComponentRef = new EventEmitter();
    }
    ngOnInit() {
        this.cmsComponentsService
            .determineMappings([this.cxComponentWrapper.flexType ?? ''])
            .subscribe(() => {
            if (this.cmsComponentsService.shouldRender(this.cxComponentWrapper.flexType ?? '')) {
                this.launchComponent();
            }
        });
    }
    launchComponent() {
        const componentMapping = this.cmsComponentsService.getMapping(this.cxComponentWrapper.flexType ?? '');
        if (!componentMapping) {
            return;
        }
        this.launcherResource = this.componentHandler
            .getLauncher(componentMapping, this.vcr, this.cmsInjector.getInjector(this.cxComponentWrapper.flexType ?? '', this.cxComponentWrapper.uid ?? '', this.injector), this.cmsComponentsService.getModule(this.cxComponentWrapper.flexType ?? ''))
            ?.pipe(filter(isNotUndefined), tap(({ elementRef, componentRef }) => {
            this.cmpRef = componentRef;
            this.cxComponentRef.emit(componentRef);
            this.dispatchEvent(ComponentCreateEvent, elementRef);
            this.decorate(elementRef);
            this.injector.get(ChangeDetectorRef).markForCheck();
        }), finalize(() => this.dispatchEvent(ComponentDestroyEvent)))
            .subscribe();
    }
    /**
     * Dispatch the component event.
     *
     * The event is dispatched during creation and removal of the component.
     */
    dispatchEvent(event, elementRef) {
        const payload = {
            typeCode: this.cxComponentWrapper.typeCode,
            id: this.cxComponentWrapper.uid,
        };
        if (event === ComponentCreateEvent) {
            payload.host = elementRef?.nativeElement;
        }
        this.eventService.dispatch(payload, event);
    }
    decorate(elementRef) {
        this.dynamicAttributeService.addAttributesToComponent(elementRef.nativeElement, this.renderer, this.cxComponentWrapper);
    }
    ngOnDestroy() {
        if (this.launcherResource) {
            this.launcherResource.unsubscribe();
        }
    }
}
ComponentWrapperDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ComponentWrapperDirective, deps: [{ token: i0.ViewContainerRef }, { token: i1.CmsComponentsService }, { token: i0.Injector }, { token: i2.DynamicAttributeService }, { token: i0.Renderer2 }, { token: i3.ComponentHandlerService }, { token: i4.CmsInjectorService }, { token: i2.EventService }], target: i0.ɵɵFactoryTarget.Directive });
ComponentWrapperDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.9", type: ComponentWrapperDirective, selector: "[cxComponentWrapper]", inputs: { cxComponentWrapper: "cxComponentWrapper" }, outputs: { cxComponentRef: "cxComponentRef" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ComponentWrapperDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[cxComponentWrapper]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i1.CmsComponentsService }, { type: i0.Injector }, { type: i2.DynamicAttributeService }, { type: i0.Renderer2 }, { type: i3.ComponentHandlerService }, { type: i4.CmsInjectorService }, { type: i2.EventService }]; }, propDecorators: { cxComponentWrapper: [{
                type: Input
            }], cxComponentRef: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LXdyYXBwZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9jbXMtc3RydWN0dXJlL3BhZ2UvY29tcG9uZW50L2NvbXBvbmVudC13cmFwcGVyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLGlCQUFpQixFQUVqQixTQUFTLEVBRVQsWUFBWSxFQUVaLEtBQUssRUFHTCxNQUFNLEdBSVAsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUlMLGNBQWMsR0FDZixNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXZELE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIscUJBQXFCLEdBRXRCLE1BQU0sMEJBQTBCLENBQUM7Ozs7OztBQUlsQzs7R0FFRztBQUlILE1BQU0sT0FBTyx5QkFBeUI7SUFhcEMsWUFDWSxHQUFxQixFQUNyQixvQkFBMEMsRUFDMUMsUUFBa0IsRUFDbEIsdUJBQWdELEVBQ2hELFFBQW1CLEVBQ25CLGdCQUF5QyxFQUN6QyxXQUErQixFQUMvQixZQUEwQjtRQVAxQixRQUFHLEdBQUgsR0FBRyxDQUFrQjtRQUNyQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF5QjtRQUNoRCxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBeUI7UUFDekMsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBQy9CLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBbkI1QixtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFxQixDQUFDO0lBb0I5RCxDQUFDO0lBRUosUUFB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eUJBQXlCOzJGQUF6Qix5QkFBeUI7a0JBSHJDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtpQkFDakM7aVVBRVUsa0JBQWtCO3NCQUExQixLQUFLO2dCQUNJLGNBQWM7c0JBQXZCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50UmVmLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0b3IsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjIsXG4gIFR5cGUsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ29udGVudFNsb3RDb21wb25lbnREYXRhLFxuICBEeW5hbWljQXR0cmlidXRlU2VydmljZSxcbiAgRXZlbnRTZXJ2aWNlLFxuICBpc05vdFVuZGVmaW5lZCxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBmaW5hbGl6ZSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ21zQ29tcG9uZW50c1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jbXMtY29tcG9uZW50cy5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIENvbXBvbmVudENyZWF0ZUV2ZW50LFxuICBDb21wb25lbnREZXN0cm95RXZlbnQsXG4gIENvbXBvbmVudEV2ZW50LFxufSBmcm9tICcuL2V2ZW50cy9jb21wb25lbnQuZXZlbnQnO1xuaW1wb3J0IHsgQ21zSW5qZWN0b3JTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jbXMtaW5qZWN0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBDb21wb25lbnRIYW5kbGVyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvY29tcG9uZW50LWhhbmRsZXIuc2VydmljZSc7XG5cbi8qKlxuICogRGlyZWN0aXZlIHVzZWQgdG8gZmFjaWxpdGF0ZSBpbnN0YW50aWF0aW9uIG9mIENNUyBkcml2ZW4gZHluYW1pYyBjb21wb25lbnRzXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjeENvbXBvbmVudFdyYXBwZXJdJyxcbn0pXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50V3JhcHBlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgY3hDb21wb25lbnRXcmFwcGVyOiBDb250ZW50U2xvdENvbXBvbmVudERhdGE7XG4gIEBPdXRwdXQoKSBjeENvbXBvbmVudFJlZiA9IG5ldyBFdmVudEVtaXR0ZXI8Q29tcG9uZW50UmVmPGFueT4+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgcHJvcGVydHkgaW4gdW5zYWZlLCBpLmUuXG4gICAqIC0gY21wUmVmIGNhbiBiZSBzZXQgbGF0ZXIgYmVjYXVzZSBvZiBsYXp5IGxvYWRpbmcgb3IgZGVmZXJyZWQgbG9hZGluZ1xuICAgKiAtIGNtcFJlZiBjYW4gYmUgbm90IHNldCBhdCBhbGwgaWYgZm9yIGV4YW1wbGUsIHdlYiBjb21wb25lbnRzIGFyZSB1c2VkIGFzIGNtcyBjb21wb25lbnRzXG4gICAqL1xuICBwcm90ZWN0ZWQgY21wUmVmPzogQ29tcG9uZW50UmVmPGFueT47XG5cbiAgcHJpdmF0ZSBsYXVuY2hlclJlc291cmNlPzogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCB2Y3I6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJvdGVjdGVkIGNtc0NvbXBvbmVudHNTZXJ2aWNlOiBDbXNDb21wb25lbnRzU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByb3RlY3RlZCBkeW5hbWljQXR0cmlidXRlU2VydmljZTogRHluYW1pY0F0dHJpYnV0ZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJvdGVjdGVkIGNvbXBvbmVudEhhbmRsZXI6IENvbXBvbmVudEhhbmRsZXJTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjbXNJbmplY3RvcjogQ21zSW5qZWN0b3JTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBldmVudFNlcnZpY2U6IEV2ZW50U2VydmljZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jbXNDb21wb25lbnRzU2VydmljZVxuICAgICAgLmRldGVybWluZU1hcHBpbmdzKFt0aGlzLmN4Q29tcG9uZW50V3JhcHBlci5mbGV4VHlwZSA/PyAnJ10pXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMuY21zQ29tcG9uZW50c1NlcnZpY2Uuc2hvdWxkUmVuZGVyKFxuICAgICAgICAgICAgdGhpcy5jeENvbXBvbmVudFdyYXBwZXIuZmxleFR5cGUgPz8gJydcbiAgICAgICAgICApXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMubGF1bmNoQ29tcG9uZW50KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBsYXVuY2hDb21wb25lbnQoKSB7XG4gICAgY29uc3QgY29tcG9uZW50TWFwcGluZyA9IHRoaXMuY21zQ29tcG9uZW50c1NlcnZpY2UuZ2V0TWFwcGluZyhcbiAgICAgIHRoaXMuY3hDb21wb25lbnRXcmFwcGVyLmZsZXhUeXBlID8/ICcnXG4gICAgKTtcblxuICAgIGlmICghY29tcG9uZW50TWFwcGluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubGF1bmNoZXJSZXNvdXJjZSA9IHRoaXMuY29tcG9uZW50SGFuZGxlclxuICAgICAgLmdldExhdW5jaGVyKFxuICAgICAgICBjb21wb25lbnRNYXBwaW5nLFxuICAgICAgICB0aGlzLnZjcixcbiAgICAgICAgdGhpcy5jbXNJbmplY3Rvci5nZXRJbmplY3RvcihcbiAgICAgICAgICB0aGlzLmN4Q29tcG9uZW50V3JhcHBlci5mbGV4VHlwZSA/PyAnJyxcbiAgICAgICAgICB0aGlzLmN4Q29tcG9uZW50V3JhcHBlci51aWQgPz8gJycsXG4gICAgICAgICAgdGhpcy5pbmplY3RvclxuICAgICAgICApLFxuICAgICAgICB0aGlzLmNtc0NvbXBvbmVudHNTZXJ2aWNlLmdldE1vZHVsZShcbiAgICAgICAgICB0aGlzLmN4Q29tcG9uZW50V3JhcHBlci5mbGV4VHlwZSA/PyAnJ1xuICAgICAgICApXG4gICAgICApXG4gICAgICA/LnBpcGUoXG4gICAgICAgIGZpbHRlcihpc05vdFVuZGVmaW5lZCksXG4gICAgICAgIHRhcCgoeyBlbGVtZW50UmVmLCBjb21wb25lbnRSZWYgfSkgPT4ge1xuICAgICAgICAgIHRoaXMuY21wUmVmID0gY29tcG9uZW50UmVmO1xuXG4gICAgICAgICAgdGhpcy5jeENvbXBvbmVudFJlZi5lbWl0KGNvbXBvbmVudFJlZik7XG5cbiAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoQ29tcG9uZW50Q3JlYXRlRXZlbnQsIGVsZW1lbnRSZWYpO1xuICAgICAgICAgIHRoaXMuZGVjb3JhdGUoZWxlbWVudFJlZik7XG4gICAgICAgICAgdGhpcy5pbmplY3Rvci5nZXQoQ2hhbmdlRGV0ZWN0b3JSZWYpLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9KSxcbiAgICAgICAgZmluYWxpemUoKCkgPT4gdGhpcy5kaXNwYXRjaEV2ZW50KENvbXBvbmVudERlc3Ryb3lFdmVudCkpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKipcbiAgICogRGlzcGF0Y2ggdGhlIGNvbXBvbmVudCBldmVudC5cbiAgICpcbiAgICogVGhlIGV2ZW50IGlzIGRpc3BhdGNoZWQgZHVyaW5nIGNyZWF0aW9uIGFuZCByZW1vdmFsIG9mIHRoZSBjb21wb25lbnQuXG4gICAqL1xuICBwcm90ZWN0ZWQgZGlzcGF0Y2hFdmVudChcbiAgICBldmVudDogVHlwZTxDb21wb25lbnRFdmVudD4sXG4gICAgZWxlbWVudFJlZj86IEVsZW1lbnRSZWZcbiAgKSB7XG4gICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgIHR5cGVDb2RlOiB0aGlzLmN4Q29tcG9uZW50V3JhcHBlci50eXBlQ29kZSxcbiAgICAgIGlkOiB0aGlzLmN4Q29tcG9uZW50V3JhcHBlci51aWQsXG4gICAgfSBhcyBDb21wb25lbnRFdmVudDtcbiAgICBpZiAoZXZlbnQgPT09IENvbXBvbmVudENyZWF0ZUV2ZW50KSB7XG4gICAgICAocGF5bG9hZCBhcyBDb21wb25lbnRDcmVhdGVFdmVudCkuaG9zdCA9IGVsZW1lbnRSZWY/Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmRpc3BhdGNoKHBheWxvYWQsIGV2ZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgZGVjb3JhdGUoZWxlbWVudFJlZjogRWxlbWVudFJlZik6IHZvaWQge1xuICAgIHRoaXMuZHluYW1pY0F0dHJpYnV0ZVNlcnZpY2UuYWRkQXR0cmlidXRlc1RvQ29tcG9uZW50KFxuICAgICAgZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LFxuICAgICAgdGhpcy5yZW5kZXJlcixcbiAgICAgIHRoaXMuY3hDb21wb25lbnRXcmFwcGVyXG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLmxhdW5jaGVyUmVzb3VyY2UpIHtcbiAgICAgIHRoaXMubGF1bmNoZXJSZXNvdXJjZS51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxufVxuIl19