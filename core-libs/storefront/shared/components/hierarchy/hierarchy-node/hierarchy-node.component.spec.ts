import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HierarchyNodeComponent } from './hierarchy-node.component';
import { CollapsibleNode } from '../hierarchy-node-collapsible/collapsible-node.model';
import { TitleNode } from '../hierarchy-node-title/title-node.model';
import { HierarchyOptions } from '../hierarchy/hierarchy.model';

describe('HierarchyNodeComponent', () => {
  let component: HierarchyNodeComponent<any>;
  let fixture: ComponentFixture<HierarchyNodeComponent<any>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HierarchyNodeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HierarchyNodeComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set type to TITLE when options.tree is a TitleNode', () => {
    component.options = {
      tree: new TitleNode('Title Node'),
    } as HierarchyOptions<any>;

    component.ngOnInit();

    expect(component.type).toBe('TITLE');
  });

  it('should set type to COLLAPSIBLE when options.tree is a CollapsibleNode', () => {
    const collapsibleNode = new CollapsibleNode('Collapsible Node');
    component.options = { tree: collapsibleNode } as HierarchyOptions<any>;

    component.ngOnInit();

    expect(component.type).toBe('COLLAPSIBLE');
    expect(component.collasibleTree).toBe(collapsibleNode);
  });

  it('should re-derive type on ngOnChanges of options', () => {
    const titleNode = new TitleNode('Another Title Node');
    component.options = { tree: titleNode } as HierarchyOptions<any>;

    component.ngOnChanges({
      options: {
        currentValue: component.options,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true,
      },
    });

    expect(component.type).toBe('TITLE');
  });

  it('should re-derive type on ngOnChanges for CollapsibleNode', () => {
    const collapsibleNode = new CollapsibleNode('Another Collapsible Node');
    component.options = { tree: collapsibleNode } as HierarchyOptions<any>;

    component.ngOnChanges({
      options: {
        currentValue: component.options,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true,
      },
    });

    expect(component.type).toBe('COLLAPSIBLE');
    expect(component.collasibleTree).toBe(collapsibleNode);
  });

  it('should return true for disabled when options.tree is disabled', () => {
    const collapsibleNode = new CollapsibleNode('Collapsible Node');
    collapsibleNode.disabled = true;
    component.options = { tree: collapsibleNode } as HierarchyOptions<any>;

    expect(component.disabled).toBeTruthy();
  });

  it('should return false for disabled when options.tree is not disabled', () => {
    const collapsibleNode = new CollapsibleNode('Collapsible Node');
    collapsibleNode.disabled = false;
    component.options = { tree: collapsibleNode } as HierarchyOptions<any>;

    expect(component.disabled).toBeFalsy();
  });
});
