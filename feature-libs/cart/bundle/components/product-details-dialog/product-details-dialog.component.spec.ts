import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductDetailsDialogComponent, PRODUCT_DETAILS_DIALOG_ACTION } from './product-details-dialog.component';
import { I18nTestingModule, } from '@spartacus/core';
import { ICON_TYPE, LaunchDialogService, KeyboardFocusTestingModule } from '@spartacus/storefront';

class MockLaunchDialogService implements Partial<LaunchDialogService> {
    get data$(): Observable<any> {
        return of({
            product: {
                name: 'mockProduct',
                code: 'code1'
            },
            function: () => { }
        });
    }

    closeDialog(_reason: string): void { }
}

@Component({
    selector: 'cx-icon',
    template: '',
})
class MockCxIconComponent {
    @Input() type: ICON_TYPE;
}

describe('product details dialog component', () => {
    let productDetailsDialogComponent: ProductDetailsDialogComponent;
    let launchDialogService: LaunchDialogService;
    let fixture: ComponentFixture<ProductDetailsDialogComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [
                    I18nTestingModule,
                    KeyboardFocusTestingModule],
                declarations: [ProductDetailsDialogComponent, MockCxIconComponent],
                providers: [
                    { provide: LaunchDialogService, useClass: MockLaunchDialogService }
                ],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductDetailsDialogComponent);
        launchDialogService = TestBed.inject(LaunchDialogService);
        productDetailsDialogComponent = fixture.componentInstance;
    });

    it('should be created', () => {
        expect(productDetailsDialogComponent).toBeTruthy();
    });

    describe('init()', () => {
        it('should init the component', () => {
            productDetailsDialogComponent.product = {};
            productDetailsDialogComponent.select = () => { };

            productDetailsDialogComponent.ngOnInit();

            expect(productDetailsDialogComponent.product.code).toEqual("code1");
            expect(productDetailsDialogComponent.product.name).toEqual("mockProduct");
        });
    });

    describe('dismissModal', () => {
        it('should closeModal when user click select', () => {
            spyOn(productDetailsDialogComponent, 'dismissModal');

            productDetailsDialogComponent.ngOnInit();
            productDetailsDialogComponent.selectProduct();
            expect(productDetailsDialogComponent.dismissModal).toHaveBeenCalledWith(PRODUCT_DETAILS_DIALOG_ACTION.SELECT);
        });

        it('should close Dialog when user dismissModal', () => {
            spyOn(launchDialogService, 'closeDialog').and.stub();

            productDetailsDialogComponent.ngOnInit();
            productDetailsDialogComponent.dismissModal(PRODUCT_DETAILS_DIALOG_ACTION.CANCEL);
            expect(launchDialogService.closeDialog).toHaveBeenCalledWith(PRODUCT_DETAILS_DIALOG_ACTION.CANCEL);
        });
    });
});
