import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, RouterLink } from '@angular/router';
import {
  CxDatePipe,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
  UrlCommandRoute,
  UrlPipe,
} from '@spartacus/core';
import { IconComponent } from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { MiniCartComponentService } from './mini-cart-component.service';
import { MiniCartComponent } from './mini-cart.component';

@Pipe({ name: 'cxUrl' })
class MockUrlPipe implements PipeTransform {
  transform(options: UrlCommandRoute): string {
    return options.cxRoute;
  }
}

@Component({
  selector: 'cx-icon',
  template: '',
  imports: [I18nTestingModule, RouterLink],
})
class MockCxIconComponent {
  @Input() type;
}

const updating$ = new BehaviorSubject<boolean>(false);

const mockMiniCartComponentService: Partial<MiniCartComponentService> = {
  getQuantity(): Observable<number> {
    return of(7);
  },
  getTotalPrice(): Observable<string> {
    return of('122$');
  },
  getUpdating(): Observable<boolean> {
    return updating$.asObservable();
  },
};

describe('MiniCartComponent', () => {
  let miniCartComponent: MiniCartComponent;
  let fixture: ComponentFixture<MiniCartComponent>;

  beforeEach(waitForAsync(() => {
    updating$.next(false);
    TestBed.configureTestingModule({
      imports: [RouterLink, MiniCartComponent],
      providers: [
        provideRouter([]),
        {
          provide: MiniCartComponentService,
          useValue: mockMiniCartComponentService,
        },
      ],
    })
      .overrideComponent(MiniCartComponent, {
        remove: {
          imports: [TranslatePipe, CxDatePipe, UrlPipe, IconComponent],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockUrlPipe,
            MockCxIconComponent,
          ],
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

    it('should not render the updating indicator when updating$ is false', () => {
      const indicator = fixture.debugElement.query(
        By.css('.cx-mini-cart-updating')
      );
      expect(indicator).toBeNull();
    });

    it('should render the updating indicator when updating$ is true', () => {
      updating$.next(true);
      fixture.detectChanges();
      const indicator = fixture.debugElement.query(
        By.css('.cx-mini-cart-updating')
      );
      expect(indicator).not.toBeNull();
      expect(indicator.attributes['role']).toBe('status');
      expect(indicator.attributes['aria-live']).toBe('polite');
      // Inline loader glyph (mirrors cx-progress-button) is rendered inside the
      // indicator and is aria-hidden so the announcement comes from the
      // parent label, not the spinning glyph.
      const loaderContainer = indicator.query(By.css('.loader-container'));
      expect(loaderContainer).not.toBeNull();
      expect(loaderContainer.attributes['aria-hidden']).toBe('true');
      const loader = indicator.query(By.css('.loader-container .loader'));
      expect(loader).not.toBeNull();
    });

    it('should add is-updating class on the link while updating', () => {
      updating$.next(true);
      fixture.detectChanges();
      const link = fixture.debugElement.query(By.css('a'));
      expect(link.classes['is-updating']).toBe(true);
    });

    it('should hide the count and total while updating so the loader replaces them', () => {
      updating$.next(true);
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.count'))).toBeNull();
      expect(fixture.debugElement.query(By.css('.total'))).toBeNull();
    });
  });
});
