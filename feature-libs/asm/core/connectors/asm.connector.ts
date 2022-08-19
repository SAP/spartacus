import { Injectable } from '@angular/core';
import { BindCartParams } from '@spartacus/asm/root';
import { Observable } from 'rxjs';
import {
  CustomerSearchOptions,
  CustomerSearchPage,
} from '../models/asm.models';
import { AsmAdapter } from './asm.adapter';

@Injectable({
  providedIn: 'root',
})
export class AsmConnector {
  constructor(protected asmAdapter: AsmAdapter) {}

  customerSearch(
    options: CustomerSearchOptions
  ): Observable<CustomerSearchPage> {
    return this.asmAdapter.customerSearch(options);
  }

  bindCart(options: BindCartParams): Observable<unknown> {
    return this.asmAdapter.bindCart(options);
  }
}
