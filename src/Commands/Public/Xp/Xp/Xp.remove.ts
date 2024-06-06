import { LevelUp, GetNewRequiredXp } from "../../../../Utils/Levels";
import { Subcommand } from "../../../../Interfaces";
import { Experience } from "../../../../Database/Models";

export const subcommand: Subcommand = {
  name: "xp.remove",
  type: 1,
  description: "Retire de l'Xp à un membre",
  options: [{
    name: "user",
    type: 6,
    description: "L'utilisateur à qui il faut retirer de l'Xp",
    required: true
  },{
    name: "amount",
    type: 4,
    description: "Le nombre de point d'Xp qu'il faut retirer",
    required: true
  }],
  async execute( client, interaction )
  {
    const user = interaction.options.getUser("user");
    const amount = interaction.options.getInteger("amount");

    if ( amount <= 0 ) interaction.reply({ content: "Le montant d'xp à retirer doit être supérieur à 0" });

    const RegisterdMember = await client.service.GetInfo(Experience, { user_id: user.id });

    if (!RegisterdMember || RegisterdMember.experience == 0)
    {
      interaction.reply({ content: "Je ne peux pas retirer de l'Xp à quelqu'un qui n'en a pas." });

      if ( !RegisterdMember )
      {
        await client.service.CreateInfo(Experience, {
          guild_id: interaction.guild.id,
          user_id: user.id
        });
      }
    }

    let newXpTotal = RegisterdMember.experience - amount;
    let level = RegisterdMember.level;
    let required = RegisterdMember.requis;

    if ( newXpTotal <= 0 )
    {
      while ( newXpTotal <= 0 )
      {
        level--;
        required = GetNewRequiredXp(level);
        newXpTotal += required;
        if ( level-- <= 0 )
        {
          level = 0;
          required = 0;
          newXpTotal = 0;
          break;
        }
      }

      LevelUp(client, user, level);

    }

    await client.service.UpdateInfo(Experience, {
      experience: newXpTotal,
      level: level,
      requis: required
    }, { user_id: user.id });

    interaction.reply({ content: `${amount}xp on été retiré  à : ${user.username}`});

  }
}
