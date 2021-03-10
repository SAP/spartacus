import { TestBed } from '@angular/core/testing';
import { B2BUnitTreeNode } from '@spartacus/organization/administration/core';
import { UnitTreeService } from './unit-tree.service';

const mockedTree = {
  active: true,
  count: 2,
  depthLevel: 0,
  expanded: false,
  id: 'Rustic',
  name: 'Rustic',
  uid: 'Rustic',
  children: [
    {
      active: true,
      id: 'Rustic Services',
      name: 'Rustic Services',
      parent: 'Rustic',
      children: [
        {
          active: true,
          children: [],
          id: 'Services West',
          name: 'Services West',
          parent: 'Rustic Services',
        },
      ],
    },
    {
      active: true,
      children: [],
      id: 'Rustic Retail',
      name: 'Rustic Retail',
      parent: 'Rustic',
    },
  ],
};

describe('UnitTreeService', () => {
  let service: UnitTreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnitTreeService],
    });
    service = TestBed.inject(UnitTreeService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should `collapseAll` method to be defined', () => {
    expect(service.collapseAll).toBeDefined();
  });

  it('should `expandAll` method to be defined', () => {
    expect(service.expandAll).toBeDefined();
  });

  it('should `toggle` method to be defined', () => {
    expect(service.toggle).toBeDefined();
  });

  it('should `isExpanded` method to be defined', () => {
    expect(service.isExpanded).toBeDefined();
  });

  it('should expand units with level < minimalExpanded', () => {
    expect(service.isExpanded(mockedTree.id, 0)).toEqual(true);
    expect(service.isExpanded(mockedTree.children[0].id, 1)).toEqual(false);
    expect(
      service.isExpanded(mockedTree.children[0].children[0].id, 2)
    ).toEqual(false);
    expect(service.isExpanded(mockedTree.children[1].id, 1)).toEqual(false);
  });

  it('should expand only first child', () => {
    service.toggle(mockedTree.children[0] as B2BUnitTreeNode);
    expect(service.isExpanded(mockedTree.children[0].id, 1)).toEqual(true);
    expect(
      service.isExpanded(mockedTree.children[0].children[0].id, 2)
    ).toEqual(false);
    expect(service.isExpanded(mockedTree.children[1].id, 1)).toEqual(false);
  });

  it('should collapse first child', () => {
    service.toggle(mockedTree.children[0] as B2BUnitTreeNode);
    service.toggle(mockedTree.children[0] as B2BUnitTreeNode);
    expect(service.isExpanded(mockedTree.children[0].id, 1)).toEqual(false);
  });

  it('should keep grand child expanded', () => {
    service.toggle(mockedTree.children[0] as B2BUnitTreeNode);
    service.toggle(mockedTree.children[0].children[0] as B2BUnitTreeNode);
    service.toggle(mockedTree.children[0] as B2BUnitTreeNode);
    expect(service.isExpanded(mockedTree.children[0].id, 1)).toEqual(false);
    expect(
      service.isExpanded(mockedTree.children[0].children[0].id, 1)
    ).toEqual(true);
  });

  describe('initialize', () => {
    it('should expand ancestors of the active unit', () => {
      service.initialize(mockedTree, mockedTree.children[0].children[0].id);
      expect(service.isExpanded(mockedTree.id, 0)).toEqual(true);
      expect(service.isExpanded(mockedTree.children[0].id, 1)).toEqual(true);
    });

    it('should not expand the active unit on initialization', () => {
      service.initialize(mockedTree, mockedTree.children[0].children[0].id);
      expect(
        service.isExpanded(mockedTree.children[0].children[0].id, 1)
      ).toEqual(false);
    });

    it('should not expand sibling ancestors of the active unit ancestors', () => {
      service.initialize(mockedTree, mockedTree.children[0].children[0].id);
      expect(service.isExpanded(mockedTree.children[1].id, 1)).toEqual(false);
    });
  });

  describe('expandAll()', () => {
    beforeEach(() => {
      service.expandAll();
    });

    it('should expand all units', () => {
      expect(service.isExpanded(mockedTree.id, 0)).toEqual(true);
      expect(service.isExpanded(mockedTree.children[0].id, 1)).toEqual(true);
      expect(
        service.isExpanded(mockedTree.children[0].children[0].id, 2)
      ).toEqual(true);
      expect(service.isExpanded(mockedTree.children[1].id, 1)).toEqual(true);
    });

    it('should collapse root unit', () => {
      expect(service.isExpanded(mockedTree.id, 0)).toEqual(true);
      service.toggle(mockedTree);
      expect(service.isExpanded(mockedTree.id, 0)).toEqual(false);
    });

    it('should collapse child unit', () => {
      expect(service.isExpanded(mockedTree.children[0].id, 0)).toEqual(true);
      service.toggle(mockedTree.children[0] as B2BUnitTreeNode);
      expect(service.isExpanded(mockedTree.children[0].id, 0)).toEqual(false);
    });

    it('should collapse grand child unit', () => {
      expect(
        service.isExpanded(mockedTree.children[0].children[0].id, 0)
      ).toEqual(true);
      service.toggle(mockedTree.children[0].children[0] as B2BUnitTreeNode);
      expect(
        service.isExpanded(mockedTree.children[0].children[0].id, 0)
      ).toEqual(false);
    });
  });

  describe('collapseAll()', () => {
    beforeEach(() => {
      service.collapseAll();
    });

    it('should collapse all units', () => {
      expect(service.isExpanded(mockedTree.id, 0)).toEqual(false);
      expect(service.isExpanded(mockedTree.children[0].id, 1)).toEqual(false);
      expect(
        service.isExpanded(mockedTree.children[0].children[0].id, 2)
      ).toEqual(false);
      expect(service.isExpanded(mockedTree.children[1].id, 1)).toEqual(false);
    });

    it('should expand root unit on toggle', () => {
      expect(service.isExpanded(mockedTree.id, 0)).toEqual(false);
      service.toggle(mockedTree);
      expect(service.isExpanded(mockedTree.id, 0)).toEqual(true);
    });

    it('should collapse child unit', () => {
      expect(service.isExpanded(mockedTree.children[0].id, 0)).toEqual(false);
      service.toggle(mockedTree.children[0] as B2BUnitTreeNode);
      expect(service.isExpanded(mockedTree.children[0].id, 0)).toEqual(true);
    });

    it('should collapse grand child unit', () => {
      expect(
        service.isExpanded(mockedTree.children[0].children[0].id, 0)
      ).toEqual(false);
      service.toggle(mockedTree.children[0].children[0] as B2BUnitTreeNode);
      expect(
        service.isExpanded(mockedTree.children[0].children[0].id, 0)
      ).toEqual(true);
    });
  });
});
