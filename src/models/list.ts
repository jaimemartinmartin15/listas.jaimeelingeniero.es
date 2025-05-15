export interface Item {
  description: string;
  completed: boolean;
}

export interface Section {
  name: string;
  items: Item[];
}

export interface List {
  name: string;
  sections: Section[];
}