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
  brand?: string;
  rentalPrice_lte?: number;
  mileage_gte?: number;
  mileage_lte?: number;
}
