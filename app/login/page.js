
'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Logo from '../../public/logo.png'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';

export default Login;

function Login() {

const router=useRouter()

const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [loading, setLoading] = useState(false)


  const handleSignin = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });
      if (!res.error) {
        router.replace("/");
      } else {
        toast({
          title: "Error",
          description: res?.error,
          variant: "destructive",
          className: 'top-0 right-0 flex fixed md:max-w-[300px] md:top-4 md:right-4'
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: res?.error,
        variant: "destructive",
        className: 'top-0 right-0 flex fixed md:max-w-[300px] md:top-4 md:right-4'
      })
    } finally{
      setLoading(false)
    }
  };

    return (
        <section class=" w-full h-screen flex justify-center items-center">
          <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-[345px] md:w-[450px]">
            <div class="w-full bg-gray-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <div className='w-full flex justify-center items-center'>
                <div className='w-12 h-12 relative overflow-hidden'>
                  <Image src={Logo} alt="logo" fill className='absolute rounded-full ' />
                </div>
                </div>
                
                
                <h1 class=" text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                  Sign in to your account
                </h1>
                <form
                  class="space-y-4 md:space-y-6"
                  
                >
                  <div>
                    <label
                      for="username"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Username
                    </label>
                    
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    
                  </div>
                  <div className='mb-4'>
                    <label
                      for="password"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                  <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                 
                  </div>

                <Button className="relative w-full " onClick={handleSignin} >
                  Login

                  {loading && <div class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
                    <div class="border-t-transparent border-solid animate-spin  rounded-full border-white border-[3px] h-6 w-6"></div>
                  </div>}

                </Button>
                
                </form>
              </div>
            </div>
          </div>
        </section>

    );
}
