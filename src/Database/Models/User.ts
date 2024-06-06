import { model, Schema } from "mongoose";
import { IUser } from "../../Interfaces/Models";

const UserSchema = new Schema({
  user_id: String,
  username: String,
  guilds: Array<String>
});

export const User = model<IUser>("User", UserSchema);
