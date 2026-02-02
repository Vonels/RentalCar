export interface Car {
  id: string;
  year: number;

  brand: string;
  model: string;
  type: string;

  img: string;
  description: string;

  fuelConsumption: string;
  engineSize: string;

  rentalPrice: string;
  rentalCompany: string;
  address: string;

  mileage: number;

  rentalConditions: string[];
  accessories: string[];
  functionalities: string[];
}

export interface Filters {
  brand: string;
  price: number | null;
  mileageFrom: number | null;
  mileageTo: number | null;
}
