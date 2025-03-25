import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SubscriptionProductPriceComponent } from './subscription-product-price.component';
import { CurrentProductService } from '@spartacus/storefront';
import { Pipe, PipeTransform } from '@angular/core';
import { ProductScope, TranslationService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { SubscriptionProductService } from '@spartacus/subscription-billing/core';
import { OneTimeCharge, RecurringCharge } from '@spartacus/subscription-billing/root';

class MockSubscriptionProductService {
    isSubscription(_product: any) {
        return true;
    }
}
class MockCurrentProductService {
    getProduct(_scopes: any) {
        return null;
    }
}
@Pipe({
    name: 'cxTranslate',
    standalone: false,
})
class MockTranslatePipe implements PipeTransform {
    transform(_value: string): any {
        return '';
    }
}
class MockTranslateService implements Partial<TranslationService> {
    translate(
        _key: string | string[],
        _options?: any,
        _whitespaceUntilLoaded?: boolean
    ): Observable<string> {
        return of('');
    }
}

const mockOneTime: OneTimeCharge[] = [{ name: 'one' }, { name: 'two' }];
const mockRecurring: RecurringCharge[] = [{ price: { value: 1 } }];
const mockProduct2 = {
    sapPricePlan: {
        oneTimeCharges: mockOneTime,
        recurringCharges: mockRecurring,
    },
};
const mockProduct1 = {
    sapPricePlan: {},
};

describe('SubscriptionProductPriceComponent', () => {
    let component: SubscriptionProductPriceComponent;
    let fixture: ComponentFixture<SubscriptionProductPriceComponent>;
    let currentProductService: CurrentProductService;
    let productService: SubscriptionProductService;
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [MockTranslatePipe, SubscriptionProductPriceComponent],
            providers: [
                {
                    provide: SubscriptionProductService,
                    useClass: MockSubscriptionProductService,
                },
                { provide: CurrentProductService, useClass: MockCurrentProductService },
                { provide: TranslationService, useClass: MockTranslateService },
            ],
        }).compileComponents();

        productService = TestBed.inject(SubscriptionProductService);
        currentProductService = TestBed.inject(CurrentProductService);
    }));

    describe('for a null product', () => {
        beforeEach(() => {
            spyOn(currentProductService, 'getProduct').and.returnValue(of(null));
            spyOn(productService, 'isSubscription').and.returnValue(true);
            fixture = TestBed.createComponent(SubscriptionProductPriceComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });
        it('should be created', () => {
            expect(component).toBeTruthy();
            expect(currentProductService.getProduct).toHaveBeenCalledWith([
                ProductScope.SUBSCRIPTION,
            ]);
        });

        it('should return product status', () => {
            expect(component.isCurrentProductSubscription()).toEqual(false);
            expect(productService.isSubscription).not.toHaveBeenCalled();
        });
        it('should return one time charges', () => {
            expect(component.oneTimeCharges()).toEqual([]);
        });
        it('should return recurring charges', () => {
            expect(component.recurringCharges()).toEqual([]);
        });
    });

    describe('for a mock product 1', () => {
        beforeEach(() => {
            spyOn(productService, 'isSubscription').and.returnValue(true);
            spyOn(currentProductService, 'getProduct').and.returnValue(
                of(mockProduct1)
            );
            fixture = TestBed.createComponent(SubscriptionProductPriceComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });
        it('should be created', () => {
            expect(component).toBeTruthy();
            expect(currentProductService.getProduct).toHaveBeenCalledWith([
                ProductScope.SUBSCRIPTION,
            ]);
        });

        it('should return product status', () => {
            expect(component.isCurrentProductSubscription()).toEqual(true);
            expect(productService.isSubscription).toHaveBeenCalled();
        });
        it('should return one time charges', () => {
            expect(component.oneTimeCharges()).toEqual([]);
        });
        it('should return recurring charges', () => {
            expect(component.recurringCharges()).toEqual([]);
        });
    });
    describe('for a mock product 2', () => {
        beforeEach(() => {
            spyOn(productService, 'isSubscription').and.returnValue(true);
            spyOn(currentProductService, 'getProduct').and.returnValue(
                of(mockProduct2)
            );
            fixture = TestBed.createComponent(SubscriptionProductPriceComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });
        it('should be created', () => {
            expect(component).toBeTruthy();
            expect(currentProductService.getProduct).toHaveBeenCalledWith([
                ProductScope.SUBSCRIPTION,
            ]);
        });

        it('should return product status', () => {
            expect(component.isCurrentProductSubscription()).toEqual(true);
            expect(productService.isSubscription).toHaveBeenCalled();
        });
        it('should return one time charges', () => {
            expect(component.oneTimeCharges()).toEqual(mockOneTime);
        });
        it('should return recurring charges', () => {
            expect(component.recurringCharges()).toEqual(mockRecurring);
        });
    });
});
