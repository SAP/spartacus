import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { CurrentBudgetService } from '../current-budget.service';
import { BudgetListComponent } from './budget-list.component';
import { BudgetListService } from './budget-list.service';

class MockCurrentBudgetService {}
class MockBudgetListService {
  getTable = () => {};
}

describe('BudgetListComponent', () => {
  let component: BudgetListComponent;
  let fixture: ComponentFixture<BudgetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SplitViewTestingModule, RouterTestingModule],
      declarations: [BudgetListComponent],
      providers: [
        { provide: CurrentBudgetService, useClass: MockCurrentBudgetService },
        { provide: BudgetListService, useClass: MockBudgetListService },
      ],
    }).compileComponents();
  }));

  describe('with table data', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(BudgetListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
