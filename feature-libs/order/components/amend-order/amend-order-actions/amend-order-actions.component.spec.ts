import { Pipe, PipeTransform } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  RoutingConfigService,
  RoutingService,
} from '@spartacus/core';
import { AmendOrderActionsComponent } from './amend-order-actions.component';
import { StoreModule } from '@ngrx/store';
import { FormControl, FormGroup } from '@angular/forms';

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

class MockRoutingConfigService {
  getRouteConfig() {}
}

class MockRoutingService {
  go = jasmine.createSpy('go');
}

describe('AmendOrderActionsComponent', () => {
  let component: AmendOrderActionsComponent;
  let fixture: ComponentFixture<AmendOrderActionsComponent>;
  let routingService: RoutingService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          I18nTestingModule,
          StoreModule.forRoot({}),
        ],
        declarations: [MockUrlPipe, AmendOrderActionsComponent],
        providers: [
          {
            provide: RoutingConfigService,
            useClass: MockRoutingConfigService,
          },
          { provide: RoutingService, useClass: MockRoutingService },
        ],
      }).compileComponents();

      routingService = TestBed.inject(RoutingService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AmendOrderActionsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have row class', () => {
    fixture.detectChanges();
    const el: HTMLElement = fixture.debugElement.nativeElement;
    expect(el.classList).toContain('row');
  });

  it('should proceed to forward route if control is valid', () => {
    const orderCode = 'test1';
    const forwardRoute = 'my-test';
    const formControl = new FormGroup({
      test: new FormControl(),
    });
    const ev = {
      stopPropagation() {},
    };

    component.orderCode = orderCode;
    component.forwardRoute = forwardRoute;
    component.amendOrderForm = formControl;

    formControl.controls['test'].setErrors({ incorrect: true });
    component.continue(ev as Event);
    expect(routingService.go).not.toHaveBeenCalled();
    expect(formControl.invalid).toEqual(true);

    formControl.controls['test'].setErrors(null);
    component.continue(ev as Event);
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: forwardRoute,
      params: { code: orderCode },
    });
  });
});
