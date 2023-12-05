/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Directive, } from '@angular/core';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { ComponentWrapperDirective } from './component-wrapper.directive';
import * as i0 from "@angular/core";
import * as i1 from "../model/cms-component-data";
import * as i2 from "../../services/cms-components.service";
import * as i3 from "@spartacus/core";
import * as i4 from "./services/component-handler.service";
import * as i5 from "./services/cms-injector.service";
export class InnerComponentsHostDirective {
    constructor(data, vcr, 
    // dependencies required for ComponentWrapper directive
    cmsComponentsService, injector, dynamicAttributeService, renderer, componentHandler, cmsInjector, eventService) {
        this.data = data;
        this.vcr = vcr;
        this.cmsComponentsService = cmsComponentsService;
        this.injector = injector;
        this.dynamicAttributeService = dynamicAttributeService;
        this.renderer = renderer;
        this.componentHandler = componentHandler;
        this.cmsInjector = cmsInjector;
        this.eventService = eventService;
        this.innerComponents$ = this.data.data$.pipe(map((data) => data?.composition?.inner ?? []), distinctUntilChanged());
        this.componentWrappers = [];
    }
    ngOnInit() {
        this.subscription = this.innerComponents$.subscribe((x) => {
            this.renderComponents(x);
        });
    }
    renderComponents(components) {
        this.clearComponents();
        components.forEach((component) => this.renderComponent(component));
    }
    renderComponent(component) {
        const componentWrapper = new ComponentWrapperDirective(this.vcr, this.cmsComponentsService, this.injector, this.dynamicAttributeService, this.renderer, this.componentHandler, this.cmsInjector, this.eventService);
        componentWrapper.cxComponentWrapper = { flexType: component, uid: '' };
        componentWrapper.ngOnInit();
        this.componentWrappers.push(componentWrapper);
    }
    clearComponents() {
        this.componentWrappers.forEach((wrapper) => wrapper.ngOnDestroy());
        this.componentWrappers = [];
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
        this.clearComponents();
    }
}
InnerComponentsHostDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: InnerComponentsHostDirective, deps: [{ token: i1.CmsComponentData }, { token: i0.ViewContainerRef }, { token: i2.CmsComponentsService }, { token: i0.Injector }, { token: i3.DynamicAttributeService }, { token: i0.Renderer2 }, { token: i4.ComponentHandlerService }, { token: i5.CmsInjectorService }, { token: i3.EventService }], target: i0.ɵɵFactoryTarget.Directive });
InnerComponentsHostDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.9", type: InnerComponentsHostDirective, selector: "[cxInnerComponentsHost]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: InnerComponentsHostDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[cxInnerComponentsHost]',
                }]
        }], ctorParameters: function () { return [{ type: i1.CmsComponentData }, { type: i0.ViewContainerRef }, { type: i2.CmsComponentsService }, { type: i0.Injector }, { type: i3.DynamicAttributeService }, { type: i0.Renderer2 }, { type: i4.ComponentHandlerService }, { type: i5.CmsInjectorService }, { type: i3.EventService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5uZXItY29tcG9uZW50cy1ob3N0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLXN0cnVjdHVyZS9wYWdlL2NvbXBvbmVudC9pbm5lci1jb21wb25lbnRzLWhvc3QuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsU0FBUyxHQU1WLE1BQU0sZUFBZSxDQUFDO0FBT3ZCLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUczRCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQzs7Ozs7OztBQU8xRSxNQUFNLE9BQU8sNEJBQTRCO0lBU3ZDLFlBQ1ksSUFBb0MsRUFDcEMsR0FBcUI7SUFDL0IsdURBQXVEO0lBQzdDLG9CQUEwQyxFQUMxQyxRQUFrQixFQUNsQix1QkFBZ0QsRUFDaEQsUUFBbUIsRUFDbkIsZ0JBQXlDLEVBQ3pDLFdBQStCLEVBQy9CLFlBQTBCO1FBVDFCLFNBQUksR0FBSixJQUFJLENBQWdDO1FBQ3BDLFFBQUcsR0FBSCxHQUFHLENBQWtCO1FBRXJCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQiw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXlCO1FBQ2hELGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUF5QjtRQUN6QyxnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFDL0IsaUJBQVksR0FBWixZQUFZLENBQWM7UUFsQjVCLHFCQUFnQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDL0MsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssSUFBSSxFQUFFLENBQUMsRUFDN0Msb0JBQW9CLEVBQUUsQ0FDdkIsQ0FBQztRQUVRLHNCQUFpQixHQUFVLEVBQUUsQ0FBQztJQWNyQyxDQUFDO0lBRUosUUFBUTtRQUNOLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3hELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFUyxnQkFBZ0IsQ0FBQyxVQUFvQjtRQUM3QyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFUyxlQUFlLENBQUMsU0FBaUI7UUFDekMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLHlCQUF5QixDQUNwRCxJQUFJLENBQUMsR0FBRyxFQUNSLElBQUksQ0FBQyxvQkFBb0IsRUFDekIsSUFBSSxDQUFDLFFBQVEsRUFDYixJQUFJLENBQUMsdUJBQXVCLEVBQzVCLElBQUksQ0FBQyxRQUFRLEVBQ2IsSUFBSSxDQUFDLGdCQUFnQixFQUNyQixJQUFJLENBQUMsV0FBVyxFQUNoQixJQUFJLENBQUMsWUFBWSxDQUNsQixDQUFDO1FBQ0YsZ0JBQWdCLENBQUMsa0JBQWtCLEdBQUcsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUN2RSxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVTLGVBQWU7UUFDdkIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3pCLENBQUM7O3lIQXpEVSw0QkFBNEI7NkdBQTVCLDRCQUE0QjsyRkFBNUIsNEJBQTRCO2tCQUh4QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx5QkFBeUI7aUJBQ3BDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBJbmplY3RvcixcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFJlbmRlcmVyMixcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDbXNDb21wb25lbnQsXG4gIER5bmFtaWNBdHRyaWJ1dGVTZXJ2aWNlLFxuICBFdmVudFNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDbXNDb21wb25lbnRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2Ntcy1jb21wb25lbnRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ21zQ29tcG9uZW50RGF0YSB9IGZyb20gJy4uL21vZGVsL2Ntcy1jb21wb25lbnQtZGF0YSc7XG5pbXBvcnQgeyBDb21wb25lbnRXcmFwcGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9jb21wb25lbnQtd3JhcHBlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ21zSW5qZWN0b3JTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jbXMtaW5qZWN0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBDb21wb25lbnRIYW5kbGVyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvY29tcG9uZW50LWhhbmRsZXIuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjeElubmVyQ29tcG9uZW50c0hvc3RdJyxcbn0pXG5leHBvcnQgY2xhc3MgSW5uZXJDb21wb25lbnRzSG9zdERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHJvdGVjdGVkIGlubmVyQ29tcG9uZW50cyQgPSB0aGlzLmRhdGEuZGF0YSQucGlwZShcbiAgICBtYXAoKGRhdGEpID0+IGRhdGE/LmNvbXBvc2l0aW9uPy5pbm5lciA/PyBbXSksXG4gICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICApO1xuXG4gIHByb3RlY3RlZCBjb21wb25lbnRXcmFwcGVyczogYW55W10gPSBbXTtcbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbj86IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgZGF0YTogQ21zQ29tcG9uZW50RGF0YTxDbXNDb21wb25lbnQ+LFxuICAgIHByb3RlY3RlZCB2Y3I6IFZpZXdDb250YWluZXJSZWYsXG4gICAgLy8gZGVwZW5kZW5jaWVzIHJlcXVpcmVkIGZvciBDb21wb25lbnRXcmFwcGVyIGRpcmVjdGl2ZVxuICAgIHByb3RlY3RlZCBjbXNDb21wb25lbnRzU2VydmljZTogQ21zQ29tcG9uZW50c1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwcm90ZWN0ZWQgZHluYW1pY0F0dHJpYnV0ZVNlcnZpY2U6IER5bmFtaWNBdHRyaWJ1dGVTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByb3RlY3RlZCBjb21wb25lbnRIYW5kbGVyOiBDb21wb25lbnRIYW5kbGVyU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY21zSW5qZWN0b3I6IENtc0luamVjdG9yU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZXZlbnRTZXJ2aWNlOiBFdmVudFNlcnZpY2VcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5pbm5lckNvbXBvbmVudHMkLnN1YnNjcmliZSgoeCkgPT4ge1xuICAgICAgdGhpcy5yZW5kZXJDb21wb25lbnRzKHgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlbmRlckNvbXBvbmVudHMoY29tcG9uZW50czogc3RyaW5nW10pIHtcbiAgICB0aGlzLmNsZWFyQ29tcG9uZW50cygpO1xuICAgIGNvbXBvbmVudHMuZm9yRWFjaCgoY29tcG9uZW50KSA9PiB0aGlzLnJlbmRlckNvbXBvbmVudChjb21wb25lbnQpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCByZW5kZXJDb21wb25lbnQoY29tcG9uZW50OiBzdHJpbmcpIHtcbiAgICBjb25zdCBjb21wb25lbnRXcmFwcGVyID0gbmV3IENvbXBvbmVudFdyYXBwZXJEaXJlY3RpdmUoXG4gICAgICB0aGlzLnZjcixcbiAgICAgIHRoaXMuY21zQ29tcG9uZW50c1NlcnZpY2UsXG4gICAgICB0aGlzLmluamVjdG9yLFxuICAgICAgdGhpcy5keW5hbWljQXR0cmlidXRlU2VydmljZSxcbiAgICAgIHRoaXMucmVuZGVyZXIsXG4gICAgICB0aGlzLmNvbXBvbmVudEhhbmRsZXIsXG4gICAgICB0aGlzLmNtc0luamVjdG9yLFxuICAgICAgdGhpcy5ldmVudFNlcnZpY2VcbiAgICApO1xuICAgIGNvbXBvbmVudFdyYXBwZXIuY3hDb21wb25lbnRXcmFwcGVyID0geyBmbGV4VHlwZTogY29tcG9uZW50LCB1aWQ6ICcnIH07XG4gICAgY29tcG9uZW50V3JhcHBlci5uZ09uSW5pdCgpO1xuICAgIHRoaXMuY29tcG9uZW50V3JhcHBlcnMucHVzaChjb21wb25lbnRXcmFwcGVyKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjbGVhckNvbXBvbmVudHMoKSB7XG4gICAgdGhpcy5jb21wb25lbnRXcmFwcGVycy5mb3JFYWNoKCh3cmFwcGVyKSA9PiB3cmFwcGVyLm5nT25EZXN0cm95KCkpO1xuICAgIHRoaXMuY29tcG9uZW50V3JhcHBlcnMgPSBbXTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uPy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuY2xlYXJDb21wb25lbnRzKCk7XG4gIH1cbn1cbiJdfQ==