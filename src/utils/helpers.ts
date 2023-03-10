export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function stringAsKey(str: string) {
  return str.toLowerCase().split(/\s+/).join('-');

  // // Auto generated keys  should not begin or end in a hyphen
  // if (temp.charAt(0) == "-") {
  //   temp = temp.slice(1);
  // }

  // if (temp.charAt(temp.length - 1) == "-") {
  //   temp = temp.slice(0, -1);
  // }

  // return temp;
}

export function truncateKey(str: string, len: number = 25): string {
  return str.length > len ? str.substring(0, len) + '...' : str;
}
