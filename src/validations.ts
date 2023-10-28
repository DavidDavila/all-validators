import Card from "creditcards/card";
import CardTypes from "creditcards/types";
import dayjs, { extend, OpUnitType } from "dayjs";
import AdvancedFormat from "dayjs/plugin/advancedFormat";
import BuddhistEra from "dayjs/plugin/buddhistEra";
import CustomParseFormat from "dayjs/plugin/customParseFormat";
import DayOfYear from "dayjs/plugin/dayOfYear";
import IsBetween from "dayjs/plugin/isBetween";
import IsLeapYear from "dayjs/plugin/isLeapYear";
import IsSameOrAfter from "dayjs/plugin/isSameOrAfter";
import IsSameOrBefore from "dayjs/plugin/isSameOrBefore";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import QuarterOfYear from "dayjs/plugin/quarterOfYear";
import RelativeTime from "dayjs/plugin/relativeTime";
import WeekOfYear from "dayjs/plugin/weekOfYear";
import { isValid } from "iban";
import { VALIDATORS_REGEXPS } from "./interfaces/regexps/regexps.const";

extend(AdvancedFormat);
extend(RelativeTime);
extend(LocalizedFormat);
extend(IsLeapYear);
extend(BuddhistEra);
extend(WeekOfYear);
extend(IsSameOrAfter);
extend(IsSameOrBefore);
extend(IsBetween);
extend(DayOfYear);
extend(QuarterOfYear);
extend(CustomParseFormat);

// new BkDate();

/**
 * Clase de validaciones.
 *
 * Proporciona distintas validaciones para los casos de usos comunes de una aplicación.
 *
 * @export
 */
export class AllValidationsClass {
  // https://gist.github.com/afgomez/5691823
  private static card = new Card(CardTypes.defaults);

  /**
   * Valida que una cuenta de correo electrónico sea válida.
   *
   * @param email correo a validar
   * @returns si el correo es válido
   */
  static isValidEmail(email: string): boolean {
    return (
      email &&
      typeof email === "string" &&
      VALIDATORS_REGEXPS.EMAIL_REGEX.test(email)
    );
  }

  /**
   * Valida que el número de cuenta corriente sea válido. Solo aplica a cuentas
   * corrientes en España con formato EEEE-OOOO-CC-AAAAAAAAAA.
   * EEEE = Entidad
   * OOOO = Oficina
   * CC = Dígito de control
   * AAAAAAAAAA = Número identificativo de la cuenta
   *
   * @param ccc número de cuenta corriente a validar
   * @returns si el número de cuenta corriente es válido
   */
  static isValidCCC(ccc: string): boolean {
    if (ccc && typeof ccc === "string") {
      ccc = ccc.replace(VALIDATORS_REGEXPS.SEPARATORS_REGEX, "");

      if (!VALIDATORS_REGEXPS.CCC_REGEX.test(ccc)) {
        return false;
      }

      const entityAndOffice = "00" + ccc.substring(0, 8);
      const checkDigits = ccc.substring(8, 10);
      const account = ccc.substring(10, 20);

      return (
        checkDigits ===
        AllValidationsClass.calcCheckDigit(entityAndOffice) +
          AllValidationsClass.calcCheckDigit(account)
      );
    } else {
      return false;
    }
  }

  /**
   * Valida que un número de tarjeta de crédito sea válido. Si no se especifica tipo,
   * se tomará como válido el número si valida  con cualquier tipo existente.
   *
   * @param cardNumber número de la tarjeta de crédito a validar
   * @param [cardType] tipo de tarjeta de crédito
   * @returns si el número de tarjeta es válido
   */
  static isValidCreditCardNumber(
    cardNumber: string,
    cardType?: string
  ): boolean {
    return (
      cardNumber &&
      typeof cardNumber === "string" &&
      this.card.isValid(
        cardNumber.replace(VALIDATORS_REGEXPS.SEPARATORS_REGEX, ""),
        cardType
      )
    );
  }

  /**
   * Valida que un código BIC/SWIFT sea válido
   *
   * @param bic BIC/SWIFT a validar
   * @returns si el BIC/SWIFT es válido
   */
  static isValidBIC(bic: string): boolean {
    return (
      bic && typeof bic === "string" && VALIDATORS_REGEXPS.BIC_REGEX.test(bic)
    );
  }

  /**
   * Valida que un IBAN sea válido
   *
   * @param iban IBAN a validar
   * @returns si el IBAN es válido
   */
  static isValidIBAN(iban: string): boolean {
    if (iban && typeof iban === "string") {
      return isValid(iban);
    } else {
      return false;
    }
  }

