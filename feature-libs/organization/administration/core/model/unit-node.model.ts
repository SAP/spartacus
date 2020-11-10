export interface B2BUnitNode {
  active?: boolean;
  children?: B2BUnitNode[];
  id?: string;
  name?: string;
  parent?: string;
}

export interface B2BUnitTreeNode extends B2BUnitNode {
  expanded: boolean;
  depthLevel: number;
  count: number;
  // consider dropping, as this overlaps the `B2BUnitNode.id`
  uid: string;
}
