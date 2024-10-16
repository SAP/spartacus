import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HierarchyNodeComponent } from './hierarchy-node.component';
import { CollapsibleNode } from '../hierarchy-node-collapsible/collapsible-node.model';
import { TitleNode } from '../hierarchy-node-title/title-node.model';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { TemplateRef } from '@angular/core';

describe('HierarchyNodeComponent', () => {
  let component: HierarchyNodeComponent<any>;
  let fixture: ComponentFixture<HierarchyNodeComponent<any>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HierarchyNodeComponent],
      providers: [
        {
          provide: ActiveCartFacade,
          useValue: {}, // mock the ActiveCartFacade
        },
        {
          provide: TemplateRef,
          useValue: {}, // mock the TemplateRef
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HierarchyNodeComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set type to TITLE when tree is an instance of TitleNode', () => {
    const titleNode = new TitleNode('Title Node');
    component.tree = titleNode;

    component.ngOnInit();

    expect(component.type).toBe('TITLE');
  });

  it('should set type to COLLAPSIBLE when tree is an instance of CollapsibleNode', () => {
    const collapsibleNode = new CollapsibleNode('Collapsible Node');
    component.tree = collapsibleNode;

    component.ngOnInit();

    expect(component.type).toBe('COLLAPSIBLE');
    expect(component.collasibleTree).toBe(collapsibleNode); // Ensure collapsibleTree is set correctly
  });

  it('should handle ngOnChanges when tree input changes', () => {
    const titleNode = new TitleNode('Another Title Node');
    component.tree = titleNode;

    component.ngOnChanges({
      tree: {
        currentValue: titleNode,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true,
      },
    });

    expect(component.type).toBe('TITLE');
  });

  it('should set type to COLLAPSIBLE on ngOnChanges for CollapsibleNode', () => {
    const collapsibleNode = new CollapsibleNode('Another Collapsible Node');
    component.tree = collapsibleNode;

    component.ngOnChanges({
      tree: {
        currentValue: collapsibleNode,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true,
      },
    });

    expect(component.type).toBe('COLLAPSIBLE');
    expect(component.collasibleTree).toBe(collapsibleNode);
  });

  it('should return true for disabled when tree is disabled', () => {
    const collapsibleNode = new CollapsibleNode('Collapsible Node');
    collapsibleNode.disabled = true; // Simulate the disabled state
    component.tree = collapsibleNode;

    expect(component.disabled).toBeTruthy();
  });

  it('should return false for disabled when tree is not disabled', () => {
    const collapsibleNode = new CollapsibleNode('Collapsible Node');
    collapsibleNode.disabled = false; // Simulate the enabled state
    component.tree = collapsibleNode;

    expect(component.disabled).toBeFalsy();
  });
});
