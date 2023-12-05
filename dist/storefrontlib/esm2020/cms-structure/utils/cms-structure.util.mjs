/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { provideConfig } from '@spartacus/core';
/**
 * Helper function to simplify the creation of static CMS structure (`CmsStructureConfig`).
 * The helper function leverage the `provideConfig`, and is only providing an easy way to
 * generate the cms structure. The function creates a configuration structure for components,
 * page slot and page template. The following example adds a component to a page slot:
 *
 * ```ts
 * provideCmsStructure({
 *   componentId: 'LoginComponent',
 *   pageSlotPosition: 'SiteLogin'
 * })
 * ```
 *
 * @param options.componentId component identifier is used to provide component structure
 * @param options.pageSlotPosition page slot position is used to provide the slot configuration
 * @param options.pageTemplate the page template is used to provide the page slot to the given page template
 * @param options.section the section is used to provide the page slot to the given section
 * @param options.breakpoint the breakpoint is used to provide the page slot for a specific breakpoint
 */
export function provideCmsStructure(options) {
    return provideConfig({
        ...buildCmsStructure(options),
        ...buildLayoutConfig(options),
    });
}
/**
 * @private
 */
function buildCmsStructure({ componentId, pageSlotPosition, } = {}) {
    const config = { cmsStructure: {} };
    if (componentId) {
        config.cmsStructure = {
            components: {
                [componentId]: {
                    typeCode: componentId,
                    flexType: componentId,
                },
            },
        };
    }
    if (componentId && pageSlotPosition && config.cmsStructure) {
        config.cmsStructure.slots = {
            [pageSlotPosition]: { componentIds: [componentId] },
        };
    }
    return config;
}
/**
 * @private
 */
