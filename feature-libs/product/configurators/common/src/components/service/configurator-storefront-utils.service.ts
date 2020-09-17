import { isPlatformBrowser } from '@angular/common';
import { EventEmitter, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GenericConfigurator } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from './../../core/model/configurator.model';
import { ConfigFormUpdateEvent } from '../form/configurator-form.event';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorStorefrontUtilsService {
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
      if (element && !this.isInViewport(element)) {
        this.scroll(element);
      }
    }
  }

  /**
   * Submit value is called after the mouse down event is fired.
   *
   * @param {string} value - Value to update
   * @param {string} ownerKey - Owner key
   * @param {Configurator.Attribute} attribute - Attribute
   * @param {EventEmitter<ConfigFormUpdateEvent>} selectionChange - Selection change event emitter
   */
  onMouseDown(
    value: string,
    ownerKey: string,
    attribute: Configurator.Attribute,
    selectionChange: EventEmitter<ConfigFormUpdateEvent>
  ) {
    this.submitValue(value, ownerKey, attribute, selectionChange);
  }

  /**
   * Submit value is called after the focus out event is fired.
   *
   * @param event
   * @param attributeRadioButtonForm
   * @param {string} ownerKey - Owner key
   * @param {Configurator.Attribute} attribute - Attribute
   * @param {EventEmitter<ConfigFormUpdateEvent>} selectionChange - Selection change event emitter
   * @param {boolean} isChangeTriggeredByKeyboard - Boolean value that defined whether the change is triggered by keyboard or not
   */
  onFocusOut(
    event: FocusEvent,
    attributeRadioButtonForm: FormControl,
    ownerKey: string,
    attribute: Configurator.Attribute,
    selectionChange: EventEmitter<ConfigFormUpdateEvent>,
    isChangeTriggeredByKeyboard: boolean
  ) {
    if (
      this.attributeLostFocus(event) &&
      attributeRadioButtonForm.value !== null &&
      isChangeTriggeredByKeyboard === true
    ) {
      this.submitValue(
        attributeRadioButtonForm?.value,
        ownerKey,
        attribute,
        selectionChange
      );
    }
  }

  /**
   * Submit a value.
   *
   * @param {string} value - Value to update
   * @param {string} ownerKey - Owner key
   * @param {Configurator.Attribute} attribute - Attribute
   * @param {EventEmitter<ConfigFormUpdateEvent>} selectionChange - Selection change event emitter
   */
  submitValue(
    value: string,
    ownerKey: string,
    attribute: Configurator.Attribute,
    selectionChange: EventEmitter<ConfigFormUpdateEvent>
  ): void {
    const event: ConfigFormUpdateEvent = {
      productCode: ownerKey,
      changedAttribute: {
        name: attribute?.name,
        selectedSingleValue: value,
        uiType: attribute?.uiType,
        groupId: attribute?.groupId,
      },
    };

    selectionChange.emit(event);
  }

  /**
   * Removes the value ID from the element ID to get the attribute ID.
   *
   * @param {string} id - HTML element ID
   */
  getAttributeId(id: string): string {
    const index = id?.lastIndexOf('--');
    return id?.substring(0, index);
  }

  /**
   * Returns true if the focus changed from one attribute to any other element.
   * Returns false if the focus change occurred inside the same attribute (i.e. from one value to another of the same attribute)
   *
   * @param {FocusEvent} event FocusEvent to be checked
   */
  attributeLostFocus(event: FocusEvent): boolean {
    let attributeLostFocus = false;
    const from: HTMLElement = event.target as HTMLElement;
    const to: HTMLElement = event.relatedTarget as HTMLElement;
    // Avoid submit on round-trip (in this case event.relatedTarget is null)
    if (to === null) {
      return attributeLostFocus;
    }
    if (this.getAttributeId(from?.id) !== this.getAttributeId(to?.id)) {
      attributeLostFocus = true;
    }

    return attributeLostFocus;
  }
}
