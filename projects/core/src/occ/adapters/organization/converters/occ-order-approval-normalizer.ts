import { Injectable } from '@angular/core';
import { ORDER_NORMALIZER } from '../../../../checkout/connectors/checkout/converters';
import { OrderApproval } from '../../../../model/order-approval.model';
import {
  Converter,
  ConverterService,
} from '../../../../util/converter.service';
import { Occ } from '../../../occ-models/occ.models';

@Injectable()
export class OccOrderApprovalNormalizer
  implements Converter<Occ.OrderApproval, OrderApproval> {
  constructor(private converter: ConverterService) {}

  convert(source: Occ.OrderApproval, target?: OrderApproval): OrderApproval {
    if (target === undefined) {
      target = {
        ...(source as any),
      };
      if (source.order) {
        target.order = this.converter.convert(source.order, ORDER_NORMALIZER);
      }
    }
    return target;
  }
}
