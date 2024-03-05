/**
 * 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CollapsibleNode } from '../hierarchy-node-collapsible/collapsible-node.model';
import { HierarchyNode } from './hierarchy-node.model';
import { TitleNode } from '../hierarchy-node-title/title-node.model';
import { HierarchyNodeComponent } from './hierarchy-node.component';

describe('HierarchyNodeComponent', () => {
  let component: HierarchyNodeComponent<void>;
  let fixture: ComponentFixture<HierarchyNodeComponent<void>>;

  beforeEach(
    waitForAsync(() => {
      TestBed.overrideComponent(HierarchyNodeComponent, {
        set: {
          providers: [],
        },
      })
        .configureTestingModule({
          declarations: [HierarchyNodeComponent],
          providers: [],
          schemas: [NO_ERRORS_SCHEMA],
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent<HierarchyNodeComponent<void>>(
      HierarchyNodeComponent
    );
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add childPadding and paddingPrefix to generate childPaddingLeft', () => {
    component.paddingPrefix = 100;
    component.childPadding = 25;

    expect(component.childPaddingLeft).toBe(125);
  });

  it("should expose tree node's disabled status", () => {
    const mockNode = new HierarchyNode('root');
    component.tree = mockNode;

    expect(component.disabled).toBe(mockNode.disabled);

    mockNode.disabled = true;

    expect(component.disabled).toBe(mockNode.disabled);
  });

  describe('seting the type on init', () => {
    it('should set NODE for CollapsibleNode', () => {
      component.tree = new CollapsibleNode();

      component.ngOnInit();

      expect(component.type).toEqual('COLLAPSIBLE');
    });

    it('should set NODE for TitleNode', () => {
      component.tree = new TitleNode();

      component.ngOnInit();

      expect(component.type).toEqual('TITLE');
    });
  });
});
