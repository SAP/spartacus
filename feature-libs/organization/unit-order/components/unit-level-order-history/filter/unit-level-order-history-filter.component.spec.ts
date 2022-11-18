import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnitLevelOrderHistoryFilterComponent } from './unit-level-order-history-filter.component';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxTranslate',
})
class MockTranslatePipe implements PipeTransform {
  transform(): any {}
}

describe('UnitLevelOrderHistoryFilterComponent', () => {
  let component: UnitLevelOrderHistoryFilterComponent;
  let fixture: ComponentFixture<UnitLevelOrderHistoryFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnitLevelOrderHistoryFilterComponent, MockTranslatePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(UnitLevelOrderHistoryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
