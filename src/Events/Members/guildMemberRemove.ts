import { Event } from "../../Interfaces";
import { GuildMember, TextChannel, EmbedBuilder } from "discord.js";

export const event: Event = {
  name: 'guildMemberRemove',
  once: true,
  execute: async ( client, member: GuildMember ) => {

    const GoodByeEmbed = new EmbedBuilder()

    .setColor(0x000080)
    .setTitle(`Au revoir`)
    .setDescription(`Oh non ! ${member.user.username} nous a quitté, le saligaut ! C'est décidé, on lui pélera le jonc comme au bailli du Limousin avec les ${member.guild.memberCount} membres restants !`)
    .setImage("https://cdn.discordapp.com/attachments/1129377390385184782/1129462047374065795/IMG_0420.jpg")
    .setThumbnail(member.avatarURL({ size: 1024, forceStatic: true }))
    .setFooter({ text: "...ecce et consumimur igni" })
    .setTimestamp()

   await ( member.guild.channels.cache.get("1130238998309261333") as TextChannel ).send({ embeds: [ GoodByeEmbed ] });
   await client.service.RemoveUserInfo({ userID: member.user.id }, 0);
  }
}
