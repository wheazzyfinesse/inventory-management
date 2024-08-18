import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export const getDashboardMetrics = async (req:Request, res:Response):Promise<void> => {
    try {
        const popularProducts = await prisma.products.findMany({
            take: 15,
            orderBy: {stockQuantity: "desc"}
        })
         const  salesSummary= await prisma.salesSummary.findMany({
            take: 5,
            orderBy: {date: "desc"}
        })
         const  purchaseSummary= await prisma.purchaseSummary.findMany({
            take: 5,
            orderBy: {date: "desc"}
        })
         const  expenseSummary= await prisma.expenseSummary.findMany({
            take: 5,
            orderBy: {date: "desc"}
        })
         const  expenseByCategorySummaryRaw= await prisma.expenseByCategory.findMany({
            take: 5,
            orderBy: {date: "desc"}
         })
        const expenseByCategorySummary = expenseByCategorySummaryRaw.map((item) => ({
           ...item, amount: item.amount.toString() 
        }))
        res.json({
            popularProducts,
            salesSummary,
            purchaseSummary,
            expenseSummary,
            expenseByCategorySummary,
            // totalSales: salesSummary.reduce((acc, curr) => acc + curr.totalAmount, 0),
            // totalExpenses: expenseSummary.reduce((acc, curr) => acc + curr.totalAmount, 0)
        })
    } catch (error) {
        res.status(500).json({message: "Error receiving Dashboard metrics"})
    }
}