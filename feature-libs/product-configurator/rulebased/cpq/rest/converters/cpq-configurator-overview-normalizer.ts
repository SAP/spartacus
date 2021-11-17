import { Injectable } from '@angular/core';
import { Converter, TranslationService } from '@spartacus/core';
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
      configId: '',
      productCode: source.productSystemId,
      priceSummary:
        this.cpqConfiguratorNormalizerUtilsService.convertPriceSummary(source),
      groups: source.tabs
        ?.flatMap((tab) => this.convertTab(tab, source.currencyISOCode))
        .filter((tab) => tab.attributes && tab.attributes.length > 0),
      totalNumberOfIssues: this.calculateTotalNumberOfIssues(source),
    };
    return resultTarget;
  }

  protected convertTab(
    tab: Cpq.Tab,
    currency: string
  ): Configurator.GroupOverview {
    let ovAttributes: Configurator.AttributeOverview[] = [];
    tab.attributes?.forEach((attr) => {
      ovAttributes = ovAttributes.concat(this.convertAttribute(attr, currency));
    });
    const groupOverview: Configurator.GroupOverview = {
      id: tab.id.toString(),
      groupDescription: tab.displayName,
      attributes: ovAttributes,
    };
    if (groupOverview.id === '0') {
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
          ovValues.push({
            attribute: INITIAL_OV_VALUE_ATTRIBUTE_NAME,
            value: 'NOT_IMPLEMENTED',
          });
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
      default:
        ovValues.push({
          attribute: INITIAL_OV_VALUE_ATTRIBUTE_NAME,
          value: 'NOT_IMPLEMENTED',
        });
    }
    return ovValues;
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
    let numberOfIssues: number =
      (source.incompleteAttributes?.length ?? 0) +
      (source.incompleteMessages?.length ?? 0) +
      (source.invalidMessages?.length ?? 0) +
      (source.failedValidations?.length ?? 0) +
      (source.errorMessages?.length ?? 0);
    return numberOfIssues;
  }
}
