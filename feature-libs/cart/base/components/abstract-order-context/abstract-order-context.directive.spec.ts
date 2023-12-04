import { Component, inject } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { tap } from 'rxjs/operators';
import { AbstractOrderType } from '../../root/models/cart.model';
import { AbstractOrderContext } from './abstract-order-context.model';
import { AbstractOrderContextModule } from './abstract-order-context.module';

const abstractOrderId = '129374';

let emissionCounterId = 0;
let emissionCounterType = 0;

@Component({
  selector: 'cx-test-cmp',
  template: `
<span [cxAbstractOrderContext]="{id:id, type:type}"><cx-test-cmp-inner/>        
</span>`,
})
class TestComponent {
  readonly abstractOrderType = AbstractOrderType;
  id = abstractOrderId;
  type = AbstractOrderType.CART;
}

@Component({
  selector: 'cx-test-cmp-inner',
  template: `
    <ng-container *ngIf="myId$ | async as id">
      {{ id }}
    </ng-container>
    <ng-container *ngIf="myType$ | async as type">
      {{ type }}
    </ng-container>
  `,
})
class TestInnerComponent {
  abstractOrderContext = inject(AbstractOrderContext, { optional: true });
  myId$ = this.abstractOrderContext?.id$.pipe(
    tap(() => (emissionCounterId = emissionCounterId + 1))
  );
  myType$ = this.abstractOrderContext?.type$.pipe(
    tap(() => (emissionCounterType = emissionCounterType + 1))
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
      emissionCounterId = 0;
      emissionCounterType = 0;
      fixture = TestBed.createComponent(TestComponent);
      testOuterComponent = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should propagate abstract order ID to inner component', () => {
    expect(fixture.nativeElement.innerHTML).toContain(abstractOrderId);
  });

  it('should propagate abstract order type to inner component', () => {
    expect(fixture.nativeElement.innerHTML).toContain(AbstractOrderType.CART);
  });

  it('should emit changes only if actual value has changed for id', () => {
    expect(emissionCounterId).toBe(1);
    expect(emissionCounterType).toBe(1);

    testOuterComponent.type = AbstractOrderType.SAVED_CART;
    fixture.detectChanges();
    expect(emissionCounterId).toBe(1);
    expect(emissionCounterType).toBe(2);
  });

  it('should should emit changes only if actual value has changed for type', () => {
    expect(emissionCounterId).toBe(1);
    expect(emissionCounterType).toBe(1);

    testOuterComponent.id = 'newId';
    fixture.detectChanges();
    expect(emissionCounterId).toBe(2);
    expect(emissionCounterType).toBe(1);
  });
});
