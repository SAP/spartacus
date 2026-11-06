import { TestBed } from '@angular/core/testing';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { CpqConfiguratorOverviewFilterService } from './cpq-configurator-overview-filter.service';

describe('CpqConfiguratorOverviewFilterService', () => {
  let service: CpqConfiguratorOverviewFilterService;

  const pricedAttr: Configurator.AttributeOverview = {
    attribute: 'Color',
    value: 'Red',
    valuePrice: { currencyIso: 'USD', value: 10 },
  };

  const unpricedAttr: Configurator.AttributeOverview = {
    attribute: 'Note',
    value: 'Free text',
  };

  const groupTab1: Configurator.GroupOverview = {
    id: '1',
    groupDescription: 'Tab 1',
    attributes: [pricedAttr, unpricedAttr],
  };

  const groupTab2: Configurator.GroupOverview = {
    id: '2',
    groupDescription: 'Tab 2',
    attributes: [unpricedAttr],
  };

  const nestedRowGroup: Configurator.GroupOverview = {
    id: 'CONTAINER_ROW@10@row1',
    groupDescription: 'Nested product',
    attributes: [unpricedAttr],
    subGroups: [
      {
        id: 'CONTAINER_ROW@10@row1@0',
        groupDescription: 'General',
        attributes: [pricedAttr],
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CpqConfiguratorOverviewFilterService);
  });

  it('should return all groups when no filters are applied', () => {
    const result = service.filter([groupTab1, groupTab2], [], []);
    expect(result).toEqual([groupTab1, groupTab2]);
  });

  it('should filter by group id', () => {
    const result = service.filter([groupTab1, groupTab2], [], ['2']);
    expect(result).toEqual([groupTab2]);
  });

  it('should keep nested groups as headers for priced attributes when price filter is active', () => {
    const result = service.filter(
      [nestedRowGroup],
      [Configurator.OverviewFilter.PRICE_RELEVANT],
      []
    );
    expect(result).toEqual([
      {
        id: 'CONTAINER_ROW@10@row1',
        groupDescription: 'Nested product',
        attributes: [],
        subGroups: [
          {
            id: 'CONTAINER_ROW@10@row1@0',
            groupDescription: 'General',
            attributes: [pricedAttr],
          },
        ],
      },
    ]);
  });

  it('should keep the parent container header below its tab when price filter is active', () => {
    const tabWithRows: Configurator.GroupOverview = {
      id: '1',
      groupDescription: 'Tab 1',
      attributes: [unpricedAttr],
      subGroups: [
        nestedRowGroup,
        {
          id: 'CONTAINER_ROW@10@row2',
          groupDescription: 'Unpriced product',
          attributes: [unpricedAttr],
        },
      ],
    };

    const result = service.filter(
      [tabWithRows],
      [Configurator.OverviewFilter.PRICE_RELEVANT],
      []
    );

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
    expect(result[0].attributes).toEqual([]);
    expect(result[0].subGroups?.map((group) => group.id)).toEqual([
      'CONTAINER_ROW@10@row1',
    ]);
    expect(result[0].subGroups?.[0].subGroups?.[0].attributes).toEqual([
      pricedAttr,
    ]);
  });

  it('should remove groups with no priced content when price filter is active', () => {
    const result = service.filter(
      [groupTab2],
      [Configurator.OverviewFilter.PRICE_RELEVANT],
      []
    );
    expect(result).toEqual([]);
  });

  it('should apply group and price filters together', () => {
    const result = service.filter(
      [groupTab1, groupTab2],
      [Configurator.OverviewFilter.PRICE_RELEVANT],
      ['1']
    );
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
    expect(result[0].attributes).toEqual([pricedAttr]);
  });
});
