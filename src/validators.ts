import { AllValidationsClass } from "./validations";
import { Inclusivity, TimeRanges } from "./interfaces/validators.interface";
export {
  Inclusivity,
  TimeRanges,
  AllValidatorKeysT,
  AllValidatorParamsT,
} from "./interfaces/validators.interface";

/**
 * Conjunto de validadores para los controles de los formularios.
 *
 * @export
 */
export class AllValidators {
  /**
   * Validador de correo electrónico (email).
   *
   * @returns función de validación
   */
  static email(value: string): boolean {
    return AllValidationsClass.isValidEmail(value);
  }

  /**
   * Validador de número de cuenta corriente.
   *
   * @returns función de validación
   */
  static ccc(value: string): boolean {
    return AllValidationsClass.isValidCCC(value);
  }

  /**
   * Validador de número de tarjeta de crédito.
   * Devuelve el validador en función del tipo de tarjeta si se ha especificado.
   *
   * @param [type] tipo de tarjeta de crédito
   * @returns función de validación
   */
  static creditCardNumber(value: string, type?: string): boolean {
    return AllValidationsClass.isValidCreditCardNumber(value, type);
  }

  /**
   * Validador de IBAN.
   *
   * @returns función de validación
   */
  static iban(value: string): boolean {
    return AllValidationsClass.isValidIBAN(value);
  }

  /**
   * Validador de BIC/SWIFT.
   *
   * @returns función de validación
   */
  static bic(value: string): boolean {
    return AllValidationsClass.isValidBIC(value);
  }

  /**
   * Validador de DNI.
   *
   * @returns función de validación
   */
  static dni(value: string): boolean {
    return AllValidationsClass.isValidDNI(value);
  }

  /**
   * Validador de NIE.
   *
   * @returns función de validación
   */
  static nie(value: string): boolean {
    return AllValidationsClass.isValidNIE(value);
  }

  /**
   * Validador de CIF.
   *
   * @returns función de validación
   */
  static cif(value: string): boolean {
    return AllValidationsClass.isValidCIF(value);
  }

  /**
   * Validador de pasaporte.
   *
   * @returns función de validación
   */
  static passport(value: string): boolean {
    return AllValidationsClass.isValidPassport(value);
  }

  /**
   * Validador de fecha.
   *
   * @returns función de validación
   */
  static date(value: string): boolean {
    return AllValidationsClass.isValidDate(value);
  }

  /**
   * Validador de fecha posterior.
   *
   * @param compare Fecha con la que se compara
   * @param [precision] Precisón
   * @returns función de validación
   */
  static isAfterDate(
    value: string,
    compare: any,
    precision?: TimeRanges
  ): boolean {
    return AllValidationsClass.isAfterDate(value, compare, precision);
  }

  /**
   * Validador de fecha anterior.
   *
   * @param compare Fecha con la que se compara
   * @param [precision] Precisón
   * @returns función de validación
   */
  static isBeforeDate(
    value: string,
    compare: any,
    precision?: TimeRanges
  ): boolean {
    return AllValidationsClass.isBeforeDate(value, compare, precision);
  }

  /**
   * Validador de igualdad de fechas
   *
   * @param compare Fecha con la que se compara
   * @param [precision] Precisón
   * @returns función de validación
   */
  static isSameDate(
    value: string,
    compare: any,
    precision?: TimeRanges
  ): boolean {
    return AllValidationsClass.isSameDate(value, compare, precision);
  }

  /**
   * Validador de fecha igual o posterior.
   *
   * @param compare Fecha con la que se compara
   * @param [precision] Precisón
   * @returns función de validación
   */
  static isSameOrAfterDate(
    value: string,
    compare: any,
    precision?: TimeRanges
  ): boolean {
    return AllValidationsClass.isSameOrAfterDate(value, compare, precision);
  }

  /**
   * Validador de fecha igual o anterior.
   *
   * @param compare Fecha con la que se compara
   * @param [precision] Precisón
   * @returns función de validación
   */
  static isSameOrBeforeDate(
    value: string,
    compare: any,
    precision?: TimeRanges
  ): boolean {
    return AllValidationsClass.isSameOrBeforeDate(value, compare, precision);
  }

  /**
   * Validador de rango de fechas.
   *
   * @param start Fecha de inicio
   * @param end Fecha de fin
   * @param [inclusivity] Inclusividad de la comparación
   * @param [precision] Precisión
   * @returns función de validación
   */
  static isBetweenDates(
    value: string,
    start: any,
    end: any,
    precision?: TimeRanges,
    inclusivity?: Inclusivity
  ): boolean {
    return AllValidationsClass.isBetweenDates(
      value,
      start,
      end,
      precision,
      inclusivity
    );
  }

  /**
   * Validador de valor máximo permitido
   *
   * @param maxValue valor máximo
   * @returns función de validación
   */
  static max(value: number, maxValue: number): boolean {
    return (
      isNaN(value) ||
      isNaN(maxValue) ||
      parseFloat(value.toString()) <= parseFloat(maxValue as any)
    );
  }

  /**
   * Validador de valor mínimo permitido
   *
   * @param minValue valor mínimo
   * @returns función de validación
   */
  static min(value: number, minValue: number): boolean {
    return (
      isNaN(value) ||
      isNaN(minValue) ||
      parseFloat(value.toString()) >= parseFloat(minValue as any)
    );
  }

  /**
   * Comprueba si un valor es numérico teniendo en cuenta si se quiere que sean números decimales y si se quieren separadores de miles
   *
   * @param [decimal=true] Indica si la validación tiene que ser de decimal o entero
   * @param [separators] Indica si la validación tiene que ser con separador de miles
   * @returns función de validación
   */
  static isNumber(
    value: string,
    decimal: boolean = true,
    separators?: boolean
  ): boolean {
    return AllValidationsClass.isNumber(value, decimal, separators);
  }

  /**
   * Comprueba si un valor está vacio.
   *
   * @param value valor a comprobar
   * @returns función de validación
   */
  static isEmpty(value: any): boolean {
    return value === null || (typeof value === "string" && value.length === 0);
  }
}
