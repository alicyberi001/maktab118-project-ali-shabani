// /app/api/cart/route.ts
// import { Product } from "@/lib/zustand/cart.store";
// import { NextResponse } from "next/server";

// let cart: Product[] = [];

// export async function GET() {
//   return NextResponse.json(cart);
// }

// export async function POST(req: Request) {
//   const product: Product = await req.json();
//   const existingProduct = cart.find((item) => item._id === product._id);

//   if (existingProduct) {
//     existingProduct.quantity += product.quantity || 1;
//   } else {
//     cart.push({ ...product, quantity: product.quantity || 1 });
//   }

//   return NextResponse.json(cart);
// }

// export async function PUT(req: Request) {
//   const { id, quantity }: { id: string; quantity: number } = await req.json();

//   cart = cart.map((item) =>
//     item._id === id ? { ...item, quantity } : item
//   ).filter((item) => item.quantity > 0);

//   return NextResponse.json(cart);
// }

// export async function DELETE() {
//   cart = [];
//   return NextResponse.json(cart);
// }





import { NextResponse } from "next/server";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string[];
  description: string;
}

interface UserCart {
  userId: string;
  cart: CartItem[];
}

const carts: UserCart[] = [];
let guestCart: CartItem[] = []; 

export async function GET(req: Request) {
  const userId = req.headers.get("user-id");
  
  if (userId) {
    const userCart = carts.find((cart) => cart.userId === userId);
    return NextResponse.json(userCart ? userCart.cart : []);
  }

  return NextResponse.json(guestCart);
}

export async function POST(req: Request) {
  const userId = req.headers.get("user-id");
  const cartItem: CartItem = await req.json();

  if (userId) {
    let userCart = carts.find((cart) => cart.userId === userId);
    if (!userCart) {
      userCart = { userId, cart: [] };
      carts.push(userCart);
    }

    const existingItem = userCart.cart.find((item) => item._id === cartItem._id);
    if (existingItem) {
      existingItem.quantity += cartItem.quantity || 1;
    } else {
      userCart.cart.push({ ...cartItem, quantity: cartItem.quantity || 1 });
    }

    return NextResponse.json(userCart.cart);
  }

  const existingGuestItem = guestCart.find((item) => item._id === cartItem._id);
  if (existingGuestItem) {
    existingGuestItem.quantity += cartItem.quantity || 1;
  } else {
    guestCart.push({ ...cartItem, quantity: cartItem.quantity || 1 });
  }

  return NextResponse.json(guestCart);
}

export async function PUT(req: Request) {
  const userId = req.headers.get("user-id");
  const { id, quantity }: { id: string; quantity: number } = await req.json();

  if (userId) {
    const userCart = carts.find((cart) => cart.userId === userId);
    if (userCart) {
      userCart.cart = userCart.cart
        .map((item) => (item._id === id ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0);
    }

    return NextResponse.json(userCart?.cart || []);
  }

  guestCart = guestCart
    .map((item) => (item._id === id ? { ...item, quantity } : item))
    .filter((item) => item.quantity > 0);

  return NextResponse.json(guestCart);
}

export async function DELETE(req: Request) {
  const userId = req.headers.get("user-id");

  if (userId) {
    const userCart = carts.find((cart) => cart.userId === userId);
    if (userCart) {
      userCart.cart = [];
    }

    return NextResponse.json([]);
  }

  guestCart = [];
  return NextResponse.json([]);
}
