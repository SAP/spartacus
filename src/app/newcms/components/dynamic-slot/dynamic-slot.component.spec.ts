import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicSlotComponent } from './dynamic-slot.component';

describe('DynamicSlotComponent', () => {
  let component: DynamicSlotComponent;
  let fixture: ComponentFixture<DynamicSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
