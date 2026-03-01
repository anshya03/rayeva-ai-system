import mongoose from "mongoose";

const allowedCategories = [
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Beauty",
  "Food & Beverages",
  "Sports",
  "Books",
  "Toys"
];

const classificationSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true
    },

    primary_category: {
      type: String,
      required: true,
      enum: allowedCategories 
    },

    sub_category: {
      type: String,
      required: true,
      trim: true
    },

    seo_tags: {
      type: [String],
      required: true,
      validate: {
        validator: function (value) {
          return value.length >= 5 && value.length <= 10;
        },
        message: "SEO tags must be between 5 and 10"
      }
    },

    sustainability_tags: {
      type: [String],
      default: []
    },

    confidence_score: {
      type: Number,
      required: true,
      min: 0,
      max: 1
    }
  },
  {
    timestamps: true // automatically adds createdAt & updatedAt
  }
);

export const Classification = mongoose.model(
  "Classification",
  classificationSchema
);