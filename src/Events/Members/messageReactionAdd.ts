import { Event } from "../../Interfaces";
import { codeBlock, MessageReaction, User, ReactionEmoji, MessageResolvable, TextChannel } from "discord.js";

export const event: Event = {
  name: 'messageReactionAdd',
  once: true,
  execute: async ( client, messageReaction: MessageReaction, user: User ) => {

    if ( messageReaction.message.webhookId )
    {
      const webhook = ( await ( messageReaction.message.channel as TextChannel ).fetchWebhooks() ).first();
      switch ( ( messageReaction.emoji as ReactionEmoji ).name )
      {
        case "❌":
          messageReaction.message.delete();
          break;
        case "📝":
          messageReaction.message.reactions.removeAll();
          await user.send({ content: `Tu as demandé à modifier ton message, tu as exactement : 60_000 time, voici ton message original: \n${codeBlock(messageReaction.message.content)}`});
          const new_message = await user.dmChannel.awaitMessages({ max: 1, time: 60_000, errors: ["time"] })
          .then( collected => collected.first().content )
          .catch(console.error);
          await webhook.editMessage(( messageReaction.message as unknown ) as MessageResolvable, { content: new_message as string });
          break;
      }
    } else return;

  }
}
