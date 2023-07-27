import { inlineCode } from "discord.js";

import { Subcommand } from "../../../../../Interfaces";

export const subcommand: Subcommand =
{
  name: "character.manage.name",
  description: "Permet de changer le nom de son personnage.",
  type: 1,
  options: [{
    name: "name",
    description: "Le nom du personnage",
    type: 3,
    required: true
  }, {
    name: "new_name",
    description: "Le nouveau nom de votre personnage",
    type: 3,
    required: true
  }],
  async execute( client, interaction )
  {

    const name = interaction.options.getString("name");
    const newName = interaction.options.getString("new_name");

    const alreadyNamed = await client.service.GetUserInfo({ userID: interaction.member.user.id, name: newName }, 1);

    if ( name != newName )
    {
      if ( !alreadyNamed )
      {
        await client.service.UpdateUserInfo({ name: newName }, { userID: interaction.member.user.id, name: name }, 1);
        interaction.reply({ content: `Bravo ! ${inlineCode(name)} s'appelle maintenant : ${inlineCode(newName)}` });
      } else interaction.reply({ content: `Je ne peux pas faire ça, tu n'as aucun personnage du nom de : ${inlineCode(name)}` });
    } else interaction.reply( { content: "Je ne vais pas gaspiller des ressources pour ça >:0" });

  }
}
