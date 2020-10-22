import { TestBed } from '@angular/core/testing';
import { TREE_TOGGLE } from './unit-tree.model';
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

  it('should `colapseAll` method to be defined', () => {
    expect(service.collapseAll).toBeDefined();
  });

  it('should `expandAll` method to be defined', () => {
    expect(service.expandAll).toBeDefined();
  });

  it('should `toggle` method to be defined', () => {
    expect(service.toggle).toBeDefined();
  });

  it('should `getToggleState` method to be defined', () => {
    expect(service.getToggleState).toBeDefined();
  });

  it('should `isExpanded` method to be defined', () => {
    expect(service.isExpanded).toBeDefined();
  });

  it('should `toggle` toggle unit and set COLLAPSED/EXPANDED state', () => {
    let state: number;

    service.initialize(mockedTree, mockedTree.id);

    service.toggle(mockedTree);
    state = service.getToggleState(mockedTree.id);
    expect(state).toEqual(2);
    expect(TREE_TOGGLE[state]).toEqual(TREE_TOGGLE[2]);

    service.toggle(mockedTree);
    state = service.getToggleState(mockedTree.id);
    expect(state).toEqual(1);
    expect(TREE_TOGGLE[state]).toEqual(TREE_TOGGLE[1]);
  });

  it('should `expandAll` set EXPAND_ALL state', () => {
    service.initialize(mockedTree, mockedTree.id);

    service.expandAll(mockedTree.id);
    const state = service.getToggleState(mockedTree.id);
    expect(TREE_TOGGLE[state]).toEqual(TREE_TOGGLE[3]);
  });

  it('should `collapseAll` set COLLAPSE_ALL state', () => {
    service.initialize(mockedTree, mockedTree.id);

    service.collapseAll(mockedTree.id);
    const state = service.getToggleState(mockedTree.id);
    expect(TREE_TOGGLE[state]).toEqual(TREE_TOGGLE[4]);
  });

  it('should `isExpanded` return expanded property state', () => {
    let state: boolean;

    service.initialize(mockedTree, mockedTree.id);

    service.collapseAll(mockedTree.id);
    state = service.isExpanded(mockedTree.id, 0);
    expect(state).toBeFalse();

    service.expandAll(mockedTree.id);
    state = service.isExpanded(mockedTree.id, 0);
    expect(state).toBeTrue();
  });
});
