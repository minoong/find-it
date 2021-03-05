interface ICookies {
  [key: string]: string;
}

export const cookieParse = (cookies: string): ICookies => {
  const temp: string[] = (cookies?.split(/\s*;\s*/g) as string[]) || [];

  return temp.reduce((acc, value) => {
    const [k, v] = value.split(/\s*=\s*/g);

    acc = {
      ...acc,
      [k]: v,
    };

    return acc;
  }, {});
};

export const getNumber = (string: string) => {
  const numbers = string.match(/\d/g)?.join('');

  if (numbers) {
    return Number(numbers);
  }
  return null;
};
