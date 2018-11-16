import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { StoreListPageComponent } from './store-list-page.component';
@Component({
  selector: 'cx-store-list-page-layout',
  template: ''
})
export class MockStoreListPageLayoutComponent {}

describe('StoreListPageComponent', () => {
  let component: StoreListPageComponent;
  let fixture: ComponentFixture<StoreListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StoreListPageComponent, MockStoreListPageLayoutComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
