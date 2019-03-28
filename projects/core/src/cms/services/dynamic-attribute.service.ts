import { Injectable, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicAttributeService {
  /**
   * Add dynamic attributes to DOM. These attributes are extracted from the properties of cms items received from backend.
   * @param cmsItem : can be page, slot or cms component
   */
  addDynamicAttributes(
    properties: any,
    element: Element,
    renderer: Renderer2
  ): void {
    if (properties) {
      // check each group of properties, e.g. smartedit
      Object.keys(properties).forEach(group => {
        const name = 'data-' + group + '-';
        const groupProps = properties[group];

        // check each property in the group
        Object.keys(groupProps).forEach(propName => {
          const propValue = groupProps[propName];
          if (propName === 'classes') {
            element.classList.add(propValue);
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
