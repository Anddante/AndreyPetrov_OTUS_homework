const { gql } = require("apollo-server")
const { users, categories, products, sellers, orders } = require("./data")

const typeDefs = gql`
  type Product {
    id: Int!
    name: String!
    description: String
    category: Category
    seller: Seller
  }
  type Category {
    id: Int!
    name: String!
  }
  type User {
    id: Int!
    name: String!
    email: String
    orders: [Order]
  }
  type Seller {
    id: Int!
    name: String!
    products: [Product]
  }
  type Order {
    id: Int!
    user: User!
    items: [OrderItem]
    status: OrderStatus!
  }
  enum OrderStatus {
    CREATED
    PREPARING
    SENT
    DELIVERED
    RECIEVED
  }
  type OrderItem {
    id: Int!
    product: Product!
    quantity: Int!
    price: Float!
  }
  input OrderItemInput {
    productId: Int!
    quantity: Int!
    price: Float!
  }
  type Query {
    users: [User]
    categories: [Category]
    sellers: [Seller]
    products(sellerId: Int!): [Product]
    user(id: Int!): User
    product(id: Int!): Product
    seller(id: Int!): Seller
    orders(userId: Int!): [Order]
  }
  type Mutation {
    updateUserData(id: Int!, name: String, email: String): User
    createOrder(userId: Int!, orderItems: [OrderItemInput]): Order
    changeOrderStatus(orderId: Int!, status: OrderStatus!): Order
  }
`

const getProductById = (id) => products.find((product) => product.id === id)

const getSellerById = (id) => sellers.find((seller) => seller.id === id)

const getOrderById = (id) => orders.find((order) => order.id === id)

const getProductsBySellerId = (sellerId) =>
    products.filter((product) => product.seller.id === sellerId)

const getOrdersByUserId = (userId) =>
    orders.filter((order) => order.user.id === userId)

const getUserById = (id) => users.find((user) => user.id === id)

const updateUserData = (id, name, email) => {
    let user = getUserById(id)
    if (!user) {
        throw Error(`User with id ${id} not exist`)
    }
    if (name) user.name = name
    if (email) user.email = email
    return user
}

const createOrder = (order) => {
    let items = order.orderItems.map((item, index) => {
        return {
            id: index,
            product: getProductById(item.productId),
            quantity: item.quantity,
            price: item.price,
        }
    })
    let newOrder = {
        id: orders.length + 1,
        user: getUserById(order.userId),
        status: "CREATED",
        items: items,
    }
    orders.push(newOrder)
    return newOrder
}

const changeOrderStatus = (orderId, status) => {
    let order = getOrderById(orderId)
    order.status = status
    return order
}

const resolvers = {
    Query: {
        users: () => users,
        categories: () => categories,
        sellers: () => sellers,
        products: (_, { sellerId }) => getProductsBySellerId(sellerId),
        product: (_, { id }) => getProductById(id),
        seller: (_, { id }) => getSellerById(id),
        user: (_, { id }) => getUserById(id),
        orders: (_, { userId }) => getOrdersByUserId(userId),
    },
    Mutation: {
        updateUserData: (_, { id, name, email }) => updateUserData(id, name, email),
        createOrder: (_, order) => createOrder(order),
        changeOrderStatus: (_, { orderId, status }) =>
            changeOrderStatus(orderId, status),
    },
}

module.exports = { typeDefs, resolvers }