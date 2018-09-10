import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomParagraphComponent } from './custom-paragraph.component';

describe('CustomParagraphComponent', () => {
  let component: CustomParagraphComponent;
  let fixture: ComponentFixture<CustomParagraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomParagraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomParagraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
