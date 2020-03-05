import { Injectable } from '@angular/core';
import { Occ } from '../../../occ-models/occ.models';
import { Converter } from '../../../../util/converter.service';
import { B2BApprovalProcess } from '../../../../model/org-unit.model';
import { B2BUNIT_NODE_NORMALIZER } from '../../../../organization/connectors/org-unit/converters';

@Injectable()
export class OccOrgUnitApprovalProcessNormalizer
  implements Converter<Occ.B2BApprovalProcessList, B2BApprovalProcess[]> {
  constructor() {}

  convert(
    source: Occ.B2BApprovalProcessList,
    target?: B2BApprovalProcess[]
  ): B2BApprovalProcess[] {
    if (target === undefined) {
      target = [...(source.approvalProcesses as any)];
    }
    return target;
  }
}
