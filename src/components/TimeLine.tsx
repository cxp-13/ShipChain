import React from 'react'

type point = {
    content: string
}

type TimeLineProps = {
    className?: string,
    points?: point[]
}

const TimeLine = ({ className, points }: TimeLineProps) => {
    return (
        <section className={className}>
            <ul className="daisy-timeline daisy-timeline-vertical text-content1-foreground">
                <li>
                    <div className="daisy-timeline-start daisy-timeline-box bg-success-50">第一笔交易：2024/2/23</div>
                    <hr />
                </li>
                <li>
                    <hr />
                    <div className="daisy-timeline-end daisy-timeline-box bg-success-50">最后一笔交易：2024/2/24</div>
                    <hr />
                </li>

            </ul>
        </section>
    )
}

export default TimeLine