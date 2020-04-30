export class FormVerification {

  static validDate(date): any {
    if (date.pristine) {
      return null;
    }
    const DATE_REGEXP = /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/g;
    date.markAsTouched();
    if (DATE_REGEXP.test(date.value)) {
      return null;
    }
    return {
      invalidDate: true
    };
  }
}
