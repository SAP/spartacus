import { Injectable } from '@angular/core';
import { Converter, TranslationService } from '@spartacus/core';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { take } from 'rxjs/operators';
import { CpqConfiguratorUtilsService } from './cpq-configurator-utils.service';
import { Cpq } from './cpq.models';

@Injectable()
export class CpqConfiguratorOverviewNormalizer
  implements Converter<Cpq.Configuration, Configurator.Overview> {
  protected readonly NO_OPTION_SELECTED = 0;

  constructor(
    protected cpqUtilitiesService: CpqConfiguratorUtilsService,
    protected translation: TranslationService
  ) {}

  convert(
    source: Cpq.Configuration,
    target?: Configurator.Overview
  ): Configurator.Overview {
    const resultTarget: Configurator.Overview = {
      ...target,
      productCode: source.productSystemId,
      priceSummary: this.cpqUtilitiesService.preparePriceSummary(source),
      groups: source.tabs
        ?.flatMap((tab) => this.convertTab(tab, source.currencyISOCode))
        .filter((tab) => tab.attributes.length > 0),
      totalNumberOfIssues: this.calculateTotalNumberOfIssues(source),
    };
    return resultTarget;
  }

  protected convertTab(
    tab: Cpq.Tab,
    currency: string
  ): Configurator.GroupOverview {
    let ovAttributes = [];
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
      attr?.values && this.cpqUtilitiesService.hasAnyProducts(attr?.values)
        ? Configurator.AttributeOverviewType.BUNDLE
        : Configurator.AttributeOverviewType.GENERAL;
    const ovAttr: Configurator.AttributeOverview[] = [];
    this.convertAttributeValue(attr, currency).forEach((ovValue, index) => {
      ovAttr.push({
        ...ovValue,
        type: attributeOverviewType,
      });
      ovAttr[index].attribute = this.cpqUtilitiesService.retrieveAttributeLabel(
        attr
      );
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
          ovValues.push({ attribute: undefined, value: 'NOT_IMPLEMENTED' });
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
        ovValues.push({ attribute: undefined, value: 'NOT_IMPLEMENTED' });
    }
    return ovValues;
  }

  protected extractValue(
    valueSelected: Cpq.Value,
    attr: Cpq.Attribute,
    currency: string
  ): Configurator.AttributeOverview {
    const ovValue: Configurator.AttributeOverview = {
      attribute: undefined,
      value: valueSelected.valueDisplay,
      productCode: valueSelected.productSystemId,
      quantity: this.cpqUtilitiesService.prepareQuantity(valueSelected, attr),
      valuePrice: this.cpqUtilitiesService.prepareValuePrice(
        valueSelected,
        currency
      ),
    };
    ovValue.valuePriceTotal = this.cpqUtilitiesService.calculateValuePriceTotal(
      ovValue.quantity,
      ovValue.valuePrice
    );
    return ovValue;
  }

  protected extractValueUserInput(
    attr: Cpq.Attribute,
    currency: string
  ): Configurator.AttributeOverview {
    const value: Cpq.Value = attr.values[0];
    const ovValue: Configurator.AttributeOverview = {
      attribute: undefined,
      value: attr.userInput,
      quantity: null,
      valuePrice: this.cpqUtilitiesService.prepareValuePrice(value, currency),
    };
    ovValue.valuePriceTotal = this.cpqUtilitiesService.calculateValuePriceTotal(
      ovValue.quantity,
      ovValue.valuePrice
    );
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
