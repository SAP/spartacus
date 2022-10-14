import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ASM_FEATURE } from '../feature-name';
import { AsmCustomer360TabComponent } from '../model/customer-360-tab-config';

export interface CreateRequestObjectOptions {
  userId: string;
}

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: Asm360Service,
      feature: ASM_FEATURE,
      methods: ['createRequestObject', 'getResponseData'],
    }),
})
export abstract class Asm360Service<
  AsmCustomer360Query,
  AsmCustomer360Request,
  AsmCustomer360Response
> {
  abstract createRequestObject(
    data: Array<AsmCustomer360Query>,
    options: CreateRequestObjectOptions
  ): Observable<AsmCustomer360Request>;

  abstract getResponseData(
    component: AsmCustomer360TabComponent<AsmCustomer360Query>,
    responseObject: AsmCustomer360Response
  ): Observable<unknown>;
}
