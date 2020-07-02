import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import {
  IconTestingModule,
  SplitViewTestingModule,
  TableTestingModule,
} from '@spartacus/storefront';
import { CostCenterListComponent } from './cost-center-list.component';
import { CostCenterListService } from './cost-center-list.service';

// import createSpy = jasmine.createSpy;

// const defaultParams: B2BSearchConfig = {
//   sort: 'byName',
//   currentPage: 0,
//   pageSize: 5,
// };

// const mockCostCenterList: EntitiesModel<CostCenter> = {
//   values: [
//     {
//       code: 'c1',
//       name: 'n1',
//       currency: {
//         symbol: '$',
//         isocode: 'USD',
//       },
//       unit: { name: 'orgName', uid: 'orgUid' },
//     },
//     {
//       code: 'c2',
//       name: 'n2',
//       currency: {
//         symbol: '$',
//         isocode: 'USD',
//       },
//       unit: { name: 'orgName2', uid: 'orgUid2' },
//     },
//   ],
//   pagination: { totalPages: 1, totalResults: 1, sort: 'byName' },
//   sorts: [{ code: 'byName', selected: true }],
// };

// const mockCostCenterUIList = {
//   values: [
//     {
//       code: 'c1',
//       name: 'n1',
//       currency: 'USD',
//       parentUnit: 'orgName',
//       uid: 'orgUid',
//     },
//     {
//       code: 'c2',
//       name: 'n2',
//       currency: 'USD',
//       parentUnit: 'orgName2',
//       uid: 'orgUid2',
//     },
//   ],
//   pagination: { totalPages: 1, totalResults: 1, sort: 'byName' },
//   sorts: [{ code: 'byName', selected: true }],
// };

export class MockCostCenterListService {
  getTable() {}
}

fdescribe('CostCenterListComponent', () => {
  let component: CostCenterListComponent;
  let fixture: ComponentFixture<CostCenterListComponent>;
  // let costCentersService: CostCenterService;
  // let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        I18nTestingModule,
        SplitViewTestingModule,
        TableTestingModule,
        IconTestingModule,
      ],
      declarations: [CostCenterListComponent],
      providers: [
        { provide: CostCenterListService, useClass: MockCostCenterListService },
      ],
    }).compileComponents();

    // costCentersService = TestBed.inject(CostCenterService);
    // routingService = TestBed.inject(RoutingService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCenterListComponent);
    component = fixture.componentInstance;
    // costCenterList.next(mockCostCenterList);
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should display No costCenters found page if no costCenters are found', () => {
  //   const emptyCostCenterList: EntitiesModel<CostCenter> = {
  //     values: [],
  //     pagination: {
  //       totalPages: 0,
  //       pageSize: 0,
  //       currentPage: 0,
  //       totalResults: 0,
  //       sort: 'byName',
  //     },
  //     sorts: [{ code: 'byName', selected: true }],
  //   };

  //   costCenterList.next(emptyCostCenterList);
  //   fixture.detectChanges();

  //   expect(fixture.debugElement.query(By.css('.cx-no-items'))).not.toBeNull();
  // });

  // describe('ngOnInit', () => {
  //   it('should read costCenter list', () => {
  //     // component.ngOnInit();
  //     // let costCentersList: any;
  //     // component.data$
  //     //   .subscribe((value) => {
  //     //     costCentersList = value;
  //     //   })
  //     //   .unsubscribe();
  //     expect(costCentersService.loadCostCenters).toHaveBeenCalledWith(
  //       defaultParams
  //     );
  //     expect(costCentersService.getList).toHaveBeenCalledWith(defaultParams);
  //     // expect(costCentersList).toEqual(mockCostCenterUIList);
  //   });
  // });

  // describe('changeSortCode', () => {
  //   it('should set correctly sort code', () => {
  //     // component.changeSortCode('byCode');
  //     expect(routingService.go).toHaveBeenCalledWith(
  //       {
  //         cxRoute: 'costCenters',
  //         params: {},
  //       },
  //       {
  //         sort: 'byCode',
  //       }
  //     );
  //   });
  // });

  // describe('pageChange', () => {
  //   it('should set correctly page', () => {
  //     // component.pageChange(2);
  //     expect(routingService.go).toHaveBeenCalledWith(
  //       {
  //         cxRoute: 'costCenters',
  //         params: {},
  //       },
  //       {
  //         currentPage: 2,
  //       }
  //     );
  //   });
  // });
});
