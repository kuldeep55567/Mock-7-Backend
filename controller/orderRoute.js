const express = require("express");
const { orderModel } = require("../model/orderModel")
const orderRouter = express.Router();


orderRouter.post("/orders", async (req, res) => {
    const { user, restaurant, items, deliveryAddress } = req.body;
    const totalPrice = items.reduce((price, item) => price + item.price * item.quantity, 0);
    try {
        const newOrder = new orderModel({
            user: user,
            restaurant: restaurant,
            items: items,
            totalPrice: totalPrice,
            deliveryAddress: deliveryAddress,
        })
        await newOrder.save();
        return res.status(400).json({ "ok": true, "mssg": "Order Placed" })
    } catch (error) {
        return res.status(400).json({ "ok": false, "mssg": error.message })
    }
})
orderRouter.get("/orders/:id", async (req, res) => {
    const ids = req.params.id
    try {
        const data = await orderModel.findById(ids)
        return res.status(200).json({ "ok": true, data })
    } catch (error) {
        return res.status(400).json({ "ok": false, "mssg": error.message })
    }
})
orderRouter.patch("/orders/:id", async (req, res) => {
    const { status } = req.body
    const ids = req.params.id
    try {
        const data = await orderModel.findByIdAndUpdate(ids, { $set: { status: status } })
        return res.status(200).json({ "ok": true, data })
    } catch (error) {
        return res.status(400).json({ "ok": false, "mssg": error.message })
    }
})
module.exports = {
    orderRouter
}
