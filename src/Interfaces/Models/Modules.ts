import { IXp } from "../Modules"

export interface IModules {
  _id: String,
  name: String,
  state: Number,
  static: Boolean,
  configuration?: IXp
};
