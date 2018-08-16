import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreFinderListItemComponent } from './store-finder-list-item.component';

describe('StoreFinderListItemComponent', () => {
  let component: StoreFinderListItemComponent;
  let fixture: ComponentFixture<StoreFinderListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StoreFinderListItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
