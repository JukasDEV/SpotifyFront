import { RocketIcon } from '@radix-ui/react-icons'
import { Icon } from '@iconify/react'
export function Logo() {
  return (
    <>
    <div className="bg-primary h-6 w-20 flex items-center justify-center rounded-md hidden sm:flex">
      {/* <RocketIcon className="w-3 h-3 text-primary-foreground" /> */}
      <span className='w-3 h-3  flex items-center justify-center font-bold' style={{fontFamily: 'Cosmata'}}>
        Jobeiros
      </span>
    </div>
    <div className="bg-primary h-6 w-6 flex items-center justify-center rounded-md flex sm:hidden">
      {/* <RocketIcon className="w-3 h-3 text-primary-foreground" /> */}
      <span className='w-3 h-3  flex items-center justify-center font-bold' style={{fontFamily: 'Cosmata'}}>
        J
      </span>
      
    </div>
    </>
  )
}

