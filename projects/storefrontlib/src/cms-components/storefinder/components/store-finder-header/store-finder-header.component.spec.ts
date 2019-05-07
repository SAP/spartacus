import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreFinderHeaderComponent } from './store-finder-header.component';

@Component({
  template: '',
  selector: 'cx-store-finder-search',
})
class MockStoreFinderSearchComponent {}

describe('StoreFinderHeaderComponent', () => {
  let component: StoreFinderHeaderComponent;
  let fixture: ComponentFixture<StoreFinderHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StoreFinderHeaderComponent,
        MockStoreFinderSearchComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
