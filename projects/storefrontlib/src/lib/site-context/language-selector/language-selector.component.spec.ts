import { DebugElement, ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  defaultOccConfig,
  LanguageService,
  OccConfig,
  Language
} from '@spartacus/core';

import { of, Observable } from 'rxjs';

import { LanguageSelectorComponent } from './language-selector.component';

const mockLanguages: Language[] = [
  { active: true, isocode: 'ja', name: 'Japanese' },
  { active: true, isocode: 'EUR', name: 'Euro' }
];

const mockActiveLang = 'ja';

class MockLanguageService {
  getAll(): Observable<Language[]> {
    return of(mockLanguages);
  }
  getActive(): Observable<string> {
    return of(mockActiveLang);
  }
  setActive(_language: string): void {}
}

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
          useClass: MockLanguageService
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
    let languagesResult: Language[];
    component.languages$
      .subscribe(value => (languagesResult = value))
      .unsubscribe();
    expect(languagesResult).toEqual(mockLanguages);

    let activeResult: string;
    component.activeLanguage$
      .subscribe(value => (activeResult = value))
      .unsubscribe();
    expect(activeResult).toEqual(mockActiveLang);
  });

  it(`should call facade's 'setActive()'`, () => {
    spyOn(service, 'setActive').and.stub();

    component.setActiveLanguage('en');

    expect(service.setActive).toHaveBeenCalledWith('en');
  });

  it('should contain dropdown with languages', () => {
    component.languages$ = of(mockLanguages);
    fixture.detectChanges();

    const label = el.query(By.css('label'));
    const selectBox = el.query(By.css('select'));

    expect(selectBox.nativeElement.value).toEqual(mockLanguages[0].isocode);
    expect(label.nativeElement.textContent).toEqual('Language');
  });

  it('should not be available when language list is empty', () => {
    component.languages$ = of([]);
    fixture.detectChanges();

    const selectBox = el.query(By.css('select'));
    expect(selectBox).toBeFalsy();
  });

  it('should not be available when there is one language', () => {
    component.languages$ = of([mockLanguages[0]]);
    fixture.detectChanges();

    const selectBox = el.query(By.css('select'));
    expect(selectBox).toBeFalsy();
  });

  it('should contain enabled dropdown when languages list is NOT empty', () => {
    component.languages$ = of(mockLanguages);
    fixture.detectChanges();

    const selectBox = el.query(By.css('select'));
    expect(selectBox.nativeElement.disabled).toBeFalsy();
  });
});
