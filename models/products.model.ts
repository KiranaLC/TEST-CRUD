import mongoose, { Document, Model, Schema } from 'mongoose';
import {IProduct} from '../interface/product'


interface ProductDocument extends IProduct, Document {}

const ProductSchema: Schema<ProductDocument> = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

// Check if the model is already defined
const Products: Model<ProductDocument> = mongoose.models.Products || mongoose.model<ProductDocument>('Products', ProductSchema);

export default Products;


