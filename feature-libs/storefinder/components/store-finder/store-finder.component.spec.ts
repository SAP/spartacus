import { Component } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreFinderComponent } from './store-finder.component';

@Component({
  selector: 'cx-store-finder-header',
  template: '',
})
class MockStoreFinderHeaderComponent {}

describe('StoreFinderComponent', () => {
  let component: StoreFinderComponent;
  let fixture: ComponentFixture<StoreFinderComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [StoreFinderComponent, MockStoreFinderHeaderComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
