import { environment } from "src/environments/environment"

const base_url = environment.base_url;

export class User {

  constructor(
    
    public name: string,
    public lastName: string,
    public email: string,
    public password?: string,
    public role?: 'ADMIN_ROLE' | 'USER_ROLE',
    public status?: 'active' | 'inactive',
    public image?: string,
    public id?: string,

  ) {}

  //GETTER - para controlar si existe o no la imagen
  public get imageUrl() : string {
    
    if (this.image) {
      return `${ base_url }/upload/users/${ this.image }`;
    }
    return `${ base_url }/upload/users/no-image`;
  }


  //SETTER
  public set _id(id : string) {
    this.id = id;
  }
  
  


}