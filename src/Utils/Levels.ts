import { Message, User, TextChannel, EmbedBuilder } from "discord.js"
import Client from "../Client";

async function LevelUp(client: Client, user: User, level: number)
{
  const channel = client.channels.cache.find(c => c.id == "1070170673126850640");

  const RankUpdate = new EmbedBuilder()

    .setColor("#DAF450")
    .setTitle(`${user.username} est passé au niveau supérieur`)
    .setDescription(`bravo tu es passé au niveau ${level}`)
    .setThumbnail(user.displayAvatarURL())
    .setFooter( { text: "un utilisateur est passé au niveau supérieur "} )
    .setTimestamp()
  await ( channel as TextChannel ).send({ embeds: [ RankUpdate ] });
}

export { LevelUp };
