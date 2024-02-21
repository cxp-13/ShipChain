export type Order = {
  owner: string;
  orderId: string;
  orderTime: number;
  startPoint: string;
  endPoint: string;
  orderAmount: number;
  productIdList: string[];
  userId: string;
  note: string;
};


export const ordersMock: Order[] = [
  {
    owner: "0x1234567890123456789012345678901234567890",
    orderId: "10001",
    orderTime: 1645411352,
    startPoint: "北京市海淀区中关村大街1号",
    endPoint: "北京市朝阳区望京东路甲18号",
    orderAmount: 1000,
    productIdList: ["p0001", "p0002"],
    userId: "u0001",
    note: "请尽快发货，谢谢！"
  },
  {
    owner: "0x0987654321098765432109876543210987654321",
    orderId: "10002",
    orderTime: 1645411452,
    startPoint: "上海市浦东新区世纪大道100号",
    endPoint: "上海市徐汇区漕河泾开发区",
    orderAmount: 2000,
    productIdList: ["p0003"],
    userId: "u0002",
    note: "配送时间最好在周末，谢谢！"
  },
  {
    owner: "0x1357246802468113572468024681135724680246",
    orderId: "10003",
    orderTime: 1645411552,
    startPoint: "广州市天河区珠江新城华夏路1号",
    endPoint: "广州市番禺区市桥街道市场路8号",
    orderAmount: 500,
    productIdList: ["p0004", "p0005", "p0006"],
    userId: "u0003",
    note: ""
  },
  {
    owner: "0x2468013579246801357924680135792468013579",
    orderId: "10004",
    orderTime: 1645411652,
    startPoint: "深圳市南山区高新南一道9号",
    endPoint: "深圳市福田区华强北路1001号",
    orderAmount: 3000,
    productIdList: ["p0007", "p0008", "p0009"],
    userId: "u0004",
    note: "请提前联系我，谢谢！"
  },
  {
    owner: "0x3692581470369258147036925814703692581470",
    orderId: "10005",
    orderTime: 1645411752,
    startPoint: "杭州市余杭区文一西路969号",
    endPoint: "杭州市下城区庆春路378号",
    orderAmount: 800,
    productIdList: ["p0010"],
    userId: "u0005",
    note: ""
  }
];