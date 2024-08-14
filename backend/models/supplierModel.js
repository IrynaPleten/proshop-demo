import mongoose from 'mongoose';

const supplierSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dateOfStart: {
      type: Date,
    },
    country: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  })

	const Supplier = mongoose.model('Supplier', supplierSchema);

	export default Supplier;