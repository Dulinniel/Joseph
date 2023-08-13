import { Types } from "mongoose";

import { User, Character } from "./Models";

import Services from "./Services";

export default class Interaction {

  public Schemas: any[];
  public Client: any;

  constructor(Schemas, Client)
  {
    this.Schemas = Schemas;
    this.Client = Client;
  }

  async GetUserInfo(payload, index: number, BringThemAllBeforeIGetMad?: string | never)
  {
    const data = ( BringThemAllBeforeIGetMad == "*" ) ? await this.Schemas[index].find(payload).sort({ username: payload.username }).allowDiskUse() : await this.Schemas[index].findOne(payload);
    if ( data ) return data;
    else return;
  }

  async UpdateUserInfo(settings: {}, payload: {}, index: number)
  {
    let data = await this.GetUserInfo(payload, index);
    if (typeof data != "object") data = {};
    for (const key in settings)
    {
      if (data[key] !== settings[key]) data[key] = settings[key];
    }
    return data.updateOne(settings);
  }

  async CreateUserInfo(payload, index: number)
  {
    const merged = await Object.assign({ _id: new Types.ObjectId() }, payload);
    const createUser = await new this.Schemas[index](merged);
    createUser.save().then(u => console.log(`nouvel utilisateur -> ${u.username}`));
  }

  async RemoveUserInfo(payload: {}, index: number)
  {
    const data = await this.GetUserInfo(payload, index);
    if ( data )
    {
      data.deleteOne();
      return 0;
    } else return -1
  }
}
