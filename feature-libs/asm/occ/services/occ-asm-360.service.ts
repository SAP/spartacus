import { Injectable } from '@angular/core';
import {
  Asm360Service,
  AsmCustomer360TabComponent,
  CreateRequestObjectOptions,
} from '@spartacus/asm/root';
import { Observable, of } from 'rxjs';

import {
  OccAsmCustomer360Query,
  OccAsmCustomer360Request,
  OccAsmCustomer360Response,
  OccAsmCustomer360Type,
} from '../model/asm-360.model';

@Injectable()
export class OccAsm360Service extends Asm360Service<
  OccAsmCustomer360Query,
  OccAsmCustomer360Request,
  OccAsmCustomer360Response
> {
  createRequestObject(
    data: Array<OccAsmCustomer360Query>,
    options: CreateRequestObjectOptions
  ): Observable<OccAsmCustomer360Request> {
    const uniqueQueries = new Set<OccAsmCustomer360Type>();

    data.forEach((query) => {
      uniqueQueries.add(query.customer360Type);
    });

    return of({
      queries: Array.from(uniqueQueries).map((type) => ({
        customer360Type: type,
      })),
      options,
    });
  }

  getResponseData(
    component: AsmCustomer360TabComponent<OccAsmCustomer360Query>,
    responseObject: OccAsmCustomer360Response
  ): Observable<unknown> {
    return of(
      responseObject.value.find(
        (response) => response.type === component.requestData?.customer360Type
      )
    );
  }
}
