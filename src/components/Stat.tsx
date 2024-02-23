import React from 'react'
import { Divider } from "@nextui-org/react";

type StatProps = {
    className?: string,
    orders?: number,
    sum?: number,
    rewardSum?: number
}

const Stat = ({ className, orders = 0, sum = 0, rewardSum = 0 }: StatProps) => {
    return (
        <section className={className}>
            <div className="flex text-content2-foreground">
                <div className="flex flex-col">
                    <h2 className="font-extrabold text-2xl ">订单数</h2>
                    <p className="font-extrabold text-xl">31K</p>
                </div>
                <Divider orientation="vertical" className="mx-4" />
                <div className="flex flex-col">
                    <h2 className="font-extrabold text-2xl ">总额</h2>
                    <p className="font-extrabold text-xl">13 eth</p>
                </div>
                <Divider className="mx-4" orientation="vertical" />
                <div className="flex flex-col">
                    <h2 className="font-extrabold text-2xl ">时区奖励</h2>
                    <p className="font-extrabold text-xl">12K</p>
                </div>
            </div>
        </section>


    )
}

export default Stat