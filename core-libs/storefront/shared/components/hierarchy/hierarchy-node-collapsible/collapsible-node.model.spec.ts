import { CollapsibleNode } from './collapsible-node.model';

describe('CollapsibleNode', () => {
  it('should set open to false by default', () => {
    const node = new CollapsibleNode('Test Node');
    expect(node.open).toBe(false);
  });

  it('should set open to true when passed as argument', () => {
    const node = new CollapsibleNode('Test Node', { open: true });
    expect(node.open).toBe(true);
  });

  it('should merge defaultHierarchyNodeArgs correctly', () => {
    const node = new CollapsibleNode('Test Node', {
      children: [new CollapsibleNode('Child Node')],
    });
    expect(node.children.length).toBe(1);
  });

  it('should set name correctly when constructed', () => {
    const node = new CollapsibleNode('New Node');
    expect(node.name).toBe('New Node');
  });
});
