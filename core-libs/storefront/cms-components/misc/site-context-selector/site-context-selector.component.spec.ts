import {
  Component,
  DebugElement,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CmsComponent,
  CmsService,
  CmsSiteContextSelectorComponent,
  contextServiceMapProvider,
  CurrencyService,
  I18nTestingModule,
  Language,
  LANGUAGE_CONTEXT_ID,
  LanguageService,
  MockTranslatePipe,
  provideMockFeatureToggles,
  TranslatePipe,
  TranslationService,
  UrlPipe,
} from '@spartacus/core';
import { MockTranslationService } from 'core-libs/core/src/i18n/testing/mock-translation.service';
import { Observable, of } from 'rxjs';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { IconComponent } from '../icon';
import { SiteContextComponentService } from './site-context-component.service';
import { SiteContextSelectorComponent } from './site-context-selector.component';

@Pipe({ name: 'cxUrl' })
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type;
}

describe('SiteContextSelectorComponent in CmsLib', () => {
  let component: SiteContextSelectorComponent;
  let fixture: ComponentFixture<SiteContextSelectorComponent>;
  let serviceSpy: any;
  let el: DebugElement;

  const mockLanguages: Language[] = [
    { active: true, isocode: 'ja', name: 'Japanese', nativeName: 'Japanese' },
    { active: true, isocode: 'en', name: 'English', nativeName: 'English' },
  ];

  const mockActiveLang = 'en';

  const mockComponentData: CmsSiteContextSelectorComponent = {
    uid: 'LanguageComponent',
    typeCode: 'SiteContextSelectorComponent',
    context: LANGUAGE_CONTEXT_ID,
  };

  const MockCmsService = {
    getComponentData: () => of(mockComponentData),
  };

  const MockCmsComponentData = <CmsComponentData<CmsComponent>>{
    data$: of(mockComponentData),
  };

  beforeEach(waitForAsync(() => {
    const MockLanguageService = {
      active: mockActiveLang,
      getAll(): Observable<Language[]> {
        return of(mockLanguages);
      },
      getActive(): Observable<string> {
        return of(this.active);
      },
      setActive(isocode: string): void {
        this.active = isocode;
      },
    };

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        SiteContextSelectorComponent,
        I18nTestingModule,
      ],
      providers: [
        { provide: CmsService, useValue: MockCmsService },
        {
          provide: LanguageService,
          useValue: MockLanguageService,
        },
        {
          provide: CurrencyService,
          useValue: {},
        },
        {
          provide: CmsComponentData,
          useValue: MockCmsComponentData,
        },
        {
          provide: TranslationService,
          useClass: MockTranslationService,
        },
        provideMockFeatureToggles({
          a11ySiteContextCaretClick: true,
        }),
        contextServiceMapProvider,
      ],
    })
      .overrideComponent(SiteContextSelectorComponent, {
        remove: {
          imports: [UrlPipe, IconComponent, TranslatePipe],
        },
        add: {
          providers: [
            {
              provide: SiteContextComponentService,
              useClass: SiteContextComponentService,
            },
          ],
          imports: [MockUrlPipe, MockCxIconComponent, MockTranslatePipe],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteContextSelectorComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    fixture.detectChanges();
    serviceSpy = fixture.debugElement.injector.get(LanguageService) as any;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should get items$', () => {
    const expected = [
      {
        ...mockLanguages[0],
        label: mockLanguages[0].name,
      },
      {
        ...mockLanguages[1],
        label: mockLanguages[1].name,
      },
    ];
    component.items$.subscribe((value) => {
      expect(value).toEqual(expected);
    });
  });

  it('should get activeItem$', () => {
    component.activeItem$.subscribe((value) => {
      expect(value).toEqual(mockActiveLang);
    });
  });

  it('should change language', () => {
    component.active = 'ja';
    serviceSpy.getActive().subscribe((value) => expect(value).toEqual('ja'));
  });

  it('should contain a select with number of options', () => {
    const selectBox = el.query(By.css('select'));
    const select = <HTMLSelectElement>selectBox.nativeElement;
    expect(select.options.length).toEqual(mockLanguages.length);
  });

  it('should have the selected attribute on the active language option', () => {
    const options = el.queryAll(By.css('.cx-select-wrapper option'));
    const withSelectedAttr = options.filter((opt) =>
      opt.nativeElement.hasAttribute('selected')
    );
    expect(withSelectedAttr.length).toBe(1);
    expect(withSelectedAttr[0].nativeElement.value).toBe(mockActiveLang);
  });
});
