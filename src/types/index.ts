export interface Expense {
    id: string;
    expenseName: string;
    amount: number;
    category: string;
    date: Value;
}


export interface DraftExpense extends Omit<Expense, 'id'> {}


type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

export interface Category{

    id: string;
    name: string;
    icon: string;
}