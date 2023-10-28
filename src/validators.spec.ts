import { AllValidators } from "./validators";

describe("AllValidators", () => {
  // Tests that the email validator returns true for a valid email
  it("should return true when a valid email is provided", () => {
    const email = "test@example.com";
    const result = AllValidators.email(email);
    expect(result).toBe(true);
  });

  // Tests that the email validator returns false for an invalid email
  it("should return false when an invalid email is provided", () => {
    const email = "invalid_email";
    const result = AllValidators.email(email);
    expect(result).toBe(false);
  });

  // Tests that the CCC validator returns true for a valid CCC
  it("should return true when a valid CCC is provided", () => {
    const ccc = "6921 9454 01 4589691820";
    const result = AllValidators.ccc(ccc);
    expect(result).toBe(true);
  });

  // Tests that the CCC validator returns false for an invalid CCC
  it("should return false when an invalid CCC is provided", () => {
    const ccc = "invalid_ccc";
    const result = AllValidators.ccc(ccc);
    expect(result).toBe(false);
  });

  // Tests that the credit card number validator returns true for a valid credit card number
  it("should return true when a valid credit card number is provided", () => {
    const cardNumber = "4258509204308507";
    const result = AllValidators.creditCardNumber(cardNumber);
    expect(result).toBe(true);
  });

  // Tests that the credit card number validator returns false for an invalid credit card number
  it("should return false when an invalid credit card number is provided", () => {
    const cardNumber = "invalid_card_number";
    const result = AllValidators.creditCardNumber(cardNumber);
    expect(result).toBe(false);
  });

  // Tests that the IBAN validator returns true for a valid IBAN
  it("should return true when a valid IBAN is provided", () => {
    const iban = "ES9121000418450200051332";
    const result = AllValidators.iban(iban);
    expect(result).toBe(true);
  });

  // Tests that the BIC validator returns true for a valid BIC
  it("should return true when a valid BIC is provided", () => {
    const bic = "ABCDDEFF";
    const result = AllValidators.bic(bic);
    expect(result).toBe(true);
  });

  // Tests that the DNI validator returns true for a valid DNI
  it("should return true when a valid DNI is provided", () => {
    const dni = "12345678Z";
    const result = AllValidators.dni(dni);
    expect(result).toBe(true);
  });

  // Tests that the NIE validator returns true for a valid NIE
  it("should return true when a valid NIE is provided", () => {
    const nie = "Y2927212Q";
    const result = AllValidators.nie(nie);
    expect(result).toBe(true);
  });

  // Tests that the CIF validator returns true for a valid CIF
  it("should return true when a valid CIF is provided", () => {
    const cif = "A76983709";
    const result = AllValidators.cif(cif);
    expect(result).toBe(true);
  });

  // Tests that the passport validator returns true for a valid passport
  it("should return true when a valid passport is provided", () => {
    const passport = "AB1234567";
    const result = AllValidators.passport(passport);
    expect(result).toBe(true);
  });

  // Tests that the date validator returns true for a valid date
  it("should return true when a valid date is provided", () => {
    const date = "2022-01-01";
    const result = AllValidators.date(date);
    expect(result).toBe(true);
  });

  // Test that the isAfterDate method of the AllValidators returns true when the provided date is after the compare date
  it("should return true when the date is after the compare date", () => {
    const date = "2022-01-01";
    const compareDate = "2021-12-31";
    const result = AllValidators.isAfterDate(date, compareDate);
    expect(result).toBe(true);
  });

  // Test that the isBeforeDate method of the AllValidators returns true when the provided date is before the compare date
  it("should return true when the date is before the compare date", () => {
    const date = "2021-01-01";
    const compareDate = "2022-01-01";
    const result = AllValidators.isBeforeDate(date, compareDate);
    expect(result).toBe(true);
  });

  // Test that the isSameDate validator returns true when comparing the same date
  it("should return true when comparing the same date", () => {
    const date = "2022-01-01";
    const result = AllValidators.isSameDate(date, date);
    expect(result).toBe(true);
  });

  // Tests that the isSameOrAfterDate validator returns true for a date that is the same or after the compare date
  it("should return true when the value is the same or after the compare date", () => {
    const value = "2022-01-01";
    const compare = "2021-12-31";
    const result = AllValidators.isSameOrAfterDate(value, compare);
    expect(result).toBe(true);
  });

  // Tests that the isBetweenDates validator returns true for a date between the start and end dates
  it("should return true when a date is between the start and end dates", () => {
    const value = "2022-01-15";
    const start = "2022-01-01";
    const end = "2022-01-31";
    const result = AllValidators.isBetweenDates(value, start, end);
    expect(result).toBe(true);
  });

  // Tests that the isSameOrBeforeDate validator returns true for a date that is the same or before the compare date
  it("should return true when the value is the same or before the compare date", () => {
    const value = "2022-01-01";
    const compare = "2022-01-01";
    const result = AllValidators.isSameOrBeforeDate(value, compare);
    expect(result).toBe(true);
  });

  // Tests that the max validator returns true for a value less than or equal to the maxValue
  it("should return true when the value is less than or equal to the maxValue", () => {
    const value = 5;
    const maxValue = 10;
    const result = AllValidators.max(value, maxValue);
    expect(result).toBe(true);
  });

  // Tests that the min validator returns true for a value greater than or equal to the minValue
  it("should return true when the value is greater than or equal to the minValue", () => {
    const value = 10;
    const minValue = 5;
    const result = AllValidators.min(value, minValue);
    expect(result).toBe(true);
  });

  // Tests that the isNumber validator returns true for a valid number
  it("should return true when a valid number is provided", () => {
    const number = "1234";
    const result = AllValidators.isNumber(number);
    expect(result).toBe(true);
  });
});
