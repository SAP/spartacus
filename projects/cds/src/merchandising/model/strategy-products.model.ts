export interface StrategyProduct {
  id?: string;
  metadata?: { [metadataAttributeName: string]: string };
}

export interface Paged {
  from?: number;
  size?: number;
}

export interface StrategyProducts {
  resultCount?: number;
  products?: StrategyProduct[];
  paged?: Paged;
  metadata?: { [metadataAttributeName: string]: string };
}
