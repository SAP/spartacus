import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ParagraphComponent } from './paragraph.component';
import { CmsService } from '@spartacus/core';

describe('CmsParagraphComponent in CmsLib', () => {
  let paragraphComponent: ParagraphComponent;
  let fixture: ComponentFixture<ParagraphComponent>;
  let el: DebugElement;

  const componentData = {
    uid: '001',
    typeCode: 'CMSParagraphComponent',
    modifiedTime: '2017-12-21T18:15:15+0000',
    name: 'TestCMSParagraphComponent',
    container: 'false',
    type: 'Paragraph',
    content: 'Arbitrary paragraph content'
  };

  class MockCmsServiceClass {
    getComponentData = () => of(componentData);
  }
  const MockCmsService = new MockCmsServiceClass();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ParagraphComponent],
      providers: [{ provide: CmsService, useValue: MockCmsService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParagraphComponent);
    paragraphComponent = fixture.componentInstance;

    el = fixture.debugElement;
  });

  it('should be created', () => {
    expect(paragraphComponent).toBeTruthy();
  });

  it('should contain cms content in the html rendering after bootstrap', () => {
    expect(paragraphComponent.component).toBeNull();
    paragraphComponent.onCmsComponentInit(componentData.uid);
    expect(paragraphComponent.component).toBe(componentData);
    expect(el.query(By.css('p')).nativeElement.textContent).toEqual(
      paragraphComponent.component.content
    );
  });

  it('should sanitize unsafe html', () => {
    const unsafeData = Object.assign({}, componentData);
    unsafeData.content = `<img src="" onerror='alert(1)'>`;
    spyOn(MockCmsService, 'getComponentData').and.returnValue(of(unsafeData));

    spyOn(console, 'warn').and.stub(); // Prevent warning to be showed by Angular when sanitizing

    expect(paragraphComponent.component).toBeNull();
    paragraphComponent.onCmsComponentInit('');
    expect(paragraphComponent.component).toBe(unsafeData);
    expect(el.query(By.css('p')).nativeElement.innerHTML).toEqual(
      `<img src="">`
    );
  });
});
