import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { StoreFinderPageLayoutComponent } from './store-finder-page-layout.component';

@Component({
  selector: 'cx-store-finder-header',
  template: ''
})
export class MockStoreFinderHeaderComponent {}

describe('StoreFinderPageLayoutComponent', () => {
  let component: StoreFinderPageLayoutComponent;
  let fixture: ComponentFixture<StoreFinderPageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        StoreFinderPageLayoutComponent,
        MockStoreFinderHeaderComponent
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
