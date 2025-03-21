import { TestBed } from '@angular/core/testing';
import { SanitizeService } from './sanitize.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

describe('SanitizeService', () => {
  let service: SanitizeService;
  let sanitizerSpy: jasmine.SpyObj<DomSanitizer>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('DomSanitizer', [
      'bypassSecurityTrustHtml',
    ]);

    TestBed.configureTestingModule({
      providers: [SanitizeService, { provide: DomSanitizer, useValue: spy }],
    });

    service = TestBed.inject(SanitizeService);
    sanitizerSpy = TestBed.inject(DomSanitizer) as jasmine.SpyObj<DomSanitizer>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call DomSanitizer.bypassSecurityTrustHtml with provided HTML', () => {
    const mockHtml = '<p>Safe content</p>';
    const safeHtml: SafeHtml = {} as SafeHtml;

    sanitizerSpy.bypassSecurityTrustHtml.and.returnValue(safeHtml);

    const result = service.bypass(mockHtml);

    expect(sanitizerSpy.bypassSecurityTrustHtml).toHaveBeenCalledWith(mockHtml);
    expect(result).toBe(safeHtml);
  });
});
