export const cleanStages = (definition: Record<string, unknown>): Record<string, unknown> => {
  if (!(definition && (definition.stages || definition.Stages))) return definition;

  const newDefinition = { ...definition };

  delete newDefinition.stages;
  delete newDefinition.Stages;

  return newDefinition
};
