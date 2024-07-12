"use server";

import { cookies } from 'next/headers';

interface Cookie {
    [id: string]: number
}


export const handleAddToCart = (id: string): Cookie => {
  const cookieStore = cookies();
  const cartItems = cookieStore.get('cart');

  function updateObject(obj: Cookie, newItemId: string) {
      if (obj.hasOwnProperty(newItemId)) {
        obj[newItemId] += 1; // Si el id existe, suma 1 a la cantidad
      } else {
        obj[newItemId] = 1; // Si el id no existe, agrega el nuevo id con cantidad 1
      }
    }
  
  if (!cartItems) {
      console.log('abc')
      const newCart = {[id]: 1};
      cookies().set('cart', JSON.stringify(newCart));
      return newCart;
  } else {
      const cartValues = JSON.parse(cartItems?.value || '');
      updateObject(cartValues, id)
      cookies().set('cart', JSON.stringify(cartValues));
  }

  return {}
}

export const deleteFromCart = (id: string) => {
  const cookieStore = cookies();
  const cartItems = JSON.parse( cookieStore.get('cart')?.value ?? '{}' );
  delete cartItems[id];
  cookies().set('cart', JSON.stringify(cartItems));
}

export const removeSingleItemFromCart = (id: string) => {
  const cookieStore = cookies();
  const cartItems = JSON.parse( cookieStore.get('cart')?.value ?? '{}' );
  if (cartItems.hasOwnProperty(id)) {
    cartItems[id] === 1 ? (delete cartItems[id]) : cartItems[id] = cartItems[id] - 1;
    cookies().set('cart', JSON.stringify(cartItems));
    return cartItems;
  }
}