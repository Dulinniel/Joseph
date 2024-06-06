import { model, Schema } from "mongoose";
import { IModules } from "../../Interfaces/Models";

const ModuleSchema = new Schema({
  guild_id: String,
  name: String,
  state: Number,
  static: Boolean,
  configuration: Object
});

export const Modules = model<IModules>("Module", ModuleSchema);
