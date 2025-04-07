import Order from '../models/orderModel.js';

// @desc     Create new order
// @method   POST
// @endpoint /api/v1/orders
// @access   Private
const addOrderItems = async (req, res, next) => {
  try {
    const {
      cartItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: 'No order items provided.' });
    }

    const order = new Order({
      user: req.user._id,
      orderItems: cartItems.map((item) => ({
        ...item,
        product: item._id,
      })),
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    next(error);
  }
};

// @desc     Get logged-in user orders
// @method   GET
// @endpoint /api/v1/orders/my-orders
// @access   Private
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for the logged-in user.' });
    }

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

// @desc     Get order by ID
// @method   GET
// @endpoint /api/v1/orders/:id
// @access   Private
const getOrderById = async (req, res, next) => {
  try {
    const { id: orderId } = req.params;

    const order = await Order.findById(orderId).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found!' });
    }

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

// @desc     Update order to paid
// @method   PUT
// @endpoint /api/v1/orders/:id/pay
// @access   Private
const updateOrderToPaid = async (req, res, next) => {
  try {
    const { id: orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found!' });
    }

    order.isPaid = true;
    order.paidAt = new Date();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.updateTime,
      email_address: req.body.email,
    };

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

// @desc     Update order to delivered
// @method   PUT
// @endpoint /api/v1/orders/:id/deliver
// @access   Private/Admin
const updateOrderToDeliver = async (req, res, next) => {
  try {
    const { id: orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found!' });
    }

    order.isDelivered = true;
    order.deliveredAt = new Date();

    const updatedDeliver = await order.save();
    res.status(200).json(updatedDeliver);
  } catch (error) {
    next(error);
  }
};

// @desc     Get all orders
// @method   GET
// @endpoint /api/v1/orders
// @access   Private/Admin
const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate('user', 'id name');

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found!' });
    }

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDeliver,
  getOrders,
};
