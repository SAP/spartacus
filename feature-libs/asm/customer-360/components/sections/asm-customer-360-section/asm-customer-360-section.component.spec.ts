import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsmCustomer360SectionConfig } from '@spartacus/asm/customer-360/root';
import { UrlCommand, User } from '@spartacus/core';
import { combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';

import { AsmCustomer360SectionContext } from '../asm-customer-360-section-context.model';
import { AsmCustomer360SectionComponent } from './asm-customer-360-section.component';

describe('AsmCustomer360SectionComponent', () => {
  let component: AsmCustomer360SectionComponent;
  let fixture: ComponentFixture<AsmCustomer360SectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsmCustomer360SectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AsmCustomer360SectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should channel data to its children through the context source', (done) => {
    const config: AsmCustomer360SectionConfig = {
      pageSize: 5,
    };

    const customer: User = {
      uid: 'customer001',
    };

    const data: any = 'foo';

    const context = fixture.debugElement.injector.get(
      AsmCustomer360SectionContext
    );

    const subscription = combineLatest([
      context.config$,
      context.customer$,
      context.data$,
    ])
      .pipe(take(1))
      .subscribe(([value1, value2, value3]) => {
        expect(value1).toBe(config);
        expect(value2).toBe(customer);
        expect(value3).toBe(data);

        subscription.unsubscribe();

        done();
      });

    component.config = config;
    component.customer = customer;
    component.data = data;
  });

  it('should channel data from its children to its parent', (done) => {
    const command: UrlCommand = {
      cxRoute: 'cart',
    };

    const subscription = component.navigate.subscribe((event) => {
      expect(event).toBe(command);

      subscription.unsubscribe();

      done();
    });

    const context = fixture.debugElement.injector.get(
      AsmCustomer360SectionContext
    );

    context.navigate$.next(command);
  });
});
