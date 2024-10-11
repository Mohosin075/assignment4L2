import express, { NextFunction, Request, Response } from "express";
import { courseRoute } from "./models/course/course.route";
import globalErrorHandler from "./middleware/globalErrorHandler";
import { categoryRoutes } from "./models/category/category.route";
import NotFound from "./utils/notFound";
import { ReviewRoutes } from "./models/review/review.route";
import { AuthRoutes } from "./models/auth/auth.route";

const app = express();

app.use(express.json());

app.use("/api/", courseRoute);
app.use("/api/", categoryRoutes);
app.use("/api/", ReviewRoutes);
app.use("/api/auth", AuthRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("this is assignment 3");
});

app.use(NotFound)

app.use(globalErrorHandler);

export default app;
