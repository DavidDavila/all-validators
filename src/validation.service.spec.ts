import { jest } from "@jest/globals";
import { AllValidationsClass } from "./validations";

describe("ValidationsClass", () => {
  describe("isValidEmail", () => {
    it("Debe devolver true si recibe un email válido (Caso 1)", () => {
      expect(AllValidationsClass.isValidEmail("test@test.com")).toBe(true);
    });

    it("Debe devolver true si recibe un email válido (dominio de un caracter)", () => {
      expect(AllValidationsClass.isValidEmail("test@t.com")).toBe(true);
    });

    it("Debe devolver true si recibe un email válido (terminación de dominio de dos caracteres)", () => {
      expect(AllValidationsClass.isValidEmail("test@test.es")).toBe(true);
    });

    it("Debe devolver true si recibe un email válido (terminación de dominio de más de tres caracteres)", () => {
      expect(AllValidationsClass.isValidEmail("test@test.prueba")).toBe(true);
    });

    it("Debe devolver true si recibe un email válido (una sola letra)", () => {
      expect(AllValidationsClass.isValidEmail("t@test.com")).toBe(true);
    });

    it("Debe devolver true si recibe un email válido (incluyendo símbolo .)", () => {
      expect(AllValidationsClass.isValidEmail("te.st@test.com")).toBe(true);
    });

    it("Debe devolver true si recibe un email válido (incluyendo símbolo +)", () => {
      expect(AllValidationsClass.isValidEmail("te+st@test.com")).toBe(true);
    });

    it("Debe devolver true si recibe un email válido (incluyendo símbolo + al final)", () => {
      expect(AllValidationsClass.isValidEmail("test+@test.com")).toBe(true);
    });

    it("Debe devolver true si recibe un email válido (con subdominio)", () => {
      expect(AllValidationsClass.isValidEmail("test@test.com.es")).toBe(true);
    });

    it("Debe devolver false si recibe un email no válido (terminación de dominio menor a dos caracteres)", () => {
      expect(AllValidationsClass.isValidEmail("test@test.d")).toBe(false);
    });

    it("Debe devolver false si recibe un email no válido (sin terminación de dominio)", () => {
      expect(AllValidationsClass.isValidEmail("test@test")).toBe(false);
    });

    it("Debe devolver false si recibe un email no válido (sin símbolo @)", () => {
      expect(AllValidationsClass.isValidEmail("testtest.com")).toBe(false);
    });
  });

  describe("isValidCCC", () => {
    it("Debe devolver true si recibe un número de cuenta con separadores válido", () => {
      expect(AllValidationsClass.isValidCCC("1421-9460-46-0039365197")).toBe(
        true
      );
    });

    it("Debe devolver true si recibe un número de cuenta válido", () => {
      expect(AllValidationsClass.isValidCCC("52457544266055456101")).toBe(
        true
      );
    });

    it("Debe devolver false si recibe un número de cuenta no válido (faltan números)", () => {
      expect(AllValidationsClass.isValidCCC("5245754426605545610")).toBe(
        false
      );
    });

    it("Debe devolver false si recibe un número de cuenta no válido (número incorrecto)", () => {
      expect(AllValidationsClass.isValidCCC("52457544266055456102")).toBe(
        false
      );
    });

    it("Debe devolver false si recibe un número de cuenta no válido (caracteres no númericos)", () => {
      expect(AllValidationsClass.isValidCCC("5245754A266055456101")).toBe(
        false
      );
    });
  });

  describe("isValidCreditCardNumber", () => {
    it("Debe devolver true si recibe un número de tarjeta de crédito válido", () => {
      expect(
        AllValidationsClass.isValidCreditCardNumber("4556909850278831")
      ).toBe(true);
    });

    it("Debe devolver true si recibe un número de tarjeta de crédito con separadores válido", () => {
      expect(
        AllValidationsClass.isValidCreditCardNumber("4556 9098 5027 8831")
      ).toBe(true);
    });

    it("Debe devolver true si recibe un número de tarjeta de crédito Mastercard válido", () => {
      expect(
        AllValidationsClass.isValidCreditCardNumber(
          "5130296216007597",
          "Mastercard"
        )
      ).toBe(true);
    });

    it("Debe devolver false si recibe un número de tarjeta de crédito no válido", () => {
      expect(
        AllValidationsClass.isValidCreditCardNumber("4556909850278832")
      ).toBe(false);
    });

    it("Debe devolver false si recibe un número de tarjeta de crédito Visa no válido para tipo Mastercard", () => {
      expect(
        AllValidationsClass.isValidCreditCardNumber(
          "4532184347179435",
          "Mastercard"
        )
      ).toBe(false);
    });
  });

  describe("isValidIBAN", () => {
    it("Debe devolver true si recibe un IBAN válido", () => {
      expect(
        AllValidationsClass.isValidIBAN("DE89-3704-0044-0532-0130-00")
      ).toBe(true);
    });

    it("Debe devolver false si recibe un IBAN no válido", () => {
      expect(
        AllValidationsClass.isValidIBAN("DE89-3704-0044-0532-0160-00")
      ).toBe(false);
    });
  });

  describe("isValidBIC", () => {
    it("Debe devolver true si recibe un BIC válido", () => {
      expect(AllValidationsClass.isValidBIC("BAOFESM1XXX")).toBe(true);
    });

    it("Debe devolver false si recibe un BIC no válido (Caso 1)", () => {
      expect(AllValidationsClass.isValidBIC("BAOFESM1XXXX")).toBe(false);
    });

    it("Debe devolver false si recibe un BIC no válido (Caso 2)", () => {
      expect(AllValidationsClass.isValidBIC("B1OFESM1XXX")).toBe(false);
    });

    it("Debe devolver false si recibe un BIC no válido (Caso 3)", () => {
      expect(AllValidationsClass.isValidBIC("BOFESM1123")).toBe(false);
    });
  });

  describe("isValidDNI", () => {
    it("Debe devolver true si recibe un DNI válido con la letra en mayúscula", () => {
      expect(AllValidationsClass.isValidDNI("88385119Y")).toBe(true);
    });

    it("Debe devolver true si recibe un DNI válido con la letra en minúscula", () => {
      expect(AllValidationsClass.isValidDNI("00000001r")).toBe(true);
    });

    it("Debe devolver false si recibe un DNI no válido", () => {
      expect(AllValidationsClass.isValidDNI("88385119P")).toBe(false);
    });

    it("Debe devolver false si recibe vacio", () => {
      // @ts-ignore
      expect(AllValidationsClass.isValidDNI(null)).toBe(false);
    });

    it("Debe devolver false si recibe undefined", () => {
      // @ts-ignore
      expect(AllValidationsClass.isValidDNI(undefined)).toBe(false);
    });
  });

  describe("isValidNIE", () => {
    it("Debe devolver true si recibe un NIE válido con letras en mayúscula", () => {
      expect(AllValidationsClass.isValidNIE("Z1767786B")).toBe(true);
    });

    it("Debe devolver true si recibe un NIE válido con letras en minúscula", () => {
      expect(AllValidationsClass.isValidNIE("z1767786b")).toBe(true);
    });

    it("Debe devolver false si recibe un NIE no válido", () => {
      expect(AllValidationsClass.isValidNIE("Y7277946T")).toBe(false);
    });

    it("Debe devolver false si recibe null", () => {
      // @ts-ignore
      expect(AllValidationsClass.isValidNIE(null)).toBe(false);
    });

    it("Debe devolver false si recibe undefined", () => {
      // @ts-ignore
      expect(AllValidationsClass.isValidNIE(undefined)).toBe(false);
    });
  });

  describe("isValidCIF", () => {
    it("Debe devolver true si recibe un CIF válido con la letra en mayúscula", () => {
      expect(AllValidationsClass.isValidCIF("S0794867B")).toBe(true);
    });

    it("Debe devolver false si recibe un CIF válido con la letra en minúscula", () => {
      expect(AllValidationsClass.isValidCIF("c02435394")).toBe(false);
    });

    it("Debe devolver false si recibe un CIF no válido", () => {
      expect(AllValidationsClass.isValidCIF("S0794867C")).toBe(false);
    });

    it("Debe devolver false si recibe null", () => {
      // @ts-ignore
      expect(AllValidationsClass.isValidCIF(null)).toBe(false);
    });

    it("Debe devolver false si recibe undefined", () => {
      // @ts-ignore
      expect(AllValidationsClass.isValidCIF(undefined)).toBe(false);
    });
  });

  describe("isValidPassport", () => {
    it("Debe devolver true si recibe un passport válido con la letra en mayúscula", () => {
      expect(AllValidationsClass.isValidPassport("P552136")).toBe(true);
    });

    it("Debe devolver false si recibe un passport válido con la letra en minúscula", () => {
      expect(AllValidationsClass.isValidPassport("p552136")).toBe(false);
    });

    it("Debe devolver false si recibe un passport no válido", () => {
      expect(AllValidationsClass.isValidPassport("12312512312345123")).toBe(
        false
      );
    });

    it("Debe devolver false si recibe null", () => {
      // @ts-ignore
      expect(AllValidationsClass.isValidPassport(null)).toBe(false);
    });

    it("Debe devolver false si recibe undefined", () => {
      // @ts-ignore
      expect(AllValidationsClass.isValidPassport(undefined)).toBe(false);
    });
  });

  describe("isValidDate", () => {
    it("Debe devolver true si recibe una fecha válida", () => {
      expect(AllValidationsClass.isValidDate("2016-02-10")).toBe(true);
    });

    it(`Debe devolver true al enviar una fecha sin enviar formato,
    y recibe una fecha valida en formato pero no valida como valor en string`, () => {
      expect(AllValidationsClass.isValidDate("2016-02-30")).toBe(true);
    });

    it(`Debe devolver false al enviar una fecha enviando formato,
    y recibe una fecha valida en formato pero no valida como valor en string`, () => {
      expect(
        AllValidationsClass.isValidDate("2016-02-30", "YYYY-MM-DD")
      ).toBe(false);
    });

    it("Debe devolver true si recibe una fecha válida en formato timestamp", () => {
      expect(AllValidationsClass.isValidDate(1477037388098)).toBe(true);
    });

    it("Debe devolver false si recibe null", () => {
      // @ts-ignore
      expect(AllValidationsClass.isValidDate(null)).toBe(false);
    });

    it("Debe devolver false si recibe undefined", () => {
      // @ts-ignore
      expect(AllValidationsClass.isValidDate(undefined)).toBe(false);
    });
  });

  describe("isAfterDate", () => {
    it("Debe devolver true si la primera fecha es posterior a la segunda", () => {
      expect(
        AllValidationsClass.isAfterDate("2016-02-10", "2016-02-09")
      ).toBe(true);
    });

    it("Debe devolver false si la primera fecha es anterior a la segunda", () => {
      expect(
        AllValidationsClass.isAfterDate("2016-02-10", "2016-02-11")
      ).toBe(false);
    });
  });

  describe("isBeforeDate", () => {
    it("Debe devolver false si la primera fecha es posterior a la segunda", () => {
      expect(
        AllValidationsClass.isBeforeDate("2016-02-10", "2016-02-09")
      ).toBe(false);
    });

    it("Debe devolver true si la primera fecha es anterior a la segunda", () => {
      expect(
        AllValidationsClass.isBeforeDate("2016-02-10", "2016-02-11")
      ).toBe(true);
    });
  });

  describe("isSameDate", () => {
    it("Debe devolver false si las fechas no son iguales", () => {
      expect(AllValidationsClass.isSameDate("2016-02-19", "2016-02-09")).toBe(
        false
      );
    });

    it("Debe devolver true si las fechas son iguales", () => {
      expect(AllValidationsClass.isSameDate("2016-02-11", "2016-02-11")).toBe(
        true
      );
    });
  });

  describe("isSameOrAfterDate", () => {
    it("Debe devolver false si la fecha no es igual o posterior", () => {
      expect(
        AllValidationsClass.isSameOrAfterDate("2016-01-19", "2016-02-09")
      ).toBe(false);
    });

    it("Debe devolver true si las fechas son iguales", () => {
      expect(
        AllValidationsClass.isSameOrAfterDate("2016-02-11", "2016-02-11")
      ).toBe(true);
    });

    it("Debe devolver true si las fecha es posterior", () => {
      expect(
        AllValidationsClass.isSameOrAfterDate("2016-02-12", "2016-02-11")
      ).toBe(true);
    });
  });

  describe("isSameOrBeforeDate", () => {
    it("Debe devolver false si la fecha no es igual o anterior", () => {
      expect(
        AllValidationsClass.isSameOrBeforeDate("2016-03-19", "2016-02-09")
      ).toBe(false);
    });

    it("Debe devolver true si las fechas son iguales", () => {
      expect(
        AllValidationsClass.isSameOrBeforeDate("2016-02-11", "2016-02-11")
      ).toBe(true);
    });

    it("Debe devolver true si las fecha es anterior", () => {
      expect(
        AllValidationsClass.isSameOrBeforeDate("2016-01-12", "2016-02-11")
      ).toBe(true);
    });
  });

  describe("isBetweenDates", () => {
    it("Debe devolver false si la fecha no está entre las fechas recibidas", () => {
      expect(
        AllValidationsClass.isBetweenDates(
          "2016-03-19",
          "2016-03-29",
          "2016-04-20"
        )
      ).toBe(false);
    });

    it("Debe devolver true si la fecha está entre las fechas recibidas", () => {
      expect(
        AllValidationsClass.isBetweenDates(
          "2016-03-19",
          "2016-02-09",
          "2016-04-20"
        )
      ).toBe(true);
    });

    it("Debe devolver false si la fecha es igual a la fecha de inicio", () => {
      expect(
        AllValidationsClass.isBetweenDates(
          "2016-03-19",
          "2016-03-19",
          "2016-04-20"
        )
      ).toBe(false);
    });

    it("Debe devolver false si la fecha es igual a la fecha de fin", () => {
      expect(
        AllValidationsClass.isBetweenDates(
          "2016-04-20",
          "2016-03-19",
          "2016-04-20"
        )
      ).toBe(false);
    });

    it("Debe devolver false si la fecha es igual a la fecha de fin y se excluye la fecha de fin", () => {
      expect(
        AllValidationsClass.isBetweenDates(
          "2016-04-20",
          "2016-03-19",
          "2016-04-20",
          //@ts-ignore
          null,
          "[)"
        )
      ).toBe(false);
    });
  });
  describe("buildNumberRegex", () => {
    beforeEach(() => {
      jest
        .spyOn(AllValidationsClass, "getDecimalSeparator" as any)
        .mockImplementation(() => ".");
    });
    describe("Números enteros", () => {
      it("con o sin separador de miles", () => {
        const isDecimal = false;
        const expectedRegExp = /^-?\d{1,3}((,\d{3})*|(\d{3})*)$/;
        expect(AllValidationsClass.buildNumberRegex(isDecimal)).toEqual(
          expectedRegExp
        );
      });
      it("solo con separador de miles", () => {
        const isDecimal = false;
        const hasSeparators = true;
        const expectedRegExp = /^-?\d{1,3}(,\d{3})*$/;
        expect(
          AllValidationsClass.buildNumberRegex(isDecimal, hasSeparators)
        ).toEqual(expectedRegExp);
      });
      it("sin separador de miles", () => {
        const isDecimal = false;
        const hasSeparators = false;
        const expectedRegExp = /^-?\d{1,3}(\d{3})*$/;
        expect(
          AllValidationsClass.buildNumberRegex(isDecimal, hasSeparators)
        ).toEqual(expectedRegExp);
      });
    });
    describe("Números decimales", () => {
      it("positivos y negativos con o sin separador de miles", () => {
        const isDecimal = true;
        const expectedRegExp = /^-?\d{1,3}((,\d{3})*|(\d{3})*)(\.(\d)+)?$/;
        expect(AllValidationsClass.buildNumberRegex(isDecimal)).toEqual(
          expectedRegExp
        );
      });
      it("con separador de miles", () => {
        const isDecimal = true;
        const hasSeparators = true;
        const expectedRegExp = /^-?\d{1,3}(,\d{3})*(\.(\d)+)?$/;
        expect(
          AllValidationsClass.buildNumberRegex(isDecimal, hasSeparators)
        ).toEqual(expectedRegExp);
      });
      it("sin separador de miles", () => {
        const isDecimal = true;
        const hasSeparators = false;
        const expectedRegExp = /^-?\d{1,3}(\d{3})*(\.(\d)+)?$/;
        expect(
          AllValidationsClass.buildNumberRegex(isDecimal, hasSeparators)
        ).toEqual(expectedRegExp);
      });
    });
  });
});
describe("BkValidationvalidations isNumber", () => {
  let validations = AllValidationsClass;

  describe("independientes del locale", () => {
    beforeEach(() => {
      jest
        .spyOn(validations, "getDecimalSeparator" as any)
        .mockImplementation(() => ".");
    });
    it("Debe devolver false si se introducen letras", () => {
      expect(AllValidationsClass.isNumber("test")).toBe(false);
    });
    it("Debe devolver false si se introduce una combinación de números y letras", () => {
      expect(AllValidationsClass.isNumber("test123")).toBe(false);
    });
    it("Debe devolver false si recibe null", () => {
      // @ts-ignore
      expect(AllValidationsClass.isNumber(null)).toBe(false);
    });
    it("Debe devolver false si recibe undefined", () => {
      // @ts-ignore
      expect(AllValidationsClass.isNumber(undefined)).toBe(false);
    });
  });

  describe('con locale "en-US"', () => {
    let validations = AllValidationsClass;
    beforeEach(() => {
      jest
        .spyOn(validations, "getDecimalSeparator" as any)
        .mockImplementation(() => ".");
    });
    it("Debe devolver true si se introduce un número positivo sin separador de miles (xxxx.xx)", () => {
      expect(AllValidationsClass.isNumber("1234.5")).toBe(true);
    });
    it("Debe devolver true si se introduce un número negativo sin separador de miles (-xxxx.xx)", () => {
      expect(AllValidationsClass.isNumber("-1234.5")).toBe(true);
    });
    it("Debe devolver true si se introduce un número con separadores de miles (x,xxx,xxx.xx)", () => {
      expect(AllValidationsClass.isNumber("1,234,567.89")).toBe(true);
    });
    it("Debe devolver false si se introduce un número con más de un separador de decimales (xx.xxx.xx)", () => {
      expect(AllValidationsClass.isNumber("12.345.67")).toBe(false);
    });
    it("Debe devolver false si se introduce un separador de miles en posición incorrecta (xx,xx.xx)", () => {
      expect(AllValidationsClass.isNumber("12,34.56")).toBe(false);
    });
    it("Debe devolver false si se introduce el separador de miles como separador de decimales", () => {
      expect(AllValidationsClass.isNumber("12,34")).toBe(false);
    });
    it("Debe devolver false si se introduce un doble negativo", () => {
      expect(AllValidationsClass.isNumber("--1234.5")).toBe(false);
    });
    it("Debe devolver false si se introducen dos separadores de decimales seguidos", () => {
      expect(AllValidationsClass.isNumber("1234..5")).toBe(false);
    });
    it("Debe devolver false si se introducen dos separadores de miles seguidos", () => {
      expect(AllValidationsClass.isNumber("1234,,5")).toBe(false);
    });
    it("Debe devolver false si se introducen un negativo en una posición incorrecta", () => {
      expect(AllValidationsClass.isNumber("1234-5")).toBe(false);
    });
    it("Debe devolver false si falta algún separador de miles", () => {
      expect(AllValidationsClass.isNumber("1234,567,890")).toBe(false);
    });
    it("Debe devolver true si se introducen ceros por la izquierda", () => {
      expect(AllValidationsClass.isNumber("000002345")).toBe(true);
    });
    it("Debe devolver false si se introducen ceros por la derecha", () => {
      expect(AllValidationsClass.isNumber("2345.5000000")).toBe(true);
    });
  });

  describe('con locale "es-ES"', () => {
    let validations = AllValidationsClass;
    beforeEach(() => {
      jest
        .spyOn(validations, "getDecimalSeparator" as any)
        .mockImplementation(() => ",");
    });
    it("Debe devolver true si se introduce un número positivo sin separador de miles (xxxx,xx)", () => {
      expect(AllValidationsClass.isNumber("1234,5")).toBe(true);
    });
    it("Debe devolver true si se introduce un número negativo sin separador de miles (-xxxx,xx)", () => {
      expect(AllValidationsClass.isNumber("-1234,5")).toBe(true);
    });
    it("Debe devolver true si se introduce un número con separadores de miles (x.xxx.xxx,xx)", () => {
      expect(AllValidationsClass.isNumber("1.234.567,89")).toBe(true);
    });
    it("Debe devolver false si se introduce un número con más de un separador de decimales (xx,xxx,xx)", () => {
      expect(AllValidationsClass.isNumber("12,345,67")).toBe(false);
    });
    it("Debe devolver false si se introduce un separador de miles en posición incorrecta (xx.xx,xx)", () => {
      expect(AllValidationsClass.isNumber("12.34,56")).toBe(false);
    });
    it("Debe devolver false si se introduce el separador de miles como separador de decimales", () => {
      expect(AllValidationsClass.isNumber("12.34")).toBe(false);
    });
    it("Debe devolver false si se introduce un doble negativo", () => {
      expect(AllValidationsClass.isNumber("--1234,5")).toBe(false);
    });
    it("Debe devolver false si se introducen dos separadores de decimales seguidos", () => {
      expect(AllValidationsClass.isNumber("1234,,5")).toBe(false);
    });
    it("Debe devolver false si se introducen dos separadores de miles seguidos", () => {
      expect(AllValidationsClass.isNumber("1234..5")).toBe(false);
    });
    it("Debe devolver false si se introducen un negativo en una posición incorrecta", () => {
      expect(AllValidationsClass.isNumber("1234-5")).toBe(false);
    });
    it("Debe devolver false si falta algún separador de miles", () => {
      expect(AllValidationsClass.isNumber("1234.567.890")).toBe(false);
    });
    it("Debe devolver true si se introducen ceros por la izquierda", () => {
      expect(AllValidationsClass.isNumber("000002345")).toBe(true);
    });
    it("Debe devolver false si se introducen ceros por la derecha", () => {
      expect(AllValidationsClass.isNumber("2345,5000000")).toBe(true);
    });
  });
});
