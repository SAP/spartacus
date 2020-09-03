import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrganizationEditTestingModule } from '../../shared/organization-edit/organization-edit.testing.module';
import { BudgetEditComponent } from './budget-edit.component';

@Component({
  selector: 'cx-budget-form',
  template: '',
})
class MockBudgetFormComponent {}

describe('BudgetEditComponent', () => {
  let component: BudgetEditComponent;
  let fixture: ComponentFixture<BudgetEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [OrganizationEditTestingModule],
      declarations: [BudgetEditComponent, MockBudgetFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetEditComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
