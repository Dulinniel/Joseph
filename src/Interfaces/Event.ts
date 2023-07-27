import Client from "../Client";
import { ClientEvents } from "discord.js";

interface execute {
  ( client: Client, ...args: Array<any> )
}

export interface Event {
  name: keyof ClientEvents;
  once: boolean,
  execute: execute
}
