import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { StoreFinderHeaderComponent } from './store-finder-header.component';
import { WindowRef } from '@spartacus/core';
import { Component } from '@angular/core';

@Component({
  template: '',
  selector: 'cx-store-finder-search'
})
class MockStoreFinderSearchComponent {}

describe('StoreFinderHeaderComponent', () => {
  let component: StoreFinderHeaderComponent;
  let fixture: ComponentFixture<StoreFinderHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StoreFinderHeaderComponent,
        MockStoreFinderSearchComponent
      ],
      providers: [WindowRef]
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
