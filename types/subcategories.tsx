interface Icategory {
  _id: string;
  category: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  slugname: string;
}

interface ISubcategories {
  subcategories: Icategory[];
}
