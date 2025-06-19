import { Types } from "mongoose";

interface IBorrow {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

export default IBorrow;
