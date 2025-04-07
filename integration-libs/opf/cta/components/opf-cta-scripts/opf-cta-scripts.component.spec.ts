import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpfDynamicScript } from '@spartacus/opf/base/root';
import { of, throwError } from 'rxjs';
import { OpfCtaScriptsComponent } from './opf-cta-scripts.component';
import { OpfCtaScriptsService } from './opf-cta-scripts.service';
import createSpy = jasmine.createSpy;

const mockHtmlsList: OpfDynamicScript[] = [
  {
    html: '<div  style="border-style: solid;text-align:center;border-radius:10px;align-content:center;background-color:yellow;color:black"><h2>Thanks for purchasing our great products</h2><h3>Please use promo code:<b>123abc</b> for your next purchase<h3></div><script>console.log(\'CTA Script #1 is running\')</script>',
  },
  {
    html: '<div  style="border-style: solid;text-align:center;border-radius:10px;align-content:center;background-color:yellow;color:black"><h2>Thanks again for purchasing our great products</h2><h3>Please use promo code:<b>123abc</b> for your next purchase<h3></div><script>console.log(\'CTA Script #2 is running\')</script>',
  },
];
const ctaElementSelector = 'cx-opf-cta-element';

@Component({
  selector: 'cx-opf-cta-element',
  template: '',
  standalone: false,
})
export class MockOpfCtaElementComponent {
  @Input() ctaScriptHtml: string;
}

@Component({
  selector: 'cx-spinner',
  template: '',
  standalone: false,
})
class MockSpinnerComponent {}

describe('OpfCtaScriptsComponent', () => {
  let component: OpfCtaScriptsComponent;
  let fixture: ComponentFixture<OpfCtaScriptsComponent>;
  let opfCtaScriptsService: jasmine.SpyObj<OpfCtaScriptsService>;

  const createComponentInstance = () => {
    fixture = TestBed.createComponent(OpfCtaScriptsComponent);
    component = fixture.componentInstance;
  };
  beforeEach(() => {
    opfCtaScriptsService = jasmine.createSpyObj('OpfCtaScriptsService', [
      'getCtaHtmlList',
    ]);

    TestBed.configureTestingModule({
      declarations: [
        OpfCtaScriptsComponent,
        MockOpfCtaElementComponent,
        MockSpinnerComponent,
      ],
      providers: [
        { provide: OpfCtaScriptsService, useValue: opfCtaScriptsService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    opfCtaScriptsService.getCtaHtmlList.and.returnValue(of(mockHtmlsList));
    createComponentInstance();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return Htmls list and display ctaButton elements', (done) => {
    component.ctaHtmls$.subscribe((htmlList) => {
      expect(htmlList[0]).toBeTruthy();
      fixture.detectChanges();
      expect(
        fixture.nativeElement.querySelectorAll(ctaElementSelector).length
      ).toEqual(2);
      done();
    });
  });

  it('should isError be true when error is thrown', (done) => {
    opfCtaScriptsService.getCtaHtmlList = createSpy().and.returnValue(
      throwError('error')
    );
    createComponentInstance();
    component.ctaHtmls$.subscribe((htmlList) => {
      expect(htmlList).toEqual([]);
      fixture.detectChanges();
      expect(
        fixture.nativeElement.querySelector(ctaElementSelector)
      ).toBeFalsy();
      done();
    });
  });
});
