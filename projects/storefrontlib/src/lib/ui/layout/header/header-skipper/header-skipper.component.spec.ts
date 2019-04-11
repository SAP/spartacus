import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSkipperComponent } from './header-skipper.component';
import { I18nTestingModule } from '@spartacus/core';

describe('HeaderSkipperComponent', () => {
  let component: HeaderSkipperComponent;
  let fixture: ComponentFixture<HeaderSkipperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [HeaderSkipperComponent],
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