  /**
   * Valida que un DNI sea válido.
   *
   * @param dni DNI a validar
   * @returns Si el DNI es válido
   */
  static isValidDNI(dni: string): boolean {
    if (dni && typeof dni === "string") {
      dni = dni.toUpperCase();
      if (VALIDATORS_REGEXPS.DNI_REGEX.test(dni)) {
        const letter = VALIDATORS_REGEXPS.DNI_LETTERS.charAt(
          parseInt(dni, 10) % 23
        );
        return letter === dni.charAt(8);
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  /**
   * Valida que un NIE sea válido.
   *
   * @param nie NIE a validar
   * @returns Si el NIE es válido
   */
  static isValidNIE(nie: string): boolean {
    if (nie && typeof nie === "string") {
      nie = nie.toUpperCase();
      if (VALIDATORS_REGEXPS.NIE_REGEX.test(nie)) {
        let prefix: string | number = nie.charAt(0);

        switch (prefix) {
          case "X":
            prefix = 0;
            break;
          case "Y":
            prefix = 1;
            break;
          case "Z":
            prefix = 2;
            break;
          default:
            break;
        }

        return AllValidationsClass.isValidDNI(
          prefix.toString() + nie.substring(1)
        );
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  /**
   * Valida que un CIF sea válido.
   *
   * @param cif CIF a validar
   * @returns Si el CIF es válido
   */
  static isValidCIF(cif: string): boolean {
    if (
      cif &&
      typeof cif === "string" &&
      VALIDATORS_REGEXPS.CIF_REGEX.test(cif)
    ) {
      const firstLetter = cif.charAt(0);
      const digits = cif.substring(1, cif.length - 1);
      const extractedControlDigit = cif.charAt(cif.length - 1);
      const controlDigitMustBeALetter =
        digits.startsWith(VALIDATORS_REGEXPS.CIF_SPECIAL_PREFIX) ||
        VALIDATORS_REGEXPS.CIF_FIRST_LETTERS.includes(firstLetter);
      const calculatedControlDigit =
        AllValidationsClass.calculateControlDigit(
          digits,
          controlDigitMustBeALetter
        );
      if (
        extractedControlDigit.toUpperCase() ===
        calculatedControlDigit.toUpperCase()
      ) {
        return true;
      }
    }
    return false;
  }

  static calculateControlDigit(
    digits: string,
    controlDigitMustBeALetter: boolean
  ): string {
    const sum =
      AllValidationsClass.sumEvenDigits(digits) +
      AllValidationsClass.sumOddDigits(digits);
    const units = sum % 10;
    let control = 0;
    let strControl: string;
    if (units > 0) {
      control = 10 - units;
    }
    if (controlDigitMustBeALetter) {
      strControl = VALIDATORS_REGEXPS.CIF_CONTROL_LETTERS[control];
    } else {
      strControl = control.toString();
    }
    return strControl;
  }

  static sumEvenDigits(digits: string): number {
    let sum = 0;
    for (let pos = 1; pos < digits.length; pos += 2) {
      sum += parseInt(digits.substring(pos, pos + 1), 10);
    }
    return sum;
  }

  static sumOddDigits(digits: string): number {
    let sum = 0;
    let tempSum: number;
    for (let pos = 0; pos < digits.length; pos += 2) {
      tempSum = 2 * parseInt(digits.substring(pos, pos + 1), 10);
      if (tempSum >= 10) {
        // tens + units
        tempSum = Math.trunc(tempSum / 10) + (tempSum % 10);
      }
      sum += tempSum;
    }
    return sum;
  }

  /**
   * Valida que un Pasaporte sea válido.
   *
   * @param passport pasaporte a validar
   * @returns Si el pasaporte es válido
   */
  static isValidPassport(passport: string): boolean {
    if (passport && typeof passport === "string") {
      return VALIDATORS_REGEXPS.PASSPORT_REGEX.test(passport);
    } else {
      return false;
    }
  }

  /**
   * Valida si una fecha es válida.
   *
   * @param date Fecha a validar
   * @returns Si la fecha es válida
   */
  static isValidDate(date: Date | string | number): boolean;

  /**
   * Valida si una fecha es válida con un formato específico.
   *
   * @param date Fecha a validar
   * @param format Formato de la fecha
   * @returns Si la fecha es válida
   */
  static isValidDate(date: string, format: string): boolean;

  /**
   * Valida si una fecha es válida con un formato específico.
   *
   * @param date Fecha a validar
   * @param [format] Formato de la fecha
   * @returns Si la fecha es válida
   */
  static isValidDate(date: string, format?: string): boolean {
    if (date) {
      const dayjsDate = dayjs(new Date(date));
      if (!format) {
        return dayjsDate.isValid();
      } else if (typeof date === "string" && format) {
        return dayjsDate.isValid() && dayjsDate.format(format) === date;
      } else {
        return dayjsDate.isValid();
      }
    } else {
      return false;
    }
  }

  /**
   * Valida si una fecha es posterior a otra.
   *
   * @param date Fecha a validar
   * @param compareDate Fecha a comparar
   * @param [precision] Precisión
   * @returns Si la fecha es posterior a otra
   */
  static isAfterDate(
    date: Date | string | number,
    compareDate: Date | string | number,
    precision?: OpUnitType
  ): boolean {
    if (date && compareDate) {
      return dayjs(date).isAfter(dayjs(compareDate), precision);
    } else {
      return false;
    }
  }

  /**
   * Valida si una fecha es anterior a otra.
   *
   * @param date Fecha a validar
   * @param compareDate Fecha a comparar
   * @param [precision] Precisión
   * @returns Si la fecha es anterior a otra
   */
  static isBeforeDate(
    date: Date | string | number,
    compareDate: Date | string | number,
    precision?: OpUnitType
  ): boolean {
    if (date && compareDate) {
      return dayjs(date).isBefore(dayjs(compareDate), precision);
    } else {
      return false;
    }
  }

  /**
   * Valida si una fecha es igual a otra.
   *
   * @param date Fecha a validar
   * @param compareDate Fecha a comparar
   * @param [precision] Precisión
   * @returns Si la fecha es igual a otra
   */
  static isSameDate(
    date: Date | string | number,
    compareDate: Date | string | number,
    precision?: OpUnitType
  ): boolean {
    if (date && compareDate) {
      return dayjs(date).isSame(dayjs(compareDate), precision);
    } else {
      return false;
    }
  }

  /**
   * Valida si una fecha es igual o posterior a otra.
   *
   * @param date Fecha a validar
   * @param compareDate Fecha a comparar
   * @param [precision] Precisión
   * @returns Si la fecha es igual o posterior a otra
   */
  static isSameOrAfterDate(
    date: Date | string | number,
    compareDate: Date | string | number,
    precision?: OpUnitType
  ): boolean {
    if (date && compareDate) {
      return dayjs(date).isSameOrAfter(dayjs(compareDate), precision);
    } else {
      return false;
    }
  }

  /**
   * Valida si una fecha es igual o anterior a otra.
   *
   * @param date Fecha a validar
   * @param compareDate Fecha a comparar
   * @param [precision] Precisión
   * @returns Si la fecha es igual o anterior a otra
   */
  static isSameOrBeforeDate(
    date: Date | string | number,
    compareDate: Date | string | number,
    precision?: OpUnitType
  ): boolean {
    if (date && compareDate) {
      return dayjs(date).isSameOrBefore(compareDate, precision);
    } else {
      return false;
    }
  }

  /**
   * Valida si una fecha está entre dos fechas dadas.
   *
   * @param date Fecha a validar
   * @param compareDate Fecha a comparar
   * @param precision Precisión
   * @param inclusivity Indica la inclusividad de la comparación
   * @returns Si la fecha está entre las fechas
   */
  static isBetweenDates(
    date: Date | string | number,
    startDate: Date | string | number,
    endDate: Date | string | number,
    precision?: OpUnitType,
    inclusivity?: "()" | "[)" | "(]" | "[]"
  ): boolean {
    if (date && startDate && endDate) {
      return dayjs(date).isBetween(startDate, endDate, precision, inclusivity);
    } else {
      return false;
    }
  }

  /**
   * Valida si un valor es un formato de número correcto, dependiendo de la configuración especificada
   *
   * @param value Dato a comprobar
   * @param [decimal] Indica si el número es decimal o entero
   * @param [separators] Indica si el número lleva separador de miles
   */
  static isNumber(
    value: string,
    decimal?: boolean,
    separators?: boolean
  ): boolean {
    if (value) {
      return AllValidationsClass.buildNumberRegex(decimal, separators).test(
        value
      );
    } else {
      return false;
    }
  }

  /**
   * Obtiene la expresión regular para validar el número
   *
   *
   * @param [decimal=true] Indica si el número es decimal o entero.
   * @param [separators] Indica si el número lleva separador de miles
   */
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  static buildNumberRegex(
    decimal: boolean = true,
    separators?: boolean,
    localeId: string = "en-US"
  ): RegExp {
    const decimalSymbol = AllValidationsClass.getDecimalSeparator(localeId);
    const decimalSeparator = decimalSymbol === "." ? "\\." : ",";
    const intSeparator = decimalSymbol === "." ? "," : "\\.";
    const decimalPart = decimal === false ? "" : `(${decimalSeparator}(\\d)+)?`;
    const intPart =
      separators === true
        ? `(${intSeparator}\\d{3})*`
        : separators === false
        ? `(\\d{3})*`
        : `((${intSeparator}\\d{3})*|(\\d{3})*)`;
    return new RegExp(`^-?\\d{1,3}${intPart}${decimalPart}$`);
  }

  /**
   * Obtiene el separador de decimales dependiendo del locale
   *
   * @returns separador decimal según locale
   */
  static getDecimalSeparator(localeId: string): string {
    const numberAsString = (1.1).toLocaleString(localeId);
    return numberAsString.charAt(1);
  }

  /**
   * Calcula el dígito de control para un número parcial de cuenta corriente y los pesos.
   *
   *
   * @param num número parcial de cuenta corriente
   * @returns dígito de control
   */
  static calcCheckDigit(num: string): string {
    let checkDigit = 0;

    for (let i = 0; i < num.length; i++) {
      checkDigit +=
        parseInt(num.substring(i, i + 1), 10) *
        VALIDATORS_REGEXPS.CCC_NUMBERS[i];
    }

    checkDigit = 11 - (checkDigit % 11);

    if (checkDigit >= 10) {
      checkDigit = 11 - checkDigit;
    }

    return checkDigit.toString();
  }
}
