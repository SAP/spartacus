import { Injectable } from '@angular/core';
import { Occ } from '../../../occ-models/occ.models';
import {
  Converter,
  ConverterService,
} from '../../../../util/converter.service';
import { OrgUnitCustomer, EntitiesModel } from '../../../../model';
import { ORG_UNIT_CUSTOMER_NORMALIZER } from '../../../../organization';

@Injectable()
export class OccOrgUnitCustomerListNormalizer
  implements
    Converter<Occ.OrgUnitCustomerList, EntitiesModel<OrgUnitCustomer>> {
  constructor(private converter: ConverterService) {}

  convert(
    source: Occ.OrgUnitCustomerList,
    target?: EntitiesModel<OrgUnitCustomer>
  ): EntitiesModel<OrgUnitCustomer> {
    if (target === undefined) {
      target = {
        ...(source as any),
        values: source.orgUnitCustomers.map(orgUnitCustomer => ({
          ...this.converter.convert(
            orgUnitCustomer,
            ORG_UNIT_CUSTOMER_NORMALIZER
          ),
        })),
      };
    }
    return target;
  }
}
