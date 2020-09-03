import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Configurator, GenericConfigurator } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ConfiguratorGroupsService } from './../../core/facade/configurator-groups.service';

@Injectable({
  providedIn: 'root',
})
export class ConfigUtilsService {
  constructor(
    protected configuratorGroupsService: ConfiguratorGroupsService,
    @Inject(PLATFORM_ID) protected platformId: any
  ) {}

  /**
   * Does the configuration belong to a cart entry, or has the group been visited already?
   * In both cases we need to render indications for mandatory attributes.
   * This method emits only once and then stops further emissions.
   *
   * @param {GenericConfigurator.Owner} owner -
   * @param {string} groupId - Group ID
   * @return {Observable<boolean>} - Returns 'Observable<true>' if the cart entry or group are visited, otherwise 'Observable<false>'
   */
  isCartEntryOrGroupVisited(
    owner: GenericConfigurator.Owner,
    groupId: string
  ): Observable<boolean> {
    return this.configuratorGroupsService.isGroupVisited(owner, groupId).pipe(
      take(1),
      map((result) =>
        result ? true : owner.type === GenericConfigurator.OwnerType.CART_ENTRY
      )
    );
  }

  /**
   * Assemble an attribute value with the currently selected values from a checkbox list.
   *
   * @param {FormControl[]} controlArray - Control array
   * @param {Configurator.Attribute} attribute -  Configuration attribute
   * @return {Configurator.Value[]} - list of configurator values
   */
  assembleValuesForMultiSelectAttributes(
    controlArray: FormControl[],
    attribute: Configurator.Attribute
  ): Configurator.Value[] {
    const localAssembledValues: Configurator.Value[] = [];

    for (let i = 0; i < controlArray.length; i++) {
      const localAttributeValue: Configurator.Value = {};
      localAttributeValue.valueCode = attribute.values[i].valueCode;
      localAttributeValue.name = attribute.values[i].name;
      localAttributeValue.selected = controlArray[i].value;
      localAssembledValues.push(localAttributeValue);
    }
    return localAssembledValues;
  }

  /**
   * Verifies whether the HTML element is in the viewport.
   *
   * @param {Element} element - HTML element
   * @return {boolean} Returns 'true' if the HTML element is in the viewport, otherwise 'false'
   */
  protected isInViewport(element: Element): boolean {
    const bounding = element.getBoundingClientRect();
    return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <=
        (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  /**
   * Scrolls to the corresponding HTML element.
   *
   * @param {Element | HTMLElement} element - HTML element
   */
  protected scroll(element: Element | HTMLElement): void {
    let topOffset = 0;
    if (element instanceof HTMLElement) {
      topOffset = element.offsetTop;
    }
    window.scroll(0, topOffset);
  }

  /**
   * Scrolls to the corresponding configuration element in the HTML tree.
   *
   * @param {string} selector - Selector of the HTML element
   */
  scrollToConfigurationElement(selector: string): void {
    if (isPlatformBrowser(this.platformId)) {
      // we don't want to run this logic when doing SSR
      const element = document.querySelector(selector);
      if (!this.isInViewport(element)) {
        this.scroll(element);
      }
    }
  }
}
