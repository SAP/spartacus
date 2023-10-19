import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { OpfCtaScriptsComponent } from './opf-cta-scripts.component';
import { OpfCtaScriptsService } from './opf-cta-scripts.service';
import createSpy = jasmine.createSpy;

const mockHtmlsList = [
  '<div  style="border-style: solid;text-align:center;border-radius:10px;align-content:center;background-color:yellow;color:black"><h2>Thanks for purchasing our great products</h2><h3>Please use promo code:<b>123abc</b> for your next purchase<h3></div><script>console.log(\'CTA Script #1 is running\')</script>',
];

describe('OpfCtaScriptsComponent', () => {
  let component: OpfCtaScriptsComponent;
  let fixture: ComponentFixture<OpfCtaScriptsComponent>;
  let opfCtaScriptsService: jasmine.SpyObj<OpfCtaScriptsService>;

  beforeEach(() => {
    opfCtaScriptsService = jasmine.createSpyObj('OpfCtaScriptsService', [
      'getCtaHtmlslList',
    ]);

    TestBed.configureTestingModule({
      declarations: [OpfCtaScriptsComponent],
      providers: [
        { provide: OpfCtaScriptsService, useValue: opfCtaScriptsService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    opfCtaScriptsService.getCtaHtmlslList.and.returnValue(of(mockHtmlsList));
    fixture = TestBed.createComponent(OpfCtaScriptsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return Htmls list without error', () => {
    component.ctaHtmlList$.subscribe((htmlList) => {
      expect(htmlList[0]).toBeTruthy();
      component.isError$.asObservable().subscribe((isError) => {
        expect(isError).toBeFalsy();
      });
    });
  });

  it('should isError be true when error is thrown', (done) => {
    opfCtaScriptsService.getCtaHtmlslList = createSpy().and.returnValue(
      throwError('error')
    );
    fixture = TestBed.createComponent(OpfCtaScriptsComponent);
    component = fixture.componentInstance;
    component.ctaHtmlList$.subscribe({
      error: (error) => {
        expect(error).toEqual('error');
        component.isError$.asObservable().subscribe((isError) => {
          expect(isError).toBeTruthy();
          done();
        });
      },
    });
  });
});
