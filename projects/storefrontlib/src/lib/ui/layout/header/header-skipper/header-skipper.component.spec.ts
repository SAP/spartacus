import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSkipperComponent } from './header-skipper.component';

describe('HeaderSkipperComponent', () => {
  let component: HeaderSkipperComponent;
  let fixture: ComponentFixture<HeaderSkipperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderSkipperComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderSkipperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
