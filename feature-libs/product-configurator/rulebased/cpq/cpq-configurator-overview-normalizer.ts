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

  convertTab(tab: Cpq.Tab): Configurator.GroupOverview {
    return {
      id: tab.id.toString(),
      groupDescription: tab.name,
      attributes: tab.attributes?.flatMap((attr) =>
        this.convertAttribute(attr)
      ),
    };
  }

  convertAttribute(attr: Cpq.Attribute): Configurator.AttributeOverview {
    return {
      attribute: attr.name,
      value: this.convertAttributeValue(attr),
    };
  }

  protected convertAttributeValue(attr: Cpq.Attribute): string {
    return attr.values?.find((val) => val.selected)?.description;
  }

  protected calculateTotalNumberOfIssues(source: Cpq.Configuration): number {
    return source.incompleteAttributes.length + source.numberOfConflicts;
  }
}
