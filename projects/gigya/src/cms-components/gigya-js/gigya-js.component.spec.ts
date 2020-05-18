import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GigyaJsComponent } from './gigya-js.component';

describe('GigyaJsComponent', () => {
  let component: GigyaJsComponent;
  let fixture: ComponentFixture<GigyaJsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GigyaJsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GigyaJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
