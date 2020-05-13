import { Injectable, Renderer2 } from '@angular/core';
import { SmartEditService } from '../../smart-edit/services/smart-edit.service';
import { ContentSlotComponentData } from '../model/content-slot-component-data.model';
import { ContentSlotData } from '../model/content-slot-data.model';

@Injectable({
  providedIn: 'root',
})
export class DynamicAttributeService {
  constructor(protected smartEditService: SmartEditService) {}

  /**
   * Add dynamic attributes to DOM. These attributes are extracted from the properties of cms items received from backend.
   * There can by many different groups of properties, one of them is smartedit. But EC allows addons to create different groups.
   * For example, personalization may add 'script' group etc.
   * @param element: slot or cms component element
   * @param renderer
   * @param cmsRenderingContext: an object containing properties in each cms item response data
   */
  addDynamicAttributes(
    element: Element,
    renderer: Renderer2,
    cmsRenderingContext: {
      componentData?: ContentSlotComponentData;
      slotData?: ContentSlotData;
    }
  ): void {
    const properties =
      cmsRenderingContext.componentData?.properties ||
      cmsRenderingContext.slotData?.properties;

    if (properties && this.smartEditService.isLaunchedInSmartEdit()) {
      // check each group of properties, e.g. smartedit
      Object.keys(properties).forEach((group) => {
        const name = 'data-' + group + '-';
        const groupProps = properties[group];

        // check each property in the group
        Object.keys(groupProps).forEach((propName) => {
          const propValue = groupProps[propName];
          if (propName === 'classes') {
            const classes = propValue.split(' ');
            classes.forEach((classItem) => {
              element.classList.add(classItem);
            });
          } else {
            renderer.setAttribute(
              element,
              name +
                propName
                  .split(/(?=[A-Z])/)
                  .join('-')
                  .toLowerCase(),
              propValue
            );
          }
        });
      });
    }
  }
}
