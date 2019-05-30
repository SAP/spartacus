import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  I18nTestingModule,
  ProductInterestService,
  AuthService,
  UserService,
  TranslationService,
  GlobalMessageService,
  OccConfig,
} from '@spartacus/core';
import { Pipe, PipeTransform, Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { StockNotificationComponent } from './stock-notification.component';
import { of } from 'rxjs';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
    media: {
      baseUrl: '',
    },
  },
};

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockCxSpinnerComponent {}

describe('StockNotificationComponent', () => {
  let component: StockNotificationComponent;
  let fixture: ComponentFixture<StockNotificationComponent>;

  const auth = jasmine.createSpyObj('AuthService', ['getUserToken']);
  auth.getUserToken.and.returnValue(of());

  const productInterestService = jasmine.createSpyObj(
    'ProductInterestService',
    [
      'loadBackInStockSubscribed',
      'getBackInStockSubscribed',
      'getCreateBackInStockSuccess',
      'getDeleteBackInStockLoading',
      'getDeleteBackInStockSuccess',
      'resetDeleteState',
    ]
  );
  productInterestService.getBackInStockSubscribed.and.returnValue(of());
  productInterestService.getCreateBackInStockSuccess.and.returnValue(of());
  productInterestService.getDeleteBackInStockLoading.and.returnValue(of());
  productInterestService.getDeleteBackInStockSuccess.and.returnValue(of(false));
  productInterestService.resetDeleteState.and.returnValue();

  const userService = jasmine.createSpyObj('UserService', [
    'getNotificationPreferences',
  ]);
  const translationService = jasmine.createSpyObj('TranslationService', [
    'translate',
  ]);
  const globalMessageService = jasmine.createSpyObj('GlobalMessageService', [
    'add',
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, RouterTestingModule],
      declarations: [
        StockNotificationComponent,
        MockUrlPipe,
        MockCxSpinnerComponent,
      ],
      providers: [
        { provide: AuthService, useValue: auth },
        { provide: ProductInterestService, useValue: productInterestService },
        {
          provide: UserService,
          useValue: userService,
        },
        { provide: TranslationService, useValue: translationService },
        { provide: GlobalMessageService, useValue: globalMessageService },
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
