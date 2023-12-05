/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Directive, inject, Injector, Input, isDevMode, } from '@angular/core';
import { LoggerService } from '@spartacus/core';
import { ConfiguratorAttributeCompositionContext } from './configurator-attribute-composition.model';
import * as i0 from "@angular/core";
import * as i1 from "./configurator-attribute-composition.config";
export class ConfiguratorAttributeCompositionDirective {
    constructor(vcr, configuratorAttributeCompositionConfig) {
        this.vcr = vcr;
        this.configuratorAttributeCompositionConfig = configuratorAttributeCompositionConfig;
        this.logger = inject(LoggerService);
    }
    ngOnInit() {
        const componentKey = this.context.componentKey;
        const composition = this.configuratorAttributeCompositionConfig.productConfigurator
            ?.assignment;
        if (composition) {
            this.renderComponent(composition[componentKey], componentKey);
        }
    }
    renderComponent(component, componentKey) {
        if (component) {
            this.vcr.createComponent(component, {
                injector: this.getComponentInjector(),
            });
        }
        else {
            if (isDevMode()) {
                this.logger.warn('No attribute type component available for: ' + componentKey);
            }
        }
    }
    getComponentInjector() {
        return Injector.create({
            providers: [
                {
                    provide: ConfiguratorAttributeCompositionContext,
                    useValue: this.context,
                },
            ],
            parent: this.vcr.injector,
        });
    }
}
ConfiguratorAttributeCompositionDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeCompositionDirective, deps: [{ token: i0.ViewContainerRef }, { token: i1.ConfiguratorAttributeCompositionConfig }], target: i0.ɵɵFactoryTarget.Directive });
ConfiguratorAttributeCompositionDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorAttributeCompositionDirective, selector: "[cxConfiguratorAttributeComponent]", inputs: { context: ["cxConfiguratorAttributeComponent", "context"] }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeCompositionDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[cxConfiguratorAttributeComponent]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i1.ConfiguratorAttributeCompositionConfig }]; }, propDecorators: { context: [{
                type: Input,
                args: ['cxConfiguratorAttributeComponent']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1jb21wb3NpdGlvbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL2NvbXBvbmVudHMvYXR0cmlidXRlL2NvbXBvc2l0aW9uL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtY29tcG9zaXRpb24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsU0FBUyxFQUNULE1BQU0sRUFDTixRQUFRLEVBQ1IsS0FBSyxFQUNMLFNBQVMsR0FHVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFaEQsT0FBTyxFQUFFLHVDQUF1QyxFQUFFLE1BQU0sNENBQTRDLENBQUM7OztBQUtyRyxNQUFNLE9BQU8seUNBQXlDO0lBTXBELFlBQ1ksR0FBcUIsRUFDckIsc0NBQThFO1FBRDlFLFFBQUcsR0FBSCxHQUFHLENBQWtCO1FBQ3JCLDJDQUFzQyxHQUF0QyxzQ0FBc0MsQ0FBd0M7UUFKaEYsV0FBTSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUt0QyxDQUFDO0lBRUosUUFBUTtRQUNOLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDO1FBRS9DLE1BQU0sV0FBVyxHQUNmLElBQUksQ0FBQyxzQ0FBc0MsQ0FBQyxtQkFBbUI7WUFDN0QsRUFBRSxVQUFVLENBQUM7UUFDakIsSUFBSSxXQUFXLEVBQUU7WUFDZixJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQztTQUMvRDtJQUNILENBQUM7SUFFUyxlQUFlLENBQUMsU0FBYyxFQUFFLFlBQW9CO1FBQzVELElBQUksU0FBUyxFQUFFO1lBQ2IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFO2dCQUNsQyxRQUFRLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixFQUFFO2FBQ3RDLENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxJQUFJLFNBQVMsRUFBRSxFQUFFO2dCQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUNkLDZDQUE2QyxHQUFHLFlBQVksQ0FDN0QsQ0FBQzthQUNIO1NBQ0Y7SUFDSCxDQUFDO0lBRVMsb0JBQW9CO1FBQzVCLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUNyQixTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLHVDQUF1QztvQkFDaEQsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPO2lCQUN2QjthQUNGO1lBQ0QsTUFBTSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUTtTQUMxQixDQUFDLENBQUM7SUFDTCxDQUFDOztzSUE5Q1UseUNBQXlDOzBIQUF6Qyx5Q0FBeUM7MkZBQXpDLHlDQUF5QztrQkFIckQsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsb0NBQW9DO2lCQUMvQzs0SkFHQyxPQUFPO3NCQUROLEtBQUs7dUJBQUMsa0NBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBpbmplY3QsXG4gIEluamVjdG9yLFxuICBJbnB1dCxcbiAgaXNEZXZNb2RlLFxuICBPbkluaXQsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTG9nZ2VyU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBdHRyaWJ1dGVDb21wb3NpdGlvbkNvbmZpZyB9IGZyb20gJy4vY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1jb21wb3NpdGlvbi5jb25maWcnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yQXR0cmlidXRlQ29tcG9zaXRpb25Db250ZXh0IH0gZnJvbSAnLi9jb25maWd1cmF0b3ItYXR0cmlidXRlLWNvbXBvc2l0aW9uLm1vZGVsJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2N4Q29uZmlndXJhdG9yQXR0cmlidXRlQ29tcG9uZW50XScsXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRvckF0dHJpYnV0ZUNvbXBvc2l0aW9uRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCdjeENvbmZpZ3VyYXRvckF0dHJpYnV0ZUNvbXBvbmVudCcpXG4gIGNvbnRleHQ6IENvbmZpZ3VyYXRvckF0dHJpYnV0ZUNvbXBvc2l0aW9uQ29udGV4dDtcblxuICBwcm90ZWN0ZWQgbG9nZ2VyID0gaW5qZWN0KExvZ2dlclNlcnZpY2UpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCB2Y3I6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJvdGVjdGVkIGNvbmZpZ3VyYXRvckF0dHJpYnV0ZUNvbXBvc2l0aW9uQ29uZmlnOiBDb25maWd1cmF0b3JBdHRyaWJ1dGVDb21wb3NpdGlvbkNvbmZpZ1xuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgY29uc3QgY29tcG9uZW50S2V5ID0gdGhpcy5jb250ZXh0LmNvbXBvbmVudEtleTtcblxuICAgIGNvbnN0IGNvbXBvc2l0aW9uID1cbiAgICAgIHRoaXMuY29uZmlndXJhdG9yQXR0cmlidXRlQ29tcG9zaXRpb25Db25maWcucHJvZHVjdENvbmZpZ3VyYXRvclxuICAgICAgICA/LmFzc2lnbm1lbnQ7XG4gICAgaWYgKGNvbXBvc2l0aW9uKSB7XG4gICAgICB0aGlzLnJlbmRlckNvbXBvbmVudChjb21wb3NpdGlvbltjb21wb25lbnRLZXldLCBjb21wb25lbnRLZXkpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCByZW5kZXJDb21wb25lbnQoY29tcG9uZW50OiBhbnksIGNvbXBvbmVudEtleTogc3RyaW5nKSB7XG4gICAgaWYgKGNvbXBvbmVudCkge1xuICAgICAgdGhpcy52Y3IuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudCwge1xuICAgICAgICBpbmplY3RvcjogdGhpcy5nZXRDb21wb25lbnRJbmplY3RvcigpLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChpc0Rldk1vZGUoKSkge1xuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKFxuICAgICAgICAgICdObyBhdHRyaWJ1dGUgdHlwZSBjb21wb25lbnQgYXZhaWxhYmxlIGZvcjogJyArIGNvbXBvbmVudEtleVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRDb21wb25lbnRJbmplY3RvcigpOiBJbmplY3RvciB7XG4gICAgcmV0dXJuIEluamVjdG9yLmNyZWF0ZSh7XG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IENvbmZpZ3VyYXRvckF0dHJpYnV0ZUNvbXBvc2l0aW9uQ29udGV4dCxcbiAgICAgICAgICB1c2VWYWx1ZTogdGhpcy5jb250ZXh0LFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIHBhcmVudDogdGhpcy52Y3IuaW5qZWN0b3IsXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==