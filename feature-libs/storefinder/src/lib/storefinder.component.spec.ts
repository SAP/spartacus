import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorefinderComponent } from './storefinder.component';

describe('StorefinderComponent', () => {
  let component: StorefinderComponent;
  let fixture: ComponentFixture<StorefinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StorefinderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StorefinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
