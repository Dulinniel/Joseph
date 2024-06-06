import { model, Schema } from "mongoose";
import { IAchievements } from "../../Interfaces/Models";

const AchievementsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  guildID: String,
  achievements: Array()
});

export const Achievements = model<IAchievements>("Achievements", AchievementsSchema);
