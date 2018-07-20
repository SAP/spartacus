import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreLocatorPageLayoutComponent } from './store-locator-page-layout.component';

describe('StoreLocatorPageLayoutComponent', () => {
  let component: StoreLocatorPageLayoutComponent;
  let fixture: ComponentFixture<StoreLocatorPageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreLocatorPageLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreLocatorPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
