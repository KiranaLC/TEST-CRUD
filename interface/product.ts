// interface/product.ts

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface ProductCardProps extends Product {
  onDelete: (_id: string) => void;
  modifyDialog:(_id:string)=>void;
}

export interface IProduct {
  name: string;
  price: number;
  description: string;
  image: string;
}

export default Product;
