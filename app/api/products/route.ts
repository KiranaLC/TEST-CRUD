import connectToDatabase from '../../../utils/mongodb';
import Product from '../../../models/products.model';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest) {
  await connectToDatabase();

  try {
    const products = await Product.find({}).lean();        
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const { name, price, description, image } = await req.json();

  try {
    const product = new Product({ name, price, description, image });
    await product.save();
    return NextResponse.json(product.toObject(), { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

