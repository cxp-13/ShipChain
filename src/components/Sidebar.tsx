"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { logo, sun } from '../../public/assets'
import { navlinks } from '../constants'
import Image from 'next/image'

type IconProps = {
    styles?: React.CSSProperties | string;
    name?: string;
    imgUrl: string;
    selectLink: string;
    isEnable?: boolean;
    handleClick?: () => void;
}


const Icon = ({ styles, name, imgUrl, selectLink, isEnable, handleClick }: IconProps) => (
    <div className={`w-[48px] h-[48px] rounded-[10px] ${selectLink && selectLink === name && 'bg-[#2c2f32]'}
    flex justify-center items-center  ${styles} ${!isEnable && 'cursor-not-allowed'} `} onClick={handleClick} >
        <Image src={imgUrl} alt="fund_logo" className={`w-1/2 h-1/2 ${selectLink !== name && 'grayscale'}`} />
    </div>
)


const Sidebar = () => {
    const router = useRouter()
    const [selectLink, setSelectLink] = useState("dashboard")


    return (
        <div className='flex flex-col sticky top-5 justify-between items-center h-[93vh]'>
            <Link href="/">
                <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} selectLink={selectLink} />
            </Link>

            <div className='flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12' >
                <div className='flex flex-col justify-center items-center gap-3'>
                    {
                        navlinks.map((link, index) => (
                            <Icon key={index} {...link} selectLink={selectLink}
                                handleClick={() => {
                                    if (link.isEnable) {
                                        setSelectLink(link.name)
                                        router.push(link.link)
                                    }

                                }}
                            />
                        ))
                    }
                </div>
                <Image src={sun} alt="toggle_mode" className="bg-[#1c1c24] shadow-secondary" />
            </div>
        </div>
    )
}

export default Sidebar