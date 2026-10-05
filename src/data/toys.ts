import { Toy, StoreEvent, CustomerReview } from '../types/toy';

export const TOYS: Toy[] = [
  {
    id: 'heirloom-rocking-horse',
    name: 'Artisan Birch Rocking Horse',
    category: 'wooden',
    categoryLabel: 'Handcrafted Wooden',
    ageBracket: '0-2',
    ageLabel: '1–4 Years',
    price: 185.00,
    rating: 5.0,
    reviewsCount: 38,
    image: '/src/assets/images/product_wooden_rocking_horse_1791180743518.jpg',
    tagline: 'Hand-shaped from solid sustainable birch with organic beeswax finish',
    description: 'Carved one at a time in our local workshop. Features smoothly contoured edges, gentle rocking arc engineered for safety, and an all-natural vegetable-tanned leather bridle. Designed to be cherished through generations.',
    materials: 'Sustainably harvested Baltic birch, natural beeswax & walnut oil seal',
    origin: 'Handmade in Elm Street Workshop',
    dimensions: '74cm L × 28cm W × 52cm H',
    safetyCert: 'ASTM F963 & EN71 compliant · Lead-free · Zero VOCs',
    inStockCount: 4,
    isHeirloomChoice: true,
    features: [
      'Gently contoured seat supports toddlers safely',
      'Solid birch runners prevent tipping',
      'Smooth hand-sanded finish feels silky to tiny hands',
      'Personalized engraving available upon in-store request'
    ]
  },
  {
    id: 'mechanical-locomotive',
    name: 'Clockwork Railway Express & Tender',
    category: 'stem',
    categoryLabel: 'STEM & Mechanical',
    ageBracket: '6-8',
    ageLabel: '5–10 Years',
    price: 68.00,
    rating: 4.9,
    reviewsCount: 52,
    image: '/src/assets/images/product_mechanical_train_1791180753954.jpg',
    tagline: 'Spring-wound steel clockwork mechanism with solid brass bell and timber rails',
    description: 'No batteries, screens, or plastic gears. Wind the brass key and watch the precision steel gear train drive this miniature steam-era locomotive down 12 included interlocking beech tracks.',
    materials: 'Heavy gauge pressed steel, solid brass fittings, beechwood tracks',
    origin: 'Nuremberg clockwork guild partnered with our shop',
    dimensions: 'Locomotive: 22cm L · Track circuit: 90cm diameter',
    safetyCert: 'Smooth rolled metal edges · Non-toxic enamel finish',
    inStockCount: 9,
    isHeirloomChoice: true,
    features: [
      'Genuine spring-powered clockwork movement (60s continuous run)',
      'Working brass chime bell and directional reversing lever',
      'Includes 12 interlocking beechwood curved tracks',
      'Teaches mechanical transfer of kinetic energy'
    ]
  },
  {
    id: 'felt-woodland-critters',
    name: 'Organic Wool Woodland Puppets (Set of 4)',
    category: 'plush',
    categoryLabel: 'Organic Plush & Puppets',
    ageBracket: '3-5',
    ageLabel: '2–7 Years',
    price: 46.00,
    rating: 4.9,
    reviewsCount: 64,
    image: '/src/assets/images/product_felt_woodland_creatures_1791180763316.jpg',
    tagline: 'Pure felted sheep wool dyed with marigold, madder root, and indigo',
    description: 'Meet Barnaby Bear, Rowan Fox, Hazel Owl, and Bramble Fawn. Hand-stitched with organic wool felt and stuffed with recycled wool fleece. Soft, tactile, and primed for hours of bedtime stories and puppet theater.',
    materials: '100% Certified organic felted wool, botanical vegetable dyes',
    origin: 'Crafted by our regional wool guild',
    dimensions: 'Approx 18cm H each',
    safetyCert: 'Oeko-Tex Standard 100 Class I (safe for teething babies)',
    inStockCount: 14,
    isHeirloomChoice: false,
    features: [
      'Fits both adult fingers and little child hands comfortably',
      'Colours extracted strictly from plants and botanical roots',
      'No small plastic beads or loose choking elements',
      'Machine washable in cold wool cycle'
    ]
  },
  {
    id: 'beech-architectural-blocks',
    name: 'Old-Growth Beech Architectural Blocks (64 pcs)',
    category: 'wooden',
    categoryLabel: 'Handcrafted Wooden',
    ageBracket: '3-5',
    ageLabel: '2–9 Years',
    price: 74.00,
    rating: 4.8,
    reviewsCount: 41,
    image: '/src/assets/images/store_artisan_workshop_1791180774555.jpg',
    tagline: 'Precision-cut unlacquered European beechwood in a dovetailed pine crate',
    description: 'Based on the timeless Froebel and Bauhaus geometric proportions. Archways, columns, triangular pediments, and rectangular slabs cut to exact mathematical fractions for intuitive structural learning.',
    materials: 'FSC-certified European steamed beech, solid Scots pine crate with rope handles',
    origin: 'Milled in Bavaria, finished in our Elm Street workshop',
    dimensions: 'Crate: 34cm × 26cm × 11cm',
    safetyCert: 'Pure raw wood · No varnish or synthetics',
    inStockCount: 8,
    isHeirloomChoice: true,
    features: [
      '64 pieces in 11 mathematically harmonious shapes',
      'Matte micro-sanded grain provides natural grip for tall towers',
      'Durable heirloom sliding-lid storage crate included',
      'Open-ended open play encourages spatial reasoning'
    ]
  },
  {
    id: 'celestial-orrery-kit',
    name: 'Mechanical Solar System Orrery',
    category: 'stem',
    categoryLabel: 'STEM & Mechanical',
    ageBracket: '9+',
    ageLabel: '8–14 Years',
    price: 58.00,
    rating: 4.9,
    reviewsCount: 29,
    image: '/src/assets/images/product_mechanical_train_1791180753954.jpg',
    tagline: 'Hand-cranked gear system demonstrating planetary orbits and moon phases',
    description: 'Turn the brass-accented wooden crank to see Mercury, Venus, Earth, and Mars orbit the central brass sun at their accurate relative gear speeds. Laser-cut birch with brass axles.',
    materials: 'Sustainably farmed birch ply, machined solid brass bushings',
    origin: 'Designed & assembled in our workshop',
    dimensions: '28cm H × 32cm diameter',
    safetyCert: 'Non-toxic wood stain · Precision laser-cut smooth edges',
    inStockCount: 6,
    isHeirloomChoice: false,
    features: [
      'Accurate proportional planetary rotation ratios',
      'Moon rotates synchronously around Earth as Earth orbits Sun',
      'Complete illustrated assembly journal and astronomical guide',
      'Zero glue or soldering required for construction'
    ]
  },
  {
    id: 'botanist-greenhouse',
    name: 'Little Botanist Cedar Greenhouse & Press',
    category: 'creative',
    categoryLabel: 'Creative & Craft',
    ageBracket: '6-8',
    ageLabel: '5–11 Years',
    price: 49.00,
    rating: 4.8,
    reviewsCount: 33,
    image: '/src/assets/images/product_felt_woodland_creatures_1791180763316.jpg',
    tagline: 'Aromatic cedar planting tray with glass bell jar and botanical flower press',
    description: 'Inspires a lifelong love of living plants. Includes heirloom non-GMO sunflower and sweet pea seeds, mini wooden trowel, soil peat disks, and a traditional 4-bolt wildflower drying press.',
    materials: 'Rot-resistant Western Red Cedar, recycled soda glass, cotton blotter papers',
    origin: 'Crafted in collaboration with Cedar Valley Woodcraft',
    dimensions: 'Greenhouse: 25cm × 18cm × 22cm',
    safetyCert: 'Child-safe annealed glass · Organic non-GMO seeds',
    inStockCount: 11,
    isHeirloomChoice: false,
    features: [
      'Real sprouting observation within 4–7 days',
      'Heavy-duty flower press preserves garden blooms for cards',
      'Includes illustrated Nature Journal with drawing prompts',
      'Reusable year after year with garden seedlings'
    ]
  },
  {
    id: 'garden-croquet-set',
    name: 'Heritage Wooden Lawn Croquet (4 Player)',
    category: 'games',
    categoryLabel: 'Puzzles & Games',
    ageBracket: '6-8',
    ageLabel: '5+ Years (Family)',
    price: 88.00,
    rating: 5.0,
    reviewsCount: 22,
    image: '/src/assets/images/product_wooden_rocking_horse_1791180743518.jpg',
    tagline: 'Turned ash mallets with solid composite balls and canvas field tote',
    description: 'An afternoon favorite for family picnics and lawn play. 4 solid ash mallets turned on our lathe, 4 vibrant wooden scoring posts, 9 powder-coated steel wickets, and heavy cotton storage bag.',
    materials: 'American white ash wood, non-toxic water-based color rings, steel wickets',
    origin: 'Turned on lathe in Elm Street workshop',
    dimensions: 'Mallet length: 72cm (child/adult dual comfort)',
    safetyCert: 'Lead-free durable outdoor sealant',
    inStockCount: 5,
    isHeirloomChoice: true,
    features: [
      'Proportioned for both kids and adults to play together',
      'Solid turned ash heads will never split on impact',
      'Classic canvas drawstring carry sack for park outings',
      'Includes easy-to-learn rule booklet with garden variations'
    ]
  },
  {
    id: 'kaleidoscope-brass',
    name: 'Solid Brass Celestial Optical Kaleidoscope',
    category: 'creative',
    categoryLabel: 'Creative & Craft',
    ageBracket: '3-5',
    ageLabel: '4–99 Years',
    price: 38.00,
    rating: 4.9,
    reviewsCount: 77,
    image: '/src/assets/images/product_mechanical_train_1791180753954.jpg',
    tagline: 'Hand-blown dichroic glass crystals and 3-mirror internal optical prism',
    description: 'Hold it to the light and rotate the brass barrel to step into infinite symphonies of light and geometry. Filled with hand-torched glass beads, sea glass, and brass shavings floating in mineral oil.',
    materials: 'Polished solid brass tube, optical-grade front-surface mirrors, Murano glass shards',
    origin: 'Hand-assembled in Elm Street Workshop',
    dimensions: '19cm L × 4cm diameter',
    safetyCert: 'Sealed fluid cell · Drop-resistant ocular rim',
    inStockCount: 16,
    isHeirloomChoice: true,
    features: [
      'Front-surface mirror creates crystal-sharp symmetry without ghosting',
      'Oil-filled chamber creates graceful, slowly drifting patterns',
      'Develops quiet focus, sensory calm, and optical curiosity',
      'Gift boxed in recycled velvet-lined Kraft sleeve'
    ]
  }
];

