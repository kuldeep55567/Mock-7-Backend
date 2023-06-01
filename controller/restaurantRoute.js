const express = require("express");
const { restaurantModel } = require("../model/restaurantModel")
const restaurantRouter = express.Router()

restaurantRouter.get("/restaurants", async (req, res) => {
    try {
        const data = await restaurantModel.find();
        res.status(200).json(data)
    } catch (error) {
        return res.status(400).json({ "ok": false, "mssg": error.message })
    }
})
restaurantRouter.get("/restaurants/:id", async (req, res) => {
    const ids = req.params.id
    try {
        const data = await restaurantModel.findById(ids);
        res.status(200).json(data)
    } catch (error) {
        return res.status(400).json({ "ok": false, "mssg": error.message })
    }
})
restaurantRouter.get("/restaurants/:id/menu", async (req, res) => {
    const ids = req.params.id
    try {
        const data = await restaurantModel.findById(ids);
        res.status(200).json(data.menu)
    } catch (error) {
        return res.status(400).json({ "ok": false, "mssg": error.message })
    }
})
restaurantRouter.post("/restaurants", async (req, res) => {
    try {
        const data = new restaurantModel(req.body)
        await data.save()
        return res.status(201).json({ "ok": true, "mssg": "Restaurant added Successfully" })
    } catch (error) {
        return res.status(400).json({ "ok": false, "mssg": error.message })
    }
})
restaurantRouter.post("/restaurants/:id/menu", async (req, res) => {
    const ids = req.params.id
    const {name,description,price,image} = req.body
    try {
     const newMenu = {
        name:name,
        price:price,
        description:description,
        image:image
     }
     let add = await restaurantModel.findByIdAndUpdate(ids,{$push:{menu:newMenu}},{new:true})
     return res.status(200).json({ "ok": false, add })
    } catch (error) {
        return res.status(400).json({ "ok": false, "mssg": error.message })
    }
})
restaurantRouter.delete("/restaurants/:resid/menu/:menuid", async (req, res) => {
    const resID = req.params.resid
    const menuID = req.params.menuid
    try {
        const data = await restaurantModel.findById(resID)
        if(data){
          const deleted =   await restaurantModel.findByIdAndDelete(menuID)

        }
        return res.status(201).json({ "ok": true, "mssg": "Menu Deleted Successfully" })
    } catch (error) {
        return res.status(400).json({ "ok": false, "mssg": error.message })
    }
})
module.exports = {
    restaurantRouter
}
// {
//     "name":"Spring Roll",
//     "descripiton":"Roll with veggies fillings",
//     "price":110,
//     "image":"Not Available"
//     }