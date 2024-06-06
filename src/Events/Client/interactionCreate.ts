import { Event } from "../../Interfaces";
import { Interaction } from "discord.js";
import { Modules } from "../../Database/Models";

export const event: Event = {
  name: 'interactionCreate',
  once: false,
  execute: async ( client, interaction: Interaction ) => {
    if ( interaction.isChatInputCommand() )
    {
      const command = client.commands.get(interaction.commandName);
      if (!command) return interaction.reply({ content: "Ça marche po" });

      if ( command.developer && interaction.user.id !== "714398383225307198" ) return interaction.reply({ content: "Tu n'es pas ma môman ! D:<"});

      const module = await client.service.GetInfo(Modules, { guild_id: interaction.guild.id, name: command.categorie });;
      if ( module.state == 0 ) return await interaction.reply({ content: "Ce module n'est pas activé, utilisez `/help config` pour plus d'information" });

      const subCommand = interaction.options.getSubcommand(false);
      const subCommandGroup = interaction.options.getSubcommandGroup(false);

      if (subCommand || subCommandGroup)
      {
        const subCommandFile = subCommandGroup ? client.subCommand.get(`${interaction.commandName}.${subCommandGroup}.${subCommand}`) : client.subCommand.get(`${interaction.commandName}.${subCommand}`);
        if ( !subCommandFile["subcommand"] ) interaction.reply({ content: "Ça marche po" })
        subCommandFile["subcommand"].execute(client, interaction);
      } else command.execute(client, interaction)
    } else if ( interaction.isUserContextMenuCommand() )
    {
      const command = client.commands.get(interaction.commandName);
      if (!command) return interaction.reply({ content: "Ça marche po" });
      command.executeUserCommand(client, interaction)
    }
  }
}
