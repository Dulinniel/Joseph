import { Command } from "../../../Interfaces";
import { EmbedBuilder, inlineCode } from "discord.js";

export const command: Command =
{
  categorie: "Miscellanous",
  payload:
  {
    name: "help",
    type: 1,
    description: "Une commande pour les contrôler toute",
    options: [{
      name: "commande",
      description: "Le nom de la commande à chercher",
      type: 3,
      required: false
    }]
  },

  async execute ( client, interaction )
  {

    const command = await interaction.options.getString("commande");

    if ( !command )
    {
      const categories = [];
      client.commands.forEach( command => {
        if ( !categories.includes(command.categorie) && command.categorie !== "Developer" ) categories.push(command.categorie);
      });

      const HelpEmbed = new EmbedBuilder()

        .setColor(0x00FAE1)
        .setThumbnail(client.user.displayAvatarURL())
        .setTitle("Voici la liste des commandes :")
        .setDescription(`Les commandes disponibles sont au nombre de : ${client.commands.size}`)
        .setTimestamp()
        .setFooter({ text: "Un utilisateur a demandé de l'aide" })

      await categories.sort().forEach(async cat => {
        let commands = client.commands.filter( cmd => cmd.categorie === cat );
        HelpEmbed.addFields({ name: cat, value: `${commands.map(cmd => `${inlineCode(cmd.payload.name)} : ${cmd.payload.description}`).join('\n')}`});
      });

      await interaction.reply({ embeds: [ HelpEmbed ]});

    } else
    {

      const Command = await client.commands.get(command.toLowerCase());

      if ( Command )
      {

        const HelpEmbed = new EmbedBuilder()

          .setColor(0x00FAE1)
          .setThumbnail(client.user.displayAvatarURL())
          .setTitle(`Informations de: ${Command.payload.name} :`)
          .setDescription(Command.payload.description)
          .setTimestamp()
          .setFooter({ text: "Un utilisateur a demandé de l'aide" })

        if ( !Command.payload.options ) interaction.reply({ embeds: [ HelpEmbed ]});
        else
        {
          let SubCommand = Command.payload.options.filter(opt => opt.type == 1);
          let SubCommandGroup = Command.payload.options.filter(opt => opt.type == 2);

          if ( SubCommand.length + SubCommandGroup.length > 0 )
          {
            if ( SubCommand )
            {
              SubCommand.forEach(subCommand => {
                if ( subCommand.options )
                {
                  HelpEmbed.addFields({ name: subCommand.name, value: `${subCommand.description}\n\n${subCommand.options.map(opt => `${inlineCode(opt.name)} : ${opt.description}`).join('\n')}` });
                } else HelpEmbed.addFields({ name: subCommand.name, value: subCommand.description });
              });
            }

            if ( SubCommandGroup )
            {
              SubCommandGroup.forEach(subCommandGroup => {
                subCommandGroup.options.map(SubOption => {
                  if ( SubOption.options )
                  {
                    HelpEmbed.addFields({ name: `${subCommandGroup.name} ${SubOption.name}`,
                                          value: `${SubOption.description}\n\n${SubOption.options.map(opt => `${inlineCode(opt.name)} : ${opt.description}`).join('\n')}`
                    });
                  }
                });
              })
            }
          }
          else
          {
            Command.payload.options.filter(cmd => {
              HelpEmbed.addFields({ name: cmd.name, value: cmd.description });
            });
          }

          await interaction.reply({ embeds: [ HelpEmbed ] });

        }

      } else await interaction.reply({ content: "Cette commande n'existe pas" });
    }
  }
}
