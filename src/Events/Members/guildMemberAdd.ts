import { Event } from "../../Interfaces";
import { GuildMember, TextChannel, EmbedBuilder } from "discord.js";

export const event: Event = {
  name: 'guildMemberAdd',
  once: true,
  execute: async ( client, member: GuildMember ) => {

    const WelcomeEmbed = new EmbedBuilder()

      .setColor(0x000080)
      .setTitle(`Bienvenu sur ${member.guild.name}`)
      .setDescription(`Oh, voici un nouvel arrivant, ${member.user.username}, grâce à toi nous sommes maintenant ${member.guild.memberCount}. Suit le chemin pavé du <#1129478919494578206>, qui passera par le <#1129472929864888431>, s'arrêtera par le <#1130238405230469131> et se cloturera dans le <#1130246455890817024>. `)
      .setImage("https://cdn.discordapp.com/attachments/1129377390385184782/1129462047374065795/IMG_0420.jpg")
      .setThumbnail(member.avatarURL({ size: 1024, forceStatic: true }))
      .setFooter({ text: "In girum imus nocte..." })
      .setTimestamp()

    await ( member.guild.channels.cache.get("1130238968324165723") as TextChannel ).send({ embeds: [ WelcomeEmbed ] });

    const roleToAdd = member.guild.roles.cache.get("1130241033431683136")
    await member.roles.add(roleToAdd, "Nouveau membre")

    await client.service.CreateUserInfo({
      guildID: member.guild.id,
      guildName: member.guild.name,
      userID: member.user.id,
      username: member.user.username,
      position: 0
    }, 0)

  }
}
