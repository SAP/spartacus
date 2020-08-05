import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { PageLayoutService } from './page-layout.service';
import { PageTemplateDirective } from './page-template.directive';

@Component({
  selector: 'cx-host',
  template: `
    <div id="mock" cxPageTemplate></div>
    <div id="mock2">
      <ng-container cxPageTemplate></ng-container>
    </div>

    <div id="mock3">
      <div *ngIf="false; else alt"></div>
      <ng-template #alt cxPageTemplate></ng-template>
    </div>
  `,
})
class MockComponent {}

class MockPageLayoutService {
  get templateName$() {
    return of('LandingPageTemplate');
  }
}

describe('PageTemplateDirective', () => {
  let component: MockComponent;
  let fixture: ComponentFixture<MockComponent>;

  let pageLayoutService: PageLayoutService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MockComponent, PageTemplateDirective],
      providers: [
        {
          provide: PageLayoutService,
          useClass: MockPageLayoutService,
        },
      ],
    }).compileComponents();

    pageLayoutService = TestBed.inject(PageLayoutService);
    fixture = TestBed.createComponent(MockComponent);

    component = fixture.componentInstance;
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('element binding', () => {
    it('should add page template to element classList', () => {
      fixture.detectChanges();
      const el: HTMLElement = fixture.debugElement.query(By.css('#mock'))
        .nativeElement;
      expect(el.classList).toContain('LandingPageTemplate');
    });

    it('should remove previous page template from classList', () => {
      spyOnProperty(pageLayoutService, 'templateName$').and.returnValue(
        of('NextPageTemplate')
      );
      const el: HTMLElement = fixture.debugElement.query(By.css('#mock'))
        .nativeElement;
      fixture.detectChanges();
      expect(el.classList).not.toContain('LandingPageTemplate');
      expect(el.classList).toContain('NextPageTemplate');
    });

    it('should not add undefined page template to element classList', () => {
      spyOnProperty(pageLayoutService, 'templateName$').and.returnValue(
        of(undefined)
      );
      fixture.detectChanges();
      const el: HTMLElement = fixture.debugElement.query(By.css('#mock'))
        .nativeElement;
      expect(el.classList.length).toEqual(0);
    });
  });

  describe('ng-container binding', () => {
    it('should add page template to parent classList', () => {
      fixture.detectChanges();
      const el: HTMLElement = fixture.debugElement.query(By.css('#mock2'))
        .nativeElement;
      expect(el.classList).toContain('LandingPageTemplate');
    });
  });

  describe('ng-template binding', () => {
    it('should add page template to parent classList', () => {
      fixture.detectChanges();
      const el: HTMLElement = fixture.debugElement.query(By.css('#mock3'))
        .nativeElement;
      expect(el.classList).toContain('LandingPageTemplate');
    });
  });
});
