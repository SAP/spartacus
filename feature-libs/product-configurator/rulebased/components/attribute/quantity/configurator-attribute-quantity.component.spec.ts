import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfiguratorUISettingsConfig } from '../../config/configurator-ui-settings.config';
import { ConfiguratorAttributeQuantityComponent } from './configurator-attribute-quantity.component';

const fakeDebounceTime = 750;
const changedQty = 9;
const TestConfiguratorUISettings: ConfiguratorUISettingsConfig = {
  productConfigurator: {
    updateDebounceTime: {
      quantity: fakeDebounceTime,
    },
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

  component.quantityOptions = {
    allowZero: true,
    initialQuantity: 1,
    disableQuantityActions$: disableObs,
  };
  spyOn(component.changeQuantity, 'emit').and.callThrough();
  fixture.detectChanges();
}
@Component({
  template: '',
  selector: 'cx-item-counter',
})
class MockItemCounterComponent {
  @Input() min: number;
  @Input() max: number;
  @Input() step: any;
  @Input() control: any;
  @Input() allowZero: boolean;
}

describe(' ConfiguratorAttributeQuantityComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          ConfiguratorAttributeQuantityComponent,
          MockItemCounterComponent,
        ],
        imports: [I18nTestingModule],
        providers: [
          {
            provide: ConfiguratorUISettingsConfig,
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
