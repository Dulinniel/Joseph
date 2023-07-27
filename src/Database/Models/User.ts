import { model, Schema } from "mongoose";
import { IUser } from "../../Interfaces/Models";

const UserSchema = new Schema({
  _id: Schema.Types.ObjectId,
  guildID: String,
  guildName: String,
  userID: String,
  username: String,
  experience: {
    "type": Number,
    "default": 0
  },

  level: {
    "type": Number,
    "default": 0
  },

  requis: {
    "type": Number,
    "default": 0
  },

  position: Number
});

export const User = model<IUser>("Guilds", UserSchema);
