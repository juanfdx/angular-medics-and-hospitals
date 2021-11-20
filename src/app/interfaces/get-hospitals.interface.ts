import { Hospital } from "../models/hospital.model";

export interface GetHospitals {

  ok: boolean;
  total: number;
  hospitals: Hospital[];

}