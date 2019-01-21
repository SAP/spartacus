import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NgModule, Component } from '@angular/core';
import { CmsService, CmsConfig, Page, ContentSlotData } from '@spartacus/core';
import { of, Observable } from 'rxjs';
import { PageLayoutModule } from './page-layout.module';
import { UrlTranslationService } from 'projects/core/src/routing/configurable-routes/url-translation/url-translation.service';
import { By } from '@angular/platform-browser';

const slots = {
  Section1: {
    uid: 'Section1',
    components: []
  }
};

@Component({
  selector: 'cx-page-template-test',
  template: `
    <cx-page-layout>
      <div class="content">content projection</div>
    </cx-page-layout>
  `
})
export class PageLayoutComponent {}

@Component({
  selector: 'cx-footer-test',
  template: `
    <cx-page-layout section="header"> </cx-page-layout>
  `
})
export class HeaderLayoutComponent {}

@NgModule({
  imports: [PageLayoutModule],
  declarations: [PageLayoutComponent, HeaderLayoutComponent]
})
export class TestModule {}

class MockCmsService {
  getCurrentPage(): Observable<Page> {
    return of({
      uid: 'page_uid',
      template: 'LandingPage2Template',
      slots: {
        Section1: {
          uid: 'Section1'
        },
        Section2A: {
          uid: 'Section1'
        },
        LogoSlot: {
          uid: 'LogoSlot'
        }
      }
    });
  }
  getContentSlot(position): Observable<ContentSlotData> {
    return of(slots[position]);
  }
  isLaunchInSmartEdit(): boolean {
    return false;
  }
}

const MockCmsModuleConfig: CmsConfig = {
  layoutSlots: {
    header: {
      slots: ['LogoSlot']
    },
    LandingPage2Template: {
      slots: ['Section1', 'Section2A']
    }
  }
};

describe('PageLayoutComponent', () => {
  let pageLayoutComponent: PageLayoutComponent;
  let fixture: ComponentFixture<PageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [],
      providers: [
        {
          provide: CmsService,
          useClass: MockCmsService
        },
        { provide: CmsConfig, useValue: MockCmsModuleConfig },
        { provide: UrlTranslationService, useValue: { translate: () => {} } }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLayoutComponent);
    pageLayoutComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(pageLayoutComponent).toBeTruthy();
  });

  it('should render two slots based on layout configuration', () => {
    const native = fixture.debugElement;
    const elements = native.queryAll(By.css('cx-dynamic-slot'));
    expect(elements.length).toBe(2);
  });

  it('should render slot position as class name on page layout', () => {
    const native = fixture.debugElement;
    const elements = native.queryAll(By.css('cx-dynamic-slot'));
    expect((elements[0].nativeElement as HTMLElement).classList).toContain(
      'Section1'
    );
  });

  it('should project content in page layout', () => {
    const native = fixture.debugElement;
    const compEl = native.query(By.css('div.content'));
    expect((compEl.nativeNode as HTMLElement).innerText).toContain(
      'content projection'
    );
  });
});

describe('SectionLayoutComponent', () => {
  let sectionLayoutComponent: HeaderLayoutComponent;
  let fixture: ComponentFixture<HeaderLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [],
      providers: [
        {
          provide: CmsService,
          useClass: MockCmsService
        },
        { provide: CmsConfig, useValue: MockCmsModuleConfig },
        { provide: UrlTranslationService, useValue: { translate: () => {} } }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderLayoutComponent);
    sectionLayoutComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(sectionLayoutComponent).toBeTruthy();
  });

  it('should render header section with logo slot', () => {
    const native = fixture.debugElement;
    const elements = native.queryAll(By.css('cx-dynamic-slot'));
    const logoSlot: HTMLElement = elements[0].nativeElement;
    expect(logoSlot.classList).toContain('LogoSlot');
  });
});
