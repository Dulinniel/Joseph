import { Message, User, TextChannel, EmbedBuilder } from "discord.js"
import Client from "../Client";

async function LevelUp(client: Client, user: User, level: number)
{
  const channel = client.channels.cache.find(c => c.id == client.config.RANK_UP_CHANNEL as string);

  const RankUpdate = new EmbedBuilder()

    .setColor("#DAF450")
    .setTitle(`${user.username} est passé au niveau supérieur`)
    .setDescription(`bravo tu es passé au niveau ${level}`)
    .setThumbnail(user.displayAvatarURL())
    .setFooter( { text: "un utilisateur est passé au niveau supérieur "} )
    .setTimestamp()
  await ( channel as TextChannel ).send({ embeds: [ RankUpdate ] });
}

function GetNewRequiredXp(levelToReach: number): number
{
  const scaledLevel = (levelToReach < 10 ? 1.25 : levelToReach.toString().split("").length--);
  let mantissa = levelToReach / 10^scaledLevel;

  return Math.ceil(( Math.log((levelToReach + 2)) * 10 ) * mantissa);
}

export { LevelUp, GetNewRequiredXp };
