// Chicago locations with coordinates for distance calculation and autocomplete

export interface Location {
  name: string;
  address: string;
  lat: number;
  lng: number;
  type: "landmark" | "business" | "residential" | "transit" | "airport";
}

export const chicagoLocations: Location[] = [
  // Airports
  { name: "O'Hare International Airport", address: "10000 W O'Hare Ave, Chicago, IL", lat: 41.9742, lng: -87.9073, type: "airport" },
  { name: "Midway International Airport", address: "5700 S Cicero Ave, Chicago, IL", lat: 41.7868, lng: -87.7522, type: "airport" },
  
  // Downtown / Loop
  { name: "Willis Tower", address: "233 S Wacker Dr, Chicago, IL", lat: 41.8789, lng: -87.6359, type: "landmark" },
  { name: "Millennium Park", address: "201 E Randolph St, Chicago, IL", lat: 41.8826, lng: -87.6226, type: "landmark" },
  { name: "The Art Institute of Chicago", address: "111 S Michigan Ave, Chicago, IL", lat: 41.8796, lng: -87.6237, type: "landmark" },
  { name: "Chicago Riverwalk", address: "Chicago Riverwalk, Chicago, IL", lat: 41.8869, lng: -87.6206, type: "landmark" },
  { name: "Merchandise Mart", address: "222 W Merchandise Mart Plaza, Chicago, IL", lat: 41.8885, lng: -87.6354, type: "business" },
  
  // Business Districts
  { name: "Aon Center", address: "200 E Randolph St, Chicago, IL", lat: 41.8853, lng: -87.6217, type: "business" },
  { name: "Chase Tower", address: "10 S Dearborn St, Chicago, IL", lat: 41.8814, lng: -87.6290, type: "business" },
  { name: "Prudential Plaza", address: "130 E Randolph St, Chicago, IL", lat: 41.8848, lng: -87.6234, type: "business" },
  { name: "IBM Building", address: "330 N Wabash Ave, Chicago, IL", lat: 41.8887, lng: -87.6264, type: "business" },
  { name: "Tribune Tower", address: "435 N Michigan Ave, Chicago, IL", lat: 41.8905, lng: -87.6236, type: "business" },
  
  // Transit Hubs
  { name: "Union Station", address: "225 S Canal St, Chicago, IL", lat: 41.8787, lng: -87.6402, type: "transit" },
  { name: "Ogilvie Transportation Center", address: "500 W Madison St, Chicago, IL", lat: 41.8824, lng: -87.6404, type: "transit" },
  { name: "Chicago Union Station Metra", address: "210 S Canal St, Chicago, IL", lat: 41.8785, lng: -87.6398, type: "transit" },
  
  // Neighborhoods - North Side
  { name: "Lincoln Park", address: "2001 N Clark St, Chicago, IL", lat: 41.9214, lng: -87.6513, type: "residential" },
  { name: "Wrigley Field", address: "1060 W Addison St, Chicago, IL", lat: 41.9484, lng: -87.6553, type: "landmark" },
  { name: "Navy Pier", address: "600 E Grand Ave, Chicago, IL", lat: 41.8917, lng: -87.6086, type: "landmark" },
  { name: "Gold Coast", address: "1200 N Lake Shore Dr, Chicago, IL", lat: 41.9041, lng: -87.6254, type: "residential" },
  { name: "Old Town", address: "1500 N Wells St, Chicago, IL", lat: 41.9110, lng: -87.6346, type: "residential" },
  { name: "Lakeview", address: "3200 N Broadway, Chicago, IL", lat: 41.9399, lng: -87.6441, type: "residential" },
  
  // Neighborhoods - West Side
  { name: "Wicker Park", address: "1425 N Damen Ave, Chicago, IL", lat: 41.9088, lng: -87.6777, type: "residential" },
  { name: "Ukrainian Village", address: "2200 W Chicago Ave, Chicago, IL", lat: 41.8956, lng: -87.6812, type: "residential" },
  { name: "West Loop", address: "1000 W Randolph St, Chicago, IL", lat: 41.8841, lng: -87.6527, type: "residential" },
  { name: "Fulton Market", address: "800 W Fulton Market, Chicago, IL", lat: 41.8867, lng: -87.6498, type: "business" },
  
  // Neighborhoods - South Side
  { name: "Hyde Park", address: "5700 S Woodlawn Ave, Chicago, IL", lat: 41.7943, lng: -87.5965, type: "residential" },
  { name: "University of Chicago", address: "5801 S Ellis Ave, Chicago, IL", lat: 41.7886, lng: -87.5987, type: "landmark" },
  { name: "Museum of Science and Industry", address: "5700 S DuSable Lake Shore Dr, Chicago, IL", lat: 41.7906, lng: -87.5831, type: "landmark" },
  { name: "Chinatown", address: "2100 S Wentworth Ave, Chicago, IL", lat: 41.8524, lng: -87.6318, type: "residential" },
  { name: "Pilsen", address: "1800 S Ashland Ave, Chicago, IL", lat: 41.8563, lng: -87.6659, type: "residential" },
  { name: "Bronzeville", address: "4700 S King Dr, Chicago, IL", lat: 41.8095, lng: -87.6171, type: "residential" },
  
  // Hotels & Convention
  { name: "McCormick Place", address: "2301 S King Dr, Chicago, IL", lat: 41.8512, lng: -87.6167, type: "business" },
  { name: "Palmer House Hilton", address: "17 E Monroe St, Chicago, IL", lat: 41.8808, lng: -87.6268, type: "business" },
  { name: "The Drake Hotel", address: "140 E Walton Pl, Chicago, IL", lat: 41.8999, lng: -87.6249, type: "business" },
  { name: "Four Seasons Chicago", address: "120 E Delaware Pl, Chicago, IL", lat: 41.8992, lng: -87.6247, type: "business" },
  
  // Shopping & Entertainment
  { name: "Magnificent Mile", address: "625 N Michigan Ave, Chicago, IL", lat: 41.8930, lng: -87.6245, type: "landmark" },
  { name: "Water Tower Place", address: "835 N Michigan Ave, Chicago, IL", lat: 41.8976, lng: -87.6239, type: "landmark" },
  { name: "United Center", address: "1901 W Madison St, Chicago, IL", lat: 41.8807, lng: -87.6742, type: "landmark" },
  { name: "Soldier Field", address: "1410 Special Olympics Dr, Chicago, IL", lat: 41.8623, lng: -87.6167, type: "landmark" },
];

