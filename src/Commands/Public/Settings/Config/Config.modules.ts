import { EmbedBuilder } from "discord.js";
import { Subcommand } from "../../../../Interfaces";
import { Modules } from "../../../../Database/Models";

export const subcommand: Subcommand =
{
  name: "config.modules",
  description: "La liste de tous les modules dispo, ainsi que leur état.",
  type: 1,
  async execute( client, interaction )
  {
    const GuildModule = await client.service.GetEvery(Modules, { guild_id: interaction.guild.id });

    const ListEmbed = new EmbedBuilder()
      .setColor(0X05E737)
      .setTitle("Voici la liste des modules")
      .setTimestamp()
      .setFooter({ text: "Une personne a demandé la liste des modules" })

    for ( const modules of GuildModule )
    {
      ListEmbed.addFields({ name: `${modules.name}:`, value: `État: ${ ( modules.state == 0 ) ? "Inactif" : "Actif" }`, inline: true});
    }

    interaction.reply({ embeds: [ ListEmbed ] });
  }
}
