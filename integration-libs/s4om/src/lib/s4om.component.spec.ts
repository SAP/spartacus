import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S4omComponent } from './s4om.component';

describe('S4omComponent', () => {
  let component: S4omComponent;
  let fixture: ComponentFixture<S4omComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [S4omComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S4omComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
