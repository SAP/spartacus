import { DebugElement, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  I18nModule,
  LanguageService,
  TranslationService,
} from '@spartacus/core';
import { Consignment } from '../../../../root/model';
import { Observable, EMPTY } from 'rxjs';
import { ConsignmentEntriesComponent } from './consignment-entries.component';
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
@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockTranslationService {
  translate(): Observable<string> {
    return EMPTY;
  }
}
class MockLanguageService {
  getActive(): Observable<string> {
    return EMPTY;
  }
}

describe('ConsignmentEntriesComponent', () => {
  let component: ConsignmentEntriesComponent;
  let fixture: ComponentFixture<ConsignmentEntriesComponent>;
  let el: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nModule],
        providers: [
          { provide: TranslationService, useClass: MockTranslationService },
          { provide: LanguageService, useClass: MockLanguageService },
        ],
        declarations: [ConsignmentEntriesComponent, MockUrlPipe],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsignmentEntriesComponent);
    el = fixture.debugElement;

    component = fixture.componentInstance;
    component.orderCode = mockOrderCode;
    component.consignments = mockConsignments;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render order consignment entries', () => {
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
    expect(output1).toEqual(8);
    let output2 = component.consignmentNumber(mockConsignments[1].code);
    expect(output2).toEqual(2);
  });
});
