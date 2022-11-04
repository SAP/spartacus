import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitLevelOrderHistoryFilterNavComponent } from './unit-level-order-history-filter-nav.component';

describe('UnitLevelOrderHistoryFilterNavComponent', () => {
  let component: UnitLevelOrderHistoryFilterNavComponent;
  let fixture: ComponentFixture<UnitLevelOrderHistoryFilterNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitLevelOrderHistoryFilterNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitLevelOrderHistoryFilterNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
