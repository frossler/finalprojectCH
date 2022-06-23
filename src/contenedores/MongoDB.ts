import mongoose from 'mongoose';

export class MongoDB<T> {
  model;

  constructor(model: mongoose.Model<T>) {
    this.model = model;
  }

  async getAll() {
    try {
      return this.model.find();
    } catch (err) {
      console.log(err);
    }
  }

  getById(id: string) {
    try {
      return this.model.findOne({ _id: id });
    } catch (err) {
      console.log(err);
    }
  }

  create(data: any) {
    try {
      return this.model.create(data);
    } catch (err) {
      console.log(err);
    }
  }

  update(id: string, data: any) {
    try {
      return this.model.updateOne({ _id: id }, { $set: data });
    } catch (err) {
      console.log(err);
    }
  }

  delete(id: string) {
    try {
      return this.model.deleteOne({ _id: id });
    } catch (err) {
      console.log(err);
    }
  }

  deleteAll() {
    try {
      return this.model.deleteMany();
    } catch (err) {
      console.log(err);
    }
  }
}
