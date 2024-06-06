import { Types } from "mongoose";
import { connect } from "mongoose";

export default class Interaction {

  async initDatabase(MongoURI: string)
  {
    connect(MongoURI).then(() => console.log("Mongoose est connecté"));
  }

  async GetInfo(Schema: any, payload: {})
  {
    const data = await Schema.findOne(payload)
    if ( data ) return data;
    else return;
  }

  async GetEvery(Schema: any, payload: {})
  {
    const data = await Schema.find(payload)
    if ( data ) return data;
    else return;
  }

  async UpdateInfo(Schema: any, settings: {}, payload: {})
  {
    let data = await this.GetInfo(Schema, payload);
    if (typeof data != "object") data = {};
    for (const key in settings)
    {
      if (data[key] !== settings[key]) data[key] = settings[key];
    }
    return data.updateOne(settings);
  }

  async CreateInfo(Schema: any, payload: {})
  {
    const merged = await Object.assign({ _id: new Types.ObjectId() }, payload);
    const createUser = await new Schema(merged);
    createUser.save().then(u => console.log(`nouvellles données -> ${u}`));
  }

  async RemoveInfo(Schema: any, payload: {}) : Promise<Boolean>
  {
    const data = await this.GetInfo(Schema, payload);
    if ( data )
    {
      data.deleteOne();
      return true;
    } else return false;
  }
}
