type Place = {
    country: string,
    state: string,
    city: string,
    street: string
}

type Country = {
    name: string;
    code: string;
    states: State[];
}

type State = {
    name: string;
    cities: City[];
}

type City = {
    name: string;
}

// 生成示例数据
const countries: Country[] = [
    {
        name: "United States",
        code: "us",
        states: [
            {
                name: "California",
                cities: [
                    { name: "Los Angeles" },
                    { name: "San Francisco" },
                    { name: "San Diego" }
                ]
            },
            {
                name: "New York",
                cities: [
                    { name: "New York City" },
                    { name: "Buffalo" },
                    { name: "Rochester" }
                ]
            },
            // 添加其他州...
        ]
    },
    {
        name: "Singapore",
        code: "sg",
        states: [
            {
                name: "Central Region",
                cities: [
                    { name: "Singapore City" },
                    { name: "Bedok" },
                    { name: "Jurong East" }
                ]
            },
            // 添加其他州...
        ]
    },
    {
        name: "Hong Kong",
        code: "hk",
        states: [
            {
                name: "Hong Kong Island",
                cities: [
                    { name: "Central" },
                    { name: "Wan Chai" },
                    { name: "Causeway Bay" }
                ]
            },
            // 添加其他州...
        ]
    },
    {
        name: "Taiwan",
        code: "tw",
        states: [
            {
                name: "Taipei",
                cities: [
                    { name: "Xinyi" },
                    { name: "Zhongzheng" },
                    { name: "Da'an" }
                ]
            },
            // 添加其他州...
        ]
    },
    {
        name: "South Korea",
        code: "kr",
        states: [
            {
                name: "Seoul",
                cities: [
                    { name: "Gangnam" },
                    { name: "Mapo" },
                    { name: "Yongsan" }
                ]
            },
            // 添加其他州...
        ]
    },
];

export default countries;// 定义国家、州和城市的接口
export type { Country, State, City, Place };
