const faker = require("faker")

const users = []
const categories = []
const products = []
const sellers = []
const orders = []

function getData() {
    users.push(
        ...Array.from({ length: 20 }, (i, k) => ({
            id: k,
            name: faker.name.findName(),
            email: faker.internet.email(),
        }))
    )

    categories.push(
        ...Array.from({ length: 20 }, (i, k) => ({
            id: k,
            name: `${faker.commerce.productMaterial()} ${faker.random.word()}`,
        }))
    )

    products.push(
        ...Array.from({ length: 20 }, (i, k) => ({
            id: k,
            name: faker.commerce.product(),
            description: faker.commerce.productName(),
            category:
                categories[
                    faker.datatype.number({ min: 0, max: categories.length - 1 })
                    ],
            seller:
                sellers[faker.datatype.number({ min: 0, max: sellers.length - 1 })],
        }))
    )

    sellers.push(
        ...Array.from({ length: 20 }, (i, k) => ({
            id: k,
            name: faker.company.companyName(),
        }))
    )
}

getData()

module.exports = { users, categories, products, sellers, orders }