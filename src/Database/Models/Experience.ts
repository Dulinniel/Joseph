import { model, Schema } from "mongoose";
import { IExperience } from "../../Interfaces/Models";

const ExperienceSchema = new Schema({
  guild_id: String,
  user_id: String,
  xp: {
    "type": Number,
    "default": 0
  },
  xp_requis: {
    "type": Number,
    "default": 0
  },
  level: {
    "type": Number,
    "default": 0
  }
});

export const Experience = model<IExperience>("Experience", ExperienceSchema);
