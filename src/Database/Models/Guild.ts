import { model, Schema } from "mongoose";
import { IGuild } from "../../Interfaces/Models";

const GuildSchema = new Schema({
  guild_id: String,
  guildName: String,
  createdAt: String
});


export const Guild = model<IGuild>("Guild", GuildSchema);
