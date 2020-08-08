// get an instance of mongoose and mongoose.Schema
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Area = require('./Classes/Area');

let CarleaseSchema = Schema({
    userId: {type: Schema.Types.Number},
    contact: {option: String, value: String},
    area: Area,
    startFrom: Date,
    term: Number,
    endDate: Date,
    km_consumed: Number,
    km_per_year: Number,
    monthlyPayment: Number,
    price: Number,
    paid: Number,
    wanted: Number,
    title: String,
    detail_description: String,
    features: [String], // ['Navigation System', 'Leather Interior', 'Leatherette Interior', 'Rear View Camera', 'Heated Seats']
    buyBack: Number,

    // check box group
    return_insurance: Boolean,
    had_accident: Boolean,
    tire_insurance: Boolean,
    have_scratch: Boolean,
    have_deposit: Boolean,
    status: {type: String, default: 'active'},
    view: {type: Number, default: 0},
    makes: String,
    model: String,
    type: String, // suv, sedan
    drive_type: String,  // AWD, FWD, BWD - (optional)
    power_system: String, // gasoline, diesel, electric, hybrid - (optional)
    isDealersCar: Boolean,
    company_info: String,
    images: [{url: String}],
    created: {type: Date, default: Date.now},
    modified: {type: Date, default: Date.now},
    modifiedBy: {type: Schema.Types.Number},
});


module.exports = mongoose.model("Carlease", CarleaseSchema);

