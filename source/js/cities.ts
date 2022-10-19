export type CityName =
  | 'Acapulco'
  | 'Aden'
  | 'Agra'
  | 'Albuquerque'
  | 'Alexandria'
  | 'Allahabad'
  | 'Amsterdam'
  | 'Antalya'
  | 'Antananarivo'
  | 'Astrakhan'
  | 'Asunción'
  | 'Aswan'
  | 'Athens'
  | 'Atlanta'
  | 'Auckland'
  | 'Baghdad'
  | 'Baku'
  | 'Bandar Abbas'
  | 'Bangalore'
  | 'Batavia'
  | 'Beijing'
  | 'Beirut'
  | 'Belgrade'
  | 'Belém'
  | 'Benares'
  | 'Berlin'
  | 'Bhayi'
  | 'Bloemfontein'
  | 'Bogota'
  | 'Bombay'
  | 'Brisbane'
  | 'Bucharest'
  | 'Budapest'
  | 'Buenos Aires'
  | 'Burlington'
  | 'Cairo'
  | 'Calcutta'
  | 'Calgary'
  | 'Cambridge'
  | 'Canton'
  | 'Caracas'
  | 'Cheyenne'
  | 'Chicago'
  | 'Chittagong'
  | 'Colombo'
  | 'Copenhagen'
  | 'Dakar'
  | 'Dallas'
  | 'Delhi'
  | 'Dubai'
  | 'Dubrovnik'
  | 'Duluth'
  | 'Dvarka'
  | 'Ekaterinburg'
  | 'Freetown'
  | 'Gastown'
  | 'Guwahati'
  | "Ha'il"
  | 'Havana'
  | 'Helsinki'
  | 'Herat'
  | 'Hong Kong'
  | 'Honolulu'
  | 'Houston'
  | 'Imphal'
  | 'Irkutsk'
  | 'Istanbul'
  | 'Ivujivik'
  | 'Izmir'
  | 'Jeddah'
  | 'Kabul'
  | 'Karachi'
  | 'Karimskaya'
  | 'Khartoum'
  | 'Krasnovodsk'
  | 'Kristiania'
  | 'Lahore'
  | 'Las Vegas'
  | 'Lima'
  | 'Lisbon'
  | 'London'
  | 'Lusaka'
  | 'Luxor'
  | 'Machu Picchu'
  | 'Madras'
  | 'Manama'
  | 'Manila'
  | 'Marrakesh'
  | 'Merv'
  | 'Meteora Valley'
  | 'Miami'
  | 'Minsk'
  | 'Mount Elbrus'
  | 'Moscow'
  | 'Munich'
  | 'Muscat'
  | 'Nanortalik'
  | 'Nassau'
  | 'New Orleans'
  | 'New York'
  | 'Nice'
  | 'Nova Goa'
  | 'Novorossiysk'
  | 'Nsenga'
  | 'Odessa'
  | 'Omaha'
  | 'Omsk'
  | 'Ottawa'
  | 'Panama City'
  | 'Pangsau Pass'
  | 'Paris'
  | 'Pitcairn Island'
  | 'Ponta Delgada'
  | 'Port Royal'
  | 'Port Moresby'
  | 'Port-au-Prince'
  | 'Porto-Novo'
  | 'Prague'
  | 'Pyongyang'
  | 'Quebec City'
  | 'Quelimane'
  | 'Quetta'
  | 'Rangoon'
  | 'Regina'
  | 'Reykjavik'
  | 'Rio de Janeiro'
  | 'Riyadh'
  | 'Rome'
  | "Rub' al Khali"
  | 'Saint-Denis'
  | 'Salt Lake City'
  | 'Salvador'
  | 'San Francisco'
  | 'San Pedro'
  | 'Santiago'
  | 'Singapore'
  | 'Smeerenburg'
  | 'Snowdon'
  | 'Sofia'
  | 'St Petersburg'
  | 'Stockholm'
  | 'Stone Town'
  | 'Suez'
  | 'Tabatinga'
  | 'Tangier'
  | 'Tehran'
  | 'The North Pole'
  | 'Thessaloniki'
  | 'Timbuktu'
  | 'Toronto'
  | 'Tromsø'
  | 'Tsaritsyn'
  | 'Tunis'
  | 'Ujiji'
  | 'Ulundi'
  | 'Urga'
  | 'Ussuriysk'
  | 'Venice'
  | 'Vienna'
  | 'Vladivostok'
  | 'Wadi Halfa'
  | 'Waltair'
  | 'Warsaw'
  | 'Washington'
  | 'Winisk'
  | 'Winnipeg'
  | 'Yadanabon'
  | 'Yokohama'
  | 'Zurich'
  | '???'
  | 'Atlantis';

