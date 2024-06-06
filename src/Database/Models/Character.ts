import { model, Schema } from "mongoose";
import { ICharacter } from "../../Interfaces/Models";

const CharacterSchema = new Schema({
  _id: Schema.Types.ObjectId,
  user_id: String,
  name: String,
  bracket: Array,
  image: {
    "type": String,
    "default": null
  },
  message_count: {
    "type": Number,
    "default": 0
  }
});

export const Character = model<ICharacter>("Character", CharacterSchema);
