export interface AsmCustomer360Review {
  productName: string;
  productCode: string;
  createdAt: string;
  updatedAt: string;
  rating: string;
  reviewStatus: string;
  reviewText: string;
}

export interface AsmCustomer360ReviewList {
  reviews: Array<AsmCustomer360Review>;
}

export interface AsmCustomer360StoreLocation {
  address: string;
}
