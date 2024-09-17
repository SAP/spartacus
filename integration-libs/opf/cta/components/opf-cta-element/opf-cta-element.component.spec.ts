import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { OpfCtaElementComponent } from './opf-cta-element.component';

describe('OpfCtaButton', () => {
  let component: OpfCtaElementComponent;
  let fixture: ComponentFixture<OpfCtaElementComponent>;
  let domSanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpfCtaElementComponent],
    });
    fixture = TestBed.createComponent(OpfCtaElementComponent);
    component = fixture.componentInstance;
    domSanitizer = TestBed.inject(DomSanitizer);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should renderHtml call bypassSecurityTrustHtml', () => {
    const html = '<script>console.log("script");</script>';
    spyOn(domSanitizer, 'bypassSecurityTrustHtml').and.stub();
    component.renderHtml(html);

    expect(domSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(html);
  });
});
