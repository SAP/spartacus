import { Injectable } from '@angular/core';
import { Occ } from '../../../occ-models/occ.models';
import {
  Converter,
  ConverterService,
} from '../../../../util/converter.service';
import { B2BUNIT_NODE_NORMALIZER } from '../../../../organization/connectors/org-unit/converters';
import { B2BUnitNode } from '../../../../model/org-unit.model';
import { EntitiesModel } from '../../../../model/misc.model';

@Injectable()
export class OccOrgUnitNodeListNormalizer
  implements Converter<Occ.B2BUnitNodeList, EntitiesModel<B2BUnitNode>> {
  constructor(private converter: ConverterService) {}

  convert(
    source: Occ.B2BUnitNodeList,
    target?: EntitiesModel<B2BUnitNode>
  ): EntitiesModel<B2BUnitNode> {
    if (target === undefined) {
      target = {
        ...(source as any),
        values: source.unitNodes.map(unitNode => ({
          ...this.converter.convert(unitNode, B2BUNIT_NODE_NORMALIZER),
        })),
      };
    }
    return target;
  }
}
