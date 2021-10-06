import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutOrchestratorComponent } from './checkout-orchestrator.component';

describe('MultiStepCheckoutOrchestratorComponent', () => {
  let component: CheckoutOrchestratorComponent;
  let fixture: ComponentFixture<CheckoutOrchestratorComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CheckoutOrchestratorComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutOrchestratorComponent);
    component = fixture.componentInstance;
  });

  it('components renders', () => {
    expect(component).toBeTruthy();
  });
});
