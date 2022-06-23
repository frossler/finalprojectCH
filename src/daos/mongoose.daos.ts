import { MongoDB } from '../contenedores/MongoDB';
import { Cart } from '../models/Cart';
import { Product } from '../models/Product';
import { ICart } from '../types/cart';
import { IProduct } from '../types/product';

export class CartDao extends MongoDB<ICart> {
  constructor() {
    super(Cart);
  }

  async createCart(): Promise<string | void> {
    try {
      const cart = await this.create({ products: [], timestamp: Date.now() });

      return cart?.id;
    } catch (err) {
      console.log(err);
    }
  }

  async addProductToCart(cartId: string, productId: string) {
    try {
      return this.model
        .updateOne(
          {
            _id: cartId,
          },
          {
            $push: {
              products: productId,
            },
          }
        )
        .exec();
    } catch (err) {
      console.log(err);
    }
  }

  async deleteProductFromCart(cartId: string, productId: string) {
    try {
      return this.model
        .updateOne(
          {
            _id: cartId,
          },
          {
            $pull: {
              products: productId,
            },
          }
        )
        .exec();
    } catch (err) {
      console.log(err);
    }
  }
}

export class ProductDao extends MongoDB<IProduct> {
  constructor() {
    super(Product);
  }
}
