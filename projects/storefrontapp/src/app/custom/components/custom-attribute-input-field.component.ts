/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ThemePalette } from '@angular/material/core';

import {
  Configurator,
  ConfiguratorAttributeInputFieldComponent,
} from '@spartacus/product-configurator/rulebased';
import { Color } from '@angular-material-components/color-picker';
import { debounce } from 'rxjs/operators';
import { timer } from 'rxjs';

@Component({
  selector: 'custom-attribute-input-field',
  templateUrl: './custom-attribute-input-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomAttributeInputFieldComponent
  extends ConfiguratorAttributeInputFieldComponent
  implements OnInit
{
  inittialContent: Color = new Color(0, 0, 0);
  colorCtr = new FormControl(this.inittialContent);
  color: ThemePalette = 'primary';

  ngOnInit(): void {
    const value = this.attributeComponentContext.attribute.userInput;
    const colours = value?.split(',');
    if (colours) {
      const content: Color = new Color(
        parseInt(colours[0]),
        parseInt(colours[1]),
        parseInt(colours[2])
      );
      this.colorCtr.setValue(content);
    }
    this.sub = this.colorCtr.valueChanges
      .pipe(
        debounce(() =>
          timer(
            this.config.productConfigurator?.updateDebounceTime?.input ??
              this.FALLBACK_DEBOUNCE_TIME
          )
        )
      )
      .subscribe(() => this.onChange());
  }

  onChange(): void {
    if (!this.colorCtr.invalid) {
      const color = this.colorCtr.value;
      if (color) {
        const valueForChange = color.r + ',' + color.g + ',' + color.b;

        this.configuratorCommonsService.updateConfiguration(
          this.ownerKey,
          {
            ...this.attribute,
            userInput: valueForChange,
            selectedSingleValue: valueForChange,
          },
          Configurator.UpdateType.ATTRIBUTE
        );
      }
    }
  }
}
