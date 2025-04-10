export const translate = (key: string, defaultMessage: string) => {
  return {
    id: `dashboard-builder.${key}`,
    defaultMessage,
  };
};
