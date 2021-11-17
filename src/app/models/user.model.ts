import { environment } from "src/environments/environment"

const base_url = environment.base_url;

export class User {

  constructor(
    
    public name: string,
    public lastName: string,
    public email: string,
    public password?: string,
    public role?: string,
    public image?: string,
    public id?: string,

  ) {}

  //creamos el getter para controlar si existe o no la imagen
  public get imageUrl() : string {
    
    if (this.image) {
      return `${ base_url }/upload/users/${ this.image }`;
    }
    return `${ base_url }/upload/users/no-image`;
  }
  


}