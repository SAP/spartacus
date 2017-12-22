import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ParagraphComponent } from './paragraph.component';
import { CmsService } from 'app/data/cms.service';
import { subscribeOn } from 'rxjs/operator/subscribeOn';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


function getParagraphComponentCmsTestData() {
  return {
    uid: '001',
    typeCode: 'CMSParagraphComponent',
    modifiedTime: '2017-12-21T18:15:15+0000',
    name: 'TestCMSParagraphComponent',
    container: 'false',
    type: 'Paragraph',
    content: 'Arbitrary paragraph content'
  };
}

class MockCmsService {
  public getComponentSubscription(key: string) {
    return new BehaviorSubject<any>(getParagraphComponentCmsTestData());
  }
}

describe('CmsParagraphComponent', () => {
  let paragraphComponent: ParagraphComponent;
  let fixture: ComponentFixture<ParagraphComponent>;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParagraphComponent ],
      providers: [{ provide: CmsService, useClass: MockCmsService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParagraphComponent);
    paragraphComponent = fixture.componentInstance;
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(paragraphComponent).toBeTruthy();
  });

  it('should contain cms data in the component after bootstrap', () => {
    expect(paragraphComponent).toBeTruthy();
    expect(paragraphComponent.component).toBeNull();
    paragraphComponent.bootstrap();
    expect(paragraphComponent.component).toEqual(getParagraphComponentCmsTestData());
  });

  it('should contain cms content in the html rendering after bootstrap', () => {
    expect(paragraphComponent).toBeTruthy();
    expect(paragraphComponent.component).toBeNull();
    paragraphComponent.bootstrap();
    fixture.detectChanges();
    expect(el.textContent).toContain(getParagraphComponentCmsTestData().content);
  });
});
