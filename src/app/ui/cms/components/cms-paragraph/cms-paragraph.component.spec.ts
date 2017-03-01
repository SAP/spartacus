import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsParagraphComponent } from './cms-paragraph.component';

describe('CmsParagraphComponent', () => {
  let component: CmsParagraphComponent;
  let fixture: ComponentFixture<CmsParagraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsParagraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsParagraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
