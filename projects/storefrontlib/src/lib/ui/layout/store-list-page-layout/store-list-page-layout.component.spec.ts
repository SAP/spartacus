import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreListPageLayoutComponent } from './store-list-page-layout.component';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'cx-store-finder-search',
  template: ''
})
export class MockStoreFinderSearchComponent {}

@Component({
  selector: 'cx-store-finder-list',
  template: ''
})
export class MockStoreFinderListComponent {
  @Input()
  searchQuery;
}

@Component({
  selector: 'cx-store-finder-grid',
  template: ''
})
export class MockStoreFinderGridComponent {}

describe('StoreListPageLayoutComponent', () => {
  let component: StoreListPageLayoutComponent;
  let fixture: ComponentFixture<StoreListPageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StoreListPageLayoutComponent,
        MockStoreFinderSearchComponent,
        MockStoreFinderListComponent,
        MockStoreFinderGridComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreListPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
