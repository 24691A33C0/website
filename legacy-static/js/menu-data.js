/* ==========================================================================
   DYNAMIC STRESS BUSTER CAFE — SIGNATURE MENU CATALOG
   Includes neuro-nutrition insights, adaptogenic benefits, and mood tags
   ========================================================================== */

const CAFE_MENU = [
  // COFFEE & SPECIALTY BREWS
  {
    id: 'm1',
    name: 'Vanilla Oat Cortado with Ashwagandha',
    category: 'coffee',
    price: 6.50,
    desc: 'Double shot of Ethiopian single-origin pulled over steamed velvety oat milk, infused with 300mg organic KSM-66 Ashwagandha for zero caffeine jitters.',
    benefit: 'Anti-Jitter Balance (Cortisol Regulator)',
    calories: '120 kcal',
    dietary: ['Vegan', 'Dairy-Free'],
    moods: ['anxious', 'fatigued', 'work-overload'],
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80',
    popular: true
  },
  {
    id: 'm2',
    name: 'Smoked Honey & Lavender Latte',
    category: 'coffee',
    price: 6.75,
    desc: 'Espresso enveloped in wildflower honey infused with French culinary lavender buds and caramelized maple sea salt.',
    benefit: 'Aromatherapy Relaxation & Vagus Nerve Soother',
    calories: '160 kcal',
    dietary: ['Vegetarian', 'Gluten-Free'],
    moods: ['burnout', 'heartbroken', 'overwhelmed'],
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=700&q=80',
    popular: true
  },
  {
    id: 'm3',
    name: 'Sparkling Yuzu Cold Brew Tonic',
    category: 'coffee',
    price: 6.25,
    desc: '18-hour cold brew layered over artisanal Japanese Yuzu citrus tonic and rosemary sprig. Bright, crisp, and revitalizing.',
    benefit: 'Dopamine Lift & Brain Fog Dispeller',
    calories: '45 kcal',
    dietary: ['Vegan', 'Gluten-Free', 'Low-Calorie'],
    moods: ['brain-fog', 'sluggish', 'creative-block'],
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=700&q=80',
    popular: false
  },
  {
    id: 'm4',
    name: 'Golden Cardamom Macchiato',
    category: 'coffee',
    price: 5.75,
    desc: 'Rich velvety espresso marked with microfoam dust and crushed green cardamom pods. A comforting spice hug in a ceramic cup.',
    benefit: 'Digestive Comfort & Heart Warming',
    calories: '90 kcal',
    dietary: ['Vegetarian'],
    moods: ['homesick', 'anxious', 'cold'],
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=700&q=80',
    popular: false
  },

  // ADAPTOGENIC ELIXIRS
  {
    id: 'm5',
    name: 'Ceremonial Matcha L-Theanine Cloud',
    category: 'adaptogen',
    price: 7.25,
    desc: 'First-harvest Uji matcha hand-whisked with lion’s mane mushroom essence and vanilla bean froth. Provides 4 hours of tranquil, razor-sharp focus.',
    benefit: 'High Alpha-Waves: Calm Alertness',
    calories: '110 kcal',
    dietary: ['Vegan', 'Sugar-Conscious'],
    moods: ['brain-fog', 'deadline-panic', 'study-session'],
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=700&q=80',
    popular: true
  },
  {
    id: 'm6',
    name: 'Reishi Cacao Nightcap',
    category: 'adaptogen',
    price: 6.95,
    desc: 'Raw Ecuadorian heirloom cacao with red Reishi mushroom, Ceylon cinnamon, and warmed coconut milk. The ultimate cortisol antidote.',
    benefit: 'Melatonin Precursor & Deep Muscle Relaxation',
    calories: '145 kcal',
    dietary: ['Vegan', 'Gluten-Free'],
    moods: ['burnout', 'insomnia', 'overstimulated'],
    image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=700&q=80',
    popular: true
  },
  {
    id: 'm7',
    name: 'Blue Spirulina Serenity Potion',
    category: 'adaptogen',
    price: 7.50,
    desc: 'Vibrant sapphire blue spirulina blended with holy basil (tulsi), oat milk, and Madagascar vanilla over crystal-clear ice sphere.',
    benefit: 'Cellular Antioxidant & Adrenal Recovery',
    calories: '95 kcal',
    dietary: ['Vegan', 'Caffeine-Free'],
    moods: ['overwhelmed', 'anxious', 'screen-fatigue'],
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=700&q=80',
    popular: false
  },

  // CALMING BOTANICAL TEAS
  {
    id: 'm8',
    name: 'Alpine Chamomile & Lemon Verbena Bloom',
    category: 'tea',
    price: 5.50,
    desc: 'Hand-picked whole Egyptian chamomile flowers paired with citrusy lemon verbena and dried lavender. Naturally caffeine-free.',
    benefit: 'GABA Receptor Stimulator for Total Tranquility',
    calories: '0 kcal',
    dietary: ['Organic', 'Vegan', 'Caffeine-Free'],
    moods: ['insomnia', 'anxious', 'burnout'],
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=700&q=80',
    popular: true
  },
  {
    id: 'm9',
    name: 'Ruby Rosehip & Hibiscus Zen Iced Tea',
    category: 'tea',
    price: 5.80,
    desc: 'Tangy cold-steeped wild hibiscus flowers, sweet rosehip, and orange blossom water with fresh mint sprigs.',
    benefit: 'Vitamin C Boost & Blood Pressure Ease',
    calories: '25 kcal',
    dietary: ['Vegan', 'Low-Calorie', 'Caffeine-Free'],
    moods: ['heated', 'sluggish', 'frazzled'],
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=700&q=80',
    popular: false
  },
  {
    id: 'm10',
    name: 'Silver Needle White Peony Jasmine',
    category: 'tea',
    price: 6.20,
    desc: 'Rare tender spring tea buds scented seven times with night-blooming jasmine flowers. Silky, subtle floral aroma.',
    benefit: 'L-Theanine Infusion & Gentle Meditation Companion',
    calories: '0 kcal',
    dietary: ['Organic', 'Vegan'],
    moods: ['creative-block', 'peace-seeker', 'quiet-reading'],
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=700&q=80',
    popular: false
  },

  // COMFORT BITES & SAVORY NOURISHMENT
  {
    id: 'm11',
    name: 'Truffle & Aged Cheddar Melt on Sourdough',
    category: 'bites',
    price: 11.50,
    desc: 'Slow-fermented artisan sourdough stuffed with 18-month aged cheddar, gruyère, black truffle paste, and caramelized onion jam.',
    benefit: 'Comfort Food Endorphin Release',
    calories: '490 kcal',
    dietary: ['Vegetarian'],
    moods: ['heartbroken', 'rainy-day-blues', 'comfort-craving'],
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80',
    popular: true
  },
  {
    id: 'm12',
    name: 'Avocado Tartine with Hemp Seed Gomasio',
    category: 'bites',
    price: 10.25,
    desc: 'Ripe Hass avocado on seeded rye bread with pickled radishes, hemp hearts, microgreens, and lemon zest olive oil.',
    benefit: 'Healthy Omega-3 Fats for Brain Cell Membrane Health',
    calories: '320 kcal',
    dietary: ['Vegan', 'Whole-Food'],
    moods: ['sluggish', 'brain-fog', 'clean-energy'],
    image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&w=700&q=80',
    popular: true
  },
  {
    id: 'm13',
    name: 'Warm Roasted Tomato & Basil Bisque',
    category: 'bites',
    price: 8.75,
    desc: 'San Marzano tomatoes roasted with garlic confit and blended with cashew cream and sweet basil. Served with warm crusty baguette.',
    benefit: 'Serotonin-Promoting Warmth & Lycopene Shield',
    calories: '260 kcal',
    dietary: ['Vegan', 'Gluten-Free Option'],
    moods: ['homesick', 'exhausted', 'overwhelmed'],
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=700&q=80',
    popular: false
  },
  {
    id: 'm14',
    name: 'Wild Mushroom Brioche Toast with Ricotta',
    category: 'bites',
    price: 11.75,
    desc: 'Pan-seared chanterelle and shiitake mushrooms over whipped lemon ricotta on toasted golden brioche with thyme sprig.',
    benefit: 'Vitamin D & Earthy Grounding Flavors',
    calories: '380 kcal',
    dietary: ['Vegetarian'],
    moods: ['creative-block', 'comfort-craving', 'hungry'],
    image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=700&q=80',
    popular: false
  },

  // ARTISAN DE-STRESS DESSERTS
  {
    id: 'm15',
    name: 'Warm Dark Chocolate Lava Tartlet',
    category: 'dessert',
    price: 8.50,
    desc: '72% Single-Origin Dominican dark chocolate tart with a molten core infused with sea salt flakes and roasted pistachio dust.',
    benefit: 'Anandamide (The Bliss Molecule) & Magnesium Rich',
    calories: '340 kcal',
    dietary: ['Vegetarian'],
    moods: ['burnout', 'heartbroken', 'celebrating'],
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80',
    popular: true
  },
  {
    id: 'm16',
    name: 'Earl Grey & Bergamot Tea Cake',
    category: 'dessert',
    price: 6.50,
    desc: 'Fluffy sponge cake infused with high-grown Ceylon black tea and bergamot peel, crowned with lavender honey glaze.',
    benefit: 'Aromatherapy Delight & Soothing Sweetness',
    calories: '270 kcal',
    dietary: ['Vegetarian'],
    moods: ['peace-seeker', 'quiet-reading', 'rainy-day-blues'],
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80',
    popular: false
  },
  {
    id: 'm17',
    name: 'Pistachio Rosewater Basbousa',
    category: 'dessert',
    price: 6.80,
    desc: 'Golden semolina cake soaked in subtle Persian rose blossom syrup, topped with crushed emerald pistachios and edible rose petals.',
    benefit: 'Sensory Nostalgia & Euphoric Fragrance',
    calories: '290 kcal',
    dietary: ['Vegetarian'],
    moods: ['celebrating', 'homesick', 'comfort-craving'],
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=700&q=80',
    popular: false
  }
];

window.CAFE_MENU = CAFE_MENU;
