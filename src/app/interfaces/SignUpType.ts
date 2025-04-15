export default interface SignUpResponseType {
    Status: number;
    data?:dataResponseSignUp ;
    error?: string;
  }
interface dataResponseSignUp {
    user_id:number,
    account_id:number,
    email:string
  }
  export interface LoginResponseType {
    Status: number;
    data?:dataResponseSignUp ;
    error?: string;
    token?: string;
  }