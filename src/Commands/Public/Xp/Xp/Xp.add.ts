import { LevelUp, GetNewRequiredXp } from "../../../../Utils/Levels";
import { Subcommand } from "../../../../Interfaces";

export const subcommand: Subcommand = {
  name: "xp.add",
  type: 1,
  description: "Ajoute de l'Xp à un membre",
  options: [{
    name: "user",
    type: 6,
    description: "L'utilisateur à qui il faut ajouter de l'Xp",
    required: true
  },{
    name: "amount",
    type: 4,
    description: "Le nombre de point d'Xp qu'il faut ajouter",
    required: true
  }],
  async execute( client, interaction )
  {
    const user = interaction.options.getUser("user");
    const amount = interaction.options.getInteger("amount");

    if ( amount <= 0 ) interaction.reply({ content: "Le montant d'xp à ajouter doit être supérieur à 0" });

    let RegisterdMember = await client.service.GetUserInfo({ userID: user.id }, 0);

    if (!RegisterdMember)
    {
      await client.service.CreateUserInfo({
        guildID: interaction.guild.id,
        guildName: interaction.guild.name,
        userID: user.id,
        username: user.username
      }, 0);

      RegisterdMember = await client.service.GetUserInfo({ userID: user.id }, 0);
    }

    let xpGain = RegisterdMember.experience + amount;
    let level = RegisterdMember.level++;
    let required = RegisterdMember.requis

    if ( xpGain > RegisterdMember.requis )
    {
      while ( xpGain >= required )
      {
        xpGain -= required;
        required = GetNewRequiredXp(level);
        level++;
      }

      LevelUp(client, user, level);

    }

    await client.service.UpdateUserInfo({
      experience: xpGain,
      level: level,
      requis: required,
      username: user.username
    }, { userID: user.id }, 0);

    interaction.reply({ content: `${amount}xp on été crédité à : ${user.username}`});

  }
}
