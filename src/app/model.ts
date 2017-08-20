export class Stations {
  id: number;
  name: string;
  websit: string;
  language: string;
}

export class Customer {
  id: number;
  name: string;
  address: Address;
}
  
export class Address {
  street: string;
  city: string;
  state: string;
  region: string;
}