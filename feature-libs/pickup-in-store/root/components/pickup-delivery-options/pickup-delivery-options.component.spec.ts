// import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { PickupInStoreFacade } from '@spartacus/pickup-in-store/root';
import { PickupDeliveryOptionsComponent } from './pickup-delivery-options.component';
import createSpy = jasmine.createSpy;

class MockPickupInStoreFacade implements PickupInStoreFacade {
  getStore = createSpy();
}

describe('PickupDeliveryOptionsComponent', () => {
  let component: PickupDeliveryOptionsComponent;
  let fixture: ComponentFixture<PickupDeliveryOptionsComponent>;
  // let el: DebugElement;

  let service: PickupInStoreFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        PickupDeliveryOptionsComponent,
        {
          provide: PickupInStoreFacade,
          useClass: MockPickupInStoreFacade,
        },
      ],
      declarations: [PickupDeliveryOptionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickupDeliveryOptionsComponent);
    component = fixture.componentInstance;
    // el = fixture.debugElement;
    service = TestBed.inject(PickupInStoreFacade);

    fixture.detectChanges();
  });
  it('should create and call getStore', () => {
    expect(component).toBeDefined();
    expect(service.getStore).toHaveBeenCalled();
  });
});
