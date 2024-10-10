import express, { NextFunction, Request, Response } from "express";
import { courseRoute } from "./models/course/course.route";
import globalErrorHandler from "./middleware/globalErrorHandler";
import { categoryRoutes } from "./models/category/category.route";
import NotFound from "./utils/notFound";
import { ReviewRoutes } from "./models/review/review.route";

const app = express();

app.use(express.json());

app.use("/api/", courseRoute);
app.use("/api/", categoryRoutes);
app.use("/api/", ReviewRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("this is assignment 3");
});
// this is assignment4
app.use(NotFound)

app.use(globalErrorHandler);

export default app;
