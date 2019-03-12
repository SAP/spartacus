import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SccComponent } from './scc.component';

describe('SccComponent', () => {
  let component: SccComponent;
  let fixture: ComponentFixture<SccComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SccComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
