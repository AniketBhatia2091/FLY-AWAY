const Destination = require('./src/models/Destination');
const sequelize = require('./src/config/database');

const seedData = [
    {
        name: "goa_itin",
        title: "Goa Beach Vacation",
        image: "goa.jpg",
        discount: "-25%",
        originalPrice: "₹45,000",
        price: "₹33,750",
        days: 7,
        itinerary: {
            title: "3 Days Goa Adventure Itinerary",
            days: [
                { title: "Beaches and Vibrant Nightlife", content: "Start your day at Calangute Beach, one of Goa's most popular beaches. Enjoy water sports, sunbathing, and beachside cafes. In the evening, explore the vibrant nightlife at Tito's Lane in Baga." },
                { title: "Cultural and Historical Tour", content: "Visit Basilica of Bom Jesus, a UNESCO World Heritage Site. Explore Old Goa's Portuguese architecture and churches. End the day with a sunset cruise on the Mandovi River." },
                { title: "Nature and Tranquility", content: "Visit Dudhsagar Waterfalls, one of India's tallest waterfalls. Trek through the lush forests and enjoy a refreshing swim in the natural pools. Visit a spice plantation to learn about Goa's agricultural heritage." }
            ]
        }
    },
    {
        name: "rajasthan",
        title: "Rajasthan Heritage Tour",
        image: "rajasthan.jpg",
        discount: "-10%",
        originalPrice: "₹70,000",
        price: "₹63,000",
        days: 10,
        itinerary: {
            title: "3 Days Rajasthan Adventure Itinerary",
            days: [
                { title: "Forts and Palaces", content: "Visit Amber Fort in Jaipur, known for its artistic Hindu style architecture. Explore the City Palace and Jantar Mantar observatory. Enjoy traditional Rajasthani cuisine for dinner." },
                { title: "Cultural Exploration", content: "Visit Hawa Mahal, the iconic Palace of Winds. Explore local markets for handicrafts, textiles, and jewelry. Watch a traditional puppet show in the evening." },
                { title: "Desert and Wilderness", content: "Visit Thar Desert for a camel safari. Experience desert camping with bonfire and traditional folk music. Watch a spectacular sunrise over the sand dunes." }
            ]
        }
    },
    {
        name: "kerala",
        title: "Kerala Backwaters Adventure",
        image: "kerela.jpg",
        discount: "-50%",
        originalPrice: "₹40,000",
        price: "₹20,000",
        days: 5
    },
    {
        name: "himachal",
        title: "Himachal Trekking Expedition",
        image: "himachal.jpg",
        discount: "-30%",
        originalPrice: "₹60,000",
        price: "₹42,000",
        days: 12
    },
    {
        name: "ladakh",
        title: "Ladakh Adventure Tour",
        image: "ladakh.jpg",
        discount: "-20%",
        originalPrice: "₹50,000",
        price: "₹40,000",
        days: 8
    },
    {
        name: "andaman",
        title: "Andaman Island Getaway",
        image: "Andaman Sea, Thailand.jpg",
        discount: "-15%",
        originalPrice: "₹60,000",
        price: "₹51,000",
        days: 6
    },
    {
        name: "uttarakhand",
        title: "Uttarakhand Nature Retreat",
        image: "uttrakhand.jpg",
        discount: "-30%",
        originalPrice: "₹30,000",
        price: "₹21,000",
        days: 5
    },
    {
        name: "kashmir",
        title: "Kashmir Valley Tour",
        image: "Kashmir.jpg",
        discount: "-35%",
        originalPrice: "₹55,000",
        price: "₹35,750",
        days: 7
    }
];

async function seedDatabase() {
    try {
        // Sync database
        await sequelize.sync({ force: true });
        console.log('Database synced');

        // Insert seed data
        await Destination.bulkCreate(seedData);
        console.log('Seed data inserted successfully');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
