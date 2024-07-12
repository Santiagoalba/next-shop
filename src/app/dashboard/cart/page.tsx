import { cookies } from "next/headers";
import { products } from "../products/data";
import { ItemCard } from "@/app/components/products/ItemCard";
import { WidgetItem } from "@/app/components/ui/WidgetItem";

export const metadata = {
 title: 'Cart Page',
 description: 'Cart Page',
};

const getCartItems = (cart: { [id: string]: number }) => {
    const productList = [] as object[];
    Object.keys(cart).forEach((item) => {
        const product = products.find(prod => prod.id === item);
        if (product) {
          productList.push(product);
        }
    });

    return productList;
}

export default function CartPage() {

    const cookiesStore = cookies();
    const cart = JSON.parse(cookiesStore.get('cart')?.value ?? '{}');
    const cartItems = getCartItems(cart);


    console.log('cart', cartItems, 'items')

    const sum = cartItems.reduce((total, item) => {
      return total + (item.price * cart[item.id]);
    }, 0);

  return (
    <div>
      <h1 className="text-5xl">Productos en el carrito</h1>
      <hr className="mb-2"/>

      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex flex-col gap-2 w-full sm:w-8/12">
            {
                cartItems.map((product) => {
                    let id = product.id;
                    return <ItemCard key={id} product={product} quantity={cart[id]}/>
                })
            }
        </div>

        <div className="flex flex-col w-full sm:w-4/12">
            <WidgetItem title='Final Price'>
              <div className="mt-2 flex flex-col justify-center gap-4">
                <h3 className="text-3xl font-bold text-gray-700">{ sum }</h3>
                <span className="font-bold text-gray-500 text-center">Impuestos</span>
              </div>
            </WidgetItem>
        </div>
      </div>
    </div>
  );
}