export interface Product {
  id: number;
  name: string;
  type: 1 | 2;
  category: string;
  subCategory: boolean;
  password: string;
  deliveryFeesCost?: number;
  deliveryFeesPercent?: number;
  referenceID?: number;
}
