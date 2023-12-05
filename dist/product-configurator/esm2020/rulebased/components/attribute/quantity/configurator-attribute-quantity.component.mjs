/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { debounce, distinct, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../../config/configurator-ui-settings.config";
import * as i2 from "@spartacus/storefront";
import * as i3 from "@spartacus/core";
export class ConfiguratorAttributeQuantityComponent {
    constructor(config) {
        this.config = config;
        this.quantity = new UntypedFormControl(1);
        this.optionsChangeSub = new Subscription();
        this.quantityChangeSub = new Subscription();
        this.changeQuantity = new EventEmitter();
    }
    ngOnInit() {
        this.quantity.setValue(this.quantityOptions?.initialQuantity);
        this.optionsChangeSub.add(this.quantityOptions.disableQuantityActions$
            ?.pipe(distinct())
            .subscribe((disable) => {
            // stepper always emits an value when it gets enabled regardless, if the original value was changed.
            // so we subscribe to quantity change when stepper gets enabled and unsubscribe when it gets disabled
            // this way we will not get the unwanted emission on enabling the stepper.
            if (disable) {
                this.quantity.disable();
                this.quantityChangeSub.unsubscribe();
            }
            else {
                this.quantity.enable();
                this.quantityChangeSub.add(this.subscribeToQuantityChange());
            }
        }));
    }
    subscribeToQuantityChange() {
        return this.quantity.valueChanges
            .pipe(debounce(() => timer(this.config.productConfigurator?.updateDebounceTime?.quantity ?? 0)), take(1))
            .subscribe(() => this.onChangeQuantity());
    }
    ngOnDestroy() {
        this.optionsChangeSub.unsubscribe();
        this.quantityChangeSub.unsubscribe();
    }
    onChangeQuantity() {
        this.changeQuantity.emit(this.quantity?.value);
    }
}
ConfiguratorAttributeQuantityComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeQuantityComponent, deps: [{ token: i1.ConfiguratorUISettingsConfig }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeQuantityComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorAttributeQuantityComponent, selector: "cx-configurator-attribute-quantity", inputs: { quantityOptions: "quantityOptions" }, outputs: { changeQuantity: "changeQuantity" }, ngImport: i0, template: "<div class=\"cx-quantity\">\n  <label>{{ 'configurator.attribute.quantity' | cxTranslate }}</label>\n  <cx-item-counter\n    [allowZero]=\"quantityOptions.allowZero ?? false\"\n    [control]=\"quantity\"\n    [min]=\"quantityOptions.allowZero ? 0 : 1\"\n  ></cx-item-counter>\n</div>\n", dependencies: [{ kind: "component", type: i2.ItemCounterComponent, selector: "cx-item-counter", inputs: ["control", "min", "max", "step", "allowZero", "readonly"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeQuantityComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-quantity', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"cx-quantity\">\n  <label>{{ 'configurator.attribute.quantity' | cxTranslate }}</label>\n  <cx-item-counter\n    [allowZero]=\"quantityOptions.allowZero ?? false\"\n    [control]=\"quantity\"\n    [min]=\"quantityOptions.allowZero ? 0 : 1\"\n  ></cx-item-counter>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ConfiguratorUISettingsConfig }]; }, propDecorators: { quantityOptions: [{
                type: Input
            }], changeQuantity: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1xdWFudGl0eS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL2NvbXBvbmVudHMvYXR0cmlidXRlL3F1YW50aXR5L2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtcXVhbnRpdHkuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL2F0dHJpYnV0ZS9xdWFudGl0eS9jb25maWd1cmF0b3ItYXR0cmlidXRlLXF1YW50aXR5LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRCxPQUFPLEVBQWMsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2RCxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFjMUQsTUFBTSxPQUFPLHNDQUFzQztJQVNqRCxZQUFzQixNQUFvQztRQUFwQyxXQUFNLEdBQU4sTUFBTSxDQUE4QjtRQU4xRCxhQUFRLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQyxxQkFBZ0IsR0FBaUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNwRCxzQkFBaUIsR0FBaUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUUzQyxtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFFTyxDQUFDO0lBRTlELFFBQVE7UUFDTixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQ3ZCLElBQUksQ0FBQyxlQUFlLENBQUMsdUJBQXVCO1lBQzFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ2pCLFNBQVMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3JCLG9HQUFvRztZQUNwRyxxR0FBcUc7WUFDckcsMEVBQTBFO1lBQzFFLElBQUksT0FBTyxFQUFFO2dCQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUN0QztpQkFBTTtnQkFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDLENBQUM7YUFDOUQ7UUFDSCxDQUFDLENBQUMsQ0FDTCxDQUFDO0lBQ0osQ0FBQztJQUVTLHlCQUF5QjtRQUNqQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWTthQUM5QixJQUFJLENBQ0gsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUNaLEtBQUssQ0FDSCxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixFQUFFLGtCQUFrQixFQUFFLFFBQVEsSUFBSSxDQUFDLENBQ25FLENBQ0YsRUFDRCxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ1I7YUFDQSxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVELGdCQUFnQjtRQUNkLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDakQsQ0FBQzs7bUlBbkRVLHNDQUFzQzt1SEFBdEMsc0NBQXNDLHlLQy9CbkQsK1JBUUE7MkZEdUJhLHNDQUFzQztrQkFMbEQsU0FBUzsrQkFDRSxvQ0FBb0MsbUJBRTdCLHVCQUF1QixDQUFDLE1BQU07bUhBUXRDLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0ksY0FBYztzQkFBdkIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVW50eXBlZEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uLCB0aW1lciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2UsIGRpc3RpbmN0LCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yVUlTZXR0aW5nc0NvbmZpZyB9IGZyb20gJy4uLy4uL2NvbmZpZy9jb25maWd1cmF0b3ItdWktc2V0dGluZ3MuY29uZmlnJztcblxuZXhwb3J0IGludGVyZmFjZSBDb25maWd1cmF0b3JBdHRyaWJ1dGVRdWFudGl0eUNvbXBvbmVudE9wdGlvbnMge1xuICBhbGxvd1plcm8/OiBib29sZWFuO1xuICBpbml0aWFsUXVhbnRpdHk/OiBudW1iZXI7XG4gIGRpc2FibGVRdWFudGl0eUFjdGlvbnMkPzogT2JzZXJ2YWJsZTxib29sZWFuPjtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1xdWFudGl0eScsXG4gIHRlbXBsYXRlVXJsOiAnLi9jb25maWd1cmF0b3ItYXR0cmlidXRlLXF1YW50aXR5LmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRvckF0dHJpYnV0ZVF1YW50aXR5Q29tcG9uZW50XG4gIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXRcbntcbiAgcXVhbnRpdHkgPSBuZXcgVW50eXBlZEZvcm1Db250cm9sKDEpO1xuICBvcHRpb25zQ2hhbmdlU3ViOiBTdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gIHF1YW50aXR5Q2hhbmdlU3ViOiBTdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gIEBJbnB1dCgpIHF1YW50aXR5T3B0aW9uczogQ29uZmlndXJhdG9yQXR0cmlidXRlUXVhbnRpdHlDb21wb25lbnRPcHRpb25zO1xuICBAT3V0cHV0KCkgY2hhbmdlUXVhbnRpdHkgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgY29uZmlnOiBDb25maWd1cmF0b3JVSVNldHRpbmdzQ29uZmlnKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMucXVhbnRpdHkuc2V0VmFsdWUodGhpcy5xdWFudGl0eU9wdGlvbnM/LmluaXRpYWxRdWFudGl0eSk7XG4gICAgdGhpcy5vcHRpb25zQ2hhbmdlU3ViLmFkZChcbiAgICAgIHRoaXMucXVhbnRpdHlPcHRpb25zLmRpc2FibGVRdWFudGl0eUFjdGlvbnMkXG4gICAgICAgID8ucGlwZShkaXN0aW5jdCgpKVxuICAgICAgICAuc3Vic2NyaWJlKChkaXNhYmxlKSA9PiB7XG4gICAgICAgICAgLy8gc3RlcHBlciBhbHdheXMgZW1pdHMgYW4gdmFsdWUgd2hlbiBpdCBnZXRzIGVuYWJsZWQgcmVnYXJkbGVzcywgaWYgdGhlIG9yaWdpbmFsIHZhbHVlIHdhcyBjaGFuZ2VkLlxuICAgICAgICAgIC8vIHNvIHdlIHN1YnNjcmliZSB0byBxdWFudGl0eSBjaGFuZ2Ugd2hlbiBzdGVwcGVyIGdldHMgZW5hYmxlZCBhbmQgdW5zdWJzY3JpYmUgd2hlbiBpdCBnZXRzIGRpc2FibGVkXG4gICAgICAgICAgLy8gdGhpcyB3YXkgd2Ugd2lsbCBub3QgZ2V0IHRoZSB1bndhbnRlZCBlbWlzc2lvbiBvbiBlbmFibGluZyB0aGUgc3RlcHBlci5cbiAgICAgICAgICBpZiAoZGlzYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5xdWFudGl0eS5kaXNhYmxlKCk7XG4gICAgICAgICAgICB0aGlzLnF1YW50aXR5Q2hhbmdlU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucXVhbnRpdHkuZW5hYmxlKCk7XG4gICAgICAgICAgICB0aGlzLnF1YW50aXR5Q2hhbmdlU3ViLmFkZCh0aGlzLnN1YnNjcmliZVRvUXVhbnRpdHlDaGFuZ2UoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc3Vic2NyaWJlVG9RdWFudGl0eUNoYW5nZSgpOiBTdWJzY3JpcHRpb24ge1xuICAgIHJldHVybiB0aGlzLnF1YW50aXR5LnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIGRlYm91bmNlKCgpID0+XG4gICAgICAgICAgdGltZXIoXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5wcm9kdWN0Q29uZmlndXJhdG9yPy51cGRhdGVEZWJvdW5jZVRpbWU/LnF1YW50aXR5ID8/IDBcbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICAgIHRha2UoMSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5vbkNoYW5nZVF1YW50aXR5KCkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5vcHRpb25zQ2hhbmdlU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5xdWFudGl0eUNoYW5nZVN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgb25DaGFuZ2VRdWFudGl0eSgpOiB2b2lkIHtcbiAgICB0aGlzLmNoYW5nZVF1YW50aXR5LmVtaXQodGhpcy5xdWFudGl0eT8udmFsdWUpO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiY3gtcXVhbnRpdHlcIj5cbiAgPGxhYmVsPnt7ICdjb25maWd1cmF0b3IuYXR0cmlidXRlLnF1YW50aXR5JyB8IGN4VHJhbnNsYXRlIH19PC9sYWJlbD5cbiAgPGN4LWl0ZW0tY291bnRlclxuICAgIFthbGxvd1plcm9dPVwicXVhbnRpdHlPcHRpb25zLmFsbG93WmVybyA/PyBmYWxzZVwiXG4gICAgW2NvbnRyb2xdPVwicXVhbnRpdHlcIlxuICAgIFttaW5dPVwicXVhbnRpdHlPcHRpb25zLmFsbG93WmVybyA/IDAgOiAxXCJcbiAgPjwvY3gtaXRlbS1jb3VudGVyPlxuPC9kaXY+XG4iXX0=