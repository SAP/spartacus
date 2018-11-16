import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Input, Component } from '@angular/core';
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
