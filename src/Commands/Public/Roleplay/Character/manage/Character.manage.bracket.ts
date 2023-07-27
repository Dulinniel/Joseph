import { inlineCode } from "discord.js";
import { Subcommand } from "../../../../../Interfaces";

export const subcommand: Subcommand =
{
  name: "character.manage.bracket",
  description: "Permet de changer les brackets de son personnage.",
  type: 1,
  options: [{
    name: "name",
    description: "Le nom du personnage",
    type: 3,
    required: true
  }, {
    name: "new_bracket",
    description: "Les nouveaux bracket de votre personnage",
    type: 3,
    required: true
  }],
  async execute( client, interaction )
  {

    const name = interaction.options.getString("name");
    const newbracket = interaction.options.getString("new_bracket");

    let bracket = newbracket.split(/(text)/);
    let randomUselessSpace = bracket.indexOf("");
    bracket.splice(randomUselessSpace, 1);

    const doesCharacterExists = await client.service.GetUserInfo({ userID: interaction.member.user.id, name: name }, 1);
    const alreayBracketed = await client.service.GetUserInfo({ userID: interaction.member.user.id, bracket: bracket }, 1);

    if ( doesCharacterExists )
    {
      if ( !alreayBracketed )
      {
        await client.service.UpdateUserInfo({ bracket: bracket }, { userID: interaction.member.user.id, bracket: doesCharacterExists.bracket }, 1);
        interaction.reply({ content: `Bravo ! ${inlineCode(name)} a maintenant pour bracket : ${inlineCode(newbracket)}` });
      } else interaction.reply({ content: `Je ne peux pas faire ça, ton personnage ${alreayBracketed.name} possède déjà ce bracket` });
    } else interaction.reply({ content: `Je ne peux pas faire ça, tu n'as aucun personnage du nom de : ${inlineCode(name)}` });

  }
}
