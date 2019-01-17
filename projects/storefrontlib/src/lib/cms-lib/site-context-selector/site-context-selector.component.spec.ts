import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BootstrapModule } from '../../bootstrap.module';
import {
  CmsService,
  CmsSiteContextSelectorComponent,
  LanguageService,
  CurrencyService,
  Component
} from '@spartacus/core';
import { SiteContextSelectorComponent } from './site-context-selector.component';

import { CmsComponentData } from '../../cms/components/cms-component-data';
import { Pipe, PipeTransform, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Pipe({
  name: 'cxTranslateUrl'
})
class MockTranslateUrlPipe implements PipeTransform {
  transform() {}
}

describe('SiteContextSelectorComponent in CmsLib', () => {
  let component: SiteContextSelectorComponent;
  let fixture: ComponentFixture<SiteContextSelectorComponent>;
  let serviceSpy: any;
  let el: DebugElement;

  const mockLanguages = [
    { active: true, isocode: 'ja', name: 'Japanese', nativeName: 'Japanese' },
    { active: true, isocode: 'en', name: 'English', nativeName: 'English' }
  ];

  const mockActiveLang = 'en';

  const MockLanguageService = {
    active: mockActiveLang,
    getAll() {
      return of(mockLanguages);
    },
    getActive() {
      return of(this.active);
    },
    setActive(isocode: string) {
      this.active = isocode;
    }
  };

  const mockComponentData: CmsSiteContextSelectorComponent = {
    uid: 'LanguageComponent',
    typeCode: 'SiteContextSelectorComponent',
    context: 'LANGUAGE'
  };

  const MockCmsService = {
    getComponentData: () => of(mockComponentData)
  };

  const MockCmsComponentData = <CmsComponentData<Component>>{
    data$: of(mockComponentData)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BootstrapModule, BrowserAnimationsModule],
      declarations: [SiteContextSelectorComponent, MockTranslateUrlPipe],
      providers: [
        { provide: CmsService, useValue: MockCmsService },
        {
          provide: LanguageService,
          useValue: MockLanguageService
        },
        {
          provide: CurrencyService,
          useValue: {}
        },
        {
          provide: CmsComponentData,
          useValue: MockCmsComponentData
        }
      ]
    }).compileComponents();
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
    component.items$.subscribe(value => {
      expect(value).toEqual(mockLanguages);
    });
  });

  it('should get activeItem$', () => {
    component.activeItem$.subscribe(value => {
      expect(value).toEqual(mockActiveLang);
    });
  });

  it('should change language', () => {
    component.active = 'ja';
    serviceSpy.getActive().subscribe(value => expect(value).toEqual('ja'));
  });

  it('should contain a select with number of options', () => {
    const selectBox = el.query(By.css('select'));
    const select = <HTMLSelectElement>selectBox.nativeElement;
    expect(select.options.length).toEqual(mockLanguages.length);
  });
});
