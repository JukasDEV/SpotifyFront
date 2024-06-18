"use client"
import { MainSidebar } from '@/app/app/_components/sidebar'
import { useWorkflow } from '@/context/workflow.context'
import { cn } from '@/lib/utils'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import { CloseIcon } from '@/components/icons/close'
import { MenuIcon } from '@/components/icons/menu'
import ModalUpgrade from '@/app/app/_components/modal-upgrade'


export type DashboardPageGenericProps<T = unknown> = {
  children: React.ReactNode
  className?: string
} & T

export function DashboardPage({
  className,
  children,
}: DashboardPageGenericProps) {
  return <section className={cn(['h-screen', className])}>{children}</section>
}

export function DashboardPageHeader({
  className,
  children,
}: DashboardPageGenericProps) {
  const {setIsOpenSidebar, isOpenSidebar} = useWorkflow()
  return (
    <header
      className={cn([
        'px-4 py-3 border-b border-border flex items-center justify-between',
        className,
      ])}
    >     
      <div className='flex sm:hidden cursor-pointer' onClick={() => setIsOpenSidebar(!isOpenSidebar)}>
          {/* <Icon icon="mingcute:menu-fill" className='text-[28px]' /> */}
          <MenuIcon className='!text-[30px] w-6 h-6'/>
      </div>
      {children}
    </header>
  )
}

export function DashboardPageHeaderTitle({
  className,
  children,
}: DashboardPageGenericProps) {
  return (
    <span
      className={cn(['text-sm text-muted-foreground uppercase', className])}
    >
      {children}
    </span>
  )
}

export function DashboardPageHeaderNav({
  className,
  children,
}: DashboardPageGenericProps) {
  return <nav className={cn(['', className])}>{children}</nav>
}

export function DashboardPageMain({
  className,
  children,
}: DashboardPageGenericProps) {
  const {setIsOpenSidebar, isOpenSidebar} = useWorkflow()

  return <main className={cn([`p-6`, className])}>
    <ModalUpgrade/>
    {children}
    </main>
}