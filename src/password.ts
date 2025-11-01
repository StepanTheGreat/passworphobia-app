import { generate_password } from "password-generator";

/** The rust password generator */
function generatePassword(pass: string, chars: string, length: number): string {
    return generate_password(pass, chars, length)
}

/** The extended version of the password generator */
export function genPassword(inputPass: string, salt: string, chars: string, length: number): string {
    let totalStr = inputPass+salt;
    return generatePassword(totalStr, chars, length);
}