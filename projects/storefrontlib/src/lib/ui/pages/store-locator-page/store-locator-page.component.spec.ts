import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreLocatorPageComponent } from './store-locator-page.component';

describe('StoreLocatorPageComponent', () => {
  let component: StoreLocatorPageComponent;
  let fixture: ComponentFixture<StoreLocatorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreLocatorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreLocatorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
