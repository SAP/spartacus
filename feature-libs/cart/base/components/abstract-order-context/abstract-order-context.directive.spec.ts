import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { tap } from 'rxjs/operators';
import { AbstractOrderType } from '../../root/models/cart.model';
import {
  AbstractOrderContextDirective,
  AbstractOrderKeyInput,
} from './abstract-order-context.directive';
import { AbstractOrderContext } from './abstract-order-context.model';
import { AbstractOrderContextModule } from './abstract-order-context.module';

const abstractOrderId = '129374';

let emissionCounterKey = 0;

@Component({
  selector: 'cx-test-cmp-inner',
  template: `
    <ng-container *ngIf="myKey$ | async as key">
      {{ key.id }}
      {{ key.type }}
    </ng-container>
  `,
  imports: [NgIf, AsyncPipe],
})
class TestInnerComponent {
  abstractOrderContext = inject(AbstractOrderContext, { optional: true });
  myKey$ = this.abstractOrderContext?.key$.pipe(
    tap(() => (emissionCounterKey = emissionCounterKey + 1))
  );
}

@Component({
  selector: 'cx-test-cmp',
  template: ` <span [cxAbstractOrderContext]="abstractOrderKey"
    ><cx-test-cmp-inner />
  </span>`,
  imports: [AbstractOrderContextDirective, TestInnerComponent],
})
class TestComponent {
  abstractOrderKey: AbstractOrderKeyInput = {
    id: abstractOrderId,
    type: AbstractOrderType.ORDER,
  };
}

describe('AbstractOrderContextDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let testOuterComponent: TestComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AbstractOrderContextModule, TestComponent, TestInnerComponent],
      providers: [],
    }).compileComponents();
    emissionCounterKey = 0;
    fixture = TestBed.createComponent(TestComponent);
    testOuterComponent = fixture.componentInstance;
  });

  it('should propagate abstract order ID to inner component', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML).toContain(abstractOrderId);
  });

  it('should propagate abstract order type to inner component', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML).toContain(AbstractOrderType.ORDER);
  });

  it('should propagate abstract order type to inner component for active cart type, when no id is needed', () => {
    testOuterComponent.abstractOrderKey = {
      type: AbstractOrderType.CART,
    };
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML).toContain(AbstractOrderType.CART);
  });

  it('should throw error if no id is specified but the abstract order type requires it', () => {
    testOuterComponent.abstractOrderKey = {
      type: AbstractOrderType.SAVED_CART,
    };
    expect(() => fixture.detectChanges()).toThrow();
  });

  it('should should emit changes context value has changed', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    expect(emissionCounterKey).toBe(1);

    testOuterComponent.abstractOrderKey = {
      id: 'newId',
      type: AbstractOrderType.ORDER,
    };
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(emissionCounterKey).toBe(2);
  });
});
