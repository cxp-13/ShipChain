"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { logo, sun } from '../../public/assets'
import { navlinks } from '../constants'
import Image from 'next/image'
import useThemeStore from "@/store/ThemeStore";
import { RxDashboard } from "react-icons/rx";
import { RxPlusCircled } from "react-icons/rx";
import { RxRocket } from "react-icons/rx";
import { RxPerson } from "react-icons/rx";
import { RiTakeawayLine } from "react-icons/ri";
import { RxSun } from "react-icons/rx";
import { RxQuestionMark } from "react-icons/rx";

type IconProps = {
    styles?: React.CSSProperties | string;
    name?: string;
    imgUrl: string;
    selectLink: string;
    isEnable?: boolean;
    handleClick?: () => void;
}

// 废弃
const Icon = ({ styles, name, imgUrl, selectLink, isEnable, handleClick }: IconProps) => (
    <div className={`w-[48px] h-[48px] rounded-[10px] ${selectLink && selectLink === name && 'bg-primary'}
    flex justify-center items-center  ${styles} ${!isEnable && 'cursor-not-allowed'} `} onClick={handleClick} >
        {/* <Image src={imgUrl} alt="fund_logo" className={`w-1/2 h-1/2 ${selectLink !== name && 'grayscale'}`} /> */}
    </div>
)


const Sidebar = () => {
    const router = useRouter()
    const [selectLink, setSelectLink] = useState("dashboard")
    const { themes, activeTheme, setTheme } = useThemeStore((state) => state);


    return (
        <div className={`flex flex-col sticky top-5 justify-between items-center h-[93vh]`}>
            <Link href="/">
                <div className={`w-[48px] h-[48px] rounded-[10px] flex justify-center items-center `}>
                    <RiTakeawayLine color={`${activeTheme}`} className='size-10' />
                </div>
            </Link>

            <div className='flex-1 flex flex-col justify-between items-center rounded-[20px] w-[76px] py-4 mt-12 bg-default-50' >
                <div className='flex flex-col justify-center items-center gap-3'>
            
                    <div className={`w-[48px] h-[48px] rounded-[10px] ${selectLink === "dashboard" && 'bg-primary'} bg-default flex justify-center items-center `}
                        onClick={() => {
                            setSelectLink('dashboard');
                            router.push('/');
                        }} >
                        <RxDashboard color={`${activeTheme}`} />
                    </div>

                    <div className={`w-[48px] h-[48px] rounded-[10px] ${selectLink === "publish" && 'bg-primary'} bg-default flex justify-center items-center `}
                        onClick={() => {
                            setSelectLink('publish');
                            router.push('/orders/store');
                        }} >
                        <RxPlusCircled color={`${activeTheme}`} />
                    </div>

                    <div className={`w-[48px] h-[48px] rounded-[10px] ${selectLink === "rocket" && 'bg-primary'} bg-default flex justify-center items-center `}
                        onClick={() => {
                            setSelectLink('rocket');
                            router.push('/rocket');
                        }} >
                        <RxRocket color={`${activeTheme}`} />
                    </div>

                    <div className={`w-[48px] h-[48px] rounded-[10px] ${selectLink === "profile" && 'bg-primary'} bg-default flex justify-center items-center `}
                        onClick={() => {
                            setSelectLink('profile');
                            router.push('/profile');
                        }} >
                        <RxPerson color={`${activeTheme}`} />
                    </div>

                    <div className={`w-[48px] h-[48px] rounded-[10px] ${selectLink === "question" && 'bg-primary'} bg-default flex justify-center items-center `}
                        onClick={() => {
                            setSelectLink('question');
                            router.push('/question');
                        }} >
                        <RxQuestionMark color={`${activeTheme}`} />
                    </div>

                </div>
                <div className='p-3 rounded-full flex justify-center items-center drop-shadow-2xl bg-default' onClick={() => {
                    if (activeTheme === themes[0]) {
                        console.log(activeTheme);
                        setTheme(themes[1])
                    } else {
                        setTheme(themes[0])
                    }
                }}>
                    <RxSun />
                </div>
            </div>
        </div >
    )
}

export default Sidebar