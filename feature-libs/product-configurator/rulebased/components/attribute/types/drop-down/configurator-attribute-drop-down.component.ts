/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CdkListbox, CdkOption, ListboxValueChangeEvent } from '@angular/cdk/listbox';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';

import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
} from '@angular/forms';
import {
  Config,
  FeatureDirective,
  TranslatePipe,
  TranslationService,
} from '@spartacus/core';
import { FocusDirective } from '@spartacus/storefront';
import { take } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorPriceComponent } from '../../../price/configurator-price.component';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
import { ConfiguratorShowMoreComponent } from '../../../show-more/configurator-show-more.component';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfiguratorAttributePriceChangeService } from '../../price-change/configurator-attribute-price-change.service';
import { ConfiguratorAttributeQuantityComponent } from '../../quantity/configurator-attribute-quantity.component';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeSingleSelectionBaseComponent } from '../base/configurator-attribute-single-selection-base.component';
import { ConfiguratorAttributeInputFieldComponent } from '../input-field/configurator-attribute-input-field.component';
import { ConfiguratorAttributeNumericInputFieldComponent } from '../numeric-input-field/configurator-attribute-numeric-input-field.component';

@Component({
  selector: 'cx-configurator-attribute-drop-down',
  templateUrl: './configurator-attribute-drop-down.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfiguratorAttributePriceChangeService],
  imports: [
    NgIf,
    NgClass,
    FocusDirective,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    FeatureDirective,
    CdkListbox,
    CdkOption,
    ConfiguratorShowMoreComponent,
    ConfiguratorPriceComponent,
    ConfiguratorAttributeQuantityComponent,
    ConfiguratorAttributeNumericInputFieldComponent,
    ConfiguratorAttributeInputFieldComponent,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class ConfiguratorAttributeDropDownComponent
  extends ConfiguratorAttributeSingleSelectionBaseComponent
  implements OnInit, OnDestroy
{
  attributeDropDownForm = new UntypedFormControl('');
  group: string;
  isOpen = false;
  dropdownDirection: 'down' | 'up' = 'down';

  @ViewChild('dropdownTrigger')
  protected dropdownTriggerRef?: ElementRef<HTMLButtonElement>;

  @ViewChild(CdkListbox)
  protected listbox?: CdkListbox<string>;

  protected readonly DROPDOWN_PANEL_MAX_HEIGHT = 200;

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly ngZone = inject(NgZone);
  private scrollHandler?: EventListener;

  protected config = inject(Config);

  constructor(
    protected quantityService: ConfiguratorAttributeQuantityService,
    protected translation: TranslationService,
    protected attributeComponentContext: ConfiguratorAttributeCompositionContext,
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService
  ) {
    super(
      quantityService,
      translation,
      attributeComponentContext,
      configuratorCommonsService,
      configuratorStorefrontUtilsService
    );

    this.group = attributeComponentContext.group.id;
  }

  ngOnInit() {
    this.attributeDropDownForm.setValue(this.attribute.selectedSingleValue);
  }

  /**
   * Values bound to the CDK listbox (single selection is still an array).
   */
  get listboxValue(): string[] {
    const selectedCode = this.getSelectedValue()?.valueCode;
    return selectedCode ? [selectedCode] : [];
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.updateDropdownDirection();
      this.attachScrollListener();
      this.focusListboxAfterOpen();
    } else {
      this.detachScrollListener();
      this.dropdownTriggerRef?.nativeElement.focus();
    }
  }

  closeDropdown(): void {
    const wasOpen = this.isOpen;
    this.isOpen = false;
    this.detachScrollListener();
    if (wasOpen) {
      this.dropdownTriggerRef?.nativeElement.focus();
    }
  }

  ngOnDestroy(): void {
    this.detachScrollListener();
  }

  /**
   * Handles CDK listbox selection changes (keyboard or pointer).
   */
  onListboxValueChange(event: ListboxValueChangeEvent<string>): void {
    const value = event.value[0];
    if (value !== undefined) {
      this.selectOption(value);
    }
  }

  selectOption(valueCode: string): void {
    this.attributeDropDownForm.setValue(valueCode);
    this.onSelect(valueCode);
    this.closeDropdown();
  }

  getOptionLabel(item: Configurator.Value | undefined): string {
    return this.getLabel(this.expMode, item?.valueDisplay, item?.valueCode);
  }

  getOptionPriceDisplay(
    item: Configurator.Value,
    changedPrices: Record<string, Configurator.PriceDetails>
  ): string | undefined {
    const enriched = this.enrichValueWithPrice(item, changedPrices);
    if (!enriched?.valuePrice?.value || enriched.selected) {
      return undefined;
    }
    const formatted = enriched.valuePrice.formattedValue ?? '';
    return enriched.valuePrice.value > 0 ? '+' + formatted : formatted;
  }

  getSelectedValue(): Configurator.Value | undefined {
    return this.attribute.values?.find((value) => value?.selected);
  }

  /**
   * Retrieves a selected value description.
   *
   * @returns - if a selected value description is defined then it will be returned, otherwise an empty string
   */
  getSelectedValueDescription(): string {
    return this.getSelectedValue()?.description ?? '';
  }

  private focusListboxAfterOpen(): void {
    this.ngZone.onStable.pipe(take(1)).subscribe(() => {
      this.listbox?.focus();
    });
  }

  private updateDropdownDirection(): void {
    const rect = this.dropdownTriggerRef?.nativeElement.getBoundingClientRect();
    if (!rect) {
      return;
    }
    this.dropdownDirection =
      window.innerHeight - rect.bottom >= this.DROPDOWN_PANEL_MAX_HEIGHT
        ? 'down'
        : 'up';
  }

  private attachScrollListener(): void {
    this.scrollHandler = () => {
      this.closeDropdown();
      this.cdr.detectChanges();
    };
    window.addEventListener('scroll', this.scrollHandler, true);
  }

  private detachScrollListener(): void {
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler, true);
      this.scrollHandler = undefined;
    }
  }
}
