import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TabParagraphComponent } from './tab-paragraph.component';
import { of } from 'rxjs';
import { CmsService } from '../../../cms/facade/cms.service';

const MockCmsService = {
  getComponentData: () => of({})
};

describe('TabParagraphComponent', () => {
  let component: TabParagraphComponent;
  let fixture: ComponentFixture<TabParagraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabParagraphComponent],
      providers: [{ provide: CmsService, useValue: MockCmsService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabParagraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
