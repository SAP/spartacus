import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabParagraphContainerComponent } from './tab-paragraph-container.component';

describe('TabParagraphContainerComponent', () => {
  let component: TabParagraphContainerComponent;
  let fixture: ComponentFixture<TabParagraphContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabParagraphContainerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabParagraphContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
