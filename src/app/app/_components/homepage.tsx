"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "cookies-js";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { LoadingBolinha } from "@/components/app/loading-bolinha";
import BarraPesquisar from '../_components/barra'



export default function Component() {
  const [playlists, setPlaylists] = useState<any[] | null >(null);

  const [open, setOpen] = useState(false);
const [playlistName, setPlaylistName] = useState('');
const [playlistDesc, setPlaylistDesc] = useState('');
const [isLoading, setIsLoading] = useState(true);
const [songs, setSongs] = useState<any[] | null >(null);



// Função para abrir o modal
const openModal = () => {
  setOpen(true);
};

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        const userid = Cookies.get("userid");
        const response = await axios.get(`/api/playlist/getplaylist/${userid}`);
        setPlaylists(response.data);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
      setIsLoading(false); // Finaliza o loading
    }

    fetchPlaylists();
  }, []);


  useEffect(() => {
    async function fetchSongs() {
      try {
        const response = await axios.get(`/api/music/getmusic`);
        setSongs(response.data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
      setIsLoading(false); // Finaliza o loading
    }

    fetchSongs();
  }, []);

  return (
    <div className="flex flex-col min-h-screen max-w-screen w-full">
      <header className="z-40 flex h-[60px] items-center justify-between border-b bg-white px-6 dark:border-gray-800 dark:bg-gray-900">
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
            {/* <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" /> */}
            {/* <Input
              type="search"
              placeholder="Search"
              className="h-8 w-[200px] rounded-full bg-gray-100 pl-10 text-sm focus:bg-white dark:bg-gray-800 dark:text-white dark:focus:bg-gray-700"
            /> */}
            <BarraPesquisar/>
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
          {isLoading && <LoadingBolinha/>}
      {playlists && playlists.length > 0 ? (
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
          <p>Nenhuma playlist encontrada para o usuário.</p>
          <button
            onClick={openModal} // Assegure-se que 'openModal' está definido
            className="text-blue-500 hover:underline focus:outline-none focus:ring focus:ring-blue-300"
          >
            Crie uma playlist para exibir aqui
      </button>
    </div>
  )}
</div>

                 
<div className="grid gap-4">
      <h2 className="text-2xl font-bold">Songs</h2>
      <div className="border rounded-lg overflow-hidden">
        {isLoading ? (
          <p>Carregando músicas...</p>
        ) : (
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
              {songs?.map((song, index) => (
                <TableRow key={song.Id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <img src={song.Imagem} alt={song.SongName} width={40} height={40} className="rounded" />
                      <div>
                        <div className="font-medium">{song.SongName}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{song.Artistname}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{song.Artistname}</TableCell>
                  <TableCell className="hidden md:table-cell">{song.Albumname}</TableCell>
                  <TableCell className="text-right">{Math.floor(song.Duration / 60)}:{String(song.Duration % 60).padStart(2, '0')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
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