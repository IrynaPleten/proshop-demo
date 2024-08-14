import asyncHandler from '../middleware/asyncHandler.js';
import Supplier from '../models/supplierModel.js';

// @desc    Get all suppliers
// @route   GET /api/suppliers
// @access  Public
const getSuppliers = asyncHandler(async (req, res) => {
  const suppliers = await Supplier.find({});
  res.json(suppliers);
});

// @desc    Fetch single supplier
// @route   GET /api/suppliers/:id
// @access  Public
const getSupplierById = asyncHandler(async (req, res) => {
  // NOTE: checking for valid ObjectId to prevent CastError moved to separate
  // middleware. See README for more info.

  const supplier = await Supplier.findById(req.params.id);
  if (supplier) {
    return res.json(supplier);
  } else {
    // NOTE: this will run if a valid ObjectId but no product was found
    // i.e. product may be null
    res.status(404);
    throw new Error('Supplier not found');
  }
});

// @desc    Create a supplier
// @route   POST /api/suppliers
// @access  Private/Admin
const createSupplier = asyncHandler(async (req, res) => {
  const supplier = new Supplier({
    name: 'Sample name',
    dateOfStart: 0,
    description: 'Sample description',
    country: 'Sample'
  });

  const createdSupplier = await supplier.save();
  res.status(201).json(createdSupplier);
});

// @desc    Update a supplier
// @route   PUT /api/suppliers/:id
// @access  Private/Admin
const updateSupplier = asyncHandler(async (req, res) => {
  const { name, description, dateOfStart, country} =
    req.body;

  const supplier = await Supplier.findById(req.params.id);

  if (supplier) {
    supplier.name = name;
    supplier.description = description;
    supplier.dateOfStart = dateOfStart;
    supplier.country = country;

    const updatedSupplier = await supplier.save();
    res.json(updatedSupplier);
  } else {
    res.status(404);
    throw new Error('Supplier not found');
  }
});

// @desc    Delete a supplier
// @route   DELETE /api/suppliers/:id
// @access  Private/Admin
const deleteSupplier = asyncHandler(async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);

  if (supplier) {
    await Supplier.deleteOne({ _id: supplier._id });
    res.json({ message: 'Supplier removed' });
  } else {
    res.status(404);
    throw new Error('Supplier not found');
  }
});

export {
  getSuppliers,
  getSupplierById,
	createSupplier,
  deleteSupplier,
  updateSupplier,
};
