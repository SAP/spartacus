import { Injectable } from '@angular/core';
import { User } from '@spartacus/core';
import { ReplaySubject } from 'rxjs';

import { Customer360SectionContext } from './customer-360-section-context.model';

@Injectable()
export class Customer360SectionContextSource extends Customer360SectionContext {
  readonly customer$ = new ReplaySubject<User>(1);
}
