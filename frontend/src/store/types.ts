import { IProduct } from "types/product.interface";

export interface IItem {
  id: number;
  product: IProduct;
  quantity: number;
}

export interface initialState {
  items: IItem[];
}
