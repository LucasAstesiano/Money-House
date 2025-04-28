export default interface TransactionType {
  id: number;
  description: string;
  amount: number;
  subtitle: string;
  destination:string,
  dated:string
}
export interface TransactionData {
  amount: number; 
  description: string;
  dated: string;
}
