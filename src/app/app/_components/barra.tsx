"use client"
import { SearchIcon } from "./search"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useWorkflow } from "@/context/workflow.context"
import axios from 'axios'
import { useEffect, useRef, useState } from "react"

export default function BarraPesquisar({ className }: { className?: string }) {
    const { activeSearch, setActiveSearch } = useWorkflow()
    const [searchList, setSearchList] = useState<string[]>([])
    const [showDropDown, setShowDropDown] = useState<boolean>(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const fetchAzureSearch = async () => {
        try {
            const response = await axios.post('/api/music/musicsearch', {
                search: activeSearch
            })
            console.log(response.data.searchResults)
            setSearchList(response.data.searchResults)
            setShowDropDown(true)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (activeSearch.length >= 2) {
            console.log(activeSearch)
            fetchAzureSearch()
        }  else {
            setShowDropDown(false)
        }
    }, [activeSearch])

    const handleSuggestionClick = (suggestion: string) => {
        setActiveSearch(suggestion)
        setShowDropDown(false)
        
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setShowDropDown(false)
        }
    }

    const handleEscPress = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            setShowDropDown(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        document.addEventListener("keydown", handleEscPress)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("keydown", handleEscPress)
        }
    }, [])

    return (
        <div className="relative flex items-center justify-start gap-0">
            <Input
                value={activeSearch}
                onChange={(e) => setActiveSearch(e.target.value)}
                placeholder='Pesquisar'
                className={`${className} !rounded-r-none w-full`}
            />
            <Button className="rounded-l-none" onClick={fetchAzureSearch}>
                <SearchIcon className="text-[16px] font-bold" />
            </Button>
            {showDropDown && searchList.length > 0 && 
                <div className="z-60 absolute left-0 right-0 top-full mt-2 bg-primary border border-gray-300 rounded-md shadow-lg py-2">
                    {searchList.length > 0 && searchList.map((item: any, index: number) => {
                        console.log(item, " => item")
                        return (
                            <div
                            key={index}
                            className="text-black font-semibold h-[16px] px-4 py-2 flex items-center hover:text-white cursor-pointer"
                            onClick={() => {
                                handleSuggestionClick(item.document.SongName)
                            }}
                        >
                            {item.document.SongName}
                        </div>
                        )
                    } ) }
                </div>
            }
        </div>
    )
}