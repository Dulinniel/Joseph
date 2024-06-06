import { GuildMember } from "discord.js";
import { Modules } from "../../../../../Database/Models";
import { Subcommand } from "../../../../../Interfaces";
import { ParseSystemVariables } from "../../../../../Utils/Parser";

export const subcommand: Subcommand =
{
  name: "config.xp.message",
  description: "Les propriétés du message",
  type: 1,
  options: [{
    name: "channel",
    description: "Le salon dans lequel le message devra s'envoyer",
    type: 7,
    required: true
  }, {
    name: "title",
    description: "Le titre de l'embed",
    type: 3,
    required: true
  }, {
    name: "description",
    description: "La description de l'embed",
    type: 3,
    required: true
  }, {
    name: "couleur",
    description: "La couleur de l'embed",
    type: 10,
    choices: [
      { name: "Rouge", value: 0xDC143C },
      { name: "Orange", value: 0xFFA500 },
      { name: "Jaune", value: 0xFFFF00 },
      { name: "Vert", value: 0x008000 },
      { name: "Bleu", value: 0x0000FF },
      { name: "Cyan", value: 0x00FFFF },
      { name: "Violet", value: 0x800080 },
      { name: "Rose", value: 0xFFC0CB },
      { name: "Fuschia", value: 0xFF00FF },
      { name: "Gris", value: 0x808080 },
      { name: "Marron", value: 0xA52A2A },
      { name: "Blanc", value: 0xFFFFFF },
      { name: "Noir", value: 0x000000 }
    ],
    required: true
  }, {
    name: "date",
    description: "Faire apparaître le temps écoulé depuis que la personne a gagné son niveau ?",
    type: 5,
    required: true
  }, {
    name: "avatar",
    description: "Faire apparaître l'avatar de la personne qui monte de niveau ?",
    type: 5,
    required: true
  }, {
    name: "image",
    description: "Ajoute une image complémentaire à l'embed",
    type: 3,
    required: false
  }], async execute ( client, interaction )
  {
    const channel = interaction.options.getChannel("channel");
    const title = interaction.options.getString("title");
    const description = interaction.options.getString("description");
    const color = interaction.options.getNumber("couleur");
    const date = interaction.options.getBoolean("date");
    const avatar = interaction.options.getBoolean("avatar");
    const image = interaction.options.getString("image");

    const ModuleInfo = await client.service.GetInfo(Modules, { guild_id: interaction.guild.id, name: "Xp" });

    if ( !ModuleInfo.configuration ) ModuleInfo.configuration = {};
    
    let parsedTitle = ParseSystemVariables(title, ( interaction.member as GuildMember ));
    let parsedDescription = ParseSystemVariables(description, ( interaction.member as GuildMember ));

    ModuleInfo.configuration["channel"] = channel.id,
    ModuleInfo.configuration["embed"] = {
      title: title,
      description: description,
      color: color,
      timestamp: date,
      thumbnail: {
        url: undefined
      },
      image: {
        url: undefined
      }
    }
    

    if ( image ) ModuleInfo.configuration.embed.image.url = image
    
    await client.service.UpdateInfo(Modules, 
    { guild_id: interaction.guild.id, configuration: ModuleInfo.configuration }, 
    { guild_id: interaction.guild.id, name: "Xp" });
    
    if ( date ) ModuleInfo.configuration.embed.timestamp = new Date().toISOString();
    if ( avatar ) ModuleInfo.configuration.embed.thumbnail.url = interaction.user.displayAvatarURL();

    ModuleInfo.configuration.embed.title = parsedTitle;
    ModuleInfo.configuration.embed.description = parsedDescription;

    interaction.reply({ content: "Bravo, vous avez configuré le message de monté de niveau, avec succès. Voici la prévisualisation de votre embed: ", embeds: [ ModuleInfo.configuration.embed ]});
  }
}

