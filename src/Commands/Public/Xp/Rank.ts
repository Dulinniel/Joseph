import { AttachmentBuilder } from "discord.js";
import { createCanvas, loadImage } from "canvas";
import { Command } from "../../../Interfaces";
import { drawText, map } from "../../../Utils/Draw";

export const command: Command =
{
  categorie: "Xp",
  developer: false,
  payload:
  {
    name: "rank",
    type: 1,
    description: "Donne ton Xp et ton niveau actuel",
    options: [{
      name: "user",
      description: "Une personne dont tu veux l'Xp",
      type: 6,
      required: false
    }]
  },

  async execute( client, interaction )
  {
    let user = interaction.options.getUser("user");

    if ( !user ) user = interaction.user;

    const canvas = createCanvas(1800, 1200);
    const ctx = canvas.getContext('2d');

    const RegisterdMember = await client.service.GetUserInfo({ userID: user.id }, 0);

    const profilePicture = await loadImage(user.displayAvatarURL({ extension: "png" }));

    const cursorPosition = map(RegisterdMember.experience, 0, RegisterdMember.requis, 220, 1520);

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(profilePicture, 230, 400, 400, 400);

    for ( let i = 0; i < 200; i++ ) {
      ctx.fillStyle = "#dda0dd";
      ctx.beginPath();
      ctx.lineWidth = 14;
      ctx.strokeStyle = "#dda0dd";
      ctx.arc(200 + ( i * 6.5 ) + 20, 900, 60, 0, Math.PI * 2, true);
      ctx.stroke();
      ctx.fill();
    }

    ctx.beginPath();
    ctx.fillStyle = "#ffd1dc";
    ctx.arc(cursorPosition, 900, 60, 0, Math.PI * 2, true);
    ctx.fill();

    drawText(ctx,
                  { x: 650, y: 490 },
                  { content: user.username, size: 70, font: "Helvetica", color: "#000000" });

    drawText(ctx,
                  { x: 650, y: 650 },
                  { content: `${RegisterdMember.experience}/${RegisterdMember.requis}`, size: 100, font: "Helvetica", color: "#000000" });

    drawText(ctx,
                  { x: 650, y: 780 },
                  { content: `Level: ${RegisterdMember.level}`, size: 60, font: "Helvetica", color: "#000000" });

    const RankImage = new AttachmentBuilder(canvas.toBuffer('image/jpeg', { quality: 2 }))
      .setName(`${user.username}_rank.jpeg`)

    interaction.reply({
      files: [ RankImage ]
    });

  }
}
