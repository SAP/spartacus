import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StoreFinderComponent } from './store-finder.component';

@Component({
  selector: 'cx-store-finder-header',
  template: '',
  standalone: false,
})
class MockStoreFinderHeaderComponent {}

describe('StoreFinderComponent', () => {
  let component: StoreFinderComponent;
  let fixture: ComponentFixture<StoreFinderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StoreFinderComponent, MockStoreFinderHeaderComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
