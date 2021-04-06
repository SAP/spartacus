import { ChangeDetectionStrategy } from '@angular/core';
import {
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { I18nTestingModule } from '@spartacus/core';
import { ItemCounterComponent } from '@spartacus/storefront';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfiguratorUISettings } from '../../config/configurator-ui-settings';
import {
  ConfiguratorAttributeQuantityComponent,
  Quantity,
} from './configurator-attribute-quantity.component';

const fakeDebounceTime = 750;
const changedQty = 9;
const TestConfiguratorUISettings: ConfiguratorUISettings = {
  rulebasedConfigurator: {
    quantityDebounceTime: fakeDebounceTime,
  },
};

let component: ConfiguratorAttributeQuantityComponent;
let fixture: ComponentFixture<ConfiguratorAttributeQuantityComponent>;

function initialize(disable: boolean) {
  initializeWithObs(new BehaviorSubject(disable));
}

function initializeWithObs(disableObs: Observable<boolean>) {
  fixture = TestBed.createComponent(ConfiguratorAttributeQuantityComponent);

  component = fixture.componentInstance;
  component.quantity = new FormControl(1);
  const initialQuantity: Quantity = {
    quantity: 1,
  };
  component.quantityOptions = {
    allowZero: true,
    initialQuantity: initialQuantity,
    disableQuantityActions$: disableObs,
  };
  spyOn(component.changeQuantity, 'emit').and.callThrough();
  fixture.detectChanges();
}

describe(' ConfiguratorAttributeQuantityComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          ConfiguratorAttributeQuantityComponent,
          ItemCounterComponent,
        ],
        imports: [I18nTestingModule],
        providers: [
          {
            provide: ConfiguratorUISettings,
            useValue: TestConfiguratorUISettings,
          },
        ],
      })
        .overrideComponent(ConfiguratorAttributeQuantityComponent, {
          set: {
            changeDetection: ChangeDetectionStrategy.Default,
          },
        })
        .compileComponents();
    })
  );

  it('should create', () => {
    initialize(false);
    expect(component).toBeTruthy();
  });

  it('should call handleQuantity on event onChangeQuantity', () => {
    initialize(false);
    component.onChangeQuantity();
    expect(component.changeQuantity.emit).toHaveBeenCalled();
  });

  it('should not emit change event on quantity change if debounce time has not yet passed', fakeAsync(() => {
    initialize(false);
    component.quantity.setValue(changedQty);
    fixture.detectChanges();
    tick(fakeDebounceTime - 100);
    expect(component.changeQuantity.emit).not.toHaveBeenCalled();
    discardPeriodicTasks();
  }));

  it('should emit change event on quantity change after debounce time has passed', fakeAsync(() => {
    initialize(false);
    component.quantity.setValue(changedQty);
    fixture.detectChanges();
    tick(fakeDebounceTime + 10);
    expect(component.changeQuantity.emit).toHaveBeenCalled();
    discardPeriodicTasks();
  }));

  it('should de-activate quantity control if options say so', () => {
    initialize(true);
    expect(component.quantity.disabled).toBe(true);
  });

  it('should not emit same quantity twice just because it gets disabled in between', fakeAsync(() => {
    const subject = new BehaviorSubject(false);
    initializeWithObs(subject);

    component.quantity.setValue(changedQty);
    fixture.detectChanges();
    tick(fakeDebounceTime + 10);
    subject.next(true);
    subject.next(false);
    tick(fakeDebounceTime + 10);

    expect(component.changeQuantity.emit).toHaveBeenCalledTimes(1);
    discardPeriodicTasks();
  }));

  it('should not emit initial quantity just because it gets disabled in between', fakeAsync(() => {
    const subject = new BehaviorSubject(false);
    initializeWithObs(subject);
    subject.next(true);
    subject.next(false);
    tick(fakeDebounceTime + 10);

    expect(component.changeQuantity.emit).not.toHaveBeenCalled();
    discardPeriodicTasks();
  }));

  it('should not emit same quantity twice just because it gets enabled multiple times', fakeAsync(() => {
    const subject = new BehaviorSubject(false);
    initializeWithObs(subject);
    subject.next(false);
    subject.next(false);

    component.quantity.setValue(changedQty);
    fixture.detectChanges();
    tick(fakeDebounceTime + 10);
    expect(component.changeQuantity.emit).toHaveBeenCalledTimes(1);
    discardPeriodicTasks();
  }));
});