function buildLayoutConfig({ pageTemplate, pageSlotPosition, breakpoint, section, } = {}) {
    const layoutConfig = {};
    if (pageTemplate && pageSlotPosition) {
        const pageTemplateSlots = {};
        if (breakpoint) {
            pageTemplateSlots[breakpoint] = {
                slots: [pageSlotPosition],
            };
        }
        else {
            pageTemplateSlots.slots = [pageSlotPosition];
        }
        layoutConfig.layoutSlots = {
            [pageTemplate]: pageTemplateSlots,
        };
    }
    if (section && pageSlotPosition) {
        const sectionSlots = {};
        if (breakpoint) {
            sectionSlots[breakpoint] = { slots: [pageSlotPosition] };
        }
        else {
            sectionSlots.slots = [pageSlotPosition];
        }
        if (layoutConfig.layoutSlots) {
            layoutConfig.layoutSlots[section] = sectionSlots;
        }
        else {
            layoutConfig.layoutSlots = {
                [section]: sectionSlots,
            };
        }
    }
    return layoutConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21zLXN0cnVjdHVyZS51dGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9jbXMtc3RydWN0dXJlL3V0aWxzL2Ntcy1zdHJ1Y3R1cmUudXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBR0gsT0FBTyxFQUFzQixhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUlwRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBTSxVQUFVLG1CQUFtQixDQUNqQyxPQUE0QjtJQUU1QixPQUFPLGFBQWEsQ0FBQztRQUNuQixHQUFHLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztRQUM3QixHQUFHLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztLQUM5QixDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxTQUFTLGlCQUFpQixDQUFDLEVBQ3pCLFdBQVcsRUFDWCxnQkFBZ0IsTUFDTyxFQUFFO0lBQ3pCLE1BQU0sTUFBTSxHQUF1QixFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUV4RCxJQUFJLFdBQVcsRUFBRTtRQUNmLE1BQU0sQ0FBQyxZQUFZLEdBQUc7WUFDcEIsVUFBVSxFQUFFO2dCQUNWLENBQUMsV0FBVyxDQUFDLEVBQUU7b0JBQ2IsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLFFBQVEsRUFBRSxXQUFXO2lCQUN0QjthQUNGO1NBQ0YsQ0FBQztLQUNIO0lBRUQsSUFBSSxXQUFXLElBQUksZ0JBQWdCLElBQUksTUFBTSxDQUFDLFlBQVksRUFBRTtRQUMxRCxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBRztZQUMxQixDQUFDLGdCQUFnQixDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRTtTQUNwRCxDQUFDO0tBQ0g7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRUQ7O0dBRUc7QUFDSCxTQUFTLGlCQUFpQixDQUFDLEVBQ3pCLFlBQVksRUFDWixnQkFBZ0IsRUFDaEIsVUFBVSxFQUNWLE9BQU8sTUFDZ0IsRUFBRTtJQUN6QixNQUFNLFlBQVksR0FBaUIsRUFBRSxDQUFDO0lBQ3RDLElBQUksWUFBWSxJQUFJLGdCQUFnQixFQUFFO1FBQ3BDLE1BQU0saUJBQWlCLEdBQVEsRUFBRSxDQUFDO1FBQ2xDLElBQUksVUFBVSxFQUFFO1lBQ2QsaUJBQWlCLENBQUMsVUFBVSxDQUFDLEdBQUc7Z0JBQzlCLEtBQUssRUFBRSxDQUFDLGdCQUFnQixDQUFDO2FBQzFCLENBQUM7U0FDSDthQUFNO1lBQ0wsaUJBQWlCLENBQUMsS0FBSyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUM5QztRQUNELFlBQVksQ0FBQyxXQUFXLEdBQUc7WUFDekIsQ0FBQyxZQUFZLENBQUMsRUFBRSxpQkFBaUI7U0FDbEMsQ0FBQztLQUNIO0lBRUQsSUFBSSxPQUFPLElBQUksZ0JBQWdCLEVBQUU7UUFDL0IsTUFBTSxZQUFZLEdBQVEsRUFBRSxDQUFDO1FBQzdCLElBQUksVUFBVSxFQUFFO1lBQ2QsWUFBWSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDO1NBQzFEO2FBQU07WUFDTCxZQUFZLENBQUMsS0FBSyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUN6QztRQUNELElBQUksWUFBWSxDQUFDLFdBQVcsRUFBRTtZQUM1QixZQUFZLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLFlBQVksQ0FBQztTQUNsRDthQUFNO1lBQ0wsWUFBWSxDQUFDLFdBQVcsR0FBRztnQkFDekIsQ0FBQyxPQUFPLENBQUMsRUFBRSxZQUFZO2FBQ3hCLENBQUM7U0FDSDtLQUNGO0lBQ0QsT0FBTyxZQUFZLENBQUM7QUFDdEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IFZhbHVlUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENtc1N0cnVjdHVyZUNvbmZpZywgcHJvdmlkZUNvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBMYXlvdXRDb25maWcgfSBmcm9tICcuLi8uLi9sYXlvdXQvY29uZmlnL2xheW91dC1jb25maWcnO1xuaW1wb3J0IHsgQ21zU3RydWN0dXJlT3B0aW9ucyB9IGZyb20gJy4vY21zLXN0cnVjdHVyZS5tb2RlbCc7XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIHNpbXBsaWZ5IHRoZSBjcmVhdGlvbiBvZiBzdGF0aWMgQ01TIHN0cnVjdHVyZSAoYENtc1N0cnVjdHVyZUNvbmZpZ2ApLlxuICogVGhlIGhlbHBlciBmdW5jdGlvbiBsZXZlcmFnZSB0aGUgYHByb3ZpZGVDb25maWdgLCBhbmQgaXMgb25seSBwcm92aWRpbmcgYW4gZWFzeSB3YXkgdG9cbiAqIGdlbmVyYXRlIHRoZSBjbXMgc3RydWN0dXJlLiBUaGUgZnVuY3Rpb24gY3JlYXRlcyBhIGNvbmZpZ3VyYXRpb24gc3RydWN0dXJlIGZvciBjb21wb25lbnRzLFxuICogcGFnZSBzbG90IGFuZCBwYWdlIHRlbXBsYXRlLiBUaGUgZm9sbG93aW5nIGV4YW1wbGUgYWRkcyBhIGNvbXBvbmVudCB0byBhIHBhZ2Ugc2xvdDpcbiAqXG4gKiBgYGB0c1xuICogcHJvdmlkZUNtc1N0cnVjdHVyZSh7XG4gKiAgIGNvbXBvbmVudElkOiAnTG9naW5Db21wb25lbnQnLFxuICogICBwYWdlU2xvdFBvc2l0aW9uOiAnU2l0ZUxvZ2luJ1xuICogfSlcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSBvcHRpb25zLmNvbXBvbmVudElkIGNvbXBvbmVudCBpZGVudGlmaWVyIGlzIHVzZWQgdG8gcHJvdmlkZSBjb21wb25lbnQgc3RydWN0dXJlXG4gKiBAcGFyYW0gb3B0aW9ucy5wYWdlU2xvdFBvc2l0aW9uIHBhZ2Ugc2xvdCBwb3NpdGlvbiBpcyB1c2VkIHRvIHByb3ZpZGUgdGhlIHNsb3QgY29uZmlndXJhdGlvblxuICogQHBhcmFtIG9wdGlvbnMucGFnZVRlbXBsYXRlIHRoZSBwYWdlIHRlbXBsYXRlIGlzIHVzZWQgdG8gcHJvdmlkZSB0aGUgcGFnZSBzbG90IHRvIHRoZSBnaXZlbiBwYWdlIHRlbXBsYXRlXG4gKiBAcGFyYW0gb3B0aW9ucy5zZWN0aW9uIHRoZSBzZWN0aW9uIGlzIHVzZWQgdG8gcHJvdmlkZSB0aGUgcGFnZSBzbG90IHRvIHRoZSBnaXZlbiBzZWN0aW9uXG4gKiBAcGFyYW0gb3B0aW9ucy5icmVha3BvaW50IHRoZSBicmVha3BvaW50IGlzIHVzZWQgdG8gcHJvdmlkZSB0aGUgcGFnZSBzbG90IGZvciBhIHNwZWNpZmljIGJyZWFrcG9pbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVDbXNTdHJ1Y3R1cmUoXG4gIG9wdGlvbnM6IENtc1N0cnVjdHVyZU9wdGlvbnNcbik6IFZhbHVlUHJvdmlkZXIge1xuICByZXR1cm4gcHJvdmlkZUNvbmZpZyh7XG4gICAgLi4uYnVpbGRDbXNTdHJ1Y3R1cmUob3B0aW9ucyksXG4gICAgLi4uYnVpbGRMYXlvdXRDb25maWcob3B0aW9ucyksXG4gIH0pO1xufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGJ1aWxkQ21zU3RydWN0dXJlKHtcbiAgY29tcG9uZW50SWQsXG4gIHBhZ2VTbG90UG9zaXRpb24sXG59OiBDbXNTdHJ1Y3R1cmVPcHRpb25zID0ge30pOiBDbXNTdHJ1Y3R1cmVDb25maWcge1xuICBjb25zdCBjb25maWc6IENtc1N0cnVjdHVyZUNvbmZpZyA9IHsgY21zU3RydWN0dXJlOiB7fSB9O1xuXG4gIGlmIChjb21wb25lbnRJZCkge1xuICAgIGNvbmZpZy5jbXNTdHJ1Y3R1cmUgPSB7XG4gICAgICBjb21wb25lbnRzOiB7XG4gICAgICAgIFtjb21wb25lbnRJZF06IHtcbiAgICAgICAgICB0eXBlQ29kZTogY29tcG9uZW50SWQsXG4gICAgICAgICAgZmxleFR5cGU6IGNvbXBvbmVudElkLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgaWYgKGNvbXBvbmVudElkICYmIHBhZ2VTbG90UG9zaXRpb24gJiYgY29uZmlnLmNtc1N0cnVjdHVyZSkge1xuICAgIGNvbmZpZy5jbXNTdHJ1Y3R1cmUuc2xvdHMgPSB7XG4gICAgICBbcGFnZVNsb3RQb3NpdGlvbl06IHsgY29tcG9uZW50SWRzOiBbY29tcG9uZW50SWRdIH0sXG4gICAgfTtcbiAgfVxuICByZXR1cm4gY29uZmlnO1xufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGJ1aWxkTGF5b3V0Q29uZmlnKHtcbiAgcGFnZVRlbXBsYXRlLFxuICBwYWdlU2xvdFBvc2l0aW9uLFxuICBicmVha3BvaW50LFxuICBzZWN0aW9uLFxufTogQ21zU3RydWN0dXJlT3B0aW9ucyA9IHt9KTogTGF5b3V0Q29uZmlnIHtcbiAgY29uc3QgbGF5b3V0Q29uZmlnOiBMYXlvdXRDb25maWcgPSB7fTtcbiAgaWYgKHBhZ2VUZW1wbGF0ZSAmJiBwYWdlU2xvdFBvc2l0aW9uKSB7XG4gICAgY29uc3QgcGFnZVRlbXBsYXRlU2xvdHM6IGFueSA9IHt9O1xuICAgIGlmIChicmVha3BvaW50KSB7XG4gICAgICBwYWdlVGVtcGxhdGVTbG90c1ticmVha3BvaW50XSA9IHtcbiAgICAgICAgc2xvdHM6IFtwYWdlU2xvdFBvc2l0aW9uXSxcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhZ2VUZW1wbGF0ZVNsb3RzLnNsb3RzID0gW3BhZ2VTbG90UG9zaXRpb25dO1xuICAgIH1cbiAgICBsYXlvdXRDb25maWcubGF5b3V0U2xvdHMgPSB7XG4gICAgICBbcGFnZVRlbXBsYXRlXTogcGFnZVRlbXBsYXRlU2xvdHMsXG4gICAgfTtcbiAgfVxuXG4gIGlmIChzZWN0aW9uICYmIHBhZ2VTbG90UG9zaXRpb24pIHtcbiAgICBjb25zdCBzZWN0aW9uU2xvdHM6IGFueSA9IHt9O1xuICAgIGlmIChicmVha3BvaW50KSB7XG4gICAgICBzZWN0aW9uU2xvdHNbYnJlYWtwb2ludF0gPSB7IHNsb3RzOiBbcGFnZVNsb3RQb3NpdGlvbl0gfTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VjdGlvblNsb3RzLnNsb3RzID0gW3BhZ2VTbG90UG9zaXRpb25dO1xuICAgIH1cbiAgICBpZiAobGF5b3V0Q29uZmlnLmxheW91dFNsb3RzKSB7XG4gICAgICBsYXlvdXRDb25maWcubGF5b3V0U2xvdHNbc2VjdGlvbl0gPSBzZWN0aW9uU2xvdHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxheW91dENvbmZpZy5sYXlvdXRTbG90cyA9IHtcbiAgICAgICAgW3NlY3Rpb25dOiBzZWN0aW9uU2xvdHMsXG4gICAgICB9O1xuICAgIH1cbiAgfVxuICByZXR1cm4gbGF5b3V0Q29uZmlnO1xufVxuIl19