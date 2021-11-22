import { Hospital } from "./hospital.model";

// _HospitalUser es privado pq no se exporta (user que creó el hospital)
interface _MedicUser {
  
  _id: string;
  name: string;
  lastName: string;
  image?: string;

}


export class Medic {

  constructor(
    
    public _id: string,
    public name: string,
    public lastName: string,
    public image?: string,
    public user?: _MedicUser,
    public hospital?: Hospital,

  ) {}

}