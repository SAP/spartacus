import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
    CmsConfig,
    CmsService,
    CMSTabParagraphContainer,
    I18nTestingModule,
    WindowRef,
} from '@spartacus/core';
import { EMPTY, of } from 'rxjs';
import { LayoutConfig, ComponentWrapperDirective, OutletDirective } from '@spartacus/storefront';
import { ProductTabsComponent } from './product-tabs.component';

@Component({
    selector: 'cx-test-cmp',
    template: '',
})
class TestComponent {
    tabTitleParam$ = of('title param');
}

const MockCmsModuleConfig: CmsConfig = {
    cmsComponents: {
        CMSTestComponent: {
            component: TestComponent,
        },
    },
};

const MockLayoutConfig: LayoutConfig = {};

const mockComponents = [
    'ProductDetailsTabComponent',
    'ProductSpecsTabComponent',
    'ProductReviewsTabComponent',
];

const mockComponentData: CMSTabParagraphContainer = {
    components: mockComponents.join(' '),
    container: 'true',
    name: 'Tab container',
    typeCode: 'CMSTabParagraphContainer',
    uid: 'TabPanelContainer',
};

const mockTabComponentData1 = {
    uid: 'ProductDetailsTabComponent',
    flexType: 'ProductDetailsTabComponent',
};

const mockTabComponentData2 = {
    uid: 'ProductSpecsTabComponent',
    flexType: 'ProductSpecsTabComponent',
};

const mockTabComponentData3 = {
    uid: 'ProductReviewsTabComponent',
    flexType: 'ProductReviewsTabComponent',
};

const MockCmsService = {
    getComponentData: () => EMPTY,
};

describe('ProductTabsComponent', () => {
    let component: ProductTabsComponent;
    let fixture: ComponentFixture<ProductTabsComponent>;
    let cmsService: CmsService;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [I18nTestingModule],
                declarations: [
                    TestComponent,
                    ProductTabsComponent,
                    ComponentWrapperDirective,
                    OutletDirective,
                ],
                providers: [
                    WindowRef,
                    { provide: CmsService, useValue: MockCmsService },
                    { provide: CmsConfig, useValue: MockCmsModuleConfig },
                    { provide: LayoutConfig, useValue: MockLayoutConfig },
                ],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductTabsComponent);
        component = fixture.componentInstance;
        cmsService = TestBed.inject(CmsService);

        spyOn(console, 'warn');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render child components', () => {
        spyOn(cmsService, 'getComponentData').and.returnValues(
            of(mockComponentData),
            of(mockTabComponentData1),
            of(mockTabComponentData2),
            of(mockTabComponentData3)
        );
        let childComponents: any[] = [];
        component.ngOnInit();

        for (let i = 0; i < component.components$.length; i++) {
            component.components$[i].subscribe((component) => (childComponents.push(component)))
                .unsubscribe();
        }

        for (let i = 0; i < childComponents.length; i++) {
            expect(childComponents[i]).toEqual({
                flexType: mockComponents[i],
                uid: mockComponents[i],
                title: `TabPanelContainer.tabs.${mockComponents[i]}`,
            });
        }
    });

    it('active tab number must be -1', () => {
        component.ngOnInit();
        expect(component.activeTabNum).toEqual(-1);
    });

    it('should be able to get tab title after tab component created', () => {
        let childCompFixture: ComponentFixture<TestComponent>;
        childCompFixture = TestBed.createComponent(TestComponent);

        component.tabCompLoaded(childCompFixture.componentRef);

        let param = '';
        component.tabTitleParams.forEach((param$) => {
            if (param$ != null) {
                param$.subscribe((value) => (param = value)).unsubscribe();
            }
        });

        expect(param).toEqual('title param');
    });

});
