const Joi = require("joi");
const mongoose = require("mongoose");


const rentalSchema = new mongoose.Schema({
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true
            },
            dailyRentalRate:{
                type: Number,
                default: false
            }
        }),
        required: true
    },
    customer: {
      type: new mongoose.Schema({
          name: {
              type: String,
              required: true
          },
          isGold:{
              type:Boolean,
              default: false
          },
          phone: String,
      }),
      required: true
    },
    price: {
      type: Number,
      default: 100,
      required: true
    },
    dateCreated: {
      type: Date,
      default: Date.now
    },
    dateOut: {
      type: Date,
      default: Date.now
    },
    dateReturned: {
      type: Date
    },
    rentalFee:{
        type: Number,
        default:0
    }
  });

  const Rental = mongoose.models.Rental || mongoose.model('Rental', rentalSchema);

  function validateRental(rental) {
    const schema = Joi.object({
      movieId: Joi.string().required(),
      customerId: Joi.string().required()
    });
  
    return schema.validate(rental);
  }

module.exports.Rental = Rental;
module.exports.validateRental = validateRental;
