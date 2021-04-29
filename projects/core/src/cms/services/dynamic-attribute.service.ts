import { Injectable, Renderer2 } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { UnifiedInjector } from '../../lazy-loading/unified-injector';
import { SmartEditService } from '../../smart-edit/services/smart-edit.service';
import { getLastValueSync } from '../../util/rxjs/get-last-value-sync';
import { ComponentDecorator } from '../decorators/component-decorator';
import { SlotDecorator } from '../decorators/slot-decorator';
import { ContentSlotComponentData } from '../model/content-slot-component-data.model';
import { ContentSlotData } from '../model/content-slot-data.model';

/**
 * Service that used to add dynamic attributes to CMS component
 * and slot elements.
 */
@Injectable({
  providedIn: 'root',
})
export class DynamicAttributeService {
  private componentDecorators$ = this.unifiedInjector
    .getMulti(ComponentDecorator)
    .pipe(shareReplay(1));

  private slotDecorators$ = this.unifiedInjector
    .getMulti(SlotDecorator)
    .pipe(shareReplay(1));

  constructor(
    // TODO: remove this SmartEditService in 4.0
    protected smartEditService: SmartEditService,
    protected unifiedInjector?: UnifiedInjector
  ) {}

  /**
   * @deprecated since 3.2, use functions addAttributesToComponent and addAttributesToSlot instead
   *
   * Add dynamic attributes to DOM.
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

  /**
   * Add dynamic attributes to CMS component element
   * @param element: CMS component element
   * @param renderer
   * @param componentData: component data
   */
  addAttributesToComponent(
    element: Element,
    renderer: Renderer2,
    componentData?: ContentSlotComponentData
  ) {
    if (this.smartEditService.isLaunchedInSmartEdit()) {
      this.addDynamicAttributes(element, renderer, { componentData });
      return;
    }

    (getLastValueSync(this.componentDecorators$) || []).forEach((decorator) =>
      decorator.decorate(element, renderer, componentData)
    );
  }

  /**
   * Add dynamic attributes to CMS slot element
   * @param element: CMS slot element
   * @param renderer
   * @param slotData: slot data
   */
  addAttributesToSlot(
    element: Element,
    renderer: Renderer2,
    slotData?: ContentSlotData
  ) {
    if (this.smartEditService.isLaunchedInSmartEdit()) {
      this.addDynamicAttributes(element, renderer, { slotData });
      return;
    }

    (getLastValueSync(this.slotDecorators$) || []).forEach((decorator) =>
      decorator.decorate(element, renderer, slotData)
    );
  }
}
