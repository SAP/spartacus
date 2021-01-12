import { Injectable } from '@angular/core';
import { Converter } from '@spartacus/core';
import { Configurator } from '../core/model/configurator.model';
import { Cpq } from './cpq.models';

@Injectable()
export class CpqConfiguratorOverviewNormalizer
  implements Converter<Cpq.Configuration, Configurator.Overview> {
  constructor() {}

  convert(
    source: Cpq.Configuration,
    target?: Configurator.Overview
  ): Configurator.Overview {
    const resultTarget: Configurator.Overview = {
      ...target,
      productCode: source.productSystemId,
      groups: source.tabs?.flatMap((tab) =>
        this.convertTab(tab, source.currencyISOCode)
      ),
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

    return {
      id: tab.id.toString(),
      groupDescription: tab.name,
      attributes: ovAttributes,
    };
  }

  protected convertAttribute(
    attr: Cpq.Attribute,
    currency: string
  ): Configurator.AttributeOverview[] {
    const ovAttr: Configurator.AttributeOverview[] = [];
    this.convertAttributeValue(attr, currency).forEach((ovValue) => {
      ovAttr.push({
        ...ovValue,
        type: ovValue.productCode
          ? Configurator.AttributeOverviewType.BUNDLE
          : Configurator.AttributeOverviewType.GENERAL,
      });
    });
    if (ovAttr.length > 0) {
      ovAttr[0].attribute = attr.name;
    }
    return ovAttr;
  }

  protected convertAttributeValue(
    attr: Cpq.Attribute,
    currency: string
  ): Configurator.AttributeOverview[] {
    const ovValues: Configurator.AttributeOverview[] = [];
    switch (attr.displayAs) {
      case Cpq.DisplayAs.INPUT:
        if (attr.userInput && attr.userInput.length > 0) {
          ovValues.push(this.extractOvValueUserInput(attr, currency));
        }
        break;
      case Cpq.DisplayAs.RADIO_BUTTON:
      case Cpq.DisplayAs.READ_ONLY:
      case Cpq.DisplayAs.DROPDOWN:
        const selectedValue = attr.values?.find((val) => val.selected);
        if (selectedValue) {
          ovValues.push(this.extractOvValue(selectedValue, attr, currency));
        }
        break;
      case Cpq.DisplayAs.CHECK_BOX:
        attr.values
          ?.filter((val) => val.selected)
          ?.forEach((valueSelected) => {
            ovValues.push(this.extractOvValue(valueSelected, attr, currency));
          });
        break;
      default:
        ovValues.push({ attribute: undefined, value: 'NOT_IMPLEMENTED' });
    }
    return ovValues;
  }

  protected extractOvValue(
    valueSelected: Cpq.Value,
    attr: Cpq.Attribute,
    currency: string
  ): Configurator.AttributeOverview {
    let ovValue: Configurator.AttributeOverview = {
      attribute: undefined,
      value: valueSelected.valueDisplay,
      productCode: valueSelected.productSystemId,
      quantity: this.prepareQuantity(valueSelected, attr),
      valuePrice: this.prepareValuePrice(valueSelected, currency),
    };
    ovValue.valuePriceTotal = this.calculateValuePriceTotal(
      ovValue.quantity,
      ovValue.valuePrice
    );
    return ovValue;
  }

  protected extractOvValueUserInput(
    attr: Cpq.Attribute,
    currency: string
  ): Configurator.AttributeOverview {
    const value: Cpq.Value = attr.values[0];
    let ovValue: Configurator.AttributeOverview = {
      attribute: undefined,
      value: attr.userInput,
      quantity: null,
      valuePrice: this.prepareValuePrice(value, currency),
    };
    ovValue.valuePriceTotal = this.calculateValuePriceTotal(
      ovValue.quantity,
      ovValue.valuePrice
    );
    return ovValue;
  }

  protected prepareQuantity(
    valueSelected: Cpq.Value,
    attr: Cpq.Attribute
  ): number {
    let quantity: number;
    switch (attr.dataType) {
      case Cpq.DataType.QTY_ATTRIBUTE_LEVEL:
        quantity = Number(attr.quantity);
        break;
      case Cpq.DataType.QTY_VALUE_LEVEL:
        quantity = Number(valueSelected.quantity);
        break;
      default:
        quantity = null;
    }
    return quantity;
  }

  protected prepareValuePrice(
    valueSelected: Cpq.Value,
    currency: string
  ): Configurator.PriceDetails {
    let price: Configurator.PriceDetails = null;
    if (valueSelected.price) {
      price = {
        currencyIso: currency,
        value: parseFloat(valueSelected.price),
      };
      this.formatPrice(price);
    }
    return price;
  }

  protected calculateValuePriceTotal(
    quantity: number,
    valuePrice: Configurator.PriceDetails
  ): Configurator.PriceDetails {
    let valuePriceTotal: Configurator.PriceDetails = null;
    if (valuePrice) {
      const calculationQuantity: number = quantity ? quantity : 1;
      valuePriceTotal = {
        currencyIso: valuePrice.currencyIso,
        value: calculationQuantity * valuePrice.value,
      };
      this.formatPrice(valuePriceTotal);
    }
    return valuePriceTotal;
  }

  protected formatPrice(price: Configurator.PriceDetails): void {
    // TODO AK: implement formatting
    price.formattedValue = price.value.toString() + ' ' + price.currencyIso;
  }

  protected calculateTotalNumberOfIssues(source: Cpq.Configuration): number {
    return source.incompleteAttributes.length + source.numberOfConflicts;
  }
}
