const mongoose = require("mongoose")
const campground = require("../models/campground");
const cities = require('./cities');
const { descriptors, places } = require("../seeds/seedhelpers")

mongoose
    .connect("mongodb://127.0.0.1:27017/yelp-camp")
    .then(() => {
        console.log("Mongoose connection established");
    })
    .catch(() => {
        console.log("Error in Mongoose connection");

    });

const sample = (array) => {
    return array[Math.floor(Math.random() * array.length)]
}

const seedsDb = async () => {
    await campground.deleteMany({});
    for (let i = 0; i <= 50; i++) {
        const random1000 = Math.floor(Math.random() * 999);
        const random30 = Math.floor(Math.random() * 20) + 10;
        const location = `${cities[random1000].state} ${cities[random1000].city}`
        const camp = new campground({
            name: `${sample(descriptors)} ${sample(places)}`,
            location, author: "66c3c538cfb1933e1fa321b1",
            price: random30,
            // image: `https://picsum.photos/400?random=${Math.random()}`,

            images: [
                {
                  url: 'https://res.cloudinary.com/dresksqvq/image/upload/v1733434522/YelpCamp/wl4e5gg33en1apot9n6t.png',
                  filename: 'YelpCamp/zkmyqy3awtkjqemat8uj',
                },
                {
                  url: 'https://res.cloudinary.com/dresksqvq/image/upload/v1733612647/YelpCamp/nqhjguhmtf624yby7nzu.png',
                  filename: 'YelpCamp/tm6dekyfaah1az3cvw6m',
                }
              ],

            description:
                " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae odio eos animi est iste voluptatem dicta praesentium aperiam adipisci non exercitationem iusto, quam natus labore. Tempore nulla officiis nemo quaerat? Officia vero eius nam suscipit.Optio, commodi? Nulla, laborum.Ab numquam vero quisquam dolorum blanditiis sed nihil minima odit ut, adipisci rerum.Adipisci necessitatibus sit tempora iusto facilis eos molestias. Natus, voluptatibus! In, dignissimos libero est non corrupti ad repudiandae officiis pariatur earum, repellat, necessitatibus magnam omnis labore voluptatum voluptas fugit tempora ex obcaecati veritatis rem.Minus placeat sit totam."
        })
        await camp.save()
    }
}
seedsDb().then(() => {
    mongoose.connection.close()
});