// Calculate distance between two coordinates using Haversine formula
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

// Get distance between two locations by name
export function getDistanceBetweenLocations(
  pickupName: string,
  dropoffName: string
): number {
  const pickup = chicagoLocations.find(
    (loc) => loc.name === pickupName || loc.address === pickupName
  );
  const dropoff = chicagoLocations.find(
    (loc) => loc.name === dropoffName || loc.address === dropoffName
  );

  if (!pickup || !dropoff) {
    // Return a default distance if locations not found
    return 5.0;
  }

  return calculateDistance(pickup.lat, pickup.lng, dropoff.lat, dropoff.lng);
}

// Filter locations for autocomplete
export function filterLocations(query: string): Location[] {
  if (!query || query.length < 2) return [];
  
  const lowerQuery = query.toLowerCase();
  return chicagoLocations
    .filter(
      (loc) =>
        loc.name.toLowerCase().includes(lowerQuery) ||
        loc.address.toLowerCase().includes(lowerQuery)
    )
    .slice(0, 6); // Limit to 6 results
}

// Get location by name
export function getLocationByName(name: string): Location | undefined {
  return chicagoLocations.find(
    (loc) => loc.name === name || loc.address === name
  );
}

// Pricing configuration
export interface RideOption {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  pricePerMile: number;
  eta: string;
  capacity: string;
}

export const rideOptions: RideOption[] = [
  {
    id: "uberx",
    name: "UberX",
    description: "Affordable, everyday rides",
    basePrice: 4.0,
    pricePerMile: 1.6,
    eta: "3 min",
    capacity: "4",
  },
  {
    id: "comfort",
    name: "Comfort",
    description: "Newer cars with extra legroom",
    basePrice: 6.0,
    pricePerMile: 2.1,
    eta: "5 min",
    capacity: "4",
  },
  {
    id: "business",
    name: "Business Priority",
    description: "Premium rides for business",
    basePrice: 8.0,
    pricePerMile: 2.6,
    eta: "4 min",
    capacity: "4",
  },
];

// Calculate fare for a ride option and distance
export function calculateFare(option: RideOption, miles: number): number {
  return Math.round((option.basePrice + option.pricePerMile * miles) * 100) / 100;
}

// Get all fares for a given distance
export function getAllFares(miles: number): { option: RideOption; fare: number }[] {
  return rideOptions.map((option) => ({
    option,
    fare: calculateFare(option, miles),
  }));
}
