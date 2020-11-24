export type NonLatinDiagnose = Omit<Diagnose, 'latin'>;

export interface Diagnose {
  code: string,
  name: string,
  latin?: string
}