export interface City {
  name: CityName;
  lat: number;
  long: number;
}

export const cities: City[] = [
  {name: 'Acapulco', lat: 16.8531, long: -99.8237},
  {name: 'Aden', lat: 12.7855, long: 45.0187},
  {name: 'Agra', lat: 27.1767, long: 78.0081},
  {name: 'Albuquerque', lat: 35.0844, long: -106.6504},
  {name: 'Alexandria', lat: 31.2001, long: 29.9187},
  {name: 'Allahabad', lat: 25.4358, long: 81.8463},
  {name: 'Amsterdam', lat: 52.3676, long: 4.9041},
  {name: 'Antalya', lat: 36.8969, long: 30.7133},
  {name: 'Antananarivo', lat: -18.8792, long: 47.5079},
  {name: 'Astrakhan', lat: 46.3586, long: 48.0569},
  {name: 'Asunción', lat: -25.2637, long: -57.5759},
  {name: 'Aswan', lat: 24.0889, long: 32.8998},
  {name: 'Athens', lat: 37.9838, long: 23.7275},
  {name: 'Atlanta', lat: 33.749, long: -84.388},
  {name: 'Auckland', lat: -36.8509, long: 174.7645},
  {name: 'Baghdad', lat: 33.3152, long: 44.3661},
  {name: 'Baku', lat: 40.4093, long: 49.8671},
  {name: 'Bandar Abbas', lat: 27.1963, long: 56.2884},
  {name: 'Bangalore', lat: 12.9716, long: 77.5946},
  {name: 'Batavia', lat: -6.2088, long: 106.8456},
  {name: 'Beijing', lat: 39.9042, long: 116.4074},
  {name: 'Beirut', lat: 33.8938, long: 35.5018},
  {name: 'Belgrade', lat: 44.8125, long: 20.4612},
  {name: 'Belém', lat: -1.4563, long: -48.5013},
  {name: 'Benares', lat: 25.3176, long: 82.9739},
  {name: 'Berlin', lat: 52.52, long: 13.405},
  {name: 'Bhayi', lat: -33.9608, long: 25.6022},
  {name: 'Bloemfontein', lat: -29.0852, long: 26.1596},
  {name: 'Bogota', lat: 4.711, long: -74.0721},
  {name: 'Bombay', lat: 19.076, long: 72.8777},
  {name: 'Brisbane', lat: -27.4705, long: 153.026},
  {name: 'Bucharest', lat: 44.4268, long: 26.1025},
  {name: 'Budapest', lat: 47.4979, long: 19.0402},
  {name: 'Buenos Aires', lat: -34.6037, long: -58.3816},
  {name: 'Burlington', lat: 38.627, long: -90.1994},
  {name: 'Cairo', lat: 30.0444, long: 31.3257},
  {name: 'Calcutta', lat: 22.5726, long: 88.3639},
  {name: 'Calgary', lat: 51.0447, long: -114.0719},
  {name: 'Cambridge', lat: 52.1951, long: 0.1313},
  {name: 'Canton', lat: 23.1291, long: 113.2644},
  {name: 'Caracas', lat: 10.4806, long: -66.9036},
  {name: 'Cheyenne', lat: 41.14, long: -104.8202},
  {name: 'Chicago', lat: 41.8781, long: -87.6298},
  {name: 'Chittagong', lat: 22.3569, long: 91.7832},
  {name: 'Colombo', lat: 6.9271, long: 79.8612},
  {name: 'Copenhagen', lat: 55.6761, long: 12.5683},
  {name: 'Dakar', lat: 14.7167, long: -17.4677},
  {name: 'Dallas', lat: 32.7767, long: -96.797},
  {name: 'Delhi', lat: 28.7041, long: 77.1025},
  {name: 'Dubai', lat: 25.2048, long: 55.2708},
  {name: 'Dubrovnik', lat: 42.6507, long: 18.0944},
  {name: 'Duluth', lat: 46.7867, long: -92.1005},
  {name: 'Dvarka', lat: 22.2442, long: 68.9685},
  {name: 'Ekaterinburg', lat: 56.8431, long: 60.6454},
  {name: 'Freetown', lat: 8.4657, long: -13.2317},
  {name: 'Gastown', lat: 49.2827, long: -123.1207},
  {name: 'Guwahati', lat: 26.1158, long: 91.7086},
  {name: "Ha'il", lat: 27.5114, long: 41.7208},
  {name: 'Havana', lat: 23.1136, long: -82.3666},
  {name: 'Helsinki', lat: 60.1699, long: 24.9384},
  {name: 'Herat', lat: 34.3529, long: 62.204},
  {name: 'Hong Kong', lat: 22.3193, long: 114.1694},
  {name: 'Honolulu', lat: 21.3099, long: -157.8581},
  {name: 'Houston', lat: 29.7604, long: -95.3698},
  {name: 'Imphal', lat: 24.817, long: 93.9368},
  {name: 'Irkutsk', lat: 52.2855, long: 104.289},
  {name: 'Istanbul', lat: 41.0082, long: 28.9784},
  {name: 'Ivujivik', lat: 62.4167, long: -77.9167},
  {name: 'Izmir', lat: 38.4237, long: 27.1428},
  {name: 'Jeddah', lat: 21.4858, long: 39.1925},
  {name: 'Kabul', lat: 34.5553, long: 69.2075},
  {name: 'Karachi', lat: 24.8607, long: 67.0011},
  {name: 'Karimskaya', lat: 56.6575, long: 124.711},
  {name: 'Khartoum', lat: 15.5007, long: 32.5599},
  {name: 'Krasnovodsk', lat: 40.0337, long: 52.9759},
  {name: 'Kristiania', lat: 59.9139, long: 10.7522},
  {name: 'Lahore', lat: 31.5204, long: 74.3587},
  {name: 'Las Vegas', lat: 36.1716, long: -115.1391},
  {name: 'Lima', lat: -14.191, long: -75.698},
  {name: 'Lisbon', lat: 38.7223, long: -9.1393},
  {name: 'London', lat: 51.5072, long: 0.1276},
  {name: 'Lusaka', lat: -15.3875, long: 28.3228},
  {name: 'Luxor', lat: 25.6872, long: 32.6396},
  {name: 'Machu Picchu', lat: -11.8915, long: -74.8702},
  {name: 'Madras', lat: 13.0827, long: 80.2707},
  {name: 'Manama', lat: 26.2235, long: 50.5876},
  {name: 'Manila', lat: 14.5995, long: 120.9842},
  {name: 'Marrakesh', lat: 31.6295, long: -7.9811},
  {name: 'Merv', lat: 37.6644, long: 62.1747},
  {name: 'Meteora Valley', lat: 39.7141, long: 21.6311},
  {name: 'Miami', lat: 25.7617, long: -80.1918},
  {name: 'Minsk', lat: 53.9006, long: 27.559},
  {name: 'Mount Elbrus', lat: 40, long: 45.3661},
  {name: 'Moscow', lat: 55.7558, long: 37.6173},
  {name: 'Munich', lat: 48.1351, long: 11.582},
  {name: 'Muscat', lat: 23.588, long: 58.3829},
  {name: 'Nanortalik', lat: 60.1425, long: -45.2395},
  {name: 'Nassau', lat: 25.0443, long: -77.3504},
  {name: 'New Orleans', lat: 29.9511, long: -90.0715},
  {name: 'New York', lat: 40.7128, long: -74.006},
  {name: 'Nice', lat: 43.7102, long: 7.262},
  {name: 'Nova Goa', lat: 15.4909, long: 73.8278},
  {name: 'Novorossiysk', lat: 44.718, long: 37.777},
  {name: 'Nsenga', lat: -9.6333, long: 29.7},
  {name: 'Odessa', lat: 46.4825, long: 30.7233},
  {name: 'Omaha', lat: 41.2565, long: -95.9345},
  {name: 'Omsk', lat: 54.9914, long: 73.3645},
  {name: 'Ottawa', lat: 45.4215, long: -75.6972},
  {name: 'Panama City', lat: 8.9824, long: -79.5199},
  {name: 'Pangsau Pass', lat: 27.2476, long: 96.156},
  {name: 'Paris', lat: 48.8566, long: 2.3522},
  {name: 'Pitcairn Island', lat: -24.3768, long: -128.3242},
  {name: 'Ponta Delgada', lat: 37.7394, long: -25.6687},
  {name: 'Port Royal', lat: 17.9368, long: -76.8411},
  {name: 'Port Moresby', lat: -9.4438, long: 147.1803},
  {name: 'Port-au-Prince', lat: 18.5944, long: -72.3074},
  {name: 'Porto-Novo', lat: 6.4969, long: 2.6289},
  {name: 'Prague', lat: 50.0755, long: 14.4378},
  {name: 'Pyongyang', lat: 39.0738, long: 125.8198},
  {name: 'Quebec City', lat: 46.8131, long: -71.2075},
  {name: 'Quelimane', lat: -17.8503, long: 36.9219},
  {name: 'Quetta', lat: 30.1798, long: 66.975},
  {name: 'Rangoon', lat: 16.8409, long: 96.1735},
  {name: 'Regina', lat: 50.4452, long: -104.6189},
  {name: 'Reykjavik', lat: 64.1466, long: -21.9426},
  {name: 'Rio de Janeiro', lat: -22.9068, long: -43.1729},
  {name: 'Riyadh', lat: 24.7136, long: 46.6753},
  {name: 'Rome', lat: 41.9028, long: 12.4964},
  {name: "Rub' al Khali", lat: 20.0953, long: 52.719},
  {name: 'Saint-Denis', lat: -20.8907, long: 55.4551},
  {name: 'Salt Lake City', lat: 40.7608, long: -111.891},
  {name: 'Salvador', lat: -12.9777, long: -42.5016},
  {name: 'San Francisco', lat: 37.7749, long: -122.4194},
  {name: 'San Pedro', lat: 33.7361, long: -118.2922},
  {name: 'Santiago', lat: -33.4489, long: -70.6693},
  {name: 'Singapore', lat: 1.3521, long: 103.8198},
  {name: 'Smeerenburg', lat: 79.7256, long: 10.9903},
  {name: 'Snowdon', lat: 53.0685, long: -4.0763},
  {name: 'Sofia', lat: 42.6977, long: 23.3219},
  {name: 'St Petersburg', lat: 59.9311, long: 30.3609},
  {name: 'Stockholm', lat: 59.3293, long: 18.0686},
  {name: 'Stone Town', lat: -6.1622, long: 39.1921},
  {name: 'Suez', lat: 29.9668, long: 32.5498},
  {name: 'Tabatinga', lat: -4.2315, long: -69.9369},
  {name: 'Tangier', lat: 35.7595, long: 5.834},
  {name: 'Tehran', lat: 35.7219, long: 51.3347},
  {name: 'The North Pole', lat: 90, long: 135},
  {name: 'Thessaloniki', lat: 40.6401, long: 22.9444},
  {name: 'Timbuktu', lat: 16.7666, long: -3.0026},
  {name: 'Toronto', lat: 43.6532, long: -79.3832},
  {name: 'Tromsø', lat: 69.6492, long: 18.9553},
  {name: 'Tsaritsyn', lat: 48.708, long: 44.5133},
  {name: 'Tunis', lat: 36.8065, long: 10.1815},
  {name: 'Ujiji', lat: -4.9115, long: 29.6746},
  {name: 'Ulundi', lat: -28.2997, long: 31.4342},
  {name: 'Urga', lat: 47.8864, long: 106.9057},
  {name: 'Ussuriysk', lat: 44.8015, long: 131.4405},
  {name: 'Venice', lat: 45.4408, long: 12.3155},
  {name: 'Vienna', lat: 48.2082, long: 16.3738},
  {name: 'Vladivostok', lat: 43.1332, long: 131.9113},
  {name: 'Wadi Halfa', lat: 21.7991, long: 31.3713},
  {name: 'Waltair', lat: 17.6868, long: 83.2185},
  {name: 'Warsaw', lat: 52.2297, long: 21.0122},
  {name: 'Washington', lat: 38.9072, long: -77.0369},
  {name: 'Winisk', lat: 55.2667, long: -85.2},
  {name: 'Winnipeg', lat: 49.8954, long: -97.1385},
  {name: 'Yadanabon', lat: 21.9588, long: 96.0891},
  {name: 'Yokohama', lat: 35.4437, long: 139.638},
  {name: 'Zurich', lat: 47.3769, long: 8.5417},
  {name: '???', lat: -7.2088, long: 85},
  {name: 'Atlantis', lat: 2, long: -20},
];

export const citiesByName = {} as Record<CityName, City>;
for (const city of cities) {
  citiesByName[city.name] = city;
}
