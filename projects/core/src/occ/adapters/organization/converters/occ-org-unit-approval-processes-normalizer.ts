import { Injectable } from '@angular/core';
import { Occ } from '../../../occ-models/occ.models';
import { Converter } from '../../../../util/converter.service';
import { B2BApprovalProcess } from '../../../../model/org-unit.model';

@Injectable()
export class OccOrgUnitApprovalProcessNormalizer
  implements Converter<Occ.B2BApprovalProcess, B2BApprovalProcess> {
  constructor() {}

  convert(
    source: Occ.B2BApprovalProcess,
    target?: B2BApprovalProcess
  ): B2BApprovalProcess {
    if (target === undefined) {
      target = { ...(source as any) };
    }
    return target;
  }
}
