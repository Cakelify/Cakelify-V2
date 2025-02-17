import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
      maxlength: [200, "Product name cannot exceed 200 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please enter product price"],
      maxlength: [5, "Product price cannot exceed 5 digits"],
    },
    discount: {
      type: String,
    },
    beforePrice: {
      type: Number,
    },
    cakeFlavour: {
      type: String,
      required: [true, "Please enter product flavour"],
    },

    cakeShape: {
      type: String,
      required: [true, "Please enter product Shape"],
    },
    typeOfCake: {
      type: String,
      required: [true, "Please enter product type"],
    },
    cakeSponge: {
      type: String,
      required: [true, "Please enter cake Sponge Type"],
    },
    typeOfCream: {
      type: String,
      required: [true, "Please enter cream type"],
    },
    cakeFilling: {
      type: String,
      required: [true, "Please enter product filling"],
    },
    cakeToppings: {
      type: String,
      required: [true, "Please enter product topping"],
    },

    ratings: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, "Please enter product category"],
      enum: {
        values: [
          "NullValue",
          "JarCake",
          "Pastry",
          "CupCake",
          "Annniversary",
          "Birthday",
          "Wedding",
          "Pineapple",
          "Butterscotch",
          "Chocolate",
          "Redvelvet",
          "Strawberry",
          "Blackforest",
          "PopularDelight",
          "Decoration",
        ],
        message: "Please select correct category",
      },
    },
    stock: {
      type: Number,
      required: [true, "Please enter product stock"],
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
