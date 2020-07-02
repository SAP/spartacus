import createSpy = jasmine.createSpy;

// const code = 'costCenterCode';

// const params: B2BSearchConfig = {
//   sort: 'byName',
//   currentPage: 0,
//   pageSize: 2147483647,
// };

// const mockBudgetList: EntitiesModel<Budget> = {
//   values: [
//     {
//       code: '1',
//       name: 'b1',
//       budget: 2230,
//       selected: true,
//       currency: {
//         isocode: 'USD',
//         symbol: '$',
//       },
//       startDate: '2010-01-01T00:00:00+0000',
//       endDate: '2034-07-12T00:59:59+0000',
//       orgUnit: { uid: 'orgUid', name: 'orgName' },
//     },
//     {
//       code: '2',
//       name: 'b2',
//       budget: 2240,
//       selected: true,
//       currency: {
//         isocode: 'USD',
//         symbol: '$',
//       },
//       startDate: '2020-01-01T00:00:00+0000',
//       endDate: '2024-07-12T00:59:59+0000',
//       orgUnit: { uid: 'orgUid2', name: 'orgName2' },
//     },
//   ],
//   pagination: { totalPages: 1, totalResults: 2, sort: 'byName' },
//   sorts: [{ code: 'byName', selected: true }],
// };

// const mockBudgetUIList = {
//   values: [
//     {
//       code: '1',
//       name: 'b1',
//       amount: '2230 $',
//       startEndDate: '2010-01-01 - 2034-07-12',
//       uid: 'orgUid',
//       parentUnit: 'orgName',
//     },
//     {
//       code: '2',
//       name: 'b2',
//       amount: '2240 $',
//       startEndDate: '2020-01-01 - 2024-07-12',
//       uid: 'orgUid2',
//       parentUnit: 'orgName2',
//     },
//   ],
//   pagination: { totalPages: 1, totalResults: 2, sort: 'byName' },
//   sorts: [{ code: 'byName', selected: true }],
// };
// @Component({
//   template: '',
//   selector: 'cx-pagination',
// })
// class MockPaginationComponent {
//   @Input() pagination;
//   @Output() viewPageEvent = new EventEmitter<string>();
// }
// @Pipe({
//   name: 'cxUrl',
// })
// class MockUrlPipe implements PipeTransform {
//   transform() {}
// }

// const budgetList = new BehaviorSubject(mockBudgetList);

// class MockCostCenterService implements Partial<CostCenterService> {
//   loadBudgets = createSpy('loadBudgets');

//   getBudgets = createSpy('getBudgets').and.returnValue(budgetList);
// }

// class MockRoutingService {
//   go = createSpy('go').and.stub();
//   getRouterState() {
//     return of({
//       state: {
//         params: {
//           code,
//         },
//         queryParams: {
//           sort: 'byName',
//         },
//       },
//     });
//   }
// }
// const mockRoutesConfig: RoutesConfig = defaultStorefrontRoutesConfig;
// class MockRoutingConfig {
//   getRouteConfig(routeName: string) {
//     return mockRoutesConfig[routeName];
//   }
// }

// class MockCxDatePipe {
//   transform(value: string) {
//     return value.split('T')[0];
//   }
// }

describe('CostCenterBudgetsComponent', () => {
  // let component: CostCenterBudgetsComponent;
  // let fixture: ComponentFixture<CostCenterBudgetsComponent>;
  // let costCenterService: MockCostCenterService;
  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     imports: [RouterTestingModule, InteractiveTableModule, I18nTestingModule],
  //     declarations: [
  //       CostCenterBudgetsComponent,
  //       MockUrlPipe,
  //       MockPaginationComponent,
  //     ],
  //     providers: [
  //       { provide: CxDatePipe, useClass: MockCxDatePipe },
  //       { provide: RoutingConfig, useClass: MockRoutingConfig },
  //       { provide: RoutingService, useClass: MockRoutingService },
  //       { provide: CostCenterService, useClass: MockCostCenterService },
  //       {
  //         provide: PaginationConfig,
  //         useValue: {
  //           pagination: {},
  //         },
  //       },
  //     ],
  //   }).compileComponents();
  //   costCenterService = TestBed.get(
  //     CostCenterService as Type<CostCenterService>
  //   );
  // }));
  // beforeEach(() => {
  //   fixture = TestBed.createComponent(CostCenterBudgetsComponent);
  //   component = fixture.componentInstance;
  //   budgetList.next(mockBudgetList);
  //   fixture.detectChanges();
  // });
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
  // it('should display No budgets found page if no budgets are found', () => {
  //   const emptyBudgetList: EntitiesModel<Budget> = {
  //     values: [],
  //     pagination: { totalResults: 0, sort: 'byName' },
  //     sorts: [{ code: 'byName', selected: true }],
  //   };
  //   budgetList.next(emptyBudgetList);
  //   fixture.detectChanges();
  //   expect(fixture.debugElement.query(By.css('.cx-no-items'))).not.toBeNull();
  // });
  // describe('ngOnInit', () => {
  //   it('should read budget list', () => {
  //     component.ngOnInit();
  //     let budgetsList: any;
  //     component.data$.subscribe((value) => {
  //       budgetsList = value;
  //     });
  //     expect(costCenterService.loadBudgets).toHaveBeenCalledWith(code, params);
  //     expect(costCenterService.getBudgets).toHaveBeenCalledWith(code, params);
  //     expect(budgetsList).toEqual(mockBudgetUIList);
  //   });
  // });
});
