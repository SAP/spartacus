import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MyInterestsComponent } from './my-interests.component';
import {
  PipeTransform,
  Pipe,
  Component,
  DebugElement,
  Input,
} from '@angular/core';
import { of } from 'rxjs';
import { LayoutConfig } from '../../../layout/config/layout-config';
import {
  I18nTestingModule,
  AuthService,
  UserService,
  ProductInterestList,
  OccConfig,
  ImageType,
} from '@spartacus/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ListNavigationModule } from '../../../shared/components/list-navigation/list-navigation.module';
import { By } from '@angular/platform-browser';

@Component({
  template: '',
  selector: 'cx-media',
})
class MockMediaComponent {
  @Input() container;
  @Input() format;
}

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
const MockLayoutConfig: LayoutConfig = {};

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

const mockedInterests: ProductInterestList = {
  sorts: [{ code: 'name', asc: true }],
  pagination: {
    count: 5,
    page: 0,
    totalCount: 1,
    totalPages: 1,
  },
  results: [
    {
      product: {
        code: '553637',
        name: 'NV10',
        images: {
          PRIMARY: {
            thumbnail: {
              altText: 'NV10',
              format: 'thumbnail',
              imageType: ImageType.PRIMARY,
              url: 'image-url',
            },
          },
        },
        price: {
          formattedValue: '$264.69',
        },
        stock: {
          stockLevel: 0,
          stockLevelStatus: 'outOfStock',
        },
      },
      productInterestEntry: [
        {
          dateAdded: new Date(),
          interestType: 'BACK_IN_STOCK',
        },
      ],
    },
    {
      product: {
        code: '553638',
        name: 'NV11',
        images: {
          PRIMARY: {
            thumbnail: {
              altText: 'NV11',
              format: 'thumbnail',
              imageType: ImageType.PRIMARY,
              url: 'image-url',
            },
          },
        },
        price: {
          formattedValue: '$188.69',
        },
        stock: {
          stockLevel: 0,
          stockLevelStatus: 'outOfStock',
        },
      },
      productInterestEntry: [
        {
          dateAdded: new Date(),
          interestType: 'BACK_IN_STOCK',
        },
      ],
    },
  ],
};
const emptyInterests: ProductInterestList = {
  sorts: [{ code: 'name', asc: true }],
  pagination: {},
};
const userToken = {
  access_token: 'xxx',
  token_type: 'bearer',
  refresh_token: 'xxx',
  expires_in: 1000,
  scope: ['xxx'],
  userId: 'xxx',
};

describe('MyInterestsComponent', () => {
  let component: MyInterestsComponent;
  let fixture: ComponentFixture<MyInterestsComponent>;
  let el: DebugElement;
  const userService = jasmine.createSpyObj('UserService', [
    'loadProductInterests',
    'getProdutInterests',
    'getProdutInterestsLoaded',
    'deleteProdutInterest',
    'clearProductInterests',
  ]);
  const authService = jasmine.createSpyObj('AuthService', ['getUserToken']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ListNavigationModule, I18nTestingModule],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: AuthService, useValue: authService },
        { provide: OccConfig, useValue: MockOccModuleConfig },
        { provide: LayoutConfig, useValue: MockLayoutConfig },
      ],
      declarations: [MyInterestsComponent, MockUrlPipe, MockMediaComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyInterestsComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    authService.getUserToken.and.returnValue(of(userToken));
    userService.getProdutInterests.and.returnValue(of(emptyInterests));
    userService.getProdutInterestsLoaded.and.returnValue(of(true));
    userService.loadProductInterests.and.stub();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display message when no interest', () => {
    fixture.detectChanges();
    expect(el.query(By.css('.cx-product-interests-header'))).toBeTruthy();
  });

  it('should show interests list', () => {
    userService.getProdutInterests.and.returnValue(of(mockedInterests));
    userService.getProdutInterestsLoaded.and.returnValue(of(true));
    fixture.detectChanges();

    expect(el.queryAll(By.css('cx-sorting')).length).toEqual(2);
    expect(el.queryAll(By.css('cx-pagination')).length).toEqual(2);
    expect(el.queryAll(By.css('tr')).length).toEqual(2);
  });

  it('should be able to change page/sort', () => {
    fixture.detectChanges();

    component.sortChange('sort');
    expect(userService.getProdutInterests).toHaveBeenCalled();

    component.pageChange(2);
    expect(userService.getProdutInterests).toHaveBeenCalled();
  });

  it('should be able to delete an interest item', () => {
    userService.getProdutInterests.and.returnValue(of(mockedInterests));
    userService.deleteProdutInterest.and.stub();
    fixture.detectChanges();
    el.query(By.css('button')).nativeElement.click();
    fixture.detectChanges();

    expect(userService.deleteProdutInterest).toHaveBeenCalled();
  });

  it('should reset value when the component is destroy', () => {
    userService.clearProductInterests.and.stub();
    component.ngOnDestroy();
    expect(userService.clearProductInterests).toHaveBeenCalled();
  });

  it('should show products hyperlinks', () => {
    userService.getProdutInterests.and.returnValue(of(mockedInterests));
    fixture.detectChanges();

    expect(el.queryAll(By.css('[data-test="productLink"]')).length).toEqual(2);
  });
});
