// ! The schema files are used for set the data structure in mongo db.

import { Schema } from 'mongoose';

export const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imgURL: { type: String, required: true },
  price: { type: Number, required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
