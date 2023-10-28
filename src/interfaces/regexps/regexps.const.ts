export const VALIDATORS_REGEXPS: any = {
  DNI_LETTERS: "TRWAGMYFPDXBNJZSQVHLCKE",

  /**
   * Expresión regular DNI válido.
   */
  DNI_REGEX: /^(([0-9]{8}[A-Z])|([KL][0-9]{7}[A-Z]))$/,

  /**
   * Expresión regular CIF válido.
   */
  CIF_REGEX:
    /^(([ABCDEFGHJUV][0-9]{7}[0-9])|([NPQRSW][0-9]{7}[A-J])|([0-9]{8}[A-Z]))$/,

  CIF_FIRST_LETTERS: ["N", "P", "Q", "R", "S", "W"],

  CIF_CONTROL_LETTERS: ["J", "A", "B", "C", "D", "E", "F", "G", "H", "I"],

  CIF_SPECIAL_PREFIX: "00",

  /**
   * Expresión regular NIE válido.
   */
  NIE_REGEX: /^[XYZ]\d{7,8}[A-Z]$/,

  /**
   * Expresión regular pasaporte válido.
   */
  PASSPORT_REGEX: /^([A-Z0-9]{6,15})$/,

  /**
   * Expresión regular BIC válido.
   */
  BIC_REGEX: /^([a-zA-Z]){4}([a-zA-Z]){2}([0-9a-zA-Z]){2}([0-9a-zA-Z]{3})?$/,

  /**
   * Expresión regular para eliminar separadores
   */
  SEPARATORS_REGEX: /[-\s]/g,

  /**
   * Expresión regular para validar formato de cuenta corriente
   */
  CCC_REGEX: /^([0-9]){20}/,

  /**
   * Pesos para el cálculo de los dígitos de control de un número de cuenta bancaria
   */
  CCC_NUMBERS: [1, 2, 4, 8, 5, 10, 9, 7, 3, 6],

  /* eslint-disable max-len */
  /**
   * Expresión regular para validar el formato de una dirección de correo electrónico (email)
   * Github Copilot:
   */
  EMAIL_REGEX:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};
