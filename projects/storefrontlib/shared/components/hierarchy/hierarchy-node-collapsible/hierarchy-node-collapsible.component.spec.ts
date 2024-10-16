import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HierarchyNodeCollapsibleComponent } from './hierarchy-node-collapsible.component';
import { CollapsibleNode } from './collapsible-node.model';
import { I18nTestingModule } from '@spartacus/core';

describe('HierarchyNodeCollapsibleComponent', () => {
  let component: HierarchyNodeCollapsibleComponent<any>;
  let fixture: ComponentFixture<HierarchyNodeCollapsibleComponent<any>>;
  let mockCollapsibleNode: CollapsibleNode<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [HierarchyNodeCollapsibleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchyNodeCollapsibleComponent);
    component = fixture.componentInstance;

    mockCollapsibleNode = new CollapsibleNode('Test Node', {
      open: false,
      children: [],
      disabled: false,
      value: { entryGroupNumber: 1, entries: [{ code: 'testProduct' }] },
    });

    component.tree = mockCollapsibleNode;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should return open state correctly', () => {
    component.tree.open = true;
    expect(component.open).toBeTruthy();

    component.tree.open = false;
    expect(component.open).toBeFalsy();
  });

  it('should toggle open state when toggle() is called and node is not disabled', () => {
    component.tree.open = false;
    component.tree.disabled = false;
    component.toggle();
    expect(component.tree.open).toBeTruthy();

    component.toggle();
    expect(component.tree.open).toBeFalsy();
  });

  it('should not toggle open state when node is disabled', () => {
    component.tree.open = false;
    component.tree.disabled = true;
    component.toggle();
    expect(component.tree.open).toBeFalsy();
  });

  it('should return collapsible children', () => {
    expect(component.collapsibleChildren).toEqual([]);
  });
});
