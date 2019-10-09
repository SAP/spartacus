import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInterestsComponent } from './my-interests.component';
import { PipeTransform, Pipe, DebugElement } from '@angular/core';
import { of, Observable } from 'rxjs';
import {
  UserToken,
  I18nTestingModule,
  AuthService,
  UserService,
  ProductInterestList,
  ProductInterestRelation,
  ImageType,
} from '@spartacus/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ListNavigationModule } from '../../../shared/components/list-navigation/list-navigation.module';
import { MediaModule } from '../../../shared/components/media/media.module';
import { By } from '@angular/platform-browser';

@Pipe({
  name: 'cxTranslateUrl',
})
class MockTranslateUrlPipe implements PipeTransform {
  transform() {}
}
class MockAuthService {
  getUserToken(): Observable<UserToken> {
    return of({ userId: 'test' } as UserToken);
  }
}
class MockUserService {
  loadProductInterests(
    _userId: string,
    _pageSize: number,
    _currentPage?: number,
    _sort?: string
  ): void {}
  getProdutInterests(
    _userId: string,
    _pageSize: number
  ): Observable<ProductInterestList> {
    return of();
  }
  getProdutInterestsLoaded(): Observable<boolean> {
    return of(true);
  }
  deleteProdutInterest(_userId: string, _item: ProductInterestRelation): void {}
  clearProductInterests(): void {}
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
  ],
};

describe('MyInterestsComponent', () => {
  let component: MyInterestsComponent;
  let fixture: ComponentFixture<MyInterestsComponent>;
  let userService: UserService;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ListNavigationModule,
        I18nTestingModule,
        MediaModule,
      ],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: AuthService, useClass: MockAuthService },
      ],
      declarations: [MyInterestsComponent, MockTranslateUrlPipe],
    }).compileComponents();

    userService = TestBed.get(UserService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyInterestsComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title with empty interests', () => {
    const emptyInterests: ProductInterestList = {
      sorts: [{ code: 'name', asc: true }],
      pagination: {},
    };
    spyOn(userService, 'getProdutInterests').and.returnValue(
      of(emptyInterests)
    );

    component.ngOnInit();
    fixture.detectChanges();

    expect(el.query(By.css('.cx-product-interests-header'))).toBeTruthy();
  });

  it('should display title with interests', () => {
    const emptyInterests: ProductInterestList = {
      sorts: [{ code: 'name', asc: true }],
      pagination: {},
      results: [],
    };
    spyOn(userService, 'getProdutInterests').and.returnValue(
      of(emptyInterests)
    );

    component.ngOnInit();
    fixture.detectChanges();

    expect(el.query(By.css('.cx-product-interests-header'))).toBeTruthy();
  });

  it('should display no interests message', () => {
    const interests: ProductInterestList = {
      sorts: [{ code: 'name', asc: true }],
      pagination: {
        count: 0,
        page: 10,
        totalCount: 0,
        totalPages: 0,
      },
      results: [],
    };
    spyOn(userService, 'getProdutInterests').and.returnValue(of(interests));

    component.ngOnInit();
    fixture.detectChanges();

    expect(el.query(By.css('.cx-product-interests-no-interests'))).toBeTruthy();
  });

  it('should display interests list correctly', () => {
    spyOn(userService, 'getProdutInterests').and.returnValue(
      of(mockedInterests)
    );
    component.ngOnInit();
    fixture.detectChanges();
    expect(el.query(By.css('.cx-product-interests-table'))).toBeTruthy();
  });

  it('should be able to click image and product hyperlink', () => {
    spyOn(userService, 'getProdutInterests').and.returnValue(
      of(mockedInterests)
    );
    component.ngOnInit();
    fixture.detectChanges();

    const tr = el.query(By.css('.cx-product-interests-table tbody tr'));
    expect(
      tr.query(By.css('.cx-product-interests-product-image-link'))
    ).toBeTruthy();
    expect(
      tr.query(By.css('.cx-product-interests-product-code-link'))
    ).toBeTruthy();
  });

  it('should be able to delete an interest item', () => {
    const interests: ProductInterestList = { ...mockedInterests };
    spyOn(userService, 'getProdutInterests').and.returnValue(of(interests));
    spyOn(userService, 'deleteProdutInterest').and.callFake((_item: any) => {
      interests.results = null;
      interests.pagination.totalCount = 0;
    });
    component.ngOnInit();
    fixture.detectChanges();
    el.query(By.css('.close')).nativeElement.click();
    fixture.detectChanges();

    expect(el.query(By.css('.cx-product-interests-no-interests'))).toBeTruthy();
  });

  it('should not display stock status when in stock', () => {
    const interests: ProductInterestList = { ...mockedInterests };
    interests.results[0].product.stock.stockLevel = 10;
    interests.results[0].product.stock.stockLevelStatus = 'inStock';
    spyOn(userService, 'getProdutInterests').and.returnValue(of(interests));
    component.ngOnInit();
    fixture.detectChanges();

    expect(el.query(By.css('.cx-product-interests-product-stock'))).toBeFalsy();
  });

  describe('pagination and sort', () => {
    it('should be able to change sort', () => {
      spyOn(userService, 'getProdutInterests').and.returnValue(
        of(mockedInterests)
      );
      spyOn(userService, 'loadProductInterests').and.stub();

      component.ngOnInit();
      fixture.detectChanges();
      component.sortChange('byNameDesc');

      expect(userService.loadProductInterests).toHaveBeenCalledWith(
        'test',
        1,
        0,
        'name:desc'
      );
    });

    it('should be able to change page', () => {
      spyOn(userService, 'getProdutInterests').and.returnValue(
        of(mockedInterests)
      );
      spyOn(userService, 'loadProductInterests').and.stub();

      component.ngOnInit();
      fixture.detectChanges();
      component.pageChange(2);

      expect(userService.loadProductInterests).toHaveBeenCalledWith(
        'test',
        1,
        2,
        'name:asc'
      );
    });
  });
});
