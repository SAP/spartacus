import { Injectable } from '@angular/core';
import { Customer360SectionConfig } from '@spartacus/asm/root';
import { UrlCommand, User } from '@spartacus/core';
import { Observable, Observer } from 'rxjs';

@Injectable()
export abstract class Customer360SectionContext<Data> {
  readonly customer$: Observable<User>;

  readonly config$: Observable<Customer360SectionConfig>;

  readonly navigate$: Observer<UrlCommand>;

  readonly data$: Observable<Data>;
}
