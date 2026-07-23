export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  category: string;
}

const mockServices: Service[] = [
  {
    id: 'svc-001',
    name: 'House Cleaning',
    description: 'Complete house cleaning including kitchen, bathrooms, and all rooms',
    price: 150000,
    duration: '3-4 hours',
    category: 'cleaning',
  },
  {
    id: 'svc-002',
    name: 'AC Repair',
    description: 'Professional AC repair and maintenance service',
    price: 250000,
    duration: '1-2 hours',
    category: 'repair',
  },
  {
    id: 'svc-003',
    name: 'Babysitting',
    description: 'Experienced babysitter for children of all ages',
    price: 75000,
    duration: 'per hour',
    category: 'care',
  },
  {
    id: 'svc-004',
    name: 'Deep Cleaning',
    description: 'Thorough deep cleaning including furniture and appliances',
    price: 300000,
    duration: '5-6 hours',
    category: 'cleaning',
  },
  {
    id: 'svc-005',
    name: 'Plumbing',
    description: 'Expert plumbing repairs and installations',
    price: 200000,
    duration: '1-3 hours',
    category: 'repair',
  },
  {
    id: 'svc-006',
    name: 'Elderly Care',
    description: 'Professional care for elderly family members',
    price: 120000,
    duration: 'per hour',
    category: 'care',
  },
];

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function fetchServices(): Promise<Service[]> {
  await delay(800);
  return mockServices;
}

export async function fetchServiceById(id: string): Promise<Service | undefined> {
  await delay(500);
  return mockServices.find((service) => service.id === id);
}

export async function fetchServicesByCategory(category: string): Promise<Service[]> {
  await delay(600);
  return mockServices.filter((service) => service.category === category);
}