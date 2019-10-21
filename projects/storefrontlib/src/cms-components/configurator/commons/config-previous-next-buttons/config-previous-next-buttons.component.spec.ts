import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
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
});
