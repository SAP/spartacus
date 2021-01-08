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
      groups: source.tabs?.flatMap((tab) => this.convertTab(tab)),
      totalNumberOfIssues: this.calculateTotalNumberOfIssues(source),
    };
    return resultTarget;
  }

  protected convertTab(tab: Cpq.Tab): Configurator.GroupOverview {
    let ovAttributes = [];
    tab.attributes?.forEach((attr) => {
      ovAttributes = ovAttributes.concat(this.convertAttribute(attr));
    });

    return {
      id: tab.id.toString(),
      groupDescription: tab.name,
      attributes: ovAttributes,
    };
  }

  protected convertAttribute(
    attr: Cpq.Attribute
  ): Configurator.AttributeOverview[] {
    const ovAttr: Configurator.AttributeOverview[] = [];
    this.convertAttributeValue(attr).forEach((ovValue) => {
      ovAttr.push({
        attribute: undefined,
        value: ovValue.value,
        productCode: ovValue.productCode,
        type: attr.isLineItem
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
    attr: Cpq.Attribute
  ): { value: string; productCode?: string }[] {
    const ovValues: { value: string; productCode?: string }[] = [];
    switch (attr.displayAs) {
      case Cpq.DisplayAs.INPUT:
        ovValues.push({ value: attr.userInput });
        break;
      case Cpq.DisplayAs.RADIO_BUTTON:
      case Cpq.DisplayAs.READ_ONLY:
      case Cpq.DisplayAs.DROPDOWN:
        const selectedValue = attr.values?.find((val) => val.selected);
        if (selectedValue) {
          ovValues.push({
            value: selectedValue.valueDisplay,
            productCode: selectedValue.productSystemId,
          });
        }
        break;
      case Cpq.DisplayAs.CHECK_BOX:
        attr.values
          ?.filter((val) => val.selected)
          ?.forEach((valueSelected) => {
            ovValues.push({
              value: valueSelected.valueDisplay,
              productCode: valueSelected.productSystemId,
            });
          });
        break;
      default:
        ovValues.push({ value: 'NOT_IMPLEMENTED' });
    }
    return ovValues;
  }

  protected calculateTotalNumberOfIssues(source: Cpq.Configuration): number {
    return source.incompleteAttributes.length + source.numberOfConflicts;
  }
}
