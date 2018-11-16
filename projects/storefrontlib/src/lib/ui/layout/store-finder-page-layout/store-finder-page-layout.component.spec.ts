import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Input, Component } from '@angular/core';
import { StoreFinderPageLayoutComponent } from './store-finder-page-layout.component';

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
  selector: 'cx-store-finder-list-count',
  template: ''
})
export class MockStoreFinderListCountComponent {}

describe('StoreFinderPageLayoutComponent', () => {
  let component: StoreFinderPageLayoutComponent;
  let fixture: ComponentFixture<StoreFinderPageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StoreFinderPageLayoutComponent,
        MockStoreFinderSearchComponent,
        MockStoreFinderListComponent,
        MockStoreFinderListCountComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
