import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { of } from 'rxjs';
import { ConfigPreviousNextButtonsComponent } from './config-previous-next-buttons.component';

describe('ConfigPreviousNextButtonsComponent', () => {
  let classUnderTest: ConfigPreviousNextButtonsComponent;
  let fixture: ComponentFixture<ConfigPreviousNextButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [ConfigPreviousNextButtonsComponent],
    })
      .overrideComponent(ConfigPreviousNextButtonsComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigPreviousNextButtonsComponent);
    classUnderTest = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(classUnderTest).toBeTruthy();
  });

  it('should display previous button as disabled if it is the first group', () => {
    classUnderTest.isFirstGroup = of(true);
    fixture.detectChanges();
    const prevBtn = fixture.debugElement.query(By.css('.btn-action'))
      .nativeElement;
    expect(prevBtn.disabled).toBe(true);
  });

  it('should display previous button as enabled if it is not the first group', () => {
    classUnderTest.isFirstGroup = of(false);
    fixture.detectChanges();
    const prevBtn = fixture.debugElement.query(By.css('.btn-action'))
      .nativeElement;
    expect(prevBtn.disabled).toBe(false);
  });

  it('should display next button as disabled if it is the last group', () => {
    classUnderTest.isLastGroup = of(true);
    fixture.detectChanges();
    const lastBtn = fixture.debugElement.query(By.css('.btn-secondary'))
      .nativeElement;
    expect(lastBtn.disabled).toBe(true);
  });

  it('should display next button as enabled if it is not the last group', () => {
    classUnderTest.isLastGroup = of(false);
    fixture.detectChanges();
    const prevBtn = fixture.debugElement.query(By.css('.btn-secondary'))
      .nativeElement;
    expect(prevBtn.disabled).toBe(false);
  });
});
