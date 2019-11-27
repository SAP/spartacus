export interface MerchandisingProduct {
  id?: string;
  name?: string;
  description?: string;
  brand?: string;
  pageUrl?: string;
  thumbNailImage?: string;
  mainImage?: string;
  price?: number;
  metadata?: { [metadataAttributeName: string]: string };
}

export interface Paged {
  from?: number;
  size?: number;
}

export interface StrategyResult {
  resultCount?: number;
  products?: MerchandisingProduct[];
  paged?: Paged;
  metadata?: { [metadataAttributeName: string]: string };
}
