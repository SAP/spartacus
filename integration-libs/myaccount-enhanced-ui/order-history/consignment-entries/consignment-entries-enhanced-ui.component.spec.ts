import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Consignment } from '@spartacus/order/root';
import { ConsignmentEntriesEnhancedUIComponent } from './consignment-entries-enhanced-ui.component';

const mockOrderCode = '0005000001';
const mockConsignments: Consignment[] = [
  {
    code: 'cons0005000001_7',
    status: 'READY',
    statusDate: new Date('2023-08-31T06:33:58+0000'),
    entries: [
      {
        orderEntry: {},
        quantity: 3,
      },
      {
        orderEntry: {},
        quantity: 1,
      },
    ],
  },
  {
    code: 'cons0005000001_1',
    status: 'READY',
    statusDate: new Date('2023-08-29T06:33:58+0000'),
    entries: [
      {
        orderEntry: {},
        quantity: 2,
      },
    ],
  },
];

describe('ConsignmentEntriesEnhancedUIComponent', () => {
  let component: ConsignmentEntriesEnhancedUIComponent;
  let fixture: ComponentFixture<ConsignmentEntriesEnhancedUIComponent>;
  let el: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [],
        providers: [],
        declarations: [ConsignmentEntriesEnhancedUIComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsignmentEntriesEnhancedUIComponent);
    el = fixture.debugElement;

    component = fixture.componentInstance;
    component.orderCode = mockOrderCode;
    component.consignments = mockConsignments;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should order consignment entries be rendered', () => {
    fixture.detectChanges();
    expect(el.query(By.css('.cx-consignment-info'))).toBeTruthy();
  });

  it('should return no.of consignment entries', () => {
    let output1 = component.consignmentEntriesLength(mockConsignments[0]);
    expect(output1).toEqual(2);
    let output2 = component.consignmentEntriesLength(mockConsignments[1]);
    expect(output2).toEqual(1);
  });
  it('should return no.of consignment entries', () => {
    let output1 = component.consignmentEntriesLength(mockConsignments[0]);
    expect(output1).toEqual(2);
    let output2 = component.consignmentEntriesLength(mockConsignments[1]);
    expect(output2).toEqual(1);
  });
  it('should return the number in consigment code', () => {
    let output1 = component.consignmentNumber(mockConsignments[0].code);
    expect(output1).toEqual(7);
    let output2 = component.consignmentNumber(mockConsignments[1].code);
    expect(output2).toEqual(1);
  });
});
