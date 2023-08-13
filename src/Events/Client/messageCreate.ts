import { Event } from "../../Interfaces";
import { Message } from "discord.js";
import { User } from "../../Database/Models";
import { LevelUp } from "../../Utils/Levels";

export const event: Event = {
  name: 'messageCreate',
  once: false,
  execute: async ( client, message: Message ) => {

    if ( message.content == `<@${client.user.id}>` ) message.reply({ content: "It's me, JOSEPH ~~STALINE~~!" })

    if ( !message.author.bot )
    {
      const RegisteredMember = await client.service.GetUserInfo({ userID: message.author.id }, 0);

      if ( RegisteredMember )
      {
        try
        {
          const dice = Math.floor((Math.random() * 99) + 1);

          if (dice <= 50)
          {
            let Xpgain = RegisteredMember.experience + ( Math.ceil(( Math.floor((Math.random() * 3) + 1) + ( RegisteredMember.experience / 5 ) ) ) );
            await client.service.UpdateUserInfo({ experience: Xpgain }, { userID: message.author.id }, 0);
          } else return;

          if (RegisteredMember.experience >= RegisteredMember.requis)
          {

            let remainder = RegisteredMember.experience - RegisteredMember.requis;
            const scaledLevel = (RegisteredMember.level < 10 ? 1.25 : RegisteredMember.level.toString().split("").length--);
            let mantissa = RegisteredMember.level / 10^scaledLevel;

            let requireXp = Math.ceil(( Math.log((RegisteredMember.level + 2)) * 10 ) * mantissa);

            const levelUp = RegisteredMember.level + 1;
            await client.service.UpdateUserInfo({
              experience: remainder,
              level: levelUp,
              requis: requireXp,
              username: message.author.username
            }, { userID: message.author.id}, 0);

            await LevelUp(client, message.author, levelUp);
          }
        } catch ( error )
        {
          console.error(error);
        }
      } else
      {
        await client.service.CreateUserInfo({
            guildID: message.member.guild.id,
            guildName: message.member.guild.name,
            userID: message.member.id,
            username: message.member.user.tag
          }, 0);
      }

    } else return;
  }
}
