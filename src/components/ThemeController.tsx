import React from 'react'
import useThemeStore from "@/store/ThemeStore";
import { RxSun } from "react-icons/rx";
import { RxMoon } from "react-icons/rx";

const ThemeController = () => {

    const { themes, activeTheme, setTheme } = useThemeStore((state) => state);


    return (
        <div className='p-3 rounded-full flex justify-center items-center drop-shadow-2xl bg-default' onClick={() => {
            if (activeTheme === themes[0]) {
                console.log(activeTheme);
                setTheme(themes[1])
            } else {
                setTheme(themes[0])
            }
        }}>
            {
                activeTheme === themes[0] ? <RxMoon/> : <RxSun/>
            }
        </div>
    )
}

export default ThemeController