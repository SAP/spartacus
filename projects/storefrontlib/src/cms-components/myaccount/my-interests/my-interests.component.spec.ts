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
      variantOptionQualifiers: [
        {
          name: 'color',
          value: 'red',
        },
        {
          name: 'size',
          value: 'XL',
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

fdescribe('MyInterestsComponent', () => {
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

  it('should show loading spinner when data is loading', () => {
    userService.getProdutInterestsLoaded.and.returnValue(of(true));
    fixture.detectChanges();
    expect(el.query(By.css('cx-spinner'))).toBeTruthy();
  });

  it('should display message when no interest', () => {
    fixture.detectChanges();
    expect(el.query(By.css('[data-test="noInterestMessage"]'))).toBeTruthy();
  });

  it('should show interests list', () => {
    userService.getProdutInterests.and.returnValue(of(mockedInterests));
    userService.getProdutInterestsLoaded.and.returnValue(of(true));
    fixture.detectChanges();

    expect(el.queryAll(By.css('cx-sorting')).length).toEqual(2);
    expect(el.queryAll(By.css('cx-pagination')).length).toEqual(2);
    expect(el.queryAll(By.css('[data-test="productItem"]')).length).toEqual(2);
    expect(el.queryAll(By.css('[data-test="productLink"]')).length).toEqual(2);
    expect(el.queryAll(By.css('[data-test="deleteButton"]')).length).toEqual(2);

    expect(el.queryAll(By.css('[data-test="variantName"]'))[0].context).toEqual(
      'color'
    );
    expect(el.queryAll(By.css('[data-test="variantName"]'))[1].context).toEqual(
      'size'
    );

    expect(
      el.queryAll(By.css('[data-test="variantValue"]'))[0].context
    ).toEqual('red');
    expect(
      el.queryAll(By.css('[data-test="variantValue"]'))[1].context
    ).toEqual('XL');
  });

  it('should be able to change page/sort', () => {
    fixture.detectChanges();

    component.sortChange('sort');
    expect(userService.loadProductInterests).toHaveBeenCalled();

    component.pageChange(2);
    expect(userService.loadProductInterests).toHaveBeenCalled();
  });

  it('should be able to delete an interest item', () => {
    userService.getProdutInterests.and.returnValue(of(mockedInterests));
    userService.deleteProdutInterest.and.stub();
    fixture.detectChanges();
    el.query(By.css('[data-test="deleteButton"]')).nativeElement.click();
    fixture.detectChanges();

    expect(userService.deleteProdutInterest).toHaveBeenCalled();
  });
});
