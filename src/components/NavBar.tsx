"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { logo, menu, search, thirdweb } from '../../public/assets'
import { navlinks } from '../constants/NavLinks'
import Image from 'next/image'
import { ConnectWallet } from "@thirdweb-dev/react";
import { Button } from '@nextui-org/button';
import { Input } from "@nextui-org/react";
import { RxMagnifyingGlass } from "react-icons/rx";
import useThemeStore from "@/store/themeStore";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxDashboard } from "react-icons/rx";
import { RxPlusCircled } from "react-icons/rx";
import { RxRocket } from "react-icons/rx";
import { RxPerson } from "react-icons/rx";
import { RiTakeawayLine } from "react-icons/ri";
import { RxSun } from "react-icons/rx";
import { RxQuestionMark } from "react-icons/rx";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser
} from "@clerk/nextjs";
import { SignInWithMetamaskButton } from "@clerk/nextjs";



// import { ConnectWallet, useAddress } from '@thirdweb-dev/react'
// import {
//   useConnect,
//   metamaskWallet,
// } from "@thirdweb-dev/react";

const NavBar = () => {
  // const walletConfig = metamaskWallet();
  // const connect = useConnect();
  // const address = useAddress()

  const router = useRouter()
  const [selectLink, setSelectLink] = useState('dashboard')
  const [toggleDrawer, setToggleDrawer] = useState(false)
  const { themes, activeTheme, setTheme } = useThemeStore((state) => state);
  const { user } = useUser();
  const primaryWeb3Wallet = user?.primaryWeb3Wallet;


  // const connectWallet = async() => {
  //   try {
  //     const wallet = await connect(
  //       walletConfig
  //     );
  //     console.log("connected to", wallet);
  //   } catch (e) {
  //     console.error("failed to connect", e);
  //   }
  // }

  return (
    <div className='flex items-center sm:flex-row  w-full  justify-between flex-col-reverse gap-3 mb-10 '>
      <div className="flex w-60 flex-wrap md:flex-nowrap mb-3 md:mb-0 gap-4 max-sm:w-full">
        <Input
          type="search"
          placeholder="Search for campaigns"
          labelPlacement="none"
          size="lg"
          endContent={
            <RxMagnifyingGlass color={`${activeTheme}`} className='size-4' />
          }
        />
      </div>


      <div className='flex max-sm:hidden  gap-5 justify-center items-center'>
        {/* 连接钱包(展示不可行，连接后Clerk的账户中Wallet并未更新) */}
        {/* <div>
          <SignInWithMetamaskButton mode="modal">
            <button>
              Sign in
            </button>
          </SignInWithMetamaskButton>
        </div> */}
        <ConnectWallet />
        {/* 如果当前已登录 */}
        <SignedIn>
          <UserButton />
          <p>
            {primaryWeb3Wallet ? primaryWeb3Wallet.web3Wallet : "Not found"}
          </p>
        </SignedIn>
        {/* 如果未登录 */}
        <SignedOut>
          <SignInButton >
            <Button>
              登录
            </Button>
          </SignInButton>
        </SignedOut>
      </div>

      {/* small screen navigation */}
      <div className='flex flex-col justify-between items-center sm:hidden w-full relative'>
        <div className='flex w-full justify-between items-center'>
          <RxHamburgerMenu className='object-contain w-[25px] h-[25px] cursor-pointer' color={`${activeTheme}`} onClick={() => setToggleDrawer((pre) => !pre)} />
          <Link href="/" className='flex gap-3 justify-center items-center'>
            <RiTakeawayLine color={`${activeTheme}`} className='size-10' />
            <h4 className='font-extrabold text-xl font-mono text-foreground '>ShipChain</h4>
          </Link>
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
        <div className={`absolute top-[60px] left-0 right-0 z-20 py-2 transition-all duration-700 bg-content4 rounded-lg
        shadow-secondary ${toggleDrawer ? 'translate-y-0' : '-translate-y-[100vh]'}`}>
          <div className='flex flex-col gap-3'>
            <div className={`w-full h-[48px] rounded-[10px] ${selectLink === "dashboard" && 'bg-primary'} bg-default flex justify-center items-center gap-3`}
              onClick={() => {
                setSelectLink('dashboard');
                router.push('/');
              }} >
              <RxDashboard color={`${activeTheme}`} />
              <p className='text-content1 font-mono'>仪表板</p>
            </div>

            <div className={`w-full h-[48px] rounded-[10px] ${selectLink === "publish" && 'bg-primary'} bg-default flex justify-center items-center gap-3`}
              onClick={() => {
                setSelectLink('publish');
                router.push('/orders/store');
              }} >
              <RxPlusCircled color={`${activeTheme}`} />
              <p className='text-content1 font-mono'>发布</p>
            </div>

            <div className={`w-full h-[48px] rounded-[10px] ${selectLink === "rocket" && 'bg-primary'} bg-default flex justify-center items-center gap-3`}
              onClick={() => {
                setSelectLink('rocket');
                router.push('/rocket');
              }} >
              <RxRocket color={`${activeTheme}`} />
              <p className='text-content1 font-mono'>时区增强</p>

            </div>

            <div className={`w-full h-[48px] rounded-[10px] ${selectLink === "profile" && 'bg-primary'} bg-default flex justify-center items-center gap-3`}
              onClick={() => {
                setSelectLink('profile');
                router.push('/profile');
              }} >
              <RxPerson color={`${activeTheme}`} />
              <p className='text-content1 font-mono'>个人</p>

            </div>

            <div className={`w-full h-[48px] rounded-[10px] ${selectLink === "question" && 'bg-primary'} bg-default flex justify-center items-center gap-3`}
              onClick={() => {
                setSelectLink('question');
                router.push('/question');
              }} >
              <RxQuestionMark color={`${activeTheme}`} />
              <p className='text-content1 font-mono'>Q&A</p>

            </div>
            <ConnectWallet className='rounded-[10px] font-mono' />


          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar