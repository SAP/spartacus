import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseyotpoComponent } from './baseyotpo.component';

describe('BaseyotpoComponent', () => {
  let component: BaseyotpoComponent;
  let fixture: ComponentFixture<BaseyotpoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BaseyotpoComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseyotpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
