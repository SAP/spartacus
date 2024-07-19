/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  isDevMode,
  OnInit,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { LoggerService } from '@spartacus/core';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfiguratorDeltaRenderingService } from '../../delta-rendering/configurator-delta-rendering.service';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeMultiSelectionBaseComponent } from '../base/configurator-attribute-multi-selection-base.component';

@Component({
  selector: 'cx-configurator-attribute-checkbox-list',
  templateUrl: './configurator-attribute-checkbox-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfiguratorDeltaRenderingService],
})
export class ConfiguratorAttributeCheckBoxListComponent
  extends ConfiguratorAttributeMultiSelectionBaseComponent
  implements OnInit
{
  attributeCheckBoxForms = new Array<UntypedFormControl>();

  group: string;

  protected logger = inject(LoggerService);

  constructor(
    protected configUtilsService: ConfiguratorStorefrontUtilsService,
    protected quantityService: ConfiguratorAttributeQuantityService,
    protected attributeComponentContext: ConfiguratorAttributeCompositionContext,
    protected configuratorCommonsService: ConfiguratorCommonsService
  ) {
    super(
      quantityService,
      attributeComponentContext,
      configuratorCommonsService
    );
    this.group = attributeComponentContext.group.id;
  }

  ngOnInit(): void {
    const disabled = !this.allowZeroValueQuantity;

    for (const value of this.attribute.values ?? []) {
      let attributeCheckBoxForm;

      if (value.selected) {
        attributeCheckBoxForm = new UntypedFormControl({
          value: true,
          disabled: disabled,
        });
      } else {
        attributeCheckBoxForm = new UntypedFormControl(false);
      }
      this.attributeCheckBoxForms.push(attributeCheckBoxForm);
    }
  }

  get allowZeroValueQuantity(): boolean {
    return this.quantityService.allowZeroValueQuantity(this.attribute);
  }

  onSelect(valueCode: string | undefined): void {
    const selectedValues =
      this.configUtilsService.assembleValuesForMultiSelectAttributes(
        this.attributeCheckBoxForms,
        this.attribute
      );
    if (valueCode) {
      this.configUtilsService.setLastSelected(this.attribute.name, valueCode);
    }
    this.configuratorCommonsService.updateConfiguration(
      this.ownerKey,
      {
        ...this.attribute,
        values: selectedValues,
      },
      Configurator.UpdateType.ATTRIBUTE
    );
  }

  onChangeValueQuantity(
    eventObject: any,
    valueCode: string,
    formIndex: number
  ): void {
    if (eventObject === 0) {
      this.attributeCheckBoxForms[formIndex].setValue(false);
      this.onSelect(valueCode);
      return;
    }

    const value: Configurator.Value | undefined = this.configUtilsService
      .assembleValuesForMultiSelectAttributes(
        this.attributeCheckBoxForms,
        this.attribute
      )
      .find((item) => item.valueCode === valueCode);

    if (!value) {
      if (isDevMode()) {
        this.logger.warn('no value for event:', eventObject);
      }

      return;
    }

    value.quantity = eventObject;

    this.configuratorCommonsService.updateConfiguration(
      this.ownerKey,
      {
        ...this.attribute,
        values: [value],
      },
      Configurator.UpdateType.VALUE_QUANTITY
    );
  }

  onChangeQuantity(eventObject: any): void {
    if (!eventObject) {
      this.attributeCheckBoxForms.forEach((_, index) =>
        this.attributeCheckBoxForms[index].setValue(false)
      );
      this.onSelect(undefined);
    } else {
      this.onHandleAttributeQuantity(eventObject);
    }
  }

  /**
   * Checks if the value is the last selected value set bei onSelect method.
   * @param valueCode
   * @returns boolean
   */
  isLastSelected(valueCode: string): boolean {
    return this.configUtilsService.isLastSelected(
      this.attribute.name,
      valueCode
    );
  }
}
