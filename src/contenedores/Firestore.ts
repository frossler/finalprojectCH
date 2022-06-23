import admin from 'firebase-admin';
import key from '../../firebase-key.json';

const serviceAccount = key as admin.ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export class Firestore {
  collection;
  firestore;
  db;

  constructor(collection: string) {
    this.firestore = admin.firestore;
    this.db = admin.firestore();
    this.collection = admin.firestore().collection(collection);
  }

  async getAll() {
    try {
      const snapshot = await this.collection.get();
      return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    } catch (err) {
      console.log(err);
    }
  }

  async getById(id: string) {
    try {
      const snapshot = await this.collection.doc(id).get();
      return {
        ...snapshot.data(),
        id: snapshot.id,
      };
    } catch (err) {
      console.log(err);
    }
  }

  create<T>(data: T) {
    try {
      return this.collection.add(data);
    } catch (err) {
      console.log(err);
    }
  }

  update<T>(id: string, data: T) {
    try {
      return this.collection.doc(id).update(data);
    } catch (err) {
      console.log(err);
    }
  }

  delete(id: string) {
    try {
      return this.collection.doc(id).delete();
    } catch (err) {
      console.log(err);
    }
  }

  async deleteAll() {
    try {
      const snapshot = await this.collection.get();

      if (snapshot.size === 0) {
        return;
      }

      const batch = this.db.batch();

      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
    } catch (err) {
      console.log(err);
    }
  }
}
