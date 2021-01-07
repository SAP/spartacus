import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CpqConfiguratorOverviewNormalizer } from './cpq-configurator-overview-normalizer';
import { Cpq } from './cpq.models';

const ATTR_NAME = 'name of attribute';
const attr: Cpq.Attribute = {
  name: ATTR_NAME,
  stdAttrCode: 11,
  pA_ID: 111,
};

const GRP_DESCR = 'description of tab';
const tab: Cpq.Tab = {
  id: 1,
  name: GRP_DESCR,
  attributes: [attr, { stdAttrCode: 12, pA_ID: 122 }],
};

const PRODUCT_CODE = 'PCODE';
const input: Cpq.Configuration = {
  productSystemId: PRODUCT_CODE,
  incompleteAttributes: ['Camera Body'],
  numberOfConflicts: 2,
  tabs: [tab, { id: 2 }],
};

const singleSelectionValues = [
  { paV_ID: 1, valueDisplay: 'another value', selected: false },
  { paV_ID: 2, valueDisplay: 'selected value', selected: true },
  { paV_ID: 3, valueDisplay: 'yet another value', selected: false },
];

const multiSelectionValues = [
  { paV_ID: 1, valueDisplay: 'another value', selected: false },
  { paV_ID: 2, valueDisplay: 'selected value', selected: true },
  { paV_ID: 3, valueDisplay: 'yet another value', selected: false },
  { paV_ID: 4, valueDisplay: 'another selected value', selected: true },
];

describe('CpqConfiguratorOverviewNormalizer', () => {
  let serviceUnderTest: CpqConfiguratorOverviewNormalizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CpqConfiguratorOverviewNormalizer],
    });

    serviceUnderTest = TestBed.inject(
      CpqConfiguratorOverviewNormalizer as Type<
        CpqConfiguratorOverviewNormalizer
      >
    );
  });

  it('should be created', () => {
    expect(serviceUnderTest).toBeDefined();
  });

  it('should map product code', () => {
    expect(serviceUnderTest.convert(input).productCode).toEqual(PRODUCT_CODE);
  });

  it('should calculate total number of issues', () => {
    expect(serviceUnderTest.convert(input).totalNumberOfIssues).toBe(3);
  });

  it('should convert tabs to groups', () => {
    expect(serviceUnderTest.convert(input).groups.length).toBe(2);
  });

  it('should map tab id', () => {
    expect(serviceUnderTest.convertTab(tab).id).toBe('1');
  });

  it('should map tab description', () => {
    expect(serviceUnderTest.convertTab(tab).groupDescription).toBe(GRP_DESCR);
  });

  it('should convert attributes', () => {
    expect(serviceUnderTest.convertTab(tab).attributes.length).toBe(2);
  });

  it('should map attribute name', () => {
    expect(serviceUnderTest.convertAttribute(attr).attribute).toEqual(
      ATTR_NAME
    );
  });

  it('should map user input as attribute value', () => {
    attr.userInput = 'input';
    attr.displayAs = Cpq.DisplayAs.INPUT;
    expect(serviceUnderTest.convertAttribute(attr).value).toEqual('input');
  });

  it('should map RB selected value', () => {
    attr.values = singleSelectionValues;
    attr.displayAs = Cpq.DisplayAs.RADIO_BUTTON;
    expect(serviceUnderTest.convertAttribute(attr).value).toEqual(
      'selected value'
    );
  });

  it('should map ReadOnly selected value', () => {
    attr.values = singleSelectionValues;
    attr.displayAs = Cpq.DisplayAs.READ_ONLY;
    expect(serviceUnderTest.convertAttribute(attr).value).toEqual(
      'selected value'
    );
  });

  it('should map DDLB selected value', () => {
    attr.values = singleSelectionValues;
    attr.displayAs = Cpq.DisplayAs.DROPDOWN;
    expect(serviceUnderTest.convertAttribute(attr).value).toEqual(
      'selected value'
    );
  });

  it('should map CHECK_BOX selected values', () => {
    attr.values = multiSelectionValues;
    attr.displayAs = Cpq.DisplayAs.CHECK_BOX;
    expect(serviceUnderTest.convertAttribute(attr).value).toEqual(
      'selected value, another selected value'
    );
  });

  it('should map LIST_BOX as not implemented', () => {
    attr.values = multiSelectionValues;
    attr.displayAs = Cpq.DisplayAs.LIST_BOX;
    expect(serviceUnderTest.convertAttribute(attr).value).toEqual(
      'NOT_IMPLEMNETED'
    );
  });

  it('should map LIST_BOX_MULTI as not implemented', () => {
    attr.values = multiSelectionValues;
    attr.displayAs = Cpq.DisplayAs.LIST_BOX_MULTI;
    expect(serviceUnderTest.convertAttribute(attr).value).toEqual(
      'NOT_IMPLEMNETED'
    );
  });

  it('should map AUTO_COMPLETE_CUSTOM as not implemented', () => {
    attr.values = multiSelectionValues;
    attr.displayAs = Cpq.DisplayAs.AUTO_COMPLETE_CUSTOM;
    expect(serviceUnderTest.convertAttribute(attr).value).toEqual(
      'NOT_IMPLEMNETED'
    );
  });
});
