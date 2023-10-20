import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { OpfCtaElementComponent } from './opf-cta-element.component';

describe('OpfCtaButton', () => {
  let component: OpfCtaElementComponent;
  let fixture: ComponentFixture<OpfCtaElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpfCtaElementComponent],
    });
    fixture = TestBed.createComponent(OpfCtaElementComponent);
    component = fixture.componentInstance;
    // opfCtaScriptsService = TestBed.inject(OpfCtaScriptsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bypass sanitizer', () => {
    const htmlInput =
      "<div><h2>Thanks for purchasing our great products</h2><h3>Please use promo code:<b>123abc</b> for your next purchase<h3></div><script>console.log('CTA Script #1 is running')</script><script>console.log('CTA Script #2 is running')</script>";
    const domSanitizer: DomSanitizer = TestBed.inject(DomSanitizer);
    spyOn(domSanitizer, 'bypassSecurityTrustHtml').and.stub();
    component.renderHtml(htmlInput);
    expect(domSanitizer.bypassSecurityTrustHtml).toHaveBeenCalled();
  });
});
