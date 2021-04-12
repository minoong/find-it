/* eslint-disable max-len */
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

export const makeMoneyString = (input: string) => {
  const amountString = input.replace(/[^0-9]/g, '');
  if (amountString) {
    return parseInt(amountString, 10).toLocaleString();
  }
  return '';
};

export const makeQueryString = (baseUrl: string, queriesObject: Object & { [key: string]: any }) => {
  const keys = Object.keys(queriesObject);
  const values = Object.values(queriesObject);

  if (keys.length === 0) {
    return baseUrl;
  }

  let queryString = `${baseUrl}?`;

  keys.forEach((key, i) => {
    if (queriesObject[key]) {
      queryString += `${keys[i]}=${values[i]}&`;
    }
  });

  return `${queryString.slice(0, -1)}`;
};
