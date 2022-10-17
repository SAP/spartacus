import { Injectable } from '@angular/core';
import { Customer360SectionConfig } from '@spartacus/asm/root';
import { User } from '@spartacus/core';
import { ReplaySubject } from 'rxjs';

import { Customer360SectionContext } from './customer-360-section-context.model';

@Injectable()
export class Customer360SectionContextSource<
  Data
> extends Customer360SectionContext<Data> {
  readonly customer$ = new ReplaySubject<User>(1);

  readonly config$ = new ReplaySubject<Customer360SectionConfig>(1);
}
