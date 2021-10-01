import { Request, Response } from "express";
import { Order } from "./../models/order";
type ReqQuery = { sortColumn : string, skip: number, take: number }

export const getorderList = async (req: Request<any, any, any, ReqQuery>, res: Response) => {
  try {
    const { sortColumn = "id", skip=0, take=10} = req.query;
    console.log({sortColumn})
    const orders = await Order.find({skip, take, order:{[sortColumn]:"ASC"}});
    res.json(orders);
  } catch (e) {
    res.json({ error: e.toString() });
  }
};

export const getorder = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const order = await Order.findOne({ where: { name } });
    res.json(order);
  } catch (e) {
    res.json({ error: e });
  }
};

export const postorder = async (req: Request, res: Response) => {
  try {
    const { customerID, ItemID, quantity,inVoiceNumber, amount  } = req.body;
    const neworder = new Order();
    neworder.customerID = customerID;
    neworder.ItemID = ItemID;
    neworder.quantity = quantity;
    neworder.inVoiceNumber = inVoiceNumber;
    neworder.amount = amount;
    const order = await neworder.save();
    res.json(order);
  } catch (e) {
    res.json({ error: e });
  }
};
