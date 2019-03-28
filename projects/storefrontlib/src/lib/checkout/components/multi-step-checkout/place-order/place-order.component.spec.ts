import { PlaceOrderComponent } from './place-order.component';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { CheckoutService } from '@spartacus/core';
import { Pipe, PipeTransform } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

class MockCheckoutService {
  placeOrder: () => {};
}

@Pipe({
  name: 'cxTranslateUrl'
})
class MockTranslateUrlPipe implements PipeTransform {
  transform(): any {}
}

fdescribe('PlaceOrderComponent', () => {
  let component: PlaceOrderComponent;
  let fixture: ComponentFixture<PlaceOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        MockTranslateUrlPipe,
        PlaceOrderComponent
      ],
      providers: [
        { provide: CheckoutService, useClass: MockCheckoutService}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceOrderComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  })
});
