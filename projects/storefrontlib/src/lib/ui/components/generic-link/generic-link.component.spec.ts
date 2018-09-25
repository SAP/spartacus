import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericLinkComponent } from './generic-link.component';

describe('GenericLinkComponent', () => {
  let component: GenericLinkComponent;
  let fixture: ComponentFixture<GenericLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GenericLinkComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
