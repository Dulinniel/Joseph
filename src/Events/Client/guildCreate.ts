import { Guild } from "discord.js";
import { Event } from "../../Interfaces";
import { Guild as GuildModel, Modules } from "../../Database/Models";
import { IXp } from "../../Interfaces/Modules";

export const event: Event = {
  name: "guildCreate",
  once: false,
  execute: async ( client, guild: Guild ) => {
    await client.service.CreateInfo(GuildModel, {
      guild_id: guild.id,
      guildName: guild.name,
      createdAt: guild.createdAt
    });

    await client.service.CreateInfo(Modules, {
      guild_id: guild.id,
      name: "Xp",
      static: false,
      state: 0,
      configuration: new Object()
    });

    await client.service.CreateInfo(Modules, { 
      guild_id: guild.id,
      name: "Settings",
      static: true,
      state: 1
    });

    await client.service.CreateInfo(Modules, {
      guild_id: guild.id,
      name: "Miscellanous",
      static: true,
      state: 1
    });

    await client.service.CreateInfo(Modules, {
      guild_id: guild.id,
      name: "Roleplay",
      static: false,
      state: 0,
      configuration: new Object()
    });

  }
}

