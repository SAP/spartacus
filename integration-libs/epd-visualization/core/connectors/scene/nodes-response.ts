export interface NodesResponse {
  nodes?: TreeNode[];
}

export interface TreeNode {
  sid: string;
  metadata?: Metadatum[];
}

export enum MetadatumValueType {
  string = 'string',
  integer = 'integer',
  float = 'float',
  date = 'date',
  blob = 'blob',
  string_array = 'string_array',
}

export interface Metadatum {
  source: string;
  category: string;
  tag: string;
  value: string;
  valueType: MetadatumValueType;
}
