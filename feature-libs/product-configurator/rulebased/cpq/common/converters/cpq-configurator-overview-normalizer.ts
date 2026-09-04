/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import {
  Converter,
  FeatureToggles,
  LoggerService,
  TranslationService,
} from '@spartacus/core';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { take } from 'rxjs/operators';
import { Cpq } from '../cpq.models';
import { CpqConfiguratorNormalizerUtilsService } from './cpq-configurator-normalizer-utils.service';

const INITIAL_OV_VALUE_ATTRIBUTE_NAME = '';

@Injectable()
export class CpqConfiguratorOverviewNormalizer
  implements Converter<Cpq.Configuration, Configurator.Overview>
{
  protected readonly NO_OPTION_SELECTED = 0;
  protected logger: LoggerService = inject(LoggerService);
  private featureToggles = inject(FeatureToggles);

  constructor(
    protected cpqConfiguratorNormalizerUtilsService: CpqConfiguratorNormalizerUtilsService,
    protected translation: TranslationService
  ) {}

  convert(
    source: Cpq.Configuration,
    target?: Configurator.Overview
  ): Configurator.Overview {
    const resultTarget: Configurator.Overview = {
      ...target,
      configId: source.configurationId ? source.configurationId : '',
      productCode: source.productSystemId,
      priceSummary:
        this.cpqConfiguratorNormalizerUtilsService.convertPriceSummary(source),
      groups: source.tabs
        ?.flatMap((tab) =>
          this.convertTab(
            tab,
            source.currencyISOCode,
            this.featureToggles.productConfiguratorCPQContainer
              ? source.sapContainers
              : undefined
          )
        )
        .filter((group) =>
          this.featureToggles.productConfiguratorCPQContainer
            ? this.hasOverviewContent(group)
            : !!group.attributes?.length
        ),
      totalNumberOfIssues: this.calculateTotalNumberOfIssues(source),
    };
    return resultTarget;
  }

  protected convertTab(
    tab: Cpq.Tab,
    currency: string,
    containers?: Cpq.Container[],
    parentRowGroupId?: string
  ): Configurator.GroupOverview {
    let ovAttributes: Configurator.AttributeOverview[] = [];
    tab.attributes?.forEach((attr) => {
      ovAttributes = ovAttributes.concat(this.convertAttribute(attr, currency));
    });
    const groupOverview: Configurator.GroupOverview = {
      id: this.createTabGroupId(tab.id, parentRowGroupId),
      groupDescription: tab.displayName,
      attributes: ovAttributes,
    };
    if (this.featureToggles.productConfiguratorCPQContainer) {
      this.attachContainers(
        groupOverview,
        tab.attributes,
        containers,
        currency
      );
    }
    if (tab.id === 0) {
      this.translation
        .translate('configurator.group.general')
        .pipe(take(1))
        .subscribe(
          (generalText) => (groupOverview.groupDescription = generalText)
        );
    }
    return groupOverview;
  }

  protected convertAttribute(
    attr: Cpq.Attribute,
    currency: string
  ): Configurator.AttributeOverview[] {
    const attributeOverviewType: Configurator.AttributeOverviewType =
      attr?.values &&
      this.cpqConfiguratorNormalizerUtilsService.hasAnyProducts(attr?.values)
        ? Configurator.AttributeOverviewType.BUNDLE
        : Configurator.AttributeOverviewType.GENERAL;
    const ovAttr: Configurator.AttributeOverview[] = [];
    this.convertAttributeValue(attr, currency).forEach((ovValue) => {
      ovAttr.push({
        ...ovValue,
        type: attributeOverviewType,
        attribute:
          this.cpqConfiguratorNormalizerUtilsService.convertAttributeLabel(
            attr
          ),
        attributeId: attr.stdAttrCode.toString(),
      });
    });
    return ovAttr;
  }

  protected convertAttributeValue(
    attr: Cpq.Attribute,
    currency: string
  ): Configurator.AttributeOverview[] {
    const ovValues: Configurator.AttributeOverview[] = [];
    switch (attr.displayAs) {
      case Cpq.DisplayAs.INPUT:
        if (attr?.dataType === Cpq.DataType.INPUT_STRING) {
          if (attr.userInput && attr.userInput.length > 0) {
            ovValues.push(this.extractValueUserInput(attr, currency));
          }
        } else {
          this.logger.warn(
            `Attribute '${attr.name}' (pA_ID=${(<any>attr).PA_ID}) is not supported and hence hidden from overview.`
          );
        }
        break;
      case Cpq.DisplayAs.RADIO_BUTTON:
      case Cpq.DisplayAs.DROPDOWN:
        const selectedValue = attr.values?.find(
          (val) => val.selected && val.paV_ID !== this.NO_OPTION_SELECTED
        );
        if (selectedValue) {
          ovValues.push(this.extractValue(selectedValue, attr, currency));
        }
        break;
      case Cpq.DisplayAs.CHECK_BOX:
        attr.values
          ?.filter((val) => val.selected)
          ?.forEach((valueSelected) => {
            ovValues.push(this.extractValue(valueSelected, attr, currency));
          });
        break;
      case Cpq.DisplayAs.CONTAINER:
        if (!this.featureToggles.productConfiguratorCPQContainer) {
          this.logUnsupportedAttribute(attr);
        }
        break;
      default:
        this.logUnsupportedAttribute(attr);
    }
    return ovValues;
  }

  protected createTabGroupId(tabId: number, parentRowGroupId?: string): string {
    return parentRowGroupId ? `${parentRowGroupId}@${tabId}` : tabId.toString();
  }

  protected attachContainers(
    group: Configurator.GroupOverview,
    attributes: Cpq.Attribute[] | undefined,
    containers: Cpq.Container[] | undefined,
    currency: string
  ): void {
    if (!attributes?.length || !containers?.length) {
      return;
    }

    attributes
      .filter((attribute) => attribute.displayAs === Cpq.DisplayAs.CONTAINER)
      .forEach((attribute) => {
        const container = containers.find(
          (entry) => entry.stdAttrCode === attribute.stdAttrCode
        );
        container?.rows
          ?.filter((row) => this.isSelectedContainerRow(row))
          .forEach((row) => {
            if (row.configuration) {
              group.subGroups ??= [];
              group.subGroups.push(
                this.convertNestedConfiguration(
                  row.configuration,
                  row,
                  attribute.stdAttrCode,
                  currency
                )
              );
            } else {
              group.attributes?.push(
                this.convertContainerRowToAttribute(row, attribute)
              );
            }
          });
      });
  }

  protected isSelectedContainerRow(row: Cpq.ContainerRow): boolean {
    return (
      row.selected === true &&
      !row.actions?.includes(Cpq.ContainerRowAction.ADD)
    );
  }

  protected convertContainerRowToAttribute(
    row: Cpq.ContainerRow,
    attribute: Cpq.Attribute
  ): Configurator.AttributeOverview {
    return {
      attribute:
        this.cpqConfiguratorNormalizerUtilsService.convertAttributeLabel(
          attribute
        ),
      attributeId: attribute.stdAttrCode.toString(),
      value: row.productName ?? row.productSystemId ?? row.id,
      valueId: row.id,
      productCode: row.productSystemId,
      type: Configurator.AttributeOverviewType.BUNDLE,
    };
  }

  protected convertNestedConfiguration(
    source: Cpq.NestedProductConfiguration,
    row: Cpq.ContainerRow,
    attrCode: number,
    currency: string
  ): Configurator.GroupOverview {
    const rowGroupId = `${Configurator.ContainerRowGroupIdPrefix}@${attrCode}@${row.id}`;
    const nestedGroups = (source.tabs ?? [])
      .map((tab) =>
        this.convertTab(tab, currency, source.containers, rowGroupId)
      )
      .filter((group) => this.hasOverviewContent(group));
    const singleNestedGroup =
      nestedGroups.length === 1 ? nestedGroups[0] : undefined;

    return {
      id: rowGroupId,
      groupDescription: row.productName ?? row.productSystemId,
      attributes: singleNestedGroup?.attributes ?? [],
      subGroups: singleNestedGroup
        ? (singleNestedGroup.subGroups ?? [])
        : nestedGroups,
    };
  }

  protected hasOverviewContent(group: Configurator.GroupOverview): boolean {
    return !!group.attributes?.length || !!group.subGroups?.length;
  }

  protected logUnsupportedAttribute(attr: Cpq.Attribute): void {
    this.logger.warn(
      `Attribute '${attr.name}' (pA_ID=${(<any>attr).PA_ID}) is not supported and hence hidden from overview.`
    );
  }

  protected extractValue(
    valueSelected: Cpq.Value,
    attr: Cpq.Attribute,
    currency: string
  ): Configurator.AttributeOverview {
    const ovValue: Configurator.AttributeOverview = {
      attribute: INITIAL_OV_VALUE_ATTRIBUTE_NAME,
      value: valueSelected.valueDisplay ?? valueSelected.paV_ID.toString(),
      valueId: valueSelected.paV_ID.toString(),
      productCode: valueSelected.productSystemId,
      quantity: this.cpqConfiguratorNormalizerUtilsService.convertQuantity(
        valueSelected,
        attr
      ),
      valuePrice: this.cpqConfiguratorNormalizerUtilsService.convertValuePrice(
        valueSelected,
        currency
      ),
    };
    ovValue.valuePriceTotal =
      this.cpqConfiguratorNormalizerUtilsService.calculateValuePriceTotal(
        ovValue.quantity ?? 1,
        ovValue.valuePrice
      );
    return ovValue;
  }

  protected extractValueUserInput(
    attr: Cpq.Attribute,
    currency: string
  ): Configurator.AttributeOverview {
    const value = attr.values ? attr.values[0] : undefined;
    const ovValue: Configurator.AttributeOverview = {
      attribute: INITIAL_OV_VALUE_ATTRIBUTE_NAME,
      value: attr.userInput ?? attr.stdAttrCode.toString(),
      valueId: value?.paV_ID.toString(),
      quantity: 1,
    };
    if (value) {
      ovValue.valuePrice =
        this.cpqConfiguratorNormalizerUtilsService.convertValuePrice(
          value,
          currency
        );
      ovValue.valuePriceTotal =
        this.cpqConfiguratorNormalizerUtilsService.calculateValuePriceTotal(
          ovValue.quantity ?? 1,
          ovValue.valuePrice
        );
    }
    return ovValue;
  }

  protected calculateTotalNumberOfIssues(source: Cpq.Configuration): number {
    return this.cpqConfiguratorNormalizerUtilsService.calculateTotalNumberOfIssues(
      source
    );
  }
}
