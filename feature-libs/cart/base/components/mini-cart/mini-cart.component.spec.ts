import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, RouterLink } from '@angular/router';
import {
  CxDatePipe,
  I18nTestingModule,
  LanguageService,
  MockDatePipe,
  MockTranslatePipe,
  SemanticPathService,
  TranslatePipe,
} from '@spartacus/core';
import { provideMockFeatureToggles } from 'core-libs/core/src/features-config/feature-toggles/testing';
import { IconComponent } from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { MiniCartComponentService } from './mini-cart-component.service';
import { MiniCartComponent } from './mini-cart.component';

@Component({
  selector: 'cx-icon',
  template: '',
  imports: [I18nTestingModule, RouterLink],
})
class MockCxIconComponent {
  @Input() type;
}

const mockActiveLanguage$ = new BehaviorSubject<string>('en');

class MockLanguageService {
  getActive(): Observable<string> {
    return mockActiveLanguage$.asObservable();
  }
}

class MockSemanticPathService {
  transform(): any[] {
    return ['/cart'];
  }
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

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterLink, MiniCartComponent],
      providers: [
        provideRouter([]),
        {
          provide: MiniCartComponentService,
          useValue: mockMiniCartComponentService,
        },
        { provide: LanguageService, useClass: MockLanguageService },
        { provide: SemanticPathService, useClass: MockSemanticPathService },
        provideMockFeatureToggles({ fixLanguageContextLinks: false }),
      ],
    })
      .overrideComponent(MiniCartComponent, {
        remove: {
          imports: [TranslatePipe, CxDatePipe, IconComponent],
        },
        add: {
          imports: [MockTranslatePipe, MockDatePipe, MockCxIconComponent],
        },
      })
      .compileComponents();
  }));

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
