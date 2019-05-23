import { Request, Response } from "express";
import { Stock } from "./../models/stock";

export const getStockList = async (req: Request, res: Response) => {
  try {
    const { sortColumn = "name", skip=0, take=10} = req.query;
    console.log({sortColumn})
    const stocks = await Stock.find({skip, take, order:{[sortColumn]:"ASC"}});
    res.json(stocks);
  } catch (e) {
    res.json({ error: e });
  }
};

export const getStock = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const stock = await Stock.findOne({ where: { name } });
    res.json(stock);
  } catch (e) {
    res.json({ error: e });
  }
};

export const postStock = async (req: Request, res: Response) => {
  try {
    const { name, price } = req.body;
    const newStock = new Stock();
    newStock.name = name;
    newStock.price = price;
    const stock = await newStock.save();
    res.json(stock);
  } catch (e) {
    res.json({ error: e });
  }
};
