import { LevelUp, GetNewRequiredXp } from "../../../../Utils/Levels";
import { Subcommand } from "../../../../Interfaces";
import { Experience } from "../../../../Database/Models";

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

    let RegisterdMember = await client.service.GetInfo(Experience, { user_id: user.id });

    if (!RegisterdMember)
    {
      await client.service.CreateInfo(Experience, {
        guild_id: interaction.guild.id,
        user_id: user.id
      });

      RegisterdMember = await client.service.GetInfo(Experience, { user_id: user.id });
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

    await client.service.UpdateInfo(Experience, {
      experience: xpGain,
      level: level,
      requis: required
    }, { user_id: user.id });

    interaction.reply({ content: `${amount}xp on été crédité à : ${user.username}`});

  }
}
