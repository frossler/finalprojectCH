import { Firestore } from '../contenedores/Firestore';
import { ICart } from '../types/cart';
import { IProduct } from '../types/product';

export class CartDao extends Firestore {
  constructor() {
    super('carts');
  }

  async createCart(): Promise<string | void> {
    try {
      const cart = await this.create({ products: [], timestamp: Date.now()});

      return cart?.id;
    } catch (err) {
      console.log(err);
    }
  }

  async addProductToCart(cartId: string, productId: string) {
    try {
      const updated = await this.collection.doc(cartId).update({
        products: this.firestore.FieldValue.arrayUnion(productId),
      });

      return updated;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteProductFromCart(cartId: string, productId: string) {
    try {
      const deleted = await this.collection.doc(cartId).update({
        products: this.firestore.FieldValue.arrayRemove(productId),
      });

      return deleted;
    } catch (err) {
      console.log(err);
    }
  }
}

export class ProductDao extends Firestore {
  constructor() {
    super('products');
  }
}

