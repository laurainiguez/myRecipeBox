const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
    trim: true,
    minlength: [1, 'Name must have more than 1 character'],
  },
  ingredients: {
    // type: [
    //   {
    //     type: Schema.ObjectId,
    //     ref: 'Ingredient',
    //   },
    // ],
    type: [
      {
        name: {
          type: String,
          required: [true, 'Name of ingredient is required'],
        },
        unit: {
          type: String,
          required: [true, 'Unit of ingredient is required'],
        },
        amount: {
          type: Number,
          required: [true, 'Amount of ingredient is required'],
        },
      },
    ],
    required: [true, 'Ingredients are required'],
  },
  directions: {
    type: [String],
    required: [true, 'Directions are required'],
  },
  calendarDate: {
    type: String
  },
  courses: {
    type: [String],
  },
  categories: {
    type: [String],
  },
  nutrition: {
    type: [String],
  },
  photos: {
    type: [String],
  },
  servingSize: {
    type: String,
  },
  prepTime: {
    type: Number,
  },
  cookTime: {
    type: Number,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

//Query middleware
RecipeSchema.pre(/^find/, function (next) {
  //   this.populate({
  //     path: 'ingredients',
  //     select: '-__v',
  //   });
  this.select('-__v');

  next();
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;
