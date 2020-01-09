export interface B2BUnitNode {
  active?: boolean;
  children?: Array<B2BUnitNode>;
  id?: string;
  name?: string;
  parent?: string;
}
export interface B2BUnitNodeList {
  unitNodes?: Array<B2BUnitNode>;
}
