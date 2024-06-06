import { Event } from "../../Interfaces";
import { Message } from "discord.js";
import { Experience, Modules } from "../../Database/Models";
import { LevelUp, GetNewRequiredXp } from "../../Utils/Levels";

export const event: Event = {
  name: 'messageCreate',
  once: false,
  execute: async ( client, message: Message ) => {

    if ( message.content == `<@${client.user.id}>` ) message.reply({ content: "It's me, JOSEPH ~~STALINE~~!" })

    if ( !message.author.bot )
    {
      const RegisteredMember = await client.service.GetInfo(Experience, { user_id: message.author.id, guild_id: message.guild.id });
      const Config = await client.service.GetInfo(Modules, { guild_id: message.guild.id });

      if ( Config.module.find(module => module.name == "Xp").state == 1)
      {
        if ( RegisteredMember )
        {
          const dice = Math.floor(Math.random() * 99);

          if (dice <= 25)
          {
            let Xpgain = RegisteredMember.experience + ( Math.ceil(( Math.floor((Math.random() * 3) + 1) + message.content.length / 1000 ) ) );
            await client.service.UpdateInfo(Experience, { experience: Xpgain }, { userID: message.author.id, guild_id: message.guild.id });
          }

          if (RegisteredMember.experience >= RegisteredMember.requis)
          {

            const requireXp = GetNewRequiredXp(RegisteredMember.level + 1)

            await client.service.UpdateInfo(Experience, {
              $inc: { level: 1, experience: -RegisteredMember.requis },
              requis: requireXp,
              username: message.author.username
            }, { userID: message.author.id });

            await LevelUp(client, message.author, RegisteredMember.level + 1);
          }
        } else
        {
          await client.service.CreateInfo(Experience, {
              guild_id: message.member.guild.id,
              user_id: message.member.id
          });
        }
      } else return;
    } else return;
  }
}
