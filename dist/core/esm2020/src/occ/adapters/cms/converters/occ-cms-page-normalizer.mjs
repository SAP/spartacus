/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CMS_FLEX_COMPONENT_TYPE, JSP_INCLUDE_CMS_COMPONENT_TYPE, } from '../../../../cms/config/cms-config';
import { PageRobotsMeta, } from '../../../../cms/model/page.model';
import { Occ } from '../../../occ-models/occ.models';
import * as i0 from "@angular/core";
export class OccCmsPageNormalizer {
    convert(source, target = {}) {
        this.normalizePageData(source, target);
        this.normalizePageSlotData(source, target);
        this.normalizePageComponentData(source, target);
        this.normalizeComponentData(source, target);
        return target;
    }
    /**
     * Converts the OCC cms page model to the `Page` in the `CmsStructureModel`.
     */
    normalizePageData(source, target) {
        if (!source) {
            return;
        }
        const page = {};
        if (source.name) {
            page.name = source.name;
        }
        if (source.typeCode) {
            page.type = source.typeCode;
        }
        if (source.label) {
            page.label = source.label;
        }
        if (source.template) {
            page.template = source.template;
        }
        if (source.uid) {
            page.pageId = source.uid;
        }
        if (source.title) {
            page.title = source.title;
        }
        if (source.description) {
            page.description = source.description;
        }
        if (source.properties) {
            page.properties = source.properties;
        }
        this.normalizeRobots(source, page);
        target.page = page;
    }
    /**
     * Adds a ContentSlotData for each page slot in the `CmsStructureModel`.
     */
    normalizePageSlotData(source, target) {
        if (!source?.contentSlots) {
            return;
        }
        if (source.contentSlots.contentSlot &&
            !Array.isArray(source.contentSlots.contentSlot)) {
            source.contentSlots.contentSlot = [source.contentSlots.contentSlot];
        }
        target.page = target.page ?? {};
        target.page.slots = {};
        for (const slot of source.contentSlots.contentSlot ?? []) {
            if (slot.position) {
                target.page.slots[slot.position] = {};
                if (slot.properties) {
                    target.page.slots[slot.position].properties = slot.properties;
                }
            }
        }
    }
    /**
     * Registers the `ContentSlotComponentData` for each component.
     */
    normalizePageComponentData(source, target) {
        if (!source?.contentSlots?.contentSlot) {
            return;
        }
        for (const slot of source.contentSlots.contentSlot) {
            if (Array.isArray(slot.components?.component)) {
                for (const component of slot.components?.component ?? []) {
                    const comp = {
                        uid: component.uid,
                        typeCode: component.typeCode,
                    };
                    if (component.properties) {
                        comp.properties = component.properties;
                    }
                    comp.flexType = this.getFlexTypeFromComponent(component);
                    if (slot.position) {
                        const targetSlot = target.page?.slots?.[slot.position];
                        if (targetSlot) {
                            if (!targetSlot.components) {
                                targetSlot.components = [];
                            }
                            targetSlot.components.push(comp);
                        }
                    }
                }
            }
        }
    }
    /**
     * Returns the flex type based on the configuration of component properties
     */
    getFlexTypeFromComponent(component) {
        if (component.typeCode === CMS_FLEX_COMPONENT_TYPE) {
            return component.flexType;
        }
        else if (component.typeCode === JSP_INCLUDE_CMS_COMPONENT_TYPE) {
            return component.uid;
        }
        return component.typeCode;
    }
    /**
     * Adds the actual component data whenever available in the CMS page data.
     *
     * If the data is not populated in this payload, it is loaded separately
     * (`OccCmsComponentAdapter`).
     */
    normalizeComponentData(source, target) {
        if (!source?.contentSlots?.contentSlot) {
            return;
        }
        for (const slot of source.contentSlots.contentSlot) {
            for (const component of slot.components?.component ?? []) {
                // while we're hoping to get this right from the backend api,
                // the OCC api stills seems out of sync with the right model.
                if (component.modifiedtime) {
                    component.modifiedTime = component.modifiedtime;
                    delete component.modifiedtime;
                }
                // we don't put properties into component state
                if (component.properties) {
                    component.properties = undefined;
                }
                if (!target.components) {
                    target.components = [];
                }
                target.components.push(component);
            }
        }
    }
    /**
     * Normalizes the page robot string to an array of `PageRobotsMeta` items.
     */
    normalizeRobots(source, target) {
        const robots = [];
        if (source.robotTag) {
            switch (source.robotTag) {
                case Occ.PageRobots.INDEX_FOLLOW:
                    robots.push(PageRobotsMeta.INDEX);
                    robots.push(PageRobotsMeta.FOLLOW);
                    break;
                case Occ.PageRobots.NOINDEX_FOLLOW:
                    robots.push(PageRobotsMeta.NOINDEX);
                    robots.push(PageRobotsMeta.FOLLOW);
                    break;
                case Occ.PageRobots.INDEX_NOFOLLOW:
                    robots.push(PageRobotsMeta.INDEX);
                    robots.push(PageRobotsMeta.NOFOLLOW);
                    break;
                case Occ.PageRobots.NOINDEX_NOFOLLOW:
                    robots.push(PageRobotsMeta.NOINDEX);
                    robots.push(PageRobotsMeta.NOFOLLOW);
                    break;
            }
        }
        target.robots = robots;
    }
}
OccCmsPageNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCmsPageNormalizer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccCmsPageNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCmsPageNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCmsPageNormalizer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWNtcy1wYWdlLW5vcm1hbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9vY2MvYWRhcHRlcnMvY21zL2NvbnZlcnRlcnMvb2NjLWNtcy1wYWdlLW5vcm1hbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUNMLHVCQUF1QixFQUN2Qiw4QkFBOEIsR0FDL0IsTUFBTSxtQ0FBbUMsQ0FBQztBQUczQyxPQUFPLEVBR0wsY0FBYyxHQUNmLE1BQU0sa0NBQWtDLENBQUM7QUFFMUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOztBQUdyRCxNQUFNLE9BQU8sb0JBQW9CO0lBRy9CLE9BQU8sQ0FDTCxNQUFtQixFQUNuQixTQUE0QixFQUFFO1FBRTlCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDNUMsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVEOztPQUVHO0lBQ08saUJBQWlCLENBQ3pCLE1BQW1CLEVBQ25CLE1BQXlCO1FBRXpCLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxPQUFPO1NBQ1I7UUFDRCxNQUFNLElBQUksR0FBUyxFQUFFLENBQUM7UUFFdEIsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQ2YsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1NB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Q0FBQyxDQUFDO29CQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDckMsTUFBTTtnQkFDUixLQUFLLEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCO29CQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3JDLE1BQU07YUFDVDtTQUNGO1FBRUQsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDekIsQ0FBQzs7aUhBbk1VLG9CQUFvQjtxSEFBcEIsb0JBQW9CLGNBRFAsTUFBTTsyRkFDbkIsb0JBQW9CO2tCQURoQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENNU19GTEVYX0NPTVBPTkVOVF9UWVBFLFxuICBKU1BfSU5DTFVERV9DTVNfQ09NUE9ORU5UX1RZUEUsXG59IGZyb20gJy4uLy4uLy4uLy4uL2Ntcy9jb25maWcvY21zLWNvbmZpZyc7XG5pbXBvcnQgeyBDb250ZW50U2xvdENvbXBvbmVudERhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi9jbXMvbW9kZWwvY29udGVudC1zbG90LWNvbXBvbmVudC1kYXRhLm1vZGVsJztcbmltcG9ydCB7IENvbnRlbnRTbG90RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uL2Ntcy9tb2RlbC9jb250ZW50LXNsb3QtZGF0YS5tb2RlbCc7XG5pbXBvcnQge1xuICBDbXNTdHJ1Y3R1cmVNb2RlbCxcbiAgUGFnZSxcbiAgUGFnZVJvYm90c01ldGEsXG59IGZyb20gJy4uLy4uLy4uLy4uL2Ntcy9tb2RlbC9wYWdlLm1vZGVsJztcbmltcG9ydCB7IENvbnZlcnRlciB9IGZyb20gJy4uLy4uLy4uLy4uL3V0aWwvY29udmVydGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2NjIH0gZnJvbSAnLi4vLi4vLi4vb2NjLW1vZGVscy9vY2MubW9kZWxzJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBPY2NDbXNQYWdlTm9ybWFsaXplclxuICBpbXBsZW1lbnRzIENvbnZlcnRlcjxPY2MuQ01TUGFnZSwgQ21zU3RydWN0dXJlTW9kZWw+XG57XG4gIGNvbnZlcnQoXG4gICAgc291cmNlOiBPY2MuQ01TUGFnZSxcbiAgICB0YXJnZXQ6IENtc1N0cnVjdHVyZU1vZGVsID0ge31cbiAgKTogQ21zU3RydWN0dXJlTW9kZWwge1xuICAgIHRoaXMubm9ybWFsaXplUGFnZURhdGEoc291cmNlLCB0YXJnZXQpO1xuICAgIHRoaXMubm9ybWFsaXplUGFnZVNsb3REYXRhKHNvdXJjZSwgdGFyZ2V0KTtcbiAgICB0aGlzLm5vcm1hbGl6ZVBhZ2VDb21wb25lbnREYXRhKHNvdXJjZSwgdGFyZ2V0KTtcbiAgICB0aGlzLm5vcm1hbGl6ZUNvbXBvbmVudERhdGEoc291cmNlLCB0YXJnZXQpO1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgdGhlIE9DQyBjbXMgcGFnZSBtb2RlbCB0byB0aGUgYFBhZ2VgIGluIHRoZSBgQ21zU3RydWN0dXJlTW9kZWxgLlxuICAgKi9cbiAgcHJvdGVjdGVkIG5vcm1hbGl6ZVBhZ2VEYXRhKFxuICAgIHNvdXJjZTogT2NjLkNNU1BhZ2UsXG4gICAgdGFyZ2V0OiBDbXNTdHJ1Y3R1cmVNb2RlbFxuICApOiB2b2lkIHtcbiAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBwYWdlOiBQYWdlID0ge307XG5cbiAgICBpZiAoc291cmNlLm5hbWUpIHtcbiAgICAgIHBhZ2UubmFtZSA9IHNvdXJjZS5uYW1lO1xuICAgIH1cbiAgICBpZiAoc291cmNlLnR5cGVDb2RlKSB7XG4gICAgICBwYWdlLnR5cGUgPSBzb3VyY2UudHlwZUNvZGU7XG4gICAgfVxuICAgIGlmIChzb3VyY2UubGFiZWwpIHtcbiAgICAgIHBhZ2UubGFiZWwgPSBzb3VyY2UubGFiZWw7XG4gICAgfVxuICAgIGlmIChzb3VyY2UudGVtcGxhdGUpIHtcbiAgICAgIHBhZ2UudGVtcGxhdGUgPSBzb3VyY2UudGVtcGxhdGU7XG4gICAgfVxuICAgIGlmIChzb3VyY2UudWlkKSB7XG4gICAgICBwYWdlLnBhZ2VJZCA9IHNvdXJjZS51aWQ7XG4gICAgfVxuICAgIGlmIChzb3VyY2UudGl0bGUpIHtcbiAgICAgIHBhZ2UudGl0bGUgPSBzb3VyY2UudGl0bGU7XG4gICAgfVxuICAgIGlmIChzb3VyY2UuZGVzY3JpcHRpb24pIHtcbiAgICAgIHBhZ2UuZGVzY3JpcHRpb24gPSBzb3VyY2UuZGVzY3JpcHRpb247XG4gICAgfVxuICAgIGlmIChzb3VyY2UucHJvcGVydGllcykge1xuICAgICAgcGFnZS5wcm9wZXJ0aWVzID0gc291cmNlLnByb3BlcnRpZXM7XG4gICAgfVxuXG4gICAgdGhpcy5ub3JtYWxpemVSb2JvdHMoc291cmNlLCBwYWdlKTtcblxuICAgIHRhcmdldC5wYWdlID0gcGFnZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgQ29udGVudFNsb3REYXRhIGZvciBlYWNoIHBhZ2Ugc2xvdCBpbiB0aGUgYENtc1N0cnVjdHVyZU1vZGVsYC5cbiAgICovXG4gIHByb3RlY3RlZCBub3JtYWxpemVQYWdlU2xvdERhdGEoXG4gICAgc291cmNlOiBPY2MuQ01TUGFnZSxcbiAgICB0YXJnZXQ6IENtc1N0cnVjdHVyZU1vZGVsXG4gICk6IHZvaWQge1xuICAgIGlmICghc291cmNlPy5jb250ZW50U2xvdHMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgc291cmNlLmNvbnRlbnRTbG90cy5jb250ZW50U2xvdCAmJlxuICAgICAgIUFycmF5LmlzQXJyYXkoc291cmNlLmNvbnRlbnRTbG90cy5jb250ZW50U2xvdClcbiAgICApIHtcbiAgICAgIHNvdXJjZS5jb250ZW50U2xvdHMuY29udGVudFNsb3QgPSBbc291cmNlLmNvbnRlbnRTbG90cy5jb250ZW50U2xvdF07XG4gICAgfVxuICAgIHRhcmdldC5wYWdlID0gdGFyZ2V0LnBhZ2UgPz8ge307XG4gICAgdGFyZ2V0LnBhZ2Uuc2xvdHMgPSB7fTtcbiAgICBmb3IgKGNvbnN0IHNsb3Qgb2Ygc291cmNlLmNvbnRlbnRTbG90cy5jb250ZW50U2xvdCA/PyBbXSkge1xuICAgICAgaWYgKHNsb3QucG9zaXRpb24pIHtcbiAgICAgICAgdGFyZ2V0LnBhZ2Uuc2xvdHNbc2xvdC5wb3NpdGlvbl0gPSB7fSBhcyBDb250ZW50U2xvdERhdGE7XG4gICAgICAgIGlmIChzbG90LnByb3BlcnRpZXMpIHtcbiAgICAgICAgICB0YXJnZXQucGFnZS5zbG90c1tzbG90LnBvc2l0aW9uXS5wcm9wZXJ0aWVzID0gc2xvdC5wcm9wZXJ0aWVzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyB0aGUgYENvbnRlbnRTbG90Q29tcG9uZW50RGF0YWAgZm9yIGVhY2ggY29tcG9uZW50LlxuICAgKi9cbiAgcHJvdGVjdGVkIG5vcm1hbGl6ZVBhZ2VDb21wb25lbnREYXRhKFxuICAgIHNvdXJjZTogT2NjLkNNU1BhZ2UsXG4gICAgdGFyZ2V0OiBDbXNTdHJ1Y3R1cmVNb2RlbFxuICApOiB2b2lkIHtcbiAgICBpZiAoIXNvdXJjZT8uY29udGVudFNsb3RzPy5jb250ZW50U2xvdCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IHNsb3Qgb2Ygc291cmNlLmNvbnRlbnRTbG90cy5jb250ZW50U2xvdCkge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc2xvdC5jb21wb25lbnRzPy5jb21wb25lbnQpKSB7XG4gICAgICAgIGZvciAoY29uc3QgY29tcG9uZW50IG9mIHNsb3QuY29tcG9uZW50cz8uY29tcG9uZW50ID8/IFtdKSB7XG4gICAgICAgICAgY29uc3QgY29tcDogQ29udGVudFNsb3RDb21wb25lbnREYXRhID0ge1xuICAgICAgICAgICAgdWlkOiBjb21wb25lbnQudWlkLFxuICAgICAgICAgICAgdHlwZUNvZGU6IGNvbXBvbmVudC50eXBlQ29kZSxcbiAgICAgICAgICB9O1xuICAgICAgICAgIGlmIChjb21wb25lbnQucHJvcGVydGllcykge1xuICAgICAgICAgICAgY29tcC5wcm9wZXJ0aWVzID0gY29tcG9uZW50LnByb3BlcnRpZXM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29tcC5mbGV4VHlwZSA9IHRoaXMuZ2V0RmxleFR5cGVGcm9tQ29tcG9uZW50KGNvbXBvbmVudCk7XG5cbiAgICAgICAgICBpZiAoc2xvdC5wb3NpdGlvbikge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0U2xvdCA9IHRhcmdldC5wYWdlPy5zbG90cz8uW3Nsb3QucG9zaXRpb25dO1xuICAgICAgICAgICAgaWYgKHRhcmdldFNsb3QpIHtcbiAgICAgICAgICAgICAgaWYgKCF0YXJnZXRTbG90LmNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRTbG90LmNvbXBvbmVudHMgPSBbXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0YXJnZXRTbG90LmNvbXBvbmVudHMucHVzaChjb21wKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZmxleCB0eXBlIGJhc2VkIG9uIHRoZSBjb25maWd1cmF0aW9uIG9mIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0RmxleFR5cGVGcm9tQ29tcG9uZW50KGNvbXBvbmVudDogT2NjLkNvbXBvbmVudCB8IGFueSk6IHN0cmluZyB7XG4gICAgaWYgKGNvbXBvbmVudC50eXBlQ29kZSA9PT0gQ01TX0ZMRVhfQ09NUE9ORU5UX1RZUEUpIHtcbiAgICAgIHJldHVybiBjb21wb25lbnQuZmxleFR5cGU7XG4gICAgfSBlbHNlIGlmIChjb21wb25lbnQudHlwZUNvZGUgPT09IEpTUF9JTkNMVURFX0NNU19DT01QT05FTlRfVFlQRSkge1xuICAgICAgcmV0dXJuIGNvbXBvbmVudC51aWQ7XG4gICAgfVxuICAgIHJldHVybiBjb21wb25lbnQudHlwZUNvZGU7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyB0aGUgYWN0dWFsIGNvbXBvbmVudCBkYXRhIHdoZW5ldmVyIGF2YWlsYWJsZSBpbiB0aGUgQ01TIHBhZ2UgZGF0YS5cbiAgICpcbiAgICogSWYgdGhlIGRhdGEgaXMgbm90IHBvcHVsYXRlZCBpbiB0aGlzIHBheWxvYWQsIGl0IGlzIGxvYWRlZCBzZXBhcmF0ZWx5XG4gICAqIChgT2NjQ21zQ29tcG9uZW50QWRhcHRlcmApLlxuICAgKi9cbiAgcHJvdGVjdGVkIG5vcm1hbGl6ZUNvbXBvbmVudERhdGEoXG4gICAgc291cmNlOiBPY2MuQ01TUGFnZSxcbiAgICB0YXJnZXQ6IENtc1N0cnVjdHVyZU1vZGVsXG4gICk6IHZvaWQge1xuICAgIGlmICghc291cmNlPy5jb250ZW50U2xvdHM/LmNvbnRlbnRTbG90KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBzbG90IG9mIHNvdXJjZS5jb250ZW50U2xvdHMuY29udGVudFNsb3QpIHtcbiAgICAgIGZvciAoY29uc3QgY29tcG9uZW50IG9mIHNsb3QuY29tcG9uZW50cz8uY29tcG9uZW50ID8/IFtdKSB7XG4gICAgICAgIC8vIHdoaWxlIHdlJ3JlIGhvcGluZyB0byBnZXQgdGhpcyByaWdodCBmcm9tIHRoZSBiYWNrZW5kIGFwaSxcbiAgICAgICAgLy8gdGhlIE9DQyBhcGkgc3RpbGxzIHNlZW1zIG91dCBvZiBzeW5jIHdpdGggdGhlIHJpZ2h0IG1vZGVsLlxuICAgICAgICBpZiAoY29tcG9uZW50Lm1vZGlmaWVkdGltZSkge1xuICAgICAgICAgIGNvbXBvbmVudC5tb2RpZmllZFRpbWUgPSBjb21wb25lbnQubW9kaWZpZWR0aW1lO1xuICAgICAgICAgIGRlbGV0ZSBjb21wb25lbnQubW9kaWZpZWR0aW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gd2UgZG9uJ3QgcHV0IHByb3BlcnRpZXMgaW50byBjb21wb25lbnQgc3RhdGVcbiAgICAgICAgaWYgKGNvbXBvbmVudC5wcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgY29tcG9uZW50LnByb3BlcnRpZXMgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0YXJnZXQuY29tcG9uZW50cykge1xuICAgICAgICAgIHRhcmdldC5jb21wb25lbnRzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgdGFyZ2V0LmNvbXBvbmVudHMucHVzaChjb21wb25lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBOb3JtYWxpemVzIHRoZSBwYWdlIHJvYm90IHN0cmluZyB0byBhbiBhcnJheSBvZiBgUGFnZVJvYm90c01ldGFgIGl0ZW1zLlxuICAgKi9cbiAgcHJvdGVjdGVkIG5vcm1hbGl6ZVJvYm90cyhzb3VyY2U6IE9jYy5DTVNQYWdlLCB0YXJnZXQ6IFBhZ2UpOiB2b2lkIHtcbiAgICBjb25zdCByb2JvdHMgPSBbXTtcbiAgICBpZiAoc291cmNlLnJvYm90VGFnKSB7XG4gICAgICBzd2l0Y2ggKHNvdXJjZS5yb2JvdFRhZykge1xuICAgICAgICBjYXNlIE9jYy5QYWdlUm9ib3RzLklOREVYX0ZPTExPVzpcbiAgICAgICAgICByb2JvdHMucHVzaChQYWdlUm9ib3RzTWV0YS5JTkRFWCk7XG4gICAgICAgICAgcm9ib3RzLnB1c2goUGFnZVJvYm90c01ldGEuRk9MTE9XKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBPY2MuUGFnZVJvYm90cy5OT0lOREVYX0ZPTExPVzpcbiAgICAgICAgICByb2JvdHMucHVzaChQYWdlUm9ib3RzTWV0YS5OT0lOREVYKTtcbiAgICAgICAgICByb2JvdHMucHVzaChQYWdlUm9ib3RzTWV0YS5GT0xMT1cpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIE9jYy5QYWdlUm9ib3RzLklOREVYX05PRk9MTE9XOlxuICAgICAgICAgIHJvYm90cy5wdXNoKFBhZ2VSb2JvdHNNZXRhLklOREVYKTtcbiAgICAgICAgICByb2JvdHMucHVzaChQYWdlUm9ib3RzTWV0YS5OT0ZPTExPVyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgT2NjLlBhZ2VSb2JvdHMuTk9JTkRFWF9OT0ZPTExPVzpcbiAgICAgICAgICByb2JvdHMucHVzaChQYWdlUm9ib3RzTWV0YS5OT0lOREVYKTtcbiAgICAgICAgICByb2JvdHMucHVzaChQYWdlUm9ib3RzTWV0YS5OT0ZPTExPVyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGFyZ2V0LnJvYm90cyA9IHJvYm90cztcbiAgfVxufVxuIl19