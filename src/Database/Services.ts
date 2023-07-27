import { connect } from "mongoose";
import client from "../Client";
import Interaction from "./Database.interaction";

export default class Services extends Interaction
{

  async initDatabase(MongoURI: string)
  {
    connect(MongoURI).then(() => console.log("Mongoose est connecté"));
  }

}
