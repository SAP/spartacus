import { DebugElement, Pipe, PipeTransform } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { ParagraphComponent } from './paragraph.component';
import { CmsComponentData } from '@spartacus/storefront';
import { CmsParagraphComponent, CmsComponent } from '@spartacus/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

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
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ParagraphComponent);
    paragraphComponent = fixture.componentInstance;

    el = fixture.debugElement;
  });

  it('should be created', () => {
    expect(paragraphComponent).toBeTruthy();
  });

  it('should contain cms content in the html rendering after bootstrap', () => {
    data$.next(componentData);
    fixture.detectChanges();
    expect(el.query(By.css('p')).nativeElement.textContent).toEqual(
      componentData.content
    );
  });

  it('should sanitize unsafe html', () => {
    const unsafeData = Object.assign({}, componentData);
    unsafeData.content = `<img src="" onerror='alert(1)'>`;
    data$.next(unsafeData);
    spyOn(console, 'warn').and.stub(); // Prevent warning to be showed by Angular when sanitizing
    fixture.detectChanges();
    expect(el.query(By.css('p')).nativeElement.innerHTML).toEqual(
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

  it('should use router navigation for internal links', () => {
    const dataWithLinks = Object.assign({}, componentData);
    dataWithLinks.content = `<a href="/internal-link">Link</a>`;
    data$.next(dataWithLinks);
    fixture.detectChanges();

    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    expect(router.navigate).toHaveBeenCalledTimes(0);
    el.query(By.css('a')).nativeElement.click();
    expect(router.navigate).toHaveBeenCalledTimes(1);
  });
});
