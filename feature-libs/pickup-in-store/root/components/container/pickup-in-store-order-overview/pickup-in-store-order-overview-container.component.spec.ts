import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { PickupInStoreOrderOverviewContainerComponent } from './pickup-in-store-order-overview-container.component';

describe('PickupInStoreOrderOverviewContainerComponent', () => {
  let component: PickupInStoreOrderOverviewContainerComponent;
  let fixture: ComponentFixture<PickupInStoreOrderOverviewContainerComponent>;

  const configureTestingModule = () =>
    TestBed.configureTestingModule({
      declarations: [PickupInStoreOrderOverviewContainerComponent],
      imports: [CommonModule, I18nTestingModule],
    });

  const stubServiceAndCreateComponent = () => {
    fixture = TestBed.createComponent(
      PickupInStoreOrderOverviewContainerComponent
    );
    component = fixture.componentInstance;

    fixture.detectChanges();
  };

  it('should create', () => {
    configureTestingModule().compileComponents();
    stubServiceAndCreateComponent();
    expect(component).toBeDefined();
  });
});
