import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SortingComponent } from './sorting.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

describe('SortingComponent', () => {
  let component: SortingComponent;
  let fixture: ComponentFixture<SortingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgSelectModule, FormsModule],
      declarations: [SortingComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit sort event', () => {
    spyOn(component.sortListEvent, 'emit');
    component.sortList('sortCode');
    expect(component.sortListEvent.emit).toHaveBeenCalledWith('sortCode');
  });
});
