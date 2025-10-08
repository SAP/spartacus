import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionCartPriceHeadingComponent } from './subscription-cart-price-heading.component';
import { TranslationService } from '@spartacus/core';
import { Observable, of } from 'rxjs';

class MockTranslateService implements Partial<TranslationService> {
  translate(
    _key: string | string[],
    _options?: any,
    _whitespaceUntilLoaded?: boolean
  ): Observable<string> {
    return of('');
  }
}
describe('SubscriptionCartPriceHeadingComponent', () => {
  let component: SubscriptionCartPriceHeadingComponent;
  let fixture: ComponentFixture<SubscriptionCartPriceHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionCartPriceHeadingComponent],
      providers: [
        { provide: TranslationService, useClass: MockTranslateService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriptionCartPriceHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
