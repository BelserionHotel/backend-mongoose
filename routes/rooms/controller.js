const { Rooms, ReservationRooms } = require("../../models");
const objectId = require("mongodb").ObjectId;

module.exports = {
  getAll: async (req, res) => {
    try {
      const result = await Rooms.find().populate("RoomType_id");

      res.status(200).json({ message: "Show data Rooms", data: result });
    } catch (error) {
      console.log(error);
    }
  },
  addOne: async (req, res) => {
    try {
      const result = await Rooms.create(req.body);

      res.status(200).json({ message: "Add new Rooms", data: result });
      console.log(result);
    } catch (error) {
      res.send({ msg: "error create roles" });
      console.log(error);
    }
  },
  getById: async (req, res) => {
    try {
      const result = await Rooms.find({ _id: req.params.id }).populate(
        "RoomType_id"
      );

      res.status(200).json({ message: "Show all Rooms by id", data: result });
    } catch (error) {
      console.log(error);
    }
  },
  deleteOne: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await Rooms.remove({ _id: objectId(id) });

      res.status(200).json({
        message: `Data succesfully delete with id ${id}`,
        data: result
      });
    } catch (error) {
      console.log(error);
    }
  },
  deleteAllRooms: async (req, res) => {
    try {
      const result = await Rooms.remove();
      res.status(200).json({
        message: "Data Successfully delete",
        data: result
      });
    } catch (error) {
      console.log(error);
    }
  },
  updateOne: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await Rooms.update(
        { _id: objectId(id) },
        { $set: req.body }
      );

      res.status(200).json({
        message: `Data succesfully update with id ${id}`,
        data: result
      });
    } catch (error) {
      console.log(error);
    }
  },
  sortByRoomNumbers: async (req, res) => {},
  getByAvailable:async(req,res)=>{
    const RoomType = res.locals.RoomType_id
    Rooms.where({availability : 'Available'})
    .populate('RoomType_id')
    .exec(function(err,foundAvailable){
      
    if (err) {
      return res.status(422).send(err);
    }

    return res.json(foundAvailable);
    })
  }
};
