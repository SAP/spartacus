import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, UrlModule } from '@spartacus/core';
import { OutletContextData } from '@spartacus/storefront';
import { DateRangeComponent } from '..';

describe('DateRangeComponent', () => {
  let component: DateRangeComponent;
  let fixture: ComponentFixture<DateRangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DateRangeComponent],
      imports: [RouterTestingModule, UrlModule, I18nTestingModule],
      providers: [
        {
          provide: OutletContextData,
          useValue: {
            context: {
              startDate: '2020-07-15T02:00:00+0000',
              endDate: '2020-07-15T02:59:00+0000',
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render date', () => {
    const el: HTMLElement = fixture.debugElement.query(By.css('span.text'))
      .nativeNode;
    expect(el.innerText).toEqual('Jul 15, 2020 - Jul 15, 2020');
  });
});
