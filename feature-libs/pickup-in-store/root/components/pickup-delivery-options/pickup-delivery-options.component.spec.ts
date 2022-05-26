import { ElementRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { PickupInStoreFacade } from '@spartacus/pickup-in-store/root';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { of } from 'rxjs';
import { PickupDeliveryOptionsComponent } from './pickup-delivery-options.component';

import createSpy = jasmine.createSpy;

class MockPickupInStoreFacade implements PickupInStoreFacade {
  getStore = createSpy();
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialog(
    _caller: LAUNCH_CALLER,
    _openElement?: ElementRef,
    _vcr?: ViewContainerRef
  ) {
    return of();
  }
}

describe('PickupDeliveryOptionsComponent', () => {
  let component: PickupDeliveryOptionsComponent;
  let fixture: ComponentFixture<PickupDeliveryOptionsComponent>;

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
        {
          provide: LaunchDialogService,
          useClass: MockLaunchDialogService,
        },
      ],
      declarations: [PickupDeliveryOptionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickupDeliveryOptionsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PickupInStoreFacade);

    fixture.detectChanges();
  });
  it('should create and call getStore', () => {
    expect(component).toBeDefined();
    expect(service.getStore).toHaveBeenCalled();
  });
});
