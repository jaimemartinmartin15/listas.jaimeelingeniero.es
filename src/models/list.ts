export interface Item {
  description: string;
  completed: boolean;
}

export interface Section {
  name: string;
  isExpanded: boolean;
  items: Item[];
}

export interface List {
  name: string;
  isExpanded: boolean;
  sections: Section[];
}