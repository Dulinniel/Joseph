function map(x: number, in_min: number, in_max: number, out_min: number, out_max: number): number
{
  return ( x - in_min ) * ( out_max - out_min ) / ( in_max - in_min ) + out_min;
}

function drawText(context, position, textProperty): void
{
  context.save();
  context.font = `${textProperty.size}pt ${textProperty.font}`;
  context.fillStyle = textProperty.color;
  context.fillText(textProperty.content, position.x, position.y);
  context.restore();
}


export { drawText, map }
