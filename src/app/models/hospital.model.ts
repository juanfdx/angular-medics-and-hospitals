// _HospitalUser es privado pq no se exporta (user que creó el hospital)
interface _HospitalUser {
  
  _id: string;
  name: string;
  lastName: string;
  image?: string;

}


export class Hospital {

  constructor(
    
    public _id: string,
    public name: string,
    public image?: string,
    public user?: _HospitalUser

  ) {}

}