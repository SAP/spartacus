/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeMultiSelectionBaseComponent } from '../base/configurator-attribute-multi-selection-base.component';

@Component({
  selector: 'cx-configurator-attribute-checkbox-list',
  templateUrl: './configurator-attribute-checkbox-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  onSelect(): void {
    const selectedValues =
      this.configUtilsService.assembleValuesForMultiSelectAttributes(
        this.attributeCheckBoxForms,
        this.attribute
      );

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
      this.onSelect();
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
      this.onSelect();
    } else {
      this.onHandleAttributeQuantity(eventObject);
    }
  }
}
