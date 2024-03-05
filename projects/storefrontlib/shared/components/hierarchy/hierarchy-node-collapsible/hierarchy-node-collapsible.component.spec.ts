/**
 * 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';

import { CollapsibleNode } from './collapsible-node.model';
import { HierarchyNodeCollapsibleComponent } from './hierarchy-node-collapsible.component';

@Pipe({ name: 'cxTranslate' })
class MockTranslatePipe implements PipeTransform {
  transform(): any {}
}

describe('HierarchyNodeCollapsibleComponent', () => {
  let component: HierarchyNodeCollapsibleComponent<void>;
  let fixture: ComponentFixture<HierarchyNodeCollapsibleComponent<void>>;

  const mockCollapsibleNode = new CollapsibleNode<void>('L1 CollapsibleNode');

  beforeEach(
    waitForAsync(() => {
      TestBed.overrideComponent(HierarchyNodeCollapsibleComponent, {
        set: {
          providers: [],
        },
      })
        .configureTestingModule({
          declarations: [HierarchyNodeCollapsibleComponent, MockTranslatePipe],
          providers: [],
          schemas: [NO_ERRORS_SCHEMA],
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent<HierarchyNodeCollapsibleComponent<void>>(
      HierarchyNodeCollapsibleComponent
    );
    component = fixture.componentInstance;

    component.tree = mockCollapsibleNode;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle state of tree', () => {
    const oldValue = mockCollapsibleNode.open;

    component.toggle();

    expect(mockCollapsibleNode.open).toBe(!oldValue);
  });

  it('should reflect open state of tree', () => {
    expect(component.open).toBe(mockCollapsibleNode.open);

    component.toggle();

    expect(component.open).toBe(mockCollapsibleNode.open);
  });
});
