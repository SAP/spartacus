import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreFinderPagingComponent } from './store-finder-paging.component';

describe('StoreFinderPagingComponent', () => {
  let component: StoreFinderPagingComponent;
  let fixture: ComponentFixture<StoreFinderPagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StoreFinderPagingComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderPagingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
