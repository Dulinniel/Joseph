import { Message, Collection, Snowflake, Attachment, TextChannel } from "discord.js"
import { WebhookMessage } from "../Interfaces";
import Client from "../Client";

async function RetrieveCharacter(client: Client, message: Message) : Promise<WebhookMessage> | null
{

  const WebhookConstructor: WebhookMessage = {
    message: "",
    name: null,
    attachment: [],
    avatar: null
  };

  let characters = await client.service.GetUserInfo({ userID: message.author.id }, 1, "*");
  if ( characters)
  {
    for ( const character of characters )
    {
      let textPosition: number = character.bracket.indexOf("text");
      let bracket: string = character.bracket.reverse()[textPosition];
      let data: number = message.content.indexOf(bracket);

      switch ( data )
      {
        case -1:
          continue;
          break;
        case 0:
          WebhookConstructor.message = message.content.slice(bracket.length, message.content.length);
          WebhookConstructor.name = character.name;
          WebhookConstructor.avatar = character.image;
          break;
        default:
          WebhookConstructor.message = message.content.slice(0, data);
          WebhookConstructor.name = character.name;
          WebhookConstructor.avatar = character.image;
          break;
      }
      break;
    }
    return addAttachment(message.attachments, WebhookConstructor);
  } else return null
}

function addAttachment(attachments: Collection<Snowflake, Attachment>, WebhookConstructor: WebhookMessage) : WebhookMessage
{

  if ( attachments )
  {
    for ( const [k, v] of attachments )
    {
      WebhookConstructor.attachment.push(v.url);
    }
  }

  return WebhookConstructor;

}

async function sendProxy(client: Client, message: Message)
{

  const WebhookConstructor = await RetrieveCharacter(client, message);

  if ( !WebhookConstructor.name ) return;
  else
  {
    message.delete();
    let webhook = await ( message.channel as TextChannel ).guild.fetchWebhooks()
    await webhook.get(client.config.WEBHOOK_ID as string).edit({
      name: WebhookConstructor.name,
      avatar: WebhookConstructor.avatar,
      channel: ( message.channel as TextChannel ).id
    }).then( wb => wb.send({ content: WebhookConstructor.message || "", files: WebhookConstructor.attachment }) );
    return WebhookConstructor;
  }
}

export { sendProxy };
