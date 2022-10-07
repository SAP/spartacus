import { Injectable } from '@angular/core';
import { User } from '@spartacus/core';
import { Observable } from 'rxjs';

@Injectable()
export abstract class Customer360SectionContext {
  readonly customer$: Observable<User>;
}
