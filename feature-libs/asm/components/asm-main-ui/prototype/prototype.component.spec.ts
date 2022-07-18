import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrototypeComponent } from './prototype.component';

describe('PrototypeComponent', () => {
  let component: PrototypeComponent;
  let fixture: ComponentFixture<PrototypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrototypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrototypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
