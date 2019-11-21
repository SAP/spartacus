import { Component, Input, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WishListService } from '@spartacus/core';
import { WishListComponent } from './wish-list.component';

const MockWishListService = jasmine.createSpyObj('WishListService', [
  'getWishList',
]);

@Component({
  selector: 'cx-wish-list-item',
  template: '',
})
class MockWishListItemComponent {
  @Input()
  cartEntry;
}

describe('WishListComponent', () => {
  let component: WishListComponent;
  let fixture: ComponentFixture<WishListComponent>;
  let wishListService: WishListService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WishListComponent, MockWishListItemComponent],
      providers: [
        {
          provide: WishListService,
          useValue: MockWishListService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishListComponent);
    component = fixture.componentInstance;
    wishListService = fixture.debugElement.injector.get(WishListService as Type<
      WishListService
    >);
    fixture.detectChanges();
  });

  it('should create instance', () => {
    expect(component).toBeTruthy();
  });

  it('should get wish list', () => {
    expect(wishListService.getWishList).toHaveBeenCalled();
  });
});
