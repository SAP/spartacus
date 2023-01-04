import { DebugElement, Pipe, PipeTransform } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { ParagraphComponent } from './paragraph.component';
import { CmsComponentData } from '@spartacus/storefront';
import {
  CmsParagraphComponent,
  CmsComponent,
  FeatureConfigService,
} from '@spartacus/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

@Pipe({ name: 'cxSupplementHashAnchors' })
export class MockAnchorPipe implements PipeTransform {
  public transform(html: string): string {
    return html;
  }
}

/**
 * TODO: (#CXSPA-778) Remove MockFeatureConfigService in 6.0
 */
class MockFeatureConfigService implements Partial<FeatureConfigService> {
  isLevel(_version: string): boolean {
    return true;
  }
}

describe('CmsParagraphComponent in CmsLib', () => {
  let paragraphComponent: ParagraphComponent;
  let fixture: ComponentFixture<ParagraphComponent>;
  let el: DebugElement;
  let router: Router;

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
          {
            provide: FeatureConfigService,
            useClass: MockFeatureConfigService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ParagraphComponent);
    paragraphComponent = fixture.componentInstance;
    router = TestBed.inject(Router);

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

    function setupLink(url: string): HTMLLinkElement {
      const dataWithLinks = Object.assign({}, componentData);
      dataWithLinks.content = `<a href="${url}">Link</a>`;
      data$.next(dataWithLinks);
      fixture.detectChanges();
      return el.query(By.css('a')).nativeElement;
    }
  });
});
