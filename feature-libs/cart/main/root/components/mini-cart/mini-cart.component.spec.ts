import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, UrlCommandRoute } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { MiniCartComponentService } from './mini-cart-component.service';
import { MiniCartComponent } from './mini-cart.component';

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(options: UrlCommandRoute): string {
    return options.cxRoute;
  }
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type;
}

const mockMiniCartComponentService: Partial<MiniCartComponentService> = {
  getQuantity(): Observable<number> {
    return of(7);
  },
  getTotalPrice(): Observable<string> {
    return of('122$');
  },
};

describe('MiniCartComponent', () => {
  let miniCartComponent: MiniCartComponent;
  let fixture: ComponentFixture<MiniCartComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, I18nTestingModule],
        declarations: [MiniCartComponent, MockUrlPipe, MockCxIconComponent],
        providers: [
          {
            provide: MiniCartComponentService,
            useValue: mockMiniCartComponentService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniCartComponent);
    miniCartComponent = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(miniCartComponent).toBeTruthy();
  });

  describe('template', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should contain link to cart page', () => {
      const linkHref = fixture.debugElement.query(By.css('a')).nativeElement
        .attributes.href.value;
      expect(linkHref).toBe('/cart');
    });

    it('should contain number of items in cart', () => {
      const cartItemsNumber = fixture.debugElement.query(By.css('.count'))
        .nativeElement.innerText;
      expect(cartItemsNumber).toEqual('miniCart.count count:7');
    });
    it('should contain total price of the cart', () => {
      const cartItemsNumber = fixture.debugElement.query(By.css('.total'))
        .nativeElement.innerText;
      expect(cartItemsNumber).toEqual('miniCart.total total:122$ ');
    });
  });
});
