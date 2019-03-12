import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YotporeviewComponent } from './yotporeview.component';

describe('YotporeviewComponent', () => {
  let component: YotporeviewComponent;
  let fixture: ComponentFixture<YotporeviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YotporeviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YotporeviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