export const UPCOMING_EVENTS: StoreEvent[] = [
  {
    id: 'saturday-carving',
    title: 'Saturday Morning Wooden Toy Carving & Painting',
    dayTime: 'Every Saturday · 10:00 AM – 11:30 AM',
    ageRecommendation: 'Ages 5–12 (with guardian)',
    instructor: 'Master Toymaker Arthur & Apprentice Clara',
    description: 'Children sand, assemble, and hand-paint their own wooden sailboat or spinning top using all-natural milk paints. Take home what you make!',
    seatsLeft: 4,
    totalSeats: 12,
    cost: 'Free ($5 optional materials donation)'
  },
  {
    id: 'toddler-storytime',
    title: 'Sunday Morning Puppet Storytime & Song',
    dayTime: 'Every Sunday · 11:15 AM – 12:00 PM',
    ageRecommendation: 'Ages 0–4',
    instructor: 'Storyteller Maeve & Barnaby Bear',
    description: 'Gather round the cozy rug by our antique fireplace for lively folk tales, acoustic guitar nursery songs, and wool puppet theater.',
    seatsLeft: 7,
    totalSeats: 18,
    cost: 'Always Free'
  },
  {
    id: 'free-toy-clinic',
    title: 'The Saturday Neighborhood Toy Repair Clinic',
    dayTime: 'First & Third Saturday · 2:00 PM – 4:30 PM',
    ageRecommendation: 'All Ages welcome',
    instructor: 'The Juniper & Sprout Repair Guild',
    description: 'Got a favorite wooden train missing a wheel, or a beloved teddy with a torn seam? Bring it in! We fix neighborhood toys for free to keep memories alive and reduce landfill waste.',
    seatsLeft: 6,
    totalSeats: 10,
    cost: 'Free Community Service'
  }
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'Eleanor Vance',
    location: 'Maple Ridge Neighborhood',
    rating: 5,
    date: '3 days ago',
    toyPurchased: 'Artisan Birch Rocking Horse',
    comment: 'We purchased this rocking horse for our daughter’s first birthday. The craftsmanship is breathtaking—it smells like honey and sweet beeswax. She spends hours rocking and laughing. This will be in our family for decades.'
  },
  {
    id: 'rev-2',
    author: 'David & Noah K.',
    location: 'Elm Street Local',
    rating: 5,
    date: '1 week ago',
    toyPurchased: 'Clockwork Railway Express',
    comment: 'In a world where everything is an iPad or requires AAA batteries that corrode, this clockwork train is a revelation. Noah (6) loves turning the brass key and watching the gears turn. Arthur in the workshop even showed him how the escapement works.'
  },
  {
    id: 'rev-3',
    author: 'Priya Sharma',
    location: 'Heritage District',
    rating: 5,
    date: '2 weeks ago',
    toyPurchased: 'Organic Wool Woodland Puppets',
    comment: 'The quality of the wool felt is incredible. So tactile, vibrant, and soft. We also love the Saturday repair clinic—Arthur glued our old wooden crane back together with genuine patience and care.'
  }
];

export const STORE_DETAILS = {
  name: 'Juniper & Sprout Toymakers',
  street: '42 Elm Street (between Oak & Pinewood)',
  district: 'The Historic Artisan Quarter',
  city: 'Millwood',
  phone: '(555) 382-7688',
  email: 'hello@juniperandsprout.local',
  hours: {
    weekday: 'Monday – Friday: 9:30 AM – 6:00 PM',
    saturday: 'Saturday: 9:00 AM – 6:30 PM (Workshop Open)',
    sunday: 'Sunday: 11:00 AM – 5:00 PM (Storytime 11:15)'
  },
  pickupPolicy: 'Click & Collect orders are typically wrapped and ready in 2 hours. Simply show your confirmation name at the counter!'
};
