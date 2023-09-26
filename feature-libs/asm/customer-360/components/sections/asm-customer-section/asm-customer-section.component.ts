/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  Type,
} from '@angular/core';
import { Customer360SectionConfig } from '@spartacus/asm/customer-360/root';
import { UrlCommand, User } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';

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
export class AsmCustomerSectionComponent implements OnDestroy {
  @Input()
  component: Type<unknown>;

  @Input()
  set customer(customer: User) {
    this.source.customer$.next(customer);
  }

  @Input()
  set config(config: Customer360SectionConfig) {
    this.source.config$.next(config);
  }

  @Input()
  set data(data: Observable<unknown>) {
    this.source.data$.next(data);
  }

  @Output()
  navigate: EventEmitter<UrlCommand> = new EventEmitter();

  protected subscription = new Subscription();

  constructor(protected source: Customer360SectionContextSource<unknown>) {
    this.subscription.add(
      source.navigate$.subscribe((urlCommand) => this.navigate.emit(urlCommand))
    );

    this.subscription.add(() => {
      this.source.config$.complete();
      this.source.customer$.complete();
      this.source.data$.complete();
      this.source.navigate$.complete();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
