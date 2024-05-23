import { Component, inject } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { tap } from 'rxjs/operators';
import { AbstractOrderType } from '../../root/models/cart.model';
import { AbstractOrderKeyInput } from './abstract-order-context.directive';
import { AbstractOrderContext } from './abstract-order-context.model';
import { AbstractOrderContextModule } from './abstract-order-context.module';

const abstractOrderId = '129374';

let emissionCounterKey = 0;

@Component({
  selector: 'cx-test-cmp',
  template: `
<span [cxAbstractOrderContext]="abstractOrderKey"><cx-test-cmp-inner/>        
</span>`,
})
class TestComponent {
  abstractOrderKey: AbstractOrderKeyInput = {
    id: abstractOrderId,
    type: AbstractOrderType.ORDER,
  };
}

@Component({
  selector: 'cx-test-cmp-inner',
  template: `
    <ng-container *ngIf="myKey$ | async as key">
      {{ key.id }}
      {{ key.type }}
    </ng-container>
  `,
})
class TestInnerComponent {
  abstractOrderContext = inject(AbstractOrderContext, { optional: true });
  myKey$ = this.abstractOrderContext?.key$.pipe(
    tap(() => (emissionCounterKey = emissionCounterKey + 1))
  );
}

describe('AbstractOrderContextDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let testOuterComponent: TestComponent;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent, TestInnerComponent],
        imports: [AbstractOrderContextModule],
        providers: [],
      }).compileComponents();
      emissionCounterKey = 0;
      fixture = TestBed.createComponent(TestComponent);
      testOuterComponent = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should propagate abstract order ID to inner component', () => {
    expect(fixture.nativeElement.innerHTML).toContain(abstractOrderId);
  });

  it('should propagate abstract order type to inner component', () => {
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

  it('should should emit changes context value has changed', () => {
    expect(emissionCounterKey).toBe(1);

    testOuterComponent.abstractOrderKey = {
      id: 'newId',
      type: AbstractOrderType.ORDER,
    };
    fixture.detectChanges();
    expect(emissionCounterKey).toBe(2);
  });
});
