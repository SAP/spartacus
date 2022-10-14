import { Component, Input } from '@angular/core';
import { Customer360SectionConfig } from '@spartacus/asm/root';
import { User } from '@spartacus/core';
import { Observable } from 'rxjs';

import { Customer360SectionContextSource } from '../customer-360-section-context-source.model';
import { Customer360SectionContext } from '../customer-360-section-context.model';

@Component({
  selector: 'cx-asm-customer-section',
  templateUrl: './asm-customer-section.component.html',
  providers: [
    Customer360SectionContextSource,
    {
      provide: Customer360SectionContext,
      useExisting: Customer360SectionContextSource,
    },
  ],
})
export class AsmCustomerSectionComponent {
  @Input()
  component: string;

  @Input()
  set customer(customer: User) {
    this.source.customer$.next(customer);
  }

  @Input()
  set config(config: Customer360SectionConfig) {
    this.source.config$.next(config);
  }

  @Input()
  set data(data$: Observable<unknown>) {
    this.source.data$ = data$;
  }

  constructor(protected source: Customer360SectionContextSource<unknown>) {}
}
