import { Meal } from "@/lib/database/models/meal";
import { Order, OrderPopulateMeal } from "@/lib/database/models/order";
import { User } from "@/lib/database/models/user";

// 模拟的 Meal 对象数组
const meals: Meal[] = [
    { name: 'Hamburger', quantity: 1, price: 5.99, image: 'hamburger.jpg' },
    { name: 'Pizza', quantity: 1, price: 8.99, image: 'pizza.jpg' },
    { name: 'Salad', quantity: 1, price: 6.49, image: 'salad.jpg' },
    { name: 'Sushi', quantity: 1, price: 10.99, image: 'sushi.jpg' },
    { name: 'Pasta', quantity: 1, price: 7.99, image: 'pasta.jpg' }
];

const users: User[] = [
    {
        id: 1,
        name: "Tony Reichert",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        email: "tony.reichert@example.com",
    },
    {
        id: 2,
        name: "Zoey Lang",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        email: "zoey.lang@example.com",
    },
    {
        id: 3,
        name: "Jane Fisher",
        avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
        email: "jane.fisher@example.com",
    }
]

const columns = [
    { name: "Owner", uid: "owner" },
    { name: "ID", uid: "id" },
    { name: "Create At", uid: "createAt", sortable: true },
    { name: "Start Point", uid: "startPoint" },
    { name: "End Point", uid: "endPoint" },
    { name: "Amount", uid: "amount", sortable: true },
    { name: "Meals", uid: "meals" },
    { name: "User", uid: "user" },
    { name: "Note", uid: "note" },
    { name: "Status", uid: "status" },
];

const web3WalletAddresses = [
    "0x1AaBbCcDdEeFfFfFfFfFfFfFfFfFfFfFfFfFf",
    "0x2BbCcDdEeFfFfFfFfFfFfFfFfFfFfFfFfFfFf",
    "0x3CcDdEeFfFfFfFfFfFfFfFfFfFfFfFfFfFfFf",
    "0x4DdEeFfFfFfFfFfFfFfFfFfFfFfFfFfFfFf",
    "0x5EeFfFfFfFfFfFfFfFfFfFfFfFfFfFfFfFf"
];


// 生成模拟数据的 OrderPopulateMeal 对象数组
const orders: OrderPopulateMeal[] = [
    {
        owner: web3WalletAddresses[0], // Web3 钱包地址示例
        id: "1",
        createAt: Date.now(),
        startPoint: "123 Main St",
        endPoint: "456 Elm St",
        amount: 100,
        meals: [meals[0], meals[2], meals[4]], // 随机选择一些 Meal 对象添加到 meals 属性中
        user: users[0],
        note: "Please make it spicy!",
        status: "success"
    },
    {
        owner: web3WalletAddresses[1], // Web3 钱包地址示例
        id: "2",
        createAt: Date.now(),
        startPoint: "789 Oak Ave",
        endPoint: "101 Pine St",
        amount: 200,
        meals: [meals[1], meals[3]], // 随机选择一些 Meal 对象添加到 meals 属性中
        user: users[0],
        note: "Extra cheese, please.",
        status: "fail"
    },
    {
        owner: web3WalletAddresses[2], // Web3 钱包地址示例
        id: "3",
        createAt: Date.now(),
        startPoint: "222 Maple Blvd",
        endPoint: "333 Cedar Rd",
        amount: 150,
        meals: [meals[0], meals[2], meals[3]], // 随机选择一些 Meal 对象添加到 meals 属性中
        user: users[1],
        note: "No onions, please.",
        status: "loading"
    },
    {
        owner: web3WalletAddresses[1], // Web3 钱包地址示例
        id: "4",
        createAt: Date.now(),
        startPoint: "444 Walnut Dr",
        endPoint: "555 Cherry Ln",
        amount: 180,
        meals: [meals[1], meals[3], meals[4]], // 随机选择一些 Meal 对象添加到 meals 属性中
        user: users[2],
        note: "Gluten-free options, please.",
        status: "loading"
    },
    {
        owner: web3WalletAddresses[1], // Web3 钱包地址示例
        id: "5",
        createAt: Date.now(),
        startPoint: "666 Spruce Ave",
        endPoint: "777 Fir St",
        amount: 220,
        meals: [meals[0], meals[1], meals[2]], // 随机选择一些 Meal 对象添加到 meals 属性中
        user: users[2],
        note: "Allergic to peanuts.",
        status: "loading"
    }
];

// 新订单对象
const additionalOrders: OrderPopulateMeal[] = [
    {
        owner: web3WalletAddresses[1], // 示例 Web3 钱包地址
        id: "6",
        createAt: Date.now(),
        startPoint: "888 Oak Ave",
        endPoint: "999 Pine St",
        amount: 180,
        meals: [meals[0], meals[2]], // 随机选择一些 Meal 对象添加到 meals 属性中
        user: users[2],
        note: "No garlic, please.",
        status: "loading"
    },
    {
        owner: web3WalletAddresses[1], // 示例 Web3 钱包地址
        id: "7",
        createAt: Date.now(),
        startPoint: "111 Maple Blvd",
        endPoint: "222 Cedar Rd",
        amount: 250,
        meals: [meals[1], meals[3], meals[4]], // 随机选择一些 Meal 对象添加到 meals 属性中
        user: users[2],
        note: "Extra sauce on the side.",
        status: "loading"
    },
    {
        owner: web3WalletAddresses[4], // 示例 Web3 钱包地址
        id: "8",
        createAt: Date.now(),
        startPoint: "333 Walnut Dr",
        endPoint: "444 Cherry Ln",
        amount: 200,
        meals: [meals[0], meals[1], meals[2]], // 随机选择一些 Meal 对象添加到 meals 属性中
        user: users[1],
        note: "Vegetarian options only.",
        status: "loading"
    },
    {
        owner: web3WalletAddresses[1], // 示例 Web3 钱包地址
        id: "9",
        createAt: Date.now(),
        startPoint: "555 Spruce Ave",
        endPoint: "666 Fir St",
        amount: 300,
        meals: [meals[2], meals[3], meals[4]], // 随机选择一些 Meal 对象添加到 meals 属性中
        user: users[0],
        note: "No spicy food.",
        status: "loading"
    },
    {
        owner: web3WalletAddresses[1], // 示例 Web3 钱包地址
        id: "10",
        createAt: Date.now(),
        startPoint: "777 Elm St",
        endPoint: "888 Main St",
        amount: 280,
        meals: [meals[0], meals[1]], // 随机选择一些 Meal 对象添加到 meals 属性中
        user: users[1],
        note: "No dairy, please.",
        status: "loading"
    }
];

// 将新订单直接添加到 orders 数组中
orders.push(...additionalOrders);

const statusOptions = [
    { name: "Success", uid: "success" },
    { name: "Fail", uid: "fail" },
    { name: "Loading", uid: "loading" },
];

export { columns, orders, statusOptions, users, web3WalletAddresses };
