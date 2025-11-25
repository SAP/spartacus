import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StoreFinderHeaderComponent } from '../public_api';
import { StoreFinderComponent } from './store-finder.component';

@Component({
  selector: 'cx-store-finder-header',
  template: '',
})
class MockStoreFinderHeaderComponent {}

describe('StoreFinderComponent', () => {
  let component: StoreFinderComponent;
  let fixture: ComponentFixture<StoreFinderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StoreFinderComponent],
    })
      .overrideComponent(StoreFinderComponent, {
        remove: {
          imports: [StoreFinderHeaderComponent],
        },
        add: {
          imports: [MockStoreFinderHeaderComponent],
        },
      })
      .compileComponents();
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
