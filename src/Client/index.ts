import { Client, Collection } from "discord.js";
import { Schema } from "mongoose"
import { Config, Event, Command, Subcommand } from "../Interfaces";
import { loadFiles } from "../Utils/FileLoader";
import { Paginator } from "../Utils/Paginator";

import Interaction from "../Database/Database.interaction";

import config from "../environment.config"

export default class client extends Client
{

  public events: Collection<String, Event> = new Collection();
  public commands: Collection<String, Command> = new Collection();
  public subCommand: Collection<String, Subcommand> = new Collection();
  public config: Config = config;
  public service: Interaction = new Interaction();
  public paginator: Paginator | never;

  public async init()
  {
    this.login(config.TOKEN as string)
    this.service.initDatabase(config.MONGO_URI as string);
  }

  public async loadEvents()
  {
    const files = await loadFiles("dist/Events");

    for ( const file of files )
    {
      try
      {
        const event = require(file).event;
        const execute = event.execute.bind(null, this);

        this.events.set(event.name, execute);
        this.on(event.name, execute)

        console.log(`${event.name}: Loaded`);
      } catch (error)
      {
        console.log(`${file.split("/").pop().slice(0, -3)}: not loaded\nReason: ${error}`);
      }
    }
  }

  public async loadCommands()
  {
    await this.commands.clear();
    await this.subCommand.clear();
    let commandsArray: Array<any> = new Array();
    const Files = await loadFiles("dist/Commands");

    Files.forEach(file => {
      const command = require(file);
      if ( command.subcommand ) return this.subCommand.set(command.subcommand.name, command);

      this.commands.set(command.command.payload.name, command.command);
      commandsArray.push(command.command.payload);
      console.log(`${command.command?.payload.name}: Loaded`);
    });

    this.application.commands.set(commandsArray);
  }

}
