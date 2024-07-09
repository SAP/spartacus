/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import { UntypedFormControl } from '@angular/forms';
import {
  Config,
  ObjectComparisonUtils,
  TranslationService,
  useFeatureStyles,
} from '@spartacus/core';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';

import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { EMPTY, filter, Observable, of, switchMap, tap } from 'rxjs';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeSingleSelectionBaseComponent } from '../base/configurator-attribute-single-selection-base.component';

@Component({
  selector: 'cx-configurator-attribute-drop-down',
  templateUrl: './configurator-attribute-drop-down.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeDropDownComponent
  extends ConfiguratorAttributeSingleSelectionBaseComponent
  implements OnInit
{
  attributeDropDownForm = new UntypedFormControl('');
  group: string;

  protected configRouterExtractorService = inject(
    ConfiguratorRouterExtractorService
  );
  protected config = inject(Config);

  protected isInitialRenderingOfDomainValues: boolean = true;
  protected lastAttrSupplement: Configurator.AttributeSupplement | undefined;

  renderDomainValues$: Observable<boolean> = this.isAsyncPricing
    ? this.configRouterExtractorService.extractRouterData().pipe(
        switchMap((routerData) => {
          return this.configuratorCommonsService
            .getConfiguration(routerData.owner)
            .pipe(
              // Initially render domain values (DDLB options) without prices, so UI is not blocked, otherwise only re-ender if prices changed.
              // Changes of attribute itself are already handled in the attribute composition directive.
              filter(
                (config) =>
                  this.isInitialRenderingOfDomainValues ||
                  !!config.priceSupplements
              ),
              switchMap((config) => {
                if (this.isInitialRenderingOfDomainValues) {
                  return of(true);
                }
                const pricesChanged = this.checkedForValuePriceChanges(config);
                return pricesChanged ? of(true) : EMPTY;
              }),
              tap(() => (this.isInitialRenderingOfDomainValues = false))
            );
        })
      )
    : of(true); // no async pricing -> we can render directly with prices

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
    useFeatureStyles('productConfiguratorAttributeTypesV2');
  }

  /**
   * Extracts the relevant value prices from the price supplements
   * and stores them within the component. Returns a boolean indicating
   * whether there were any changes.
   * @param config current config
   * @returns {true}, only if at least one value price changed
   */
  protected checkedForValuePriceChanges(
    config: Configurator.Configuration
  ): boolean {
    const attrKey = this.attribute.key ?? '';
    const attrSupplement = config.priceSupplements?.find(
      (supplement) => supplement.attributeUiKey === attrKey
    );
    const changed = !ObjectComparisonUtils.deepEqualObjects(
      this.lastAttrSupplement ?? {},
      attrSupplement ?? {}
    );
    if (changed) {
      this.lastAttrSupplement = attrSupplement;
      attrSupplement?.valueSupplements.forEach((valueSupplement) =>
        this.onPriceChanged({
          source: {
            attributeKey: attrKey,
            valueName: valueSupplement.attributeValueKey,
          },
          valuePrice: valueSupplement.priceValue,
        })
      );
    }
    return changed;
  }

  ngOnInit() {
    this.attributeDropDownForm.setValue(this.attribute.selectedSingleValue);
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
}
