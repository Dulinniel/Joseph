import { GuildMember, EmbedBuilder, inlineCode } from "discord.js";
import { Modules } from "../../../../../Database/Models";
import { Subcommand } from "../../../../../Interfaces";
import { ParseSystemFunctions, ParseSystem } from "../../../../../Utils/Parser";

export const subcommand: Subcommand =
{
  name: "config.xp.formula",
  description: "Gère les formules du système d'Xp",
  type: 1,
  options: [{
    name: "level",
    description: "La formule à utiliser pour la monté de niveau",
    type: 3,
    required: true
  },{
    name: 'xp',
    description: "La formule à utiliser pour gagner de l'Xp",
    type: 3,
    required: false
  },{
    name: 'rate',
    description: "La formule à utiliser pour gérer le taux d'xp nécessaire à la monté de niveau",
    type: 3,
    required: false
  }], async execute( client, interaction ) {

    const formulaLevel = interaction.options.getString('level');
    const formulaXp = interaction.options.getString('xp');
    const formulaRate = interaction.options.getString('rate');
    const Member = interaction.member as GuildMember;
    const ModuleInfo = await client.service.GetInfo(Modules, { guild_id: interaction.guild.id, name: "Xp" });
    try {
      
      let toStorableFunctionXp, toStorableFunctionRate;

      const toStorableFunctionLevel = ParseSystemFunctions(formulaLevel);
      if ( formulaXp ) toStorableFunctionXp = ParseSystemFunctions(fomulaXp);
      if ( formulaRate ) toStorableFunctionRate = ParseSystemFunctions(formulaRate);

      const evaluations  = [ eval(ParseSystem(toStorableFunctionLevel, Member)), eval(ParseSystem(toStorableFunctionXp, Member)), eval(ParseSystem(toStorableFunctionRate, Member)) ];
      if ( !evaluations.has(-Infinity) || !evaluations.has(Infinity) || !evaluations.has(NaN) )
      {

        ModuleInfo.configuration.formulas = { 
          level: toStorableFunctionLevel,
          xp: ( formulaXp ) ? toStorableFunctionXp : undefined,
          rate: ( formulaRate ) ? toStorableFunctionRate : undefined
        };

        await client.service.UpdateInfo(Modules,
          { guild_id: interaction.guild.id, configuration: ModuleInfo.configuration },
          { guild_id: interaction.guild.id, name: "Xp" }
        ).then(u => console.log(u));

        const UpdateEmbed = new EmbedBuilder()
          .setColor(0x0D1A4F)
          .setTitle("La formule de monté de niveau a été mise à jour")
          .setDescription(`La nouvelle formule est: ${inlineCode(toStorableFunction)}`)
          .setFooter({ text: "Une formule a été mise-à-jour" })
          .setTimestamp();

        interaction.reply({ embeds: [ UpdateEmbed ] });
      } 
      else 
      {
        interaction.reply({ content: `Valeur illégal: ${evaled}, entrez une nouvelle formule` });
      } 
    } catch ( e ) {
      if ( e instanceof Error ) interaction.reply({content: `Oh, une erreur est apparue envoie la sur le support\n${e.message.toString()}` });
    } 

  }
}
