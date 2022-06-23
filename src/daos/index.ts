import { CartDao, ProductDao } from './firestore.daos.js';

export let Product: ProductDao;

export let Cart: CartDao;

let path = 'firestore';

// Aca iria la variable de entorno para definir que base de datos usar
if ('something' === 'something') {
  path = 'mongoose';
}
(() => {
  const res = import(`./${path}.daos`).then(({ CartDao, ProductDao }) => {
    Cart = new CartDao();
    Product = new ProductDao();
  });

  return res;
})();


