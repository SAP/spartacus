import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YyyComponent } from './yyy.component';

describe('YyyComponent', () => {
  let component: YyyComponent;
  let fixture: ComponentFixture<YyyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YyyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YyyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
