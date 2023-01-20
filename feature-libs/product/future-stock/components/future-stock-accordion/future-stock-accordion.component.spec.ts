import { Component, Input } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { I18nTestingModule } from "@spartacus/core";
import { ICON_TYPE } from "@spartacus/storefront";
import { FutureStockAccordionComponent } from "./future-stock-accordion.component";

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

describe('FutureStockAccordionComponent', () => {
	let component: FutureStockAccordionComponent;
	let fixture: ComponentFixture<FutureStockAccordionComponent>;

	const mockHeader = 'Header';
	const mockContent = [
		{
			formattedDate: '10/11/2020',
			stock: {
				stockLevel: 15,
			},
		},
		{
			formattedDate: '11/11/2020',
			stock: {
				stockLevel: 20,
			},
		},
		{
			formattedDate: '12/11/2020',
			stock: {
				stockLevel: 25,
			},
		},
	];

	beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule ],
      declarations: [
				MockCxIconComponent,
        FutureStockAccordionComponent,
      ],
      providers: [],
    }).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(FutureStockAccordionComponent);
		component = fixture.componentInstance;
		component.header = mockHeader;
    fixture.detectChanges();

	});

	describe('creation', () => {
		it('should create component', () => {
			expect(component).toBeTruthy();
		});
	});

	describe('toggle', () => {
		it('should change expanded state of accordion', () => {
			expect(component.expanded).toBeFalsy();

			component.toggle();

			expect(component.expanded).toBeTruthy();
		});
	});

	describe('isString', () => {
		it('should return true if string input was provided', () => {
			component.content = 'test';

			const isString = component.isString(component.content);

			expect(isString).toBeTruthy();
		});

		it('should return false if nonString input was provided', () => {
			component.content = mockContent;

			const isString = component.isString(component.content);

			expect(isString).toBeFalsy();
		});
	});
});
