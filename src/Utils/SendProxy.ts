import { Message, Collection, Snowflake, Attachment, TextChannel } from "discord.js"
import Client from "../Client";

async function RetrieveCharacter(client: Client, message: Message)
{

  message.content + " ";
  const characters = await client.service.GetUserInfo({ userID: message.author.id }, 1, "*");
  if ( !characters ) return;
  const retrievedCharacter = characters.filter(character =>
    message.content.startsWith(character.bracket[0]) && character.bracket[0].length != message.content.indexOf(" ") ||
    message.content.endsWith(character.bracket[1]) && character.bracket[1].length >= message.content.lastIndexOf(" ")
  );

  console.log(retrievedCharacter);

  if ( retrievedCharacter == [] ) return;

  return retrievedCharacter[0];

}

function cleanMessage(message: string, bracket: Array<string>) : string
{
  const textPosition = bracket.indexOf('text');
  return message.split(bracket.reverse()[textPosition])[textPosition];
}

function addAttachment(attachments: Collection<Snowflake, Attachment>) : Array<string> | []
{

  const attachmentURL = [];
  for ( const [k, v] of attachments )
  {
    attachmentURL.push(v.url);
  }

  return attachmentURL;
}

async function sendProxy(client: Client, message: Message)
{

  const character = await RetrieveCharacter(client, message);
  if ( !character ) return;
  else
  {
    message.delete();
    const channelHooks = await ( message.channel as TextChannel ).fetchWebhooks();
    if ( channelHooks.size == 0 )
    {
      ( message.channel as TextChannel ).createWebhook({
        name: character.name,
        avatar: character.image
      }).then(webhook => webhook.send({ content: cleanMessage(message.content, character.bracket), files: addAttachment(message.attachments)}))
      .catch(console.error);
    } else
    {
      channelHooks.first().edit({
        name: character.name,
        avatar: character.image
      }).then(webhook => webhook.send({ content: cleanMessage(message.content, character.bracket), files: addAttachment(message.attachments)}))
      .catch(console.error);
    }
  }

}

export { sendProxy };
