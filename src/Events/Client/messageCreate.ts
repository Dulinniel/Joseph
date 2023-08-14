import { Event } from "../../Interfaces";
import { Message } from "discord.js";
import { User } from "../../Database/Models";
import { LevelUp, GetNewRequiredXp } from "../../Utils/Levels";

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
        const dice = Math.floor((Math.random() * 99) + 1);

        if (dice <= 25)
        {
          let Xpgain = RegisteredMember.experience + ( Math.ceil(( Math.floor((Math.random() * 3) + 1) + message.content.length / 1000 ) ) );
          await client.service.UpdateUserInfo({ experience: Xpgain }, { userID: message.author.id }, 0);
        } else return;

        if (RegisteredMember.experience >= RegisteredMember.requis)
        {

          const levelUp = RegisteredMember.level++
          const requireXp = GetNewRequiredXp(levelUp)

          await client.service.UpdateUserInfo({
            experience: RegisteredMember.experience - RegisteredMember.requis,
            level: levelUp,
            requis: requireXp,
            username: message.author.username
          }, { userID: message.author.id}, 0);

          await LevelUp(client, message.author, levelUp);
        }
      } else
      {
        await client.service.CreateUserInfo({
            guildID: message.member.guild.id,
            guildName: message.member.guild.name,
            userID: message.member.id,
            username: message.author.username
          }, 0);
      }

    } else return;
  }
}
