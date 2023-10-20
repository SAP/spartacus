import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { OpfCtaWrapperComponent } from './opf-cta-scripts.component';
import { OpfCtaScriptsService } from './opf-cta-scripts.service';
import createSpy = jasmine.createSpy;

const mockHtmlsList = [
  '<div  style="border-style: solid;text-align:center;border-radius:10px;align-content:center;background-color:yellow;color:black"><h2>Thanks for purchasing our great products</h2><h3>Please use promo code:<b>123abc</b> for your next purchase<h3></div><script>console.log(\'CTA Script #1 is running\')</script>',
  '<div  style="border-style: solid;text-align:center;border-radius:10px;align-content:center;background-color:yellow;color:black"><h2>Thanks again for purchasing our great products</h2><h3>Please use promo code:<b>123abc</b> for your next purchase<h3></div><script>console.log(\'CTA Script #2 is running\')</script>',
];
const ctaButtonSelector = 'cx-opf-cta-button';
describe('OpfCtaScriptsComponent', () => {
  let component: OpfCtaWrapperComponent;
  let fixture: ComponentFixture<OpfCtaWrapperComponent>;
  let opfCtaScriptsService: jasmine.SpyObj<OpfCtaScriptsService>;

  beforeEach(() => {
    opfCtaScriptsService = jasmine.createSpyObj('OpfCtaScriptsService', [
      'getCtaHtmlslList',
    ]);

    TestBed.configureTestingModule({
      declarations: [OpfCtaWrapperComponent],
      providers: [
        { provide: OpfCtaScriptsService, useValue: opfCtaScriptsService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    opfCtaScriptsService.getCtaHtmlslList.and.returnValue(of(mockHtmlsList));
    fixture = TestBed.createComponent(OpfCtaWrapperComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return Htmls list and display ctaButton elements', (done) => {
    component.ctaHtmls$.subscribe((htmlList) => {
      expect(htmlList[0]).toBeTruthy();
      fixture.detectChanges();
      expect(
        fixture.nativeElement.querySelectorAll(ctaButtonSelector).length
      ).toEqual(2);
      done();
    });
  });

  it('should isError be true when error is thrown', (done) => {
    opfCtaScriptsService.getCtaHtmlslList = createSpy().and.returnValue(
      throwError('error')
    );
    fixture = TestBed.createComponent(OpfCtaWrapperComponent);
    component = fixture.componentInstance;
    component.ctaHtmls$.subscribe((htmlList) => {
      expect(htmlList).toEqual([]);
      fixture.detectChanges();
      expect(
        fixture.nativeElement.querySelector(ctaButtonSelector)
      ).toBeFalsy();
      done();
    });
  });

  it('should display spinner when html list is undefined', (done) => {
    opfCtaScriptsService.getCtaHtmlslList = createSpy().and.returnValue(
      of(undefined)
    );
    fixture = TestBed.createComponent(OpfCtaWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('cx-spinner')).toBeTruthy();
    done();
  });
});
