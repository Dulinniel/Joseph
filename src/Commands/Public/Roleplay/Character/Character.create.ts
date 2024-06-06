import { inlineCode } from "discord.js";
import { Subcommand } from "../../../../Interfaces";
import { Character } from "../../../../Database/Models";

export const subcommand: Subcommand =
{
  name: "character.create",
  description: "Créer un nouveau personnage",
  type: 1,
  options: [{
    name: "name",
    description: "Le nom du personnage",
    type: 3,
    required: true
  },{
    name: "bracket",
    description: "Le bracket qui fera réagir le personnage",
    type: 3,
    required: true
  }],
  async execute( client, interaction )
  {

    const name = interaction.options.getString("name");
    const ProtoypeBracket = interaction.options.getString("bracket");
    const isCharacterAlreadyExists = await client.service.GetInfo(Character, { name: name, user_id: interaction.member.user.id })

    if ( isCharacterAlreadyExists ) interaction.reply({ content: `Tu as déjà un personnage nommé ${inlineCode(name)}`});
    if ( ProtoypeBracket.indexOf("text") < 0 ) interaction.reply({ content: "Tu as oublié de placer le mot \"text\" dans le bracket, c'est très important, sans ce mot, je ne suis pas capable de détermienr où est la limite entre le message et le déclencheur" });
    else
    {
      let bracket = ProtoypeBracket.split(/(text)/);
      let randomUselessSpace = bracket.indexOf("");
      bracket.splice(randomUselessSpace, 1);
      const character = await client.service.GetInfo(Character, { bracket: bracket, userID: interaction.member.user.id });

      if ( character ) interaction.reply({ content: `Ton personnage: ${inlineCode(character.name)} a déjà ce bracket enregistré` });
      else
      {
        await client.service.CreateInfo(Character, {
          user_id: interaction.member.user.id,
          username: interaction.member.user.username,
          name: name,
          bracket: bracket
        });

        interaction.reply({ content: `Ton personnage ${inlineCode(name)} a été enregistré avec le bracket: ${inlineCode(ProtoypeBracket)} avec succès` });
      }

    }

  }
}
