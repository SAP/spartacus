import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorefrontlibComponent } from './storefrontlib.component';

describe('StorefrontlibComponent', () => {
  let component: StorefrontlibComponent;
  let fixture: ComponentFixture<StorefrontlibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorefrontlibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorefrontlibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
