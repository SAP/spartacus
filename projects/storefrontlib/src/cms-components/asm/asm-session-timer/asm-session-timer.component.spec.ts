import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsmSessionTimerComponent } from './asm-session-timer.component';

describe('AsmSessionTimerComponent', () => {
  let component: AsmSessionTimerComponent;
  let fixture: ComponentFixture<AsmSessionTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsmSessionTimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmSessionTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
