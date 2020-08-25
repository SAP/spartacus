import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, UrlModule } from '@spartacus/core';
import { OutletContextData } from '@spartacus/storefront';
import { LimitComponent } from '..';

describe('LimitComponent', () => {
  let component: LimitComponent;
  let fixture: ComponentFixture<LimitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LimitComponent],
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
    fixture = TestBed.createComponent(LimitComponent);
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
