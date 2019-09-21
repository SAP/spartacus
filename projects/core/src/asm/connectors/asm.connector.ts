import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CustomerSearchOptions,
  CustomerSearchPage,
} from '../models/asm.models';
import { CustomerAdapter } from './customer.adapter';

@Injectable({
  providedIn: 'root',
})
export class AsmConnector {
  constructor(protected customerAdapter: CustomerAdapter) {}

  customerSearch(options: CustomerSearchOptions): Observable<CustomerSearchPage> {
    return this.customerAdapter.search(options);
  }
}
