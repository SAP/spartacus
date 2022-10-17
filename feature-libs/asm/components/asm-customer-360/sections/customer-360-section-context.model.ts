import { Injectable } from '@angular/core';
import { Customer360SectionConfig } from '@spartacus/asm/root';
import { User } from '@spartacus/core';
import { Observable } from 'rxjs';

@Injectable()
export abstract class Customer360SectionContext<Data> {
  readonly customer$: Observable<User>;

  readonly config$: Observable<Customer360SectionConfig>;

  data$: Observable<Data>;
}
