import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitLevelOrderDetailItemsWrapperComponent } from './unit-level-order-detail-items-wrapper.component';

describe('UnitLevelOrderDetailItemsWrapperComponent', () => {
  let component: UnitLevelOrderDetailItemsWrapperComponent;
  let fixture: ComponentFixture<UnitLevelOrderDetailItemsWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnitLevelOrderDetailItemsWrapperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      UnitLevelOrderDetailItemsWrapperComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
