import escape from 'escape-html';

export const escapeInput = (input: string): string => {
  return escape(input);
};
