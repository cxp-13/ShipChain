import Image from "next/image";
import { DisplayOrders } from "@/components";
import { orders } from "@/constants/OrderTableDataMock";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-start">
      <h2 className="text-3xl font-black tracking-widest">全部订单</h2>
      <DisplayOrders orders={orders} />
    </main>
  );
}
