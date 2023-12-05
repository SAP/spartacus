/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild, ViewContainerRef, } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./services/message.service";
import * as i2 from "./services/message-render.service";
export class MessageComponent {
    constructor(messageService, renderService) {
        this.messageService = messageService;
        this.renderService = renderService;
        this.subscription = new Subscription();
    }
    ngAfterViewInit() {
        this.subscription.add(this.messageService.get().subscribe((msg) => {
            if (msg) {
                this.render(msg);
            }
            else {
                this.vcr?.clear();
            }
        }));
    }
    render(msg) {
        const ref = this.vcr.createComponent(this.renderService.getComponent(msg), 0, this.renderService.getInjector(msg, this.vcr.injector));
        ref.injector.get(ChangeDetectorRef).markForCheck();
        this.subscription.add(msg.events
            ?.pipe(filter((event) => !!event.close))
            .subscribe(() => this.terminate(ref)));
    }
    /**
     * Terminates the message component in 2 steps. It starts to toggle the terminate
     * state of the component and shortly after destroys the component completely. The
     * termination state allows the CSS layer to play an animation before destroying.
     */
    terminate(ref) {
        ref.instance.terminated = true;
        ref.injector.get(ChangeDetectorRef).markForCheck();
        setTimeout(() => {
            ref.destroy();
        }, 500);
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
MessageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MessageComponent, deps: [{ token: i1.MessageService }, { token: i2.MessageRenderService }], target: i0.ɵɵFactoryTarget.Component });
MessageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: MessageComponent, selector: "cx-org-message", viewQueries: [{ propertyName: "vcr", first: true, predicate: ["vcr"], descendants: true, read: ViewContainerRef }], ngImport: i0, template: "<ng-container #vcr></ng-container>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MessageComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-message', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container #vcr></ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.MessageService }, { type: i2.MessageRenderService }]; }, propDecorators: { vcr: [{
                type: ViewChild,
                args: ['vcr', { read: ViewContainerRef }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvc2hhcmVkL21lc3NhZ2UvbWVzc2FnZS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvc2hhcmVkL21lc3NhZ2UvbWVzc2FnZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUdULFNBQVMsRUFDVCxnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFXeEMsTUFBTSxPQUFPLGdCQUFnQjtJQU8zQixZQUNZLGNBQThCLEVBQzlCLGFBQW1DO1FBRG5DLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixrQkFBYSxHQUFiLGFBQWEsQ0FBc0I7UUFKckMsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBS3pDLENBQUM7SUFFSixlQUFlO1FBQ2IsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQ25CLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDMUMsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNsQjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDO2FBQ25CO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFUyxNQUFNLENBQUMsR0FBZ0I7UUFDL0IsTUFBTSxHQUFHLEdBQXVDLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUN0RSxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFDcEMsQ0FBQyxFQUNELElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUN2RCxDQUFDO1FBQ0YsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVuRCxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FDbkIsR0FBRyxDQUFDLE1BQU07WUFDUixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUF1QixFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3pELFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQ3hDLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNPLFNBQVMsQ0FBQyxHQUF1QztRQUN6RCxHQUFHLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDL0IsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNuRCxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2hCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNWLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzs2R0F0RFUsZ0JBQWdCO2lHQUFoQixnQkFBZ0IsNkhBR0QsZ0JBQWdCLDZCQy9CNUMsc0NBQ0E7MkZEMkJhLGdCQUFnQjtrQkFMNUIsU0FBUzsrQkFDRSxnQkFBZ0IsbUJBRVQsdUJBQXVCLENBQUMsTUFBTTt3SUFLRCxHQUFHO3NCQUFoRCxTQUFTO3VCQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb21wb25lbnRSZWYsXG4gIE9uRGVzdHJveSxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQmFzZU1lc3NhZ2VDb21wb25lbnQgfSBmcm9tICcuL2Jhc2UtbWVzc2FnZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWVzc2FnZURhdGEsIE1lc3NhZ2VFdmVudERhdGEgfSBmcm9tICcuL21lc3NhZ2UubW9kZWwnO1xuaW1wb3J0IHsgTWVzc2FnZVJlbmRlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL21lc3NhZ2UtcmVuZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWVzc2FnZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL21lc3NhZ2Uuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LW9yZy1tZXNzYWdlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL21lc3NhZ2UuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWVzc2FnZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIC8vIFdlIHVzZSBhIGNoaWxkIHZpZXcgY29udGFpbmVyIHJlZiwgYXMgY3JlYXRpbmcgY29tcG9uZW50cyB3aWxsIGJlY29tZSBzaWJsaW5ncy5cbiAgLy8gV2UgbGlrZSB0aGUgbWVzc2FnZSBjb21wb25lbnRzIHRvIGFwcGVhciBpbnNpZGUgdGhlIGBjeC1vcmctbWVzc2FnZWAgaW5zdGVhZC5cbiAgQFZpZXdDaGlsZCgndmNyJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pIHZjcjogVmlld0NvbnRhaW5lclJlZjtcblxuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHJlbmRlclNlcnZpY2U6IE1lc3NhZ2VSZW5kZXJTZXJ2aWNlXG4gICkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5nZXQoKS5zdWJzY3JpYmUoKG1zZykgPT4ge1xuICAgICAgICBpZiAobXNnKSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXIobXNnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnZjcj8uY2xlYXIoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlbmRlcihtc2c6IE1lc3NhZ2VEYXRhKSB7XG4gICAgY29uc3QgcmVmOiBDb21wb25lbnRSZWY8QmFzZU1lc3NhZ2VDb21wb25lbnQ+ID0gdGhpcy52Y3IuY3JlYXRlQ29tcG9uZW50KFxuICAgICAgdGhpcy5yZW5kZXJTZXJ2aWNlLmdldENvbXBvbmVudChtc2cpLFxuICAgICAgMCxcbiAgICAgIHRoaXMucmVuZGVyU2VydmljZS5nZXRJbmplY3Rvcihtc2csIHRoaXMudmNyLmluamVjdG9yKVxuICAgICk7XG4gICAgcmVmLmluamVjdG9yLmdldChDaGFuZ2VEZXRlY3RvclJlZikubWFya0ZvckNoZWNrKCk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQoXG4gICAgICBtc2cuZXZlbnRzXG4gICAgICAgID8ucGlwZShmaWx0ZXIoKGV2ZW50OiBNZXNzYWdlRXZlbnREYXRhKSA9PiAhIWV2ZW50LmNsb3NlKSlcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnRlcm1pbmF0ZShyZWYpKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVGVybWluYXRlcyB0aGUgbWVzc2FnZSBjb21wb25lbnQgaW4gMiBzdGVwcy4gSXQgc3RhcnRzIHRvIHRvZ2dsZSB0aGUgdGVybWluYXRlXG4gICAqIHN0YXRlIG9mIHRoZSBjb21wb25lbnQgYW5kIHNob3J0bHkgYWZ0ZXIgZGVzdHJveXMgdGhlIGNvbXBvbmVudCBjb21wbGV0ZWx5LiBUaGVcbiAgICogdGVybWluYXRpb24gc3RhdGUgYWxsb3dzIHRoZSBDU1MgbGF5ZXIgdG8gcGxheSBhbiBhbmltYXRpb24gYmVmb3JlIGRlc3Ryb3lpbmcuXG4gICAqL1xuICBwcm90ZWN0ZWQgdGVybWluYXRlKHJlZjogQ29tcG9uZW50UmVmPEJhc2VNZXNzYWdlQ29tcG9uZW50Pikge1xuICAgIHJlZi5pbnN0YW5jZS50ZXJtaW5hdGVkID0gdHJ1ZTtcbiAgICByZWYuaW5qZWN0b3IuZ2V0KENoYW5nZURldGVjdG9yUmVmKS5tYXJrRm9yQ2hlY2soKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHJlZi5kZXN0cm95KCk7XG4gICAgfSwgNTAwKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiIsIjxuZy1jb250YWluZXIgI3Zjcj48L25nLWNvbnRhaW5lcj5cbiJdfQ==