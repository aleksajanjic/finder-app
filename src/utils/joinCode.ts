const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no ambiguous 0/O, 1/I
const LENGTH = 6;

export function generateJoinCode(): string {
  let code = "";
  const random = new Uint8Array(LENGTH);
  crypto.getRandomValues(random);
  for (let i = 0; i < LENGTH; i++) {
    code += CHARS[random[i]! % CHARS.length];
  }
  return code;
}
