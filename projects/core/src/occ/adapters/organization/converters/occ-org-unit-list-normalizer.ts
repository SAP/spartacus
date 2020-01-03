import { Injectable } from '@angular/core';
import { Occ } from '../../../occ-models/occ.models';
import {
  Converter,
  ConverterService,
} from '../../../../util/converter.service';
import { B2BUNIT_NORMALIZER } from '../../../../organization/connectors/org-unit/converters';
import { B2BUnitNodeList } from '../../../../model/org-unit.model';

@Injectable()
export class OccOrgUnitListNormalizer
  implements Converter<Occ.B2BUnitNodeList, B2BUnitNodeList> {
  constructor(private converter: ConverterService) {}

  convert(
    source: Occ.B2BUnitNodeList,
    target?: B2BUnitNodeList
  ): B2BUnitNodeList {
    if (target === undefined) {
      target = {
        ...(source as any),
        unitNodes: source.unitNodes.map(unitNode => ({
          ...this.converter.convert(unitNode, B2BUNIT_NORMALIZER),
        })),
      };
    }
    return target;
  }
}
