import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsmComponent } from './asm.component';

describe('AsmComponent', () => {
  let component: AsmComponent;
  let fixture: ComponentFixture<AsmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
