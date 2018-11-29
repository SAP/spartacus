import { DebugElement, ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { defaultOccConfig, LanguageService, OccConfig } from '@spartacus/core';
import { LanguageSelectorComponent } from './language-selector.component';

const mockLanguages: any[] = [
  { active: true, isocode: 'ja', name: 'Japanese' }
];
const mockActiveLang = 'ja';

const languageServiceMock = {
  languages$: of(mockLanguages),
  activeLanguage$: of(mockActiveLang)
};
describe('LanguageSelectorComponent', () => {
  let component: LanguageSelectorComponent;
  let fixture: ComponentFixture<LanguageSelectorComponent>;
  let service: LanguageService;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LanguageSelectorComponent],
      providers: [
        {
          provide: LanguageService,
          useValue: languageServiceMock
        },
        { provide: OccConfig, useValue: defaultOccConfig }
      ]
    })
      .overrideComponent(LanguageSelectorComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSelectorComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();

    service = TestBed.get(LanguageService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get languages and activeLanguage in ngOnInit', () => {
    component.languages$.subscribe(value => {
      expect(value).toEqual(mockLanguages);
    });
    component.activeLanguage$.subscribe(value => {
      expect(value).toEqual(mockActiveLang);
    });
  });

  it('should change language', () => {
    component.setActiveLanguage('en');
    expect(service.activeLanguage).toEqual('en');
  });

  it('should contain dropdown with languages', () => {
    component.languages$ = of(mockLanguages);
    fixture.detectChanges();

    const label = el.query(By.css('label'));
    const selectBox = el.query(By.css('select'));

    expect(selectBox.nativeElement.value).toEqual(mockLanguages[0].isocode);
    expect(label.nativeElement.textContent).toEqual('Language');
  });

  it('should contain disabled dropdown when languages list is empty', () => {
    component.languages$ = of([]);
    fixture.detectChanges();

    const selectBox = el.query(By.css('select'));
    expect(selectBox.nativeElement.disabled).toBeTruthy();
  });

  it('should contain enabled dropdown when languages list is NOT empty', () => {
    component.languages$ = of(mockLanguages);
    fixture.detectChanges();

    const selectBox = el.query(By.css('select'));
    expect(selectBox.nativeElement.disabled).toBeFalsy();
  });
});
