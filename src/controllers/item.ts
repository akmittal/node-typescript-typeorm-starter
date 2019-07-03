import { Request, Response } from "express";
import { Item } from "./../models/item";

export const getitemList = async (req: Request, res: Response) => {
  try {
    const { sortColumn = "name", skip=0, take=10} = req.query;
    console.log({sortColumn})
    const items = await Item.find({skip, take, order:{[sortColumn]:"ASC"}});
    res.json(items);
  } catch (e) {
    res.json({ error: e });
  }
};

export const getitem = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const item = await Item.findOne({ where: { name } });
    res.json(item);
  } catch (e) {
    res.json({ error: e });
  }
};

export const postitem = async (req: Request, res: Response) => {
  try {
    const { name, price, quantity, total, brand } = req.body;
    const newitem = new Item();
    newitem.name = name;
    newitem.price = price;
    newitem.quantity = quantity;
    newitem.total = total;
    newitem.brand = brand;
    const item = await newitem.save();
    res.json(item);
  } catch (e) {
    res.json({ error: e });
  }
};
