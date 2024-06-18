"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  FaceIcon,
  LockClosedIcon,
  MixerVerticalIcon,
  RocketIcon,
} from '@radix-ui/react-icons'
import { Session } from 'next-auth'
import { signOut } from '@/lib/signOut'
import { DiamondIcon } from '@/components/icons/diamond'
import Link from 'next/link'
import axios from 'axios'
import Cookies from 'cookies-js'
import { use, useEffect, useState } from 'react'
import { toCapitalize } from '@/lib/toCapitalize'
import { useUser } from '@/context/user.context'
import { UserDropdownSkeleton } from './user-dropdown-skeleton'

type UserDropdownProps = {
  user:  {
    id: number;
    email: string;
    plan: string;
    credits_interviews: number;
    credits_analyze: number;
    credtis_resume: number;
  }
}

export function UserDropdown() { 
  const {user, setUser} = useUser()
  const [isLoading, setIsLoading] = useState(false)

  const fetchUser = async () => {
    try {
      console.log("Carregando usuário...");
      setIsLoading(true); // Inicia o carregamento
      const response = await axios.get(`/api/user/${Cookies.get('userid')}`);
      console.log("Usuário carregado.");
      setUser(response.data);
      setIsLoading(false); // Termina o carregamento
    } catch (error) {
      setIsLoading(false); // Termina o carregamento em caso de erro
      throw error;
    }
  };

  useEffect(() => {
    fetchUser()
  }, [])


  if (!user || isLoading) {
    return <UserDropdownSkeleton />;
  }
  
  

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="link"
          className="relative h-8 flex items-center justify-between w-full space-x-2 !px-0"
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback>{user.email && user.email[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-1 space-y-1 text-left">
            {user.email && (
              <p className="text-sm font-medium leading-none">{user.email}</p>
            )}
            <p className="text-xs leading-none text-muted-foreground">
              {toCapitalize(user.plan)}
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 z-50" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-xs leading-none text-muted-foreground">
            {user.credits_interview} Entrevistas restantes
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-xs leading-none text-muted-foreground">
              {user.credits_analyze} Analises restantes
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-xs leading-none text-muted-foreground">
            {user.credits_resume} Currículos restantes
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
       
          {user.plan != 'PRO' &&
            <>
              <DropdownMenuGroup>
                <Link className='flex items-center w-full' href="/app/plans">
                  <DropdownMenuItem className='w-full'>
                      <DiamondIcon className={"w-3 h-3 mr-3"} />
                      Upgrade
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </> 
          }
        <DropdownMenuItem onClick={() => signOut()}>
          <LockClosedIcon className="w-3 h-3 mr-3" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}