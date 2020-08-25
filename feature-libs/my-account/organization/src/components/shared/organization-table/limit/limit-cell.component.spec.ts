import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, UrlModule } from '@spartacus/core';
import { OutletContextData } from '@spartacus/storefront';
import { LimitCellComponent } from '..';

describe('LimitCellComponent', () => {
  let component: LimitCellComponent;
  let fixture: ComponentFixture<LimitCellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LimitCellComponent],
      imports: [RouterTestingModule, UrlModule, I18nTestingModule],
      providers: [
        {
          provide: OutletContextData,
          useValue: {
            context: {
              orderApprovalPermissionType: { name: 'approverName' },
              currency: { symbol: '$' },
              periodRange: 'QUARTER',
              threshold: 10000.0,
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render threshold', () => {
    const el: HTMLElement = fixture.debugElement.query(By.css('span.text'))
      .nativeNode;
    expect(el.innerText).toEqual('10000 $ permission.per.QUARTER');
  });
});
