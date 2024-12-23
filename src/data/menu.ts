import { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
  {
    name: "Butter Chicken",
    description: "Our signature dish - tender chicken pieces in a rich, creamy tomato-based curry sauce",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800",
    spiceLevel: 2
  },
  {
    name: "Naan",
    description: "Freshly baked traditional Indian flatbread",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Masala Chai",
    description: "Traditional Indian spiced tea with milk",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&q=80&w=800",
    spiceLevel: 1
  },
  {
    name: "Mango Lassi",
    description: "Refreshing yogurt-based drink with mango pulp",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1615478503562-ec2d8aa0e24e?auto=format&fit=crop&q=80&w=800"
  }
];

export const remixMenu: MenuItem[] = [
  {
    name: "Butter Chicken Pizza",
    description: "Our famous butter chicken sauce on a crispy naan base with mozzarella",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800",
    spiceLevel: 2,
    categories: ['spicy']
  },
  {
    name: "Butter Chicken Tacos",
    description: "Soft tortillas filled with butter chicken, mint chutney, and pickled onions",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&q=80&w=800",
    spiceLevel: 1
  },
  {
    name: "Butter Paneer Bowl",
    description: "Our signature sauce with paneer cheese, served over fragrant rice",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=800",
    categories: ['vegetarian']
  }
];