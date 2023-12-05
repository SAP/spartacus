/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ComponentFactory, Directive, EventEmitter, Injector, Input, Output, TemplateRef, } from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';
import { OutletContextData, OutletPosition, USE_STACKED_OUTLETS, } from './outlet.model';
import * as i0 from "@angular/core";
import * as i1 from "./outlet.service";
import * as i2 from "../../layout/loading/defer-loader.service";
import * as i3 from "./outlet-renderer.service";
export class OutletDirective {
    constructor(vcr, templateRef, outletService, deferLoaderService, outletRendererService) {
        this.vcr = vcr;
        this.templateRef = templateRef;
        this.outletService = outletService;
        this.deferLoaderService = deferLoaderService;
        this.outletRendererService = outletRendererService;
        this.renderedTemplate = [];
        this.renderedComponents = new Map();
        /**
         * Observable with current outlet context
         */
        this.outletContext$ = new ReplaySubject(1);
        this.loaded = new EventEmitter(true);
        this.cxComponentRefChange = new EventEmitter();
        this.subscription = new Subscription();
    }
    /**
     * Renders view for outlet or defers it, depending on the input `cxOutletDefer`
     */
    render() {
        this.vcr.clear();
        this.renderedTemplate = [];
        this.renderedComponents.clear();
        this.subscription.unsubscribe();
        this.subscription = new Subscription();
        if (this.cxOutletDefer) {
            this.deferLoading();
        }
        else {
            this.build();
        }
    }
    ngOnChanges(changes) {
        if (changes.cxOutlet) {
            this.render();
            this.outletRendererService.register(this.cxOutlet, this);
        }
        if (changes.cxOutletContext) {
            this.outletContext$.next(this.cxOutletContext);
        }
    }
    deferLoading() {
        this.loaded.emit(false);
        const hostElement = this.getHostElement(this.vcr.element.nativeElement);
        // Although the deferLoaderService might emit only once, as long as the hostElement
        // isn't being loaded, there's no value being emitted. Therefore we need to clean up
        // the subscription on destroy.
        this.subscription.add(this.deferLoaderService
            .load(hostElement, this.cxOutletDefer)
            .subscribe(() => {
            this.build();
            this.loaded.emit(true);
        }));
    }
    /**
     * Renders view for outlet
     */
    build() {
        this.buildOutlet(OutletPosition.BEFORE);
        this.buildOutlet(OutletPosition.REPLACE);
        this.buildOutlet(OutletPosition.AFTER);
    }
    /**
     * Renders view in a given position for outlet
     */
    buildOutlet(position) {
        let templates = (this.outletService.get(this.cxOutlet, position, USE_STACKED_OUTLETS));
        templates = templates?.filter((el) => !this.renderedTemplate.includes(el));
        if (!templates && position === OutletPosition.REPLACE) {
            templates = [this.templateRef];
        }
        // Just in case someone extended the `OutletService` and
        // returns a singular object.
        if (!Array.isArray(templates)) {
            templates = [templates];
        }
        const components = [];
        templates.forEach((obj) => {
            const component = this.create(obj, position);
            if (component) {
                components.push(component);
            }
        });
        this.renderedComponents.set(position, components);
    }
    /**
     * Renders view based on the given template or component factory
     */
    create(tmplOrFactory, position) {
        this.renderedTemplate.push(tmplOrFactory);
        if (tmplOrFactory instanceof ComponentFactory) {
            const component = this.vcr.createComponent(tmplOrFactory, undefined, this.getComponentInjector(position));
            this.cxComponentRefChange.emit(component);
            return component;
        }
        else if (tmplOrFactory instanceof TemplateRef) {
            const view = this.vcr.createEmbeddedView(tmplOrFactory, {
                $implicit: this.cxOutletContext,
            });
            // we do not know if content is created dynamically or not
            // so we apply change detection anyway
            view.markForCheck();
            this.cxComponentRefChange.emit(view);
            return view;
        }
    }
    /**
     * Returns injector with OutletContextData that can be injected to the component
     * rendered in the outlet
     */
    getComponentInjector(position) {
        const contextData = {
            reference: this.cxOutlet,
            position,
            context: this.cxOutletContext,
            context$: this.outletContext$.asObservable(),
        };
        return Injector.create({
            providers: [
                {
                    provide: OutletContextData,
                    useValue: contextData,
                },
            ],
            parent: this.vcr.injector,
        });
    }
    /**
     * Returns the closest `HtmlElement`, by iterating over the
     * parent nodes of the given element.
     *
     * We avoid traversing the parent _elements_, as this is blocking
     * ie11 implementations. One of the spare exclusions we make to not
     * supporting ie11.
     *
     * @param element
     */
    getHostElement(element) {
        if (element instanceof HTMLElement) {
            return element;
        }
        return this.getHostElement(element.parentNode);
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.outletContext$.complete();
    }
}
OutletDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OutletDirective, deps: [{ token: i0.ViewContainerRef }, { token: i0.TemplateRef }, { token: i1.OutletService }, { token: i2.DeferLoaderService }, { token: i3.OutletRendererService }], target: i0.ɵɵFactoryTarget.Directive });
OutletDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.9", type: OutletDirective, selector: "[cxOutlet]", inputs: { cxOutlet: "cxOutlet", cxOutletContext: "cxOutletContext", cxOutletDefer: "cxOutletDefer", cxComponentRef: "cxComponentRef" }, outputs: { loaded: "loaded", cxComponentRefChange: "cxComponentRefChange" }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OutletDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[cxOutlet]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i0.TemplateRef }, { type: i1.OutletService }, { type: i2.DeferLoaderService }, { type: i3.OutletRendererService }]; }, propDecorators: { cxOutlet: [{
                type: Input
            }], cxOutletContext: [{
                type: Input
            }], cxOutletDefer: [{
                type: Input
            }], loaded: [{
                type: Output
            }], cxComponentRef: [{
                type: Input
            }], cxComponentRefChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0bGV0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLXN0cnVjdHVyZS9vdXRsZXQvb3V0bGV0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLGdCQUFnQixFQUVoQixTQUFTLEVBRVQsWUFBWSxFQUNaLFFBQVEsRUFDUixLQUFLLEVBR0wsTUFBTSxFQUVOLFdBQVcsR0FFWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUluRCxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLGNBQWMsRUFDZCxtQkFBbUIsR0FDcEIsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFNeEIsTUFBTSxPQUFPLGVBQWU7SUFpQzFCLFlBQ1UsR0FBcUIsRUFDckIsV0FBNkIsRUFDN0IsYUFBNEIsRUFDNUIsa0JBQXNDLEVBQ3RDLHFCQUE0QztRQUo1QyxRQUFHLEdBQUgsR0FBRyxDQUFrQjtRQUNyQixnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7UUFDN0Isa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QywwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBckM5QyxxQkFBZ0IsR0FBVSxFQUFFLENBQUM7UUFDOUIsdUJBQWtCLEdBQUcsSUFBSSxHQUFHLEVBR2hDLENBQUM7UUFTSjs7V0FFRztRQUNjLG1CQUFjLEdBQUcsSUFBSSxhQUFhLENBQUksQ0FBQyxDQUFDLENBQUM7UUFPaEQsV0FBTSxHQUEwQixJQUFJLFlBQVksQ0FBVSxJQUFJLENBQUMsQ0FBQztRQUdoRSx5QkFBb0IsR0FBRyxJQUFJLFlBQVksRUFFOUMsQ0FBQztRQUVKLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQVEv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QVMsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN4QixRQUFRO1lBQ1IsT0FBTyxFQUFFLElBQUksQ0FBQyxlQUFlO1lBQzdCLFFBQVEsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRTtTQUM3QyxDQUFDO1FBRUYsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQ3JCLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsaUJBQWlCO29CQUMxQixRQUFRLEVBQUUsV0FBVztpQkFDdEI7YUFDRjtZQUNELE1BQU0sRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVE7U0FDMUIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNLLGNBQWMsQ0FBQyxPQUFhO1FBQ2xDLElBQUksT0FBTyxZQUFZLFdBQVcsRUFBRTtZQUNsQyxPQUFPLE9BQU8sQ0FBQztTQUNoQjtRQUNELE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBYyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDakMsQ0FBQzs7NEdBek1VLGVBQWU7Z0dBQWYsZUFBZTsyRkFBZixlQUFlO2tCQUgzQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxZQUFZO2lCQUN2QjtrT0FRVSxRQUFRO3NCQUFoQixLQUFLO2dCQUtHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBVUcsYUFBYTtzQkFBckIsS0FBSztnQkFFSSxNQUFNO3NCQUFmLE1BQU07Z0JBRUUsY0FBYztzQkFBdEIsS0FBSztnQkFDSSxvQkFBb0I7c0JBQTdCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBDb21wb25lbnRGYWN0b3J5LFxuICBDb21wb25lbnRSZWYsXG4gIERpcmVjdGl2ZSxcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdG9yLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVwbGF5U3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEZWZlckxvYWRlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9sYXlvdXQvbG9hZGluZy9kZWZlci1sb2FkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBJbnRlcnNlY3Rpb25PcHRpb25zIH0gZnJvbSAnLi4vLi4vbGF5b3V0L2xvYWRpbmcvaW50ZXJzZWN0aW9uLm1vZGVsJztcbmltcG9ydCB7IE91dGxldFJlbmRlcmVyU2VydmljZSB9IGZyb20gJy4vb3V0bGV0LXJlbmRlcmVyLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgT3V0bGV0Q29udGV4dERhdGEsXG4gIE91dGxldFBvc2l0aW9uLFxuICBVU0VfU1RBQ0tFRF9PVVRMRVRTLFxufSBmcm9tICcuL291dGxldC5tb2RlbCc7XG5pbXBvcnQgeyBPdXRsZXRTZXJ2aWNlIH0gZnJvbSAnLi9vdXRsZXQuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjeE91dGxldF0nLFxufSlcbmV4cG9ydCBjbGFzcyBPdXRsZXREaXJlY3RpdmU8VCA9IGFueT4gaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XG4gIHByaXZhdGUgcmVuZGVyZWRUZW1wbGF0ZTogYW55W10gPSBbXTtcbiAgcHVibGljIHJlbmRlcmVkQ29tcG9uZW50cyA9IG5ldyBNYXA8XG4gICAgT3V0bGV0UG9zaXRpb24sXG4gICAgQXJyYXk8Q29tcG9uZW50UmVmPGFueT4gfCBFbWJlZGRlZFZpZXdSZWY8YW55Pj5cbiAgPigpO1xuXG4gIEBJbnB1dCgpIGN4T3V0bGV0OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIENvbnRleHQgZGF0YSB0byBiZSBwcm92aWRlZCB0byBjaGlsZCB2aWV3IG9mIHRoZSBvdXRsZXRcbiAgICovXG4gIEBJbnB1dCgpIGN4T3V0bGV0Q29udGV4dDogVDtcblxuICAvKipcbiAgICogT2JzZXJ2YWJsZSB3aXRoIGN1cnJlbnQgb3V0bGV0IGNvbnRleHRcbiAgICovXG4gIHByaXZhdGUgcmVhZG9ubHkgb3V0bGV0Q29udGV4dCQgPSBuZXcgUmVwbGF5U3ViamVjdDxUPigxKTtcblxuICAvKipcbiAgICogRGVmZXJzIGxvYWRpbmcgb3B0aW9ucyBmb3IgdGhlIHRoZSB0ZW1wbGF0ZXMgb2YgdGhpcyBvdXRsZXQuXG4gICAqL1xuICBASW5wdXQoKSBjeE91dGxldERlZmVyOiBJbnRlcnNlY3Rpb25PcHRpb25zO1xuXG4gIEBPdXRwdXQoKSBsb2FkZWQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4odHJ1ZSk7XG5cbiAgQElucHV0KCkgY3hDb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxhbnk+IHwgRW1iZWRkZWRWaWV3UmVmPGFueT47XG4gIEBPdXRwdXQoKSBjeENvbXBvbmVudFJlZkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgQ29tcG9uZW50UmVmPGFueT4gfCBFbWJlZGRlZFZpZXdSZWY8YW55PlxuICA+KCk7XG5cbiAgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgdmNyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4sXG4gICAgcHJpdmF0ZSBvdXRsZXRTZXJ2aWNlOiBPdXRsZXRTZXJ2aWNlLFxuICAgIHByaXZhdGUgZGVmZXJMb2FkZXJTZXJ2aWNlOiBEZWZlckxvYWRlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBvdXRsZXRSZW5kZXJlclNlcnZpY2U6IE91dGxldFJlbmRlcmVyU2VydmljZVxuICApIHt9XG5cbiAgLyoqXG4gICAqIFJlbmRlcnMgdmlldyBmb3Igb3V0bGV0IG9yIGRlZmVycyBpdCwgZGVwZW5kaW5nIG9uIHRoZSBpbnB1dCBgY3hPdXRsZXREZWZlcmBcbiAgICovXG4gIHB1YmxpYyByZW5kZXIoKTogdm9pZCB7XG4gICAgdGhpcy52Y3IuY2xlYXIoKTtcbiAgICB0aGlzLnJlbmRlcmVkVGVtcGxhdGUgPSBbXTtcbiAgICB0aGlzLnJlbmRlcmVkQ29tcG9uZW50cy5jbGVhcigpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgICBpZiAodGhpcy5jeE91dGxldERlZmVyKSB7XG4gICAgICB0aGlzLmRlZmVyTG9hZGluZygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJ1aWxkKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzLmN4T3V0bGV0KSB7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgdGhpcy5vdXRsZXRSZW5kZXJlclNlcnZpY2UucmVnaXN0ZXIodGhpcy5jeE91dGxldCwgdGhpcyk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLmN4T3V0bGV0Q29udGV4dCkge1xuICAgICAgdGhpcy5vdXRsZXRDb250ZXh0JC5uZXh0KHRoaXMuY3hPdXRsZXRDb250ZXh0KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRlZmVyTG9hZGluZygpOiB2b2lkIHtcbiAgICB0aGlzLmxvYWRlZC5lbWl0KGZhbHNlKTtcbiAgICBjb25zdCBob3N0RWxlbWVudCA9IHRoaXMuZ2V0SG9zdEVsZW1lbnQodGhpcy52Y3IuZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcbiAgICAvLyBBbHRob3VnaCB0aGUgZGVmZXJMb2FkZXJTZXJ2aWNlIG1pZ2h0IGVtaXQgb25seSBvbmNlLCBhcyBsb25nIGFzIHRoZSBob3N0RWxlbWVudFxuICAgIC8vIGlzbid0IGJlaW5nIGxvYWRlZCwgdGhlcmUncyBubyB2YWx1ZSBiZWluZyBlbWl0dGVkLiBUaGVyZWZvcmUgd2UgbmVlZCB0byBjbGVhbiB1cFxuICAgIC8vIHRoZSBzdWJzY3JpcHRpb24gb24gZGVzdHJveS5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQoXG4gICAgICB0aGlzLmRlZmVyTG9hZGVyU2VydmljZVxuICAgICAgICAubG9hZChob3N0RWxlbWVudCwgdGhpcy5jeE91dGxldERlZmVyKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmJ1aWxkKCk7XG4gICAgICAgICAgdGhpcy5sb2FkZWQuZW1pdCh0cnVlKTtcbiAgICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbmRlcnMgdmlldyBmb3Igb3V0bGV0XG4gICAqL1xuICBwcml2YXRlIGJ1aWxkKCkge1xuICAgIHRoaXMuYnVpbGRPdXRsZXQoT3V0bGV0UG9zaXRpb24uQkVGT1JFKTtcbiAgICB0aGlzLmJ1aWxkT3V0bGV0KE91dGxldFBvc2l0aW9uLlJFUExBQ0UpO1xuICAgIHRoaXMuYnVpbGRPdXRsZXQoT3V0bGV0UG9zaXRpb24uQUZURVIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbmRlcnMgdmlldyBpbiBhIGdpdmVuIHBvc2l0aW9uIGZvciBvdXRsZXRcbiAgICovXG4gIHByaXZhdGUgYnVpbGRPdXRsZXQocG9zaXRpb246IE91dGxldFBvc2l0aW9uKTogdm9pZCB7XG4gICAgbGV0IHRlbXBsYXRlczogYW55W10gPSA8YW55W10+KFxuICAgICAgdGhpcy5vdXRsZXRTZXJ2aWNlLmdldCh0aGlzLmN4T3V0bGV0LCBwb3NpdGlvbiwgVVNFX1NUQUNLRURfT1VUTEVUUylcbiAgICApO1xuXG4gICAgdGVtcGxhdGVzID0gdGVtcGxhdGVzPy5maWx0ZXIoKGVsKSA9PiAhdGhpcy5yZW5kZXJlZFRlbXBsYXRlLmluY2x1ZGVzKGVsKSk7XG5cbiAgICBpZiAoIXRlbXBsYXRlcyAmJiBwb3NpdGlvbiA9PT0gT3V0bGV0UG9zaXRpb24uUkVQTEFDRSkge1xuICAgICAgdGVtcGxhdGVzID0gW3RoaXMudGVtcGxhdGVSZWZdO1xuICAgIH1cblxuICAgIC8vIEp1c3QgaW4gY2FzZSBzb21lb25lIGV4dGVuZGVkIHRoZSBgT3V0bGV0U2VydmljZWAgYW5kXG4gICAgLy8gcmV0dXJucyBhIHNpbmd1bGFyIG9iamVjdC5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodGVtcGxhdGVzKSkge1xuICAgICAgdGVtcGxhdGVzID0gW3RlbXBsYXRlc107XG4gICAgfVxuXG4gICAgY29uc3QgY29tcG9uZW50czogKENvbXBvbmVudFJlZjxhbnk+IHwgRW1iZWRkZWRWaWV3UmVmPGFueT4pW10gPSBbXTtcbiAgICB0ZW1wbGF0ZXMuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICBjb25zdCBjb21wb25lbnQgPSB0aGlzLmNyZWF0ZShvYmosIHBvc2l0aW9uKTtcbiAgICAgIGlmIChjb21wb25lbnQpIHtcbiAgICAgICAgY29tcG9uZW50cy5wdXNoKGNvbXBvbmVudCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLnJlbmRlcmVkQ29tcG9uZW50cy5zZXQocG9zaXRpb24sIGNvbXBvbmVudHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbmRlcnMgdmlldyBiYXNlZCBvbiB0aGUgZ2l2ZW4gdGVtcGxhdGUgb3IgY29tcG9uZW50IGZhY3RvcnlcbiAgICovXG4gIHByaXZhdGUgY3JlYXRlKFxuICAgIHRtcGxPckZhY3Rvcnk6IGFueSxcbiAgICBwb3NpdGlvbjogT3V0bGV0UG9zaXRpb25cbiAgKTogQ29tcG9uZW50UmVmPGFueT4gfCBFbWJlZGRlZFZpZXdSZWY8YW55PiB8IHVuZGVmaW5lZCB7XG4gICAgdGhpcy5yZW5kZXJlZFRlbXBsYXRlLnB1c2godG1wbE9yRmFjdG9yeSk7XG5cbiAgICBpZiAodG1wbE9yRmFjdG9yeSBpbnN0YW5jZW9mIENvbXBvbmVudEZhY3RvcnkpIHtcbiAgICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMudmNyLmNyZWF0ZUNvbXBvbmVudChcbiAgICAgICAgdG1wbE9yRmFjdG9yeSxcbiAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICB0aGlzLmdldENvbXBvbmVudEluamVjdG9yKHBvc2l0aW9uKVxuICAgICAgKTtcbiAgICAgIHRoaXMuY3hDb21wb25lbnRSZWZDaGFuZ2UuZW1pdChjb21wb25lbnQpO1xuICAgICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgICB9IGVsc2UgaWYgKHRtcGxPckZhY3RvcnkgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZikge1xuICAgICAgY29uc3QgdmlldyA9IHRoaXMudmNyLmNyZWF0ZUVtYmVkZGVkVmlldyhcbiAgICAgICAgPFRlbXBsYXRlUmVmPGFueT4+dG1wbE9yRmFjdG9yeSxcbiAgICAgICAge1xuICAgICAgICAgICRpbXBsaWNpdDogdGhpcy5jeE91dGxldENvbnRleHQsXG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICAgIC8vIHdlIGRvIG5vdCBrbm93IGlmIGNvbnRlbnQgaXMgY3JlYXRlZCBkeW5hbWljYWxseSBvciBub3RcbiAgICAgIC8vIHNvIHdlIGFwcGx5IGNoYW5nZSBkZXRlY3Rpb24gYW55d2F5XG4gICAgICB2aWV3Lm1hcmtGb3JDaGVjaygpO1xuXG4gICAgICB0aGlzLmN4Q29tcG9uZW50UmVmQ2hhbmdlLmVtaXQodmlldyk7XG4gICAgICByZXR1cm4gdmlldztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBpbmplY3RvciB3aXRoIE91dGxldENvbnRleHREYXRhIHRoYXQgY2FuIGJlIGluamVjdGVkIHRvIHRoZSBjb21wb25lbnRcbiAgICogcmVuZGVyZWQgaW4gdGhlIG91dGxldFxuICAgKi9cbiAgcHJpdmF0ZSBnZXRDb21wb25lbnRJbmplY3Rvcihwb3NpdGlvbjogT3V0bGV0UG9zaXRpb24pOiBJbmplY3RvciB7XG4gICAgY29uc3QgY29udGV4dERhdGE6IE91dGxldENvbnRleHREYXRhPFQ+ID0ge1xuICAgICAgcmVmZXJlbmNlOiB0aGlzLmN4T3V0bGV0LFxuICAgICAgcG9zaXRpb24sXG4gICAgICBjb250ZXh0OiB0aGlzLmN4T3V0bGV0Q29udGV4dCxcbiAgICAgIGNvbnRleHQkOiB0aGlzLm91dGxldENvbnRleHQkLmFzT2JzZXJ2YWJsZSgpLFxuICAgIH07XG5cbiAgICByZXR1cm4gSW5qZWN0b3IuY3JlYXRlKHtcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogT3V0bGV0Q29udGV4dERhdGEsXG4gICAgICAgICAgdXNlVmFsdWU6IGNvbnRleHREYXRhLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIHBhcmVudDogdGhpcy52Y3IuaW5qZWN0b3IsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY2xvc2VzdCBgSHRtbEVsZW1lbnRgLCBieSBpdGVyYXRpbmcgb3ZlciB0aGVcbiAgICogcGFyZW50IG5vZGVzIG9mIHRoZSBnaXZlbiBlbGVtZW50LlxuICAgKlxuICAgKiBXZSBhdm9pZCB0cmF2ZXJzaW5nIHRoZSBwYXJlbnQgX2VsZW1lbnRzXywgYXMgdGhpcyBpcyBibG9ja2luZ1xuICAgKiBpZTExIGltcGxlbWVudGF0aW9ucy4gT25lIG9mIHRoZSBzcGFyZSBleGNsdXNpb25zIHdlIG1ha2UgdG8gbm90XG4gICAqIHN1cHBvcnRpbmcgaWUxMS5cbiAgICpcbiAgICogQHBhcmFtIGVsZW1lbnRcbiAgICovXG4gIHByaXZhdGUgZ2V0SG9zdEVsZW1lbnQoZWxlbWVudDogTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZ2V0SG9zdEVsZW1lbnQoPEhUTUxFbGVtZW50PmVsZW1lbnQucGFyZW50Tm9kZSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMub3V0bGV0Q29udGV4dCQuY29tcGxldGUoKTtcbiAgfVxufVxuIl19