"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "cookies-js";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export default function Component() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        const userid = Cookies.get("userid");
        const response = await axios.get(`/api/playlist/getplaylist/${userid}`);
        setPlaylists(response.data);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    }

    fetchPlaylists();
  }, []);

  return (
    <div className="flex flex-col min-h-screen max-w-screen w-full">
      <header className="flex h-[60px] items-center justify-between border-b bg-white px-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <ChevronLeftIcon className="h-5 w-5" />
            <span className="sr-only">Previous</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <ChevronRightIcon className="h-5 w-5" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search"
              className="h-8 w-[200px] rounded-full bg-gray-100 pl-10 text-sm focus:bg-white dark:bg-gray-800 dark:text-white dark:focus:bg-gray-700"
            />
          </div>
          <Avatar className="h-8 w-8 border-2 border-gray-200 dark:border-gray-800">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto px-6 py-8">
          <div className="grid gap-8">
            <div className="grid gap-4">
              <h2 className="text-2xl font-bold">Playlists</h2>
              {playlists.length > 0 ? (

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {playlists.map((playlist) => (
                  <div key={playlist.Id} className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
                    <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                      <span className="sr-only">View</span>
                    </Link>
                    <img
                      src={playlist.Image || "/placeholder.svg"}
                      alt={playlist.PlaylistName}
                      width={300}
                      height={300}
                      className="object-cover w-full h-40"
                    />
                    <div className="bg-white p-4 dark:bg-gray-900">
                      <h3 className="font-bold text-lg">{playlist.PlaylistName}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{playlist.description}</p>
                    </div>
                  </div>
                    ))}
                    </div>
                  ) : (
                    <div className="text-center p-4">
                      <p>Nenhuma playlist encontrada para o usuário. <a href="#" className="text-blue-500 hover:underline">Crie uma playlist para exibir aqui.</a></p>
                    </div>
                  )}
                </div>
                 
            <div className="grid gap-4">
              <h2 className="text-2xl font-bold">Songs</h2>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">#</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead className="hidden sm:table-cell">Artist</TableHead>
                      <TableHead className="hidden md:table-cell">Album</TableHead>
                      <TableHead className="text-right">Duration</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <img src="/placeholder.svg" alt="Song 1" width={40} height={40} className="rounded" />
                          <div>
                            <div className="font-medium">Starlight</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Muse</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">Muse</TableCell>
                      <TableCell className="hidden md:table-cell">Black Holes and Revelations</TableCell>
                      <TableCell className="text-right">4:37</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <img src="/placeholder.svg" alt="Song 2" width={40} height={40} className="rounded" />
                          <div>
                            <div className="font-medium">Believer</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Imagine Dragons</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">Imagine Dragons</TableCell>
                      <TableCell className="hidden md:table-cell">Evolve</TableCell>
                      <TableCell className="text-right">3:53</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <img src="/placeholder.svg" alt="Song 3" width={40} height={40} className="rounded" />
                          <div>
                            <div className="font-medium">Shape of You</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Ed Sheeran</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">Ed Sheeran</TableCell>
                      <TableCell className="hidden md:table-cell">÷</TableCell>
                      <TableCell className="text-right">3:53</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
            <div className="grid gap-4">
              <h2 className="text-2xl font-bold">Liked Songs</h2>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">#</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead className="hidden sm:table-cell">Artist</TableHead>
                      <TableHead className="hidden md:table-cell">Album</TableHead>
                      <TableHead className="text-right">Duration</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <img src="/placeholder.svg" alt="Song 1" width={40} height={40} className="rounded" />
                          <div>
                            <div className="font-medium">Bohemian Rhapsody</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Queen</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">Queen</TableCell>
                      <TableCell className="hidden md:table-cell">A Night at the Opera</TableCell>
                      <TableCell className="text-right">5:55</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <img src="/placeholder.svg" alt="Song 2" width={40} height={40} className="rounded" />
                          <div>
                            <div className="font-medium">Stairway to Heaven</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Led Zeppelin</div>
                          </div>
                        </div>

                      </TableCell>
                      <TableCell className="hidden sm:table-cell">Led Zeppelin</TableCell>
                      <TableCell className="hidden md:table-cell">Led Zeppelin IV</TableCell>
                      <TableCell className="text-right">8:02</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <img src="/placeholder.svg" alt="Song 3" width={40} height={40} className="rounded" />
                          <div>
                            <div className="font-medium">Smells Like Teen Spirit</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Nirvana</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">Nirvana</TableCell>
                      <TableCell className="hidden md:table-cell">Nevermind</TableCell>
                      <TableCell className="text-right">5:01</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
           
          </div>
        </div>
      </main>
    </div>
  )
}
//@ts-ignore

function ChevronLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

//@ts-ignore

function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}


//@ts-ignore
function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}