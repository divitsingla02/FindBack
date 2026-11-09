// Initial sample data for FindBack Campus Lost & Found

export const CAMPUS_LOCATIONS = [
  'Main Library (1st & 2nd Floor)',
  'Science Complex / Lab 4',
  'Student Activity Center (SAC)',
  'North Dining Hall & Cafeteria',
  'Engineering Building B',
  'Campus Recreation & Sports Gym',
  'Business School Atrium',
  'Arts & Humanities Quad',
  'Campus Shuttle Bus #4',
  'Central Plaza / Amphitheater'
];

export const CATEGORIES = [
  { id: 'electronics', label: 'Electronics & Gadgets', icon: 'Laptop' },
  { id: 'wallets', label: 'Wallets & IDs', icon: 'CreditCard' },
  { id: 'keys', label: 'Keys & Badges', icon: 'Key' },
  { id: 'clothing', label: 'Clothing & Accessories', icon: 'Shirt' },
  { id: 'bags', label: 'Bags & Backpacks', icon: 'Briefcase' },
  { id: 'stationery', label: 'Books & Stationery', icon: 'BookOpen' },
  { id: 'bottles', label: 'Bottles & Tumblers', icon: 'Coffee' },
  { id: 'jewelry', label: 'Jewelry & Watches', icon: 'Watch' },
  { id: 'other', label: 'Other Items', icon: 'Package' }
];

export const INITIAL_ITEMS = [
  {
    id: 'fb-101',
    type: 'found', // 'lost' | 'found'
    title: 'Apple AirPods Pro (2nd Gen) in White Case',
    category: 'electronics',
    location: 'Main Library (1st & 2nd Floor)',
    date: '2026-11-08',
    time: '14:30',
    description: 'Found on desk #34 near the silent study wing on the 2nd floor. White charging case with a small sticker of a cartoon astronaut on the back. AirPods inside have full charge.',
    reward: '',
    contactName: 'Elena Rostova',
    contactEmail: 'e.rostova@campus.edu',
    contactPhone: '+1 (555) 234-8901',
    status: 'open', // 'open' | 'claimed' | 'resolved'
    imageUrl: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
    claimedBy: null,
    claimCount: 2,
    createdAt: '2026-11-08T15:10:00Z',
    isUserReport: false
  },
  {
    id: 'fb-102',
    type: 'lost',
    title: 'Midnight Blue Herschel Backpack with Laptop',
    category: 'bags',
    location: 'Student Activity Center (SAC)',
    date: '2026-11-09',
    time: '11:15',
    description: 'Accidentally left beside the ping pong tables in the recreation lounge. Contains a 14-inch MacBook Air (silver with GitHub stickers), organic chemistry notebooks, and house keys on a red lanyard.',
    reward: '$50 cash reward',
    contactName: 'Marcus Chen',
    contactEmail: 'mchen98@campus.edu',
    contactPhone: '+1 (555) 782-9014',
    status: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    claimedBy: null,
    claimCount: 0,
    createdAt: '2026-11-09T11:45:00Z',
    isUserReport: false
  },
  {
    id: 'fb-103',
    type: 'found',
    title: 'Student ID & Campus Metro Pass Cardholder',
    category: 'wallets',
    location: 'North Dining Hall & Cafeteria',
    date: '2026-11-07',
    time: '19:40',
    description: 'Black faux leather card sleeve containing Campus Student ID for "Sophia Martinez" and a blue monthly transit card. Handed over to the dining hall front counter staff.',
    reward: '',
    contactName: 'Dining Hall Security / Dave',
    contactEmail: 'dining-lostfound@campus.edu',
    contactPhone: '+1 (555) 441-0192',
    status: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    claimedBy: null,
    claimCount: 1,
    createdAt: '2026-11-07T20:00:00Z',
    isUserReport: false
  },
  {
    id: 'fb-104',
    type: 'lost',
    title: 'TI-84 Plus CE Color Graphing Calculator',
    category: 'stationery',
    location: 'Engineering Building B',
    date: '2026-11-06',
    time: '16:00',
    description: 'Black TI-84 Plus CE calculator in slide cover. Back cover has initials "AK" scratched faintly near battery compartment. Urgently needed for upcoming midterms!',
    reward: '$20 coffee gift card',
    contactName: 'Aarav Kumar',
    contactEmail: 'aarav.k@campus.edu',
    contactPhone: '+1 (555) 609-3281',
    status: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=800&q=80',
    claimedBy: null,
    claimCount: 0,
    createdAt: '2026-11-06T17:20:00Z',
    isUserReport: false
  },
  {
    id: 'fb-105',
    type: 'found',
    title: 'Car Keychain with Honda Fob & Mini Carabiner',
    category: 'keys',
    location: 'Campus Recreation & Sports Gym',
    date: '2026-11-09',
    time: '08:20',
    description: 'Silver Honda car remote key with two brass door keys and a purple gym locker barcode tag attached via black paracord braid.',
    reward: '',
    contactName: 'Gym Helpdesk (Coach Miller)',
    contactEmail: 'rec-frontdesk@campus.edu',
    contactPhone: '+1 (555) 890-4421',
    status: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80',
    claimedBy: null,
    claimCount: 3,
    createdAt: '2026-11-09T08:50:00Z',
    isUserReport: false
  },
  {
    id: 'fb-106',
    type: 'found',
    title: 'Hydro Flask 32oz Wide Mouth Water Bottle (Olive Green)',
    category: 'bottles',
    location: 'Science Complex / Lab 4',
    date: '2026-11-05',
    time: '13:00',
    description: 'Olive green Hydro Flask with flex straw lid. Decorated with national park stickers (Yosemite, Banff, Zion). Cleaned and placed on the department lost shelf in Room 204.',
    reward: '',
    contactName: 'Lab Assistant Maya',
    contactEmail: 'maya.labs@campus.edu',
    contactPhone: '+1 (555) 312-7809',
    status: 'resolved',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
    claimedBy: {
      name: 'Oliver Thorne',
      email: 'oliver.t@campus.edu',
      proof: 'Accurately described the scratch under the Yosemite sticker and base boot.',
      date: '2026-11-06'
    },
    claimCount: 1,
    createdAt: '2026-11-05T13:30:00Z',
    isUserReport: false
  },
  {
    id: 'fb-107',
    type: 'lost',
    title: 'North Face Puffer Jacket (Charcoal Gray, Size L)',
    category: 'clothing',
    location: 'Business School Atrium',
    date: '2026-11-07',
    time: '18:15',
    description: 'Charcoal gray zip-up down jacket. Left on the sofa booth in the MBA common room. Might have an orange university shuttle pass ticket in the right zipped pocket.',
    reward: '$30 reward',
    contactName: 'Chloe Dupont',
    contactEmail: 'c.dupont@campus.edu',
    contactPhone: '+1 (555) 912-3401',
    status: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80',
    claimedBy: null,
    claimCount: 0,
    createdAt: '2026-11-07T18:45:00Z',
    isUserReport: true
  },
  {
    id: 'fb-108',
    type: 'found',
    title: 'Sony WH-1000XM4 Noise Canceling Headphones (Silver)',
    category: 'electronics',
    location: 'Arts & Humanities Quad',
    date: '2026-11-08',
    time: '16:45',
    description: 'Found inside a gray zip hard case on a concrete bench facing the fountain. Includes charging cable and 3.5mm audio wire. Turned in to Quad Security kiosk.',
    reward: '',
    contactName: 'Officer Bradley',
    contactEmail: 'campus-police-box2@campus.edu',
    contactPhone: '+1 (555) 100-2440',
    status: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    claimedBy: null,
    claimCount: 1,
    createdAt: '2026-11-08T17:15:00Z',
    isUserReport: false
  }
];

export const INITIAL_CLAIMS = [
  {
    id: 'claim-1',
    itemId: 'fb-101',
    itemTitle: 'Apple AirPods Pro (2nd Gen) in White Case',
    claimantName: 'Sarah Jenkins',
    claimantEmail: 'sjenkins@campus.edu',
    claimantPhone: '+1 (555) 432-1100',
    ownershipProof: 'The Bluetooth device name is set to "Sarah’s Pods". Serial number ends with 49K9. I can unlock them on Find My on my iPhone.',
    additionalNotes: 'I had study session at desk 34 before my 3 PM lecture.',
    status: 'pending', // 'pending' | 'approved' | 'rejected'
    submittedAt: '2026-11-08T16:05:00Z'
  },
  {
    id: 'claim-2',
    itemId: 'fb-105',
    itemTitle: 'Car Keychain with Honda Fob & Mini Carabiner',
    claimantName: 'Brian Scott',
    claimantEmail: 'bscott21@campus.edu',
    claimantPhone: '+1 (555) 789-2211',
    ownershipProof: 'Gym locker number on barcode is #248. The Honda fob operates a gray 2018 Civic parked in lot C.',
    additionalNotes: 'Can demonstrate lock/unlock with security presence.',
    status: 'pending',
    submittedAt: '2026-11-09T09:15:00Z'
  }
];

export const INITIAL_ACTIVITIES = [
  {
    id: 'act-1',
    type: 'found_reported',
    text: 'New found item reported: Apple AirPods Pro (2nd Gen)',
    location: 'Main Library',
    time: '2 hours ago'
  },
  {
    id: 'act-2',
    type: 'claim_submitted',
    text: 'Sarah Jenkins submitted a verification claim for AirPods Pro',
    location: 'Main Library',
    time: '3 hours ago'
  },
  {
    id: 'act-3',
    type: 'resolved',
    text: 'Item successfully reunited: Hydro Flask 32oz (Olive Green)',
    location: 'Science Complex',
    time: '1 day ago'
  },
  {
    id: 'act-4',
    type: 'lost_reported',
    text: 'New lost alert: Midnight Blue Herschel Backpack',
    location: 'Student Activity Center',
    time: '5 hours ago'
  }
];

