import * as React from "react"
import { useState, useEffect } from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import Cookies from "cookies-js"

import { Switch } from "@/components/ui/switch"

export function SwitcherTheme() {
  const { theme, setTheme } = useTheme()
  // Inicialize themeCached com null e depois defina baseado no cache ou no valor padrão
  const [themeCached, setThemeCached] = useState<string | null>(null)

  useEffect(() => {
    const themeInCache = Cookies.get('theme')
    // console.log(themeInCache)
    // Se um tema está armazenado no cache, use-o, senão defina como "light"
    if(themeInCache) {
      setThemeCached(themeInCache)
      setTheme(themeInCache) // Garanta que o tema do next-themes também é atualizado
    } else {
      // Se não houver tema no cache, defina o tema padrão como "light"
      setTheme('light')
      Cookies.set('theme', 'light')
      setThemeCached('light')
    }
  }, [theme])

  // Ajuste o valor de 'checked' para refletir corretamente o tema atual
  const isLightTheme = themeCached === 'light' || (!themeCached && theme === 'light');

  return (
    <div className="flex items-center justify-evenly gap-2">
        <MoonIcon/>
        <Switch 
            checked={theme == 'light'}
            onCheckedChange={(isChecked)=>{
                const newTheme = isChecked ? 'light' : 'dark';
                setTheme(newTheme)
                Cookies.set('theme', newTheme)
                setThemeCached(newTheme)
            }}
        />
        <SunIcon/>
        
        
    </div>
  )
}
