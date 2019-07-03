import { Request, Response } from "express";
import { Customer } from "./../models/customer";

export const getCustomerList = async (req: Request, res: Response) => {
  try {
    const { sortColumn = "name", skip=0, take=10} = req.query;
    console.log({sortColumn})
    const stocks = await Customer.find({skip, take, order:{[sortColumn]:"ASC"}});
    res.json(stocks);
  } catch (e) {
    res.json({ error: e });
  }
};

export const getCustomer = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const stock = await Customer.findOne({ where: { name } });
    res.json(stock);
  } catch (e) {
    res.json({ error: e });
  }
};

export const postCustomer = async (req: Request, res: Response) => {
  try {
    const { name, address, contact } = req.body;
    const newStock = new Customer();
    newStock.name = name;
    newStock.address = address;
    newStock.contact = contact;
    const stock = await newStock.save();
    res.json(stock);
  } catch (e) {
    res.json({ error: e });
  }
};
