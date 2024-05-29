export type Fodmap = {
  id: string;
  name: string;
  fodmap: string;
  category: string;
  details?: {
    oligos: number;
    fructose: number;
    polyols: number;
    lactose: number;
  };
};
