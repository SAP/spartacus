import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInterestsComponent } from './my-interests.component';
import { PipeTransform, Pipe, DebugElement } from '@angular/core';
import { of, Observable } from 'rxjs';
import { UserToken, I18nTestingModule, AuthService, UserService, ProductInterestList, ProductInterestRelation } from '@spartacus/core';
import { RouterTestingModule } from '@angular/router/testing';
import { PaginationAndSortingModule } from '../../../ui';
import { By } from '@angular/platform-browser';


@Pipe({
  name: 'cxTranslateUrl',
})
class MockTranslateUrlPipe implements PipeTransform {
  transform() { }
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
  ): void { }
  getProdutInterests(
    _userId: string,
    _pageSize: number
  ): Observable<ProductInterestList> {
    return of();
  }
  getProdutInterestsLoaded(): Observable<boolean> {
    return of(true);
  }
  deleteProdutInterest(
    _userId: string,
    _item: ProductInterestRelation
  ): void { }
  clearProductInterests(): void { }
}

describe('MyInterestsComponent', () => {
  let component: MyInterestsComponent;
  let fixture: ComponentFixture<MyInterestsComponent>;
  let userService: UserService;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        PaginationAndSortingModule,
        I18nTestingModule,
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
      pagination: {}
    };
    spyOn(userService, 'getProdutInterests').and.returnValue(of(emptyInterests));

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
    spyOn(userService, 'getProdutInterests').and.returnValue(of(emptyInterests));

    component.ngOnInit();
    fixture.detectChanges();

    expect(el.query(By.css('.cx-product-interests-header'))).toBeTruthy();
  });
});
