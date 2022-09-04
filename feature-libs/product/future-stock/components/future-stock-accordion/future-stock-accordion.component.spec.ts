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

fdescribe('FutureStockAccordionComponent', () => {
	let component: FutureStockAccordionComponent;
	let fixture: ComponentFixture<FutureStockAccordionComponent>;

	// const mockHeader = 'Header';
	// const mockExpanded = true;
	// const mockContent = [
	// 	{
	// 		formattedDate: '10/11/2020',
	// 		stock: {
	// 			stockLevel: 15,
	// 		},
	// 	},
	// 	{
	// 		formattedDate: '11/11/2020',
	// 		stock: {
	// 			stockLevel: 20,
	// 		},
	// 	},
	// 	{
	// 		formattedDate: '12/11/2020',
	// 		stock: {
	// 			stockLevel: 25,
	// 		},
	// 	},
	// ];

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

  // function createComponent() {
	// 	fixture = TestBed.createComponent(FutureStockAccordionComponent);
  //   futureStockAccordionComponent = fixture.componentInstance;

  //   fixture.detectChanges();
	// }

	beforeEach(() => {
		fixture = TestBed.createComponent(FutureStockAccordionComponent);
		component = fixture.componentInstance;

    fixture.detectChanges();

	});
	describe('bla', () => {
		beforeEach(() => {

		});

		it('should be created2', () => {
			expect(component).toBeTruthy();
		});
	});
});
