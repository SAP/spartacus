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
export class CustomerConnector {
  constructor(protected customerAdapter: CustomerAdapter) {}

  search(options: CustomerSearchOptions): Observable<CustomerSearchPage> {
    return this.customerAdapter.search(options);
  }
}
