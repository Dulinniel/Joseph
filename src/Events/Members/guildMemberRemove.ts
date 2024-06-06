import { GuildMember, TextChannel, EmbedBuilder } from "discord.js";
import { Event } from "../../Interfaces";
import { Experience } from "../../Database/Models";

export const event: Event = {
  name: 'guildMemberRemove',
  once: true,
  execute: async ( client, member: GuildMember ) => {

    if ( !member.user.bot)
    { 
      const GoodByeEmbed = new EmbedBuilder()

        .setColor(0x000080)
        .setTitle(`Au revoir`)
        .setDescription(`Oh non ! ${member.user.username} nous a quitté, le saligaut ! C'est décidé, on lui pélera le jonc comme au bailli du Limousin avec les ${member.guild.memberCount} membres restants !`)
        .setImage("https://cdn.discordapp.com/attachments/1129377390385184782/1129462047374065795/IMG_0420.jpg")
        .setThumbnail(member.avatarURL({ size: 1024, forceStatic: true }))
        .setFooter({ text: "...ecce et consumimur igni" })
        .setTimestamp()

      await ( member.guild.channels.cache.get("1130238998309261333") as TextChannel ).send({ embeds: [ GoodByeEmbed ] });
      await client.service.RemoveInfo(Experience, { user_id: member.user.id });
    }
  }
}
