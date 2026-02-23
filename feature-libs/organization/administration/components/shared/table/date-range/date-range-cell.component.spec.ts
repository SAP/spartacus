import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  CxDatePipe,
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
} from '@spartacus/core';
import { OutletContextData } from '@spartacus/storefront';
import { MockUrlPipe } from 'projects/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe';
import { UrlPipe } from 'projects/core/src/routing/configurable-routes/url-translation/url.pipe';
import { DateRangeCellComponent } from '..';

describe('DateRangeCellComponent', () => {
  let component: DateRangeCellComponent;
  let fixture: ComponentFixture<DateRangeCellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DateRangeCellComponent],
      providers: [
        {
          provide: OutletContextData,
          useValue: {
            context: {
              startDate: '2020-07-15T11:00:00+0000',
              endDate: '2020-07-15T11:59:00+0000',
            },
          },
        },
      ],
    })
      .overrideComponent(DateRangeCellComponent, {
        remove: {
          imports: [TranslatePipe, CxDatePipe, UrlPipe],
        },
        add: {
          imports: [MockTranslatePipe, MockDatePipe, MockUrlPipe],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRangeCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render date', () => {
    const el: HTMLElement = fixture.debugElement.query(
      By.css('span.text')
    ).nativeNode;
    expect(el.innerText).toEqual('Jul 15, 2020 - Jul 15, 2020');
  });
});
