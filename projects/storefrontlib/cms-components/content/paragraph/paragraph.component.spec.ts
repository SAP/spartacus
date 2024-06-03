import { DebugElement, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By, DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CmsComponent, CmsParagraphComponent } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';
import { ParagraphComponent } from './paragraph.component';

@Pipe({ name: 'cxSupplementHashAnchors' })
export class MockAnchorPipe implements PipeTransform {
  public transform(html: string): string {
    return html;
  }
}

describe('CmsParagraphComponent in CmsLib', () => {
  let paragraphComponent: ParagraphComponent;
  let fixture: ComponentFixture<ParagraphComponent>;
  let el: DebugElement;
  let router: Router;
  let domSanitizer: DomSanitizer;

  const componentData: CmsParagraphComponent = {
    uid: '001',
    typeCode: 'CMSParagraphComponent',
    modifiedTime: new Date('2017-12-21T18:15:15+0000'),
    name: 'TestCMSParagraphComponent',
    container: 'false',
    title: 'Paragraph',
    content: 'Arbitrary paragraph content',
  };

  const data$ = new BehaviorSubject<CmsParagraphComponent>({});

  const MockCmsComponentData = <CmsComponentData<CmsComponent>>{
    data$: data$.asObservable(),
  };

  class MockDomSanitizer {
    bypassSecurityTrustHtml(html = '') {
      return html;
    }
  }

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [MockAnchorPipe, ParagraphComponent],
        providers: [
          {
            provide: CmsComponentData,
            useValue: MockCmsComponentData,
          },
          { provide: DomSanitizer, useClass: MockDomSanitizer },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ParagraphComponent);
    paragraphComponent = fixture.componentInstance;
    router = TestBed.inject(Router);
    domSanitizer = TestBed.inject(DomSanitizer);

    el = fixture.debugElement;
  });

  it('should be created', () => {
    expect(paragraphComponent).toBeTruthy();
  });

  it('should contain cms content in the html rendering after bootstrap', () => {
    data$.next(componentData);
    fixture.detectChanges();
    expect(el.query(By.css('div')).nativeElement.textContent).toEqual(
      componentData.content
    );
  });

  it('should sanitize unsafe html', () => {
    const unsafeData = Object.assign({}, componentData);
    unsafeData.content = `<img src="" onerror='alert(1)'>`;
    data$.next(unsafeData);
    spyOn(console, 'warn').and.stub(); // Prevent warning to be showed by Angular when sanitizing
    fixture.detectChanges();
    expect(el.query(By.css('div')).nativeElement.innerHTML).toEqual(
      `<img src="">`
    );
  });

  it('should emit handleClick event', () => {
    spyOn(paragraphComponent, 'handleClick');
    expect(paragraphComponent.handleClick).toHaveBeenCalledTimes(0);
    el.nativeElement.click();
    fixture.detectChanges();
    expect(paragraphComponent.handleClick).toHaveBeenCalledTimes(1);
  });

  describe('Internal Link Navigation', () => {
    beforeEach(() => {
      spyOn(router, 'navigateByUrl');

      // Prevent external link navigation
      window.onbeforeunload = function () {
        return '';
      };
    });

    it('should use router navigation for internal links without protocol', () => {
      const url = 'internal-link';
      const link = setupLink(url);
      link.click();
      expect(router.navigateByUrl).toHaveBeenCalledWith(url);
    });

    it('should use router navigation for internal links with /', () => {
      const url = '/internal-link';
      const link = setupLink(url);
      link.click();
      expect(router.navigateByUrl).toHaveBeenCalledWith(url);
    });

    it('should use router navigation for internal links with query params', () => {
      const url = '/internal-link?test=yes';
      const link = setupLink(url);
      link.click();
      expect(router.navigateByUrl).toHaveBeenCalledWith(url);
    });

    it('should NOT use router navigation for external links', () => {
      const url = 'http://example.com';
      const link = setupLink(url);
      link.click();
      expect(router.navigateByUrl).not.toHaveBeenCalled();
    });

    it('should NOT use router navigation for other protocols', () => {
      const url = 'mailto:test-email@test.com';
      const link = setupLink(url);
      link.click();
      expect(router.navigateByUrl).not.toHaveBeenCalled();
    });

    it('should call DOM sanitizer', () => {
      const bypassSecurityTrustHtmlSpy = spyOn(
        domSanitizer,
        'bypassSecurityTrustHtml'
      ).and.callThrough();

      data$.next(componentData);
      fixture.detectChanges();

      expect(bypassSecurityTrustHtmlSpy).toHaveBeenCalled();
    });

    it('should not pass root url to router navigation for internal links ', () => {
      const url = window.location.href + '#001';
      const link = setupLink(url);
      link.click();

      const documentUrlObject = new URL(window.location.href + '#001');

      expect(router.navigateByUrl).toHaveBeenCalledWith(
        documentUrlObject.pathname + documentUrlObject.hash
      );
    });

    function setupLink(url: string): HTMLLinkElement {
      const dataWithLinks = Object.assign({}, componentData);
      dataWithLinks.content = `<a href="${url}">Link</a>`;
      data$.next(dataWithLinks);
      fixture.detectChanges();
      return el.query(By.css('a')).nativeElement;
    }
  });
});
