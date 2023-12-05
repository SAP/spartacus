/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate, __param } from "tslib";
import { DOCUMENT } from '@angular/common';
import { Inject, } from '@angular/core';
import { DIALOG_TYPE, } from '../config';
let LaunchRenderStrategy = class LaunchRenderStrategy {
    constructor(document, rendererFactory) {
        this.document = document;
        this.rendererFactory = rendererFactory;
        // List of called references; only used for rendered elements
        this.renderedCallers = [];
        /**
         * Classes to apply to the component when the dialog is a DIALOG
         */
        this.dialogClasses = ['d-block', 'fade', 'modal', 'show'];
        /**
         * Classes to apply to the component when the dialog is a POPOVER
         */
        this.popoverClasses = ['cx-dialog-popover'];
        /**
         * Classes to apply to the component when the dialog is a POPOVER_CENTER
         */
        this.popoverCenterClasses = ['cx-dialog-popover-center'];
        /**
         * Classes to apply to the component when the dialog is a POPOVER_CENTER with a backdrop
         */
        this.popoverCenterBackdropClasses = [
            'cx-dialog-popover-center-backdrop',
        ];
        /**
         * Classes to apply to the component when the dialog is a SIDEBAR_END
         */
        this.sidebarEndClasses = ['cx-sidebar-end'];
        /**
         * Classes to apply to the component when the dialog is a SIDEBAR_START
         */
        this.sidebarStartClasses = ['cx-sidebar-start'];
        this.renderer = rendererFactory.createRenderer(null, null);
    }
    /**
     * Determines if element should render
     *
     * @param caller
     * @param config
     */
    shouldRender(caller, config) {
        return (Boolean(config.component) &&
            (this.renderedCallers.some((el) => el.caller === caller)
                ? !!config.multi
                : true));
    }
    applyClasses(component, dialogType) {
        let classes = [];
        // TODO: make classes configurable
        switch (dialogType) {
            case DIALOG_TYPE.DIALOG:
                classes = this.dialogClasses;
                this.renderer.addClass(this.document.body, 'modal-open');
                break;
            case DIALOG_TYPE.POPOVER:
                classes = this.popoverClasses;
                break;
            case DIALOG_TYPE.POPOVER_CENTER:
                classes = this.popoverCenterClasses;
                break;
            case DIALOG_TYPE.POPOVER_CENTER_BACKDROP:
                classes = this.popoverCenterBackdropClasses;
                break;
            case DIALOG_TYPE.SIDEBAR_END:
                classes = this.sidebarEndClasses;
                break;
            case DIALOG_TYPE.SIDEBAR_START:
                classes = this.sidebarStartClasses;
                break;
        }
        for (const newClass of classes) {
            this.renderer.addClass(component.location.nativeElement, newClass);
        }
    }
    /**
     * Method to call when rendered element is destroyed
     * The element will be removed from the list of rendered elements
     *
     * @param caller
     * @param _config optional parameters used in children strategies
     */
    remove(caller, config) {
        this.renderedCallers = this.renderedCallers.filter((el) => el.caller !== caller);
        if (config?.dialogType === DIALOG_TYPE.DIALOG) {
            this.renderer.removeClass(this.document.body, 'modal-open');
        }
    }
    getPriority() {
        return -10 /* Priority.LOW */; // low, as it's a default matcher
    }
};
LaunchRenderStrategy = __decorate([
    __param(0, Inject(DOCUMENT))
], LaunchRenderStrategy);
export { LaunchRenderStrategy };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLXJlbmRlci5zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvbGF5b3V0L2xhdW5jaC1kaWFsb2cvc2VydmljZXMvbGF1bmNoLXJlbmRlci5zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBRUwsTUFBTSxHQUlQLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFDTCxXQUFXLEdBSVosTUFBTSxXQUFXLENBQUM7QUFFWixJQUFlLG9CQUFvQixHQUFuQyxNQUFlLG9CQUFvQjtJQXFDeEMsWUFDOEIsUUFBYSxFQUMvQixlQUFpQztRQURmLGFBQVEsR0FBUixRQUFRLENBQUs7UUFDL0Isb0JBQWUsR0FBZixlQUFlLENBQWtCO1FBdEM3Qyw2REFBNkQ7UUFDbkQsb0JBQWUsR0FJcEIsRUFBRSxDQUFDO1FBRVI7O1dBRUc7UUFDZ0Isa0JBQWEsR0FBRyxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3hFOztXQUVHO1FBQ2dCLG1CQUFjLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzFEOztXQUVHO1FBQ2dCLHlCQUFvQixHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUN2RTs7V0FFRztRQUNnQixpQ0FBNEIsR0FBRztZQUNoRCxtQ0FBbUM7U0FDcEMsQ0FBQztRQUNGOztXQUVHO1FBQ2dCLHNCQUFpQixHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUMxRDs7V0FFRztRQUNnQix3QkFBbUIsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFRNUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxlQUFlLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBb0JEOzs7OztPQUtHO0lBQ08sWUFBWSxDQUNwQixNQUE4QixFQUM5QixNQUFvQjtRQUVwQixPQUFPLENBQ0wsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7WUFDekIsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUM7Z0JBQ3RELENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUs7Z0JBQ2hCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FDVixDQUFDO0lBQ0osQ0FBQztJQUVTLFlBQVksQ0FDcEIsU0FBNEIsRUFDNUIsVUFBdUI7UUFFdkIsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBRWpCLGtDQUFrQztRQUNsQyxRQUFRLFVBQVUsRUFBRTtZQUNsQixLQUFLLFdBQVcsQ0FBQyxNQUFNO2dCQUNyQixPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQ3pELE1BQU07WUFDUixLQUFLLFdBQVcsQ0FBQyxPQUFPO2dCQUN0QixPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztnQkFDOUIsTUFBTTtZQUNSLEtBQUssV0FBVyxDQUFDLGNBQWM7Z0JBQzdCLE9BQU8sR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUM7Z0JBQ3BDLE1BQU07WUFDUixLQUFLLFdBQVcsQ0FBQyx1QkFBdUI7Z0JBQ3RDLE9BQU8sR0FBRyxJQUFJLENBQUMsNEJBQTRCLENBQUM7Z0JBQzVDLE1BQU07WUFDUixLQUFLLFdBQVcsQ0FBQyxXQUFXO2dCQUMxQixPQUFPLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO2dCQUNqQyxNQUFNO1lBQ1IsS0FBSyxXQUFXLENBQUMsYUFBYTtnQkFDNUIsT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztnQkFDbkMsTUFBTTtTQUNUO1FBRUQsS0FBSyxNQUFNLFFBQVEsSUFBSSxPQUFPLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDcEU7SUFDSCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFDLE1BQThCLEVBQUUsTUFBcUI7UUFDakUsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FDaEQsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUM3QixDQUFDO1FBRUYsSUFBSyxNQUF1QixFQUFFLFVBQVUsS0FBSyxXQUFXLENBQUMsTUFBTSxFQUFFO1lBQy9ELElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO1NBQzdEO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCw4QkFBb0IsQ0FBQyxpQ0FBaUM7SUFDeEQsQ0FBQztDQUNGLENBQUE7QUF0SXFCLG9CQUFvQjtJQXNDckMsV0FBQSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7R0F0Q0Msb0JBQW9CLENBc0l6QztTQXRJcUIsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50UmVmLFxuICBJbmplY3QsXG4gIFJlbmRlcmVyMixcbiAgUmVuZGVyZXJGYWN0b3J5MixcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBcHBsaWNhYmxlLCBQcmlvcml0eSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBESUFMT0dfVFlQRSxcbiAgTGF1bmNoRGlhbG9nLFxuICBMYXVuY2hPcHRpb25zLFxuICBMQVVOQ0hfQ0FMTEVSLFxufSBmcm9tICcuLi9jb25maWcnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTGF1bmNoUmVuZGVyU3RyYXRlZ3kgaW1wbGVtZW50cyBBcHBsaWNhYmxlIHtcbiAgLy8gTGlzdCBvZiBjYWxsZWQgcmVmZXJlbmNlczsgb25seSB1c2VkIGZvciByZW5kZXJlZCBlbGVtZW50c1xuICBwcm90ZWN0ZWQgcmVuZGVyZWRDYWxsZXJzOiBBcnJheTx7XG4gICAgY2FsbGVyOiBMQVVOQ0hfQ0FMTEVSIHwgc3RyaW5nO1xuICAgIGVsZW1lbnQ/OiBhbnk7XG4gICAgY29tcG9uZW50PzogQ29tcG9uZW50UmVmPGFueT47XG4gIH0+ID0gW107XG5cbiAgLyoqXG4gICAqIENsYXNzZXMgdG8gYXBwbHkgdG8gdGhlIGNvbXBvbmVudCB3aGVuIHRoZSBkaWFsb2cgaXMgYSBESUFMT0dcbiAgICovXG4gIHByb3RlY3RlZCByZWFkb25seSBkaWFsb2dDbGFzc2VzID0gWydkLWJsb2NrJywgJ2ZhZGUnLCAnbW9kYWwnLCAnc2hvdyddO1xuICAvKipcbiAgICogQ2xhc3NlcyB0byBhcHBseSB0byB0aGUgY29tcG9uZW50IHdoZW4gdGhlIGRpYWxvZyBpcyBhIFBPUE9WRVJcbiAgICovXG4gIHByb3RlY3RlZCByZWFkb25seSBwb3BvdmVyQ2xhc3NlcyA9IFsnY3gtZGlhbG9nLXBvcG92ZXInXTtcbiAgLyoqXG4gICAqIENsYXNzZXMgdG8gYXBwbHkgdG8gdGhlIGNvbXBvbmVudCB3aGVuIHRoZSBkaWFsb2cgaXMgYSBQT1BPVkVSX0NFTlRFUlxuICAgKi9cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHBvcG92ZXJDZW50ZXJDbGFzc2VzID0gWydjeC1kaWFsb2ctcG9wb3Zlci1jZW50ZXInXTtcbiAgLyoqXG4gICAqIENsYXNzZXMgdG8gYXBwbHkgdG8gdGhlIGNvbXBvbmVudCB3aGVuIHRoZSBkaWFsb2cgaXMgYSBQT1BPVkVSX0NFTlRFUiB3aXRoIGEgYmFja2Ryb3BcbiAgICovXG4gIHByb3RlY3RlZCByZWFkb25seSBwb3BvdmVyQ2VudGVyQmFja2Ryb3BDbGFzc2VzID0gW1xuICAgICdjeC1kaWFsb2ctcG9wb3Zlci1jZW50ZXItYmFja2Ryb3AnLFxuICBdO1xuICAvKipcbiAgICogQ2xhc3NlcyB0byBhcHBseSB0byB0aGUgY29tcG9uZW50IHdoZW4gdGhlIGRpYWxvZyBpcyBhIFNJREVCQVJfRU5EXG4gICAqL1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgc2lkZWJhckVuZENsYXNzZXMgPSBbJ2N4LXNpZGViYXItZW5kJ107XG4gIC8qKlxuICAgKiBDbGFzc2VzIHRvIGFwcGx5IHRvIHRoZSBjb21wb25lbnQgd2hlbiB0aGUgZGlhbG9nIGlzIGEgU0lERUJBUl9TVEFSVFxuICAgKi9cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHNpZGViYXJTdGFydENsYXNzZXMgPSBbJ2N4LXNpZGViYXItc3RhcnQnXTtcblxuICBwcm90ZWN0ZWQgcmVuZGVyZXI6IFJlbmRlcmVyMjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcm90ZWN0ZWQgZG9jdW1lbnQ6IGFueSxcbiAgICBwcm90ZWN0ZWQgcmVuZGVyZXJGYWN0b3J5OiBSZW5kZXJlckZhY3RvcnkyXG4gICkge1xuICAgIHRoaXMucmVuZGVyZXIgPSByZW5kZXJlckZhY3RvcnkuY3JlYXRlUmVuZGVyZXIobnVsbCwgbnVsbCk7XG4gIH1cblxuICAvKipcbiAgICogUmVuZGVyIG1ldGhvZCB0byBpbXBsZW1lbnQgYmFzZWQgb24gdGhlIHN0cmF0ZWd5XG4gICAqXG4gICAqIEBwYXJhbSBjb25maWcgTGF1bmNoIGNvbmZpZ3VyYXRpb25cbiAgICovXG4gIGFic3RyYWN0IHJlbmRlcihcbiAgICBjb25maWc6IExhdW5jaE9wdGlvbnMsXG4gICAgY2FsbGVyOiBMQVVOQ0hfQ0FMTEVSIHwgc3RyaW5nLFxuICAgIHZjcj86IFZpZXdDb250YWluZXJSZWZcbiAgKTogT2JzZXJ2YWJsZTxDb21wb25lbnRSZWY8YW55PiB8IHVuZGVmaW5lZD4gfCB2b2lkO1xuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBzdHJhdGVneSBpcyB0aGUgcmlnaHQgb25lIGZvciB0aGUgcHJvdmlkZWQgY29uZmlndXJhdGlvblxuICAgKlxuICAgKiBAcGFyYW0gY29uZmlnXG4gICAqL1xuICBhYnN0cmFjdCBoYXNNYXRjaChjb25maWc6IExhdW5jaE9wdGlvbnMpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIGlmIGVsZW1lbnQgc2hvdWxkIHJlbmRlclxuICAgKlxuICAgKiBAcGFyYW0gY2FsbGVyXG4gICAqIEBwYXJhbSBjb25maWdcbiAgICovXG4gIHByb3RlY3RlZCBzaG91bGRSZW5kZXIoXG4gICAgY2FsbGVyOiBMQVVOQ0hfQ0FMTEVSIHwgc3RyaW5nLFxuICAgIGNvbmZpZzogTGF1bmNoRGlhbG9nXG4gICk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICBCb29sZWFuKGNvbmZpZy5jb21wb25lbnQpICYmXG4gICAgICAodGhpcy5yZW5kZXJlZENhbGxlcnMuc29tZSgoZWwpID0+IGVsLmNhbGxlciA9PT0gY2FsbGVyKVxuICAgICAgICA/ICEhY29uZmlnLm11bHRpXG4gICAgICAgIDogdHJ1ZSlcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFwcGx5Q2xhc3NlcyhcbiAgICBjb21wb25lbnQ6IENvbXBvbmVudFJlZjxhbnk+LFxuICAgIGRpYWxvZ1R5cGU6IERJQUxPR19UWVBFXG4gICk6IHZvaWQge1xuICAgIGxldCBjbGFzc2VzID0gW107XG5cbiAgICAvLyBUT0RPOiBtYWtlIGNsYXNzZXMgY29uZmlndXJhYmxlXG4gICAgc3dpdGNoIChkaWFsb2dUeXBlKSB7XG4gICAgICBjYXNlIERJQUxPR19UWVBFLkRJQUxPRzpcbiAgICAgICAgY2xhc3NlcyA9IHRoaXMuZGlhbG9nQ2xhc3NlcztcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmRvY3VtZW50LmJvZHksICdtb2RhbC1vcGVuJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBESUFMT0dfVFlQRS5QT1BPVkVSOlxuICAgICAgICBjbGFzc2VzID0gdGhpcy5wb3BvdmVyQ2xhc3NlcztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIERJQUxPR19UWVBFLlBPUE9WRVJfQ0VOVEVSOlxuICAgICAgICBjbGFzc2VzID0gdGhpcy5wb3BvdmVyQ2VudGVyQ2xhc3NlcztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIERJQUxPR19UWVBFLlBPUE9WRVJfQ0VOVEVSX0JBQ0tEUk9QOlxuICAgICAgICBjbGFzc2VzID0gdGhpcy5wb3BvdmVyQ2VudGVyQmFja2Ryb3BDbGFzc2VzO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRElBTE9HX1RZUEUuU0lERUJBUl9FTkQ6XG4gICAgICAgIGNsYXNzZXMgPSB0aGlzLnNpZGViYXJFbmRDbGFzc2VzO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRElBTE9HX1RZUEUuU0lERUJBUl9TVEFSVDpcbiAgICAgICAgY2xhc3NlcyA9IHRoaXMuc2lkZWJhclN0YXJ0Q2xhc3NlcztcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBuZXdDbGFzcyBvZiBjbGFzc2VzKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGNvbXBvbmVudC5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LCBuZXdDbGFzcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byBjYWxsIHdoZW4gcmVuZGVyZWQgZWxlbWVudCBpcyBkZXN0cm95ZWRcbiAgICogVGhlIGVsZW1lbnQgd2lsbCBiZSByZW1vdmVkIGZyb20gdGhlIGxpc3Qgb2YgcmVuZGVyZWQgZWxlbWVudHNcbiAgICpcbiAgICogQHBhcmFtIGNhbGxlclxuICAgKiBAcGFyYW0gX2NvbmZpZyBvcHRpb25hbCBwYXJhbWV0ZXJzIHVzZWQgaW4gY2hpbGRyZW4gc3RyYXRlZ2llc1xuICAgKi9cbiAgcHVibGljIHJlbW92ZShjYWxsZXI6IExBVU5DSF9DQUxMRVIgfCBzdHJpbmcsIGNvbmZpZzogTGF1bmNoT3B0aW9ucyk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZWRDYWxsZXJzID0gdGhpcy5yZW5kZXJlZENhbGxlcnMuZmlsdGVyKFxuICAgICAgKGVsKSA9PiBlbC5jYWxsZXIgIT09IGNhbGxlclxuICAgICk7XG5cbiAgICBpZiAoKGNvbmZpZyBhcyBMYXVuY2hEaWFsb2cpPy5kaWFsb2dUeXBlID09PSBESUFMT0dfVFlQRS5ESUFMT0cpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5kb2N1bWVudC5ib2R5LCAnbW9kYWwtb3BlbicpO1xuICAgIH1cbiAgfVxuXG4gIGdldFByaW9yaXR5KCk6IFByaW9yaXR5IHtcbiAgICByZXR1cm4gUHJpb3JpdHkuTE9XOyAvLyBsb3csIGFzIGl0J3MgYSBkZWZhdWx0IG1hdGNoZXJcbiAgfVxufVxuIl19