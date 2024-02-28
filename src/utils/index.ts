import { OrderPopulateMeal } from "@/lib/database/models/order";

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
// 根据 owner 属性去重 orders 数组
function removeDuplicateOrders(orders: OrderPopulateMeal[]) {
    const uniqueOwners = new Set();

    orders.forEach(order => {

        uniqueOwners.add(order.owner);
    });

    return Array.from(uniqueOwners);
}

function getErrorArgs(errorMessage: string): string | null {
    const regex = /errorArgs=\["(.*?)"\]/;
    const match = errorMessage.match(regex);
    if (match && match.length > 1) {
        return match[1];
    } else {
        return null;
    }
}



export { capitalize, removeDuplicateOrders, getErrorArgs }