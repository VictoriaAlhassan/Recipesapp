export interface Recipe {
  name?: string | null;
  description?: string | null;
  url?: string | null;
  ingredients?: Ingredients[];
}

export interface Ingredients {
  name: string | null;
  amount: number | null;
}
