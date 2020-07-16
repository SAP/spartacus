import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  Configurator,
  ConfiguratorGroupsService,
  GenericConfigurator,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConfigUtilsService {
  constructor(private configuratorGroupsService: ConfiguratorGroupsService) {}

  /**
   * Does the configuration belong to a cart entry, or has the group been visited already?
   * In both cases we need to render indications for mandatory attributes
   * @param owner
   * @param groupId
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
   * Assemble an attribute value with the currently selected values from a checkbox list
   * @param controlArray
   * @param attribute
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
}
