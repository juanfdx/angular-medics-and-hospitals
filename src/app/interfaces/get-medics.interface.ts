import { Medic } from "../models/medic.model";

export interface GetMedics {

  ok: boolean;
  total: number;
  medics: Medic[];

}