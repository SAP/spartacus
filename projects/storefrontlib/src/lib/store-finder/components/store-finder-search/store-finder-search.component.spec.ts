import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreFinderSearchComponent } from './store-finder-search.component';

describe('StoreFinderSearchComponent', () => {
  let component: StoreFinderSearchComponent;
  let fixture: ComponentFixture<StoreFinderSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StoreFinderSearchComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
