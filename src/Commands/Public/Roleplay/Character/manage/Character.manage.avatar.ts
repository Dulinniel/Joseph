import { Subcommand } from "../../../../../Interfaces";

export const subcommand: Subcommand =
{
  name: "character.manage.avatar",
  description: "Permet de choisir un avatar pour son personnage.",
  type: 1,
  options: [{
    name: "name",
    description: "Le nom du personnage",
    type: 3,
    required: true
  }, {
    name: "avatar",
    description: "L'image de votre avatar",
    type: 11,
    required: true
  }],
  async execute( client, interaction )
  {

    const name = interaction.options.getString("name");
    const attachment = interaction.options.getAttachment("avatar");

    if ( [ "image/avif", "image/jpeg", "image/png" ].includes(attachment.contentType) )
    {
      let doesItExists = await client.service.GetUserInfo({ name: name, userID: interaction.member.user.id }, 1);
      if ( doesItExists )
      {
        await client.service.UpdateUserInfo({ image: attachment.url }, { userID: interaction.member.user.id, name: name }, 1);
        interaction.reply({ content: `L'avatar de ${name} a été mis à jour !` });
      } else interaction.reply({ content: "Ce personnage n'existe pas" });
    } else interaction.reply({ content: "Ceci n'est pas une image" });

  }
}
