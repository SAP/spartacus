import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PageLayoutService } from '../page-layout/page-layout.service';
import { PageTemplateStyleService } from './page-template-style.service';

class MockPageLayoutService {
  get templateName$() {
    return of('LandingPageTemplate');
  }
}

@Component({
  template: '',
})
class MockComponent {}

describe('PageTemplateStyleService', () => {
  let service: PageTemplateStyleService;
  let fixture: ComponentFixture<MockComponent>;
  let pageLayoutService: PageLayoutService;
  let el: HTMLElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MockComponent],
      providers: [
        PageTemplateStyleService,
        {
          provide: PageLayoutService,
          useClass: MockPageLayoutService,
        },
      ],
    });

    service = TestBed.inject(PageTemplateStyleService);
    pageLayoutService = TestBed.inject(PageLayoutService);
    fixture = TestBed.createComponent(MockComponent);
    el = fixture.debugElement.nativeElement;
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should add page template to element classList', () => {
    service.initialize(fixture.componentRef);
    expect(el.classList).toContain('LandingPageTemplate');
  });

  it('should remove previous page template from classList', () => {
    spyOnProperty(pageLayoutService, 'templateName$').and.returnValue(
      of('LandingPageTemplate', 'NextPageTemplate')
    );
    service.initialize(fixture.componentRef);

    expect(el.classList).not.toContain('LandingPageTemplate');
    expect(el.classList).toContain('NextPageTemplate');
  });

  it('should not add undefined page template to element classList', () => {
    spyOnProperty(pageLayoutService, 'templateName$').and.returnValue(
      // tslint:disable-next-line: deprecation
      of('LandingPageTemplate', undefined)
    );
    expect(el.classList).not.toContain('LandingPageTemplate');
    expect(el.classList).not.toContain('undefined');
  });
});
