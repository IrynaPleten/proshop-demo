import asyncHandler from '../middleware/asyncHandler.js'
import Order from '../models/orderModel.js'

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItem = asyncHandler(async (req, res) => {
  res.send('add order items')
})

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  res.send('get my orders')
})

// @desc    Create order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  res.send('get order by id')
})

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send('update order to paid')
})

// @desc    Create order to deliver
// @route   PUT /api/orders/:id/deliver
// @access  Private
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send('update order to delivered')
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  res.send('get all orders')
})

export { 
	addOrderItem,
	 getMyOrders, 
	 getOrderById, 
	 updateOrderToPaid,
	 updateOrderToDelivered,
	 getOrders 
	}