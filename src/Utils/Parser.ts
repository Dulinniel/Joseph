import { GuildMember } from "discord.js";
import { IExperience } from "../Interfaces/Models";

class VariableNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'VariableNotFoundError';
  }
}

class FunctionNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FunctionNotFoundError';
  }
}

function cleanText(text: string): [ string, string ] {
  let cleanText: string = text.trim();
  const matchVariable = cleanText.match(/\$\w+(\([\w\s]+\))?/);
  
  if (matchVariable) 
  {
    cleanText = cleanText.replace(matchVariable[0], "").trim();
  }

  return [ cleanText, matchVariable[0] ];
}

function getValueFromVariable(text: string, member: GuildMember, userSchema?: IExperience): string {
  const variables: { [key: string]: string } = {
    '$username': member.user.username,
    '$global': member.user.globalName,
    '$guild': member.guild.name,
    '$nick': member.displayName,
    '$id': member.user.id,
    '$level': ( userSchema ) ? userSchema.level.toString() : ( ( Math.random() * 99 ) + 1 ).toString(),
    '$xp': ( userSchema ) ? userSchema.xp.toString() : ( ( Math.random() * 99 ) + 1 ).toString()
  };
  
  for (const variable in variables) {
    if (text.includes(variable) ) 
    {
      text = text.replaceAll(variable, variables[variable]);
    }
  }

  if ( text.includes("$") )
  {
    const [ clean, variable ] = cleanText(text);
    throw new VariableNotFoundError(`La variable ${variable} n'existe pas`);
  } else return text;
}

function getValueFromFunction(text: string): string {       
  const functions: { [key: string]: string } = {
    '@log': `Math.log`,
    '@cos': `Math.cos`,
    '@sin': `Math.sin`,
    '@tan': `Math.tan`,
    '@floor': `Math.floor`,
    '@round': `Math.round`
  };

  for ( const func in functions ) {
    if ( text.includes(func) )
    {
      text = text.replaceAll(func, functions[func]);
    }
  }

  if ( text.includes("@") )
  {
    const [ clean, func ] = cleanText(text);
    throw new FunctionNotFoundError(`La fonction ${func} n'existe pas`);
  } else return text;

};

function parseParams(params: string): string[] {
  return params.split(',').map(param => param.trim().replace(/@/g, ''));
}

function ParseSystem(text: string, member: GuildMember, userSchema?: IExperience): string {
  let newText = text;

  while (newText.includes("@") || newText.includes('$')) {
    newText = getValueFromVariable(getValueFromFunction(newText), member, userSchema);
  }

  return newText;
}

function ParseSystemVariables(text: string, member: GuildMember, userSchema?: IExperience): string {
  return getValueFromVariable(text, member, userSchema);
}

function ParseSystemFunctions(text: string): string {
  return getValueFromFunction(text);
}

export { ParseSystem, ParseSystemVariables, ParseSystemFunctions, VariableNotFoundError, FunctionNotFoundError };
