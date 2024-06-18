"use client";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import Cookies from "cookies-js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export default function Sidebar2() {
  const [open, setOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDesc, setPlaylistDesc] = useState("");

  const handleCreatePlaylist = async (e: any) => {
    e.preventDefault();
    console.log(e)
    try {
      const userCookie = Cookies.get('userid');

      if (!userCookie) {
        throw new Error("Usuário não autenticado");
      }

      const response = await axios.post('/api/playlist/createplaylist', {
        PlaylistName: playlistName,
        description: playlistDesc,
        Image: "", // Adicione lógica para manipular imagem se necessário
        UserId: Number(userCookie),
      });
      toast({
        title: "Success!",
        description: "Playlist criada com sucesso.",
        duration: 5000,
      });
      setOpen(false);
    } catch (error) {
      console.error("Erro ao criar a playlist:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Falha ao criar a playlist.",
        duration: 5000,
      });
    }
  };

  return (
    <div className="h-screen bg-[#121212] text-white flex z-40 ">
      <div className="bg-[#040404] w-[240px] flex flex-col">
        <div className="flex items-center gap-2 px-4 py-6">
          <AirplayIcon className="w-8 h-8" />
          <span className="text-2xl font-bold">SpotDeezer</span>
        </div>
        <nav className="flex flex-col gap-1 px-4">
          <Link href="#" className="flex items-center gap-3 py-2 px-3 rounded hover:bg-[#282828]" prefetch={false}>
            <HomeIcon className="w-6 h-6" />
            <span>Início</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 py-2 px-3 rounded hover:bg-[#282828]" prefetch={false}>
            <LibraryIcon className="w-6 h-6" />
            <span>Sua Biblioteca</span>
          </Link>
        </nav>
        <div className="mt-4 px-4 flex flex-col gap-1">
          <div className="text-[#b3b3b3] text-sm font-semibold">PLAYLISTS</div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Link href="#" className="flex items-center gap-3 py-2 px-3 rounded hover:bg-[#282828]" prefetch={false}>
                <PlusIcon className="w-6 h-6" />
                <span>Criar playlist</span>
              </Link>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleCreatePlaylist}>
                <DialogHeader>
                  <DialogTitle>Criar playlist</DialogTitle>
                  <DialogDescription>
                    Preencha os detalhes da sua nova playlist.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="playlist-name" className="text-right">
                      Nome
                    </Label>
                    <Input
                      id="playlist-name"
                      placeholder="Minha Playlist"
                      className="col-span-3"
                      value={playlistName}
                      onChange={(e) => setPlaylistName(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="playlist-desc" className="text-right">
                      Descrição
                    </Label>
                    <Input
                      id="playlist-desc"
                      placeholder="Descrição da Playlist"
                      className="col-span-3"
                      value={playlistDesc}
                      onChange={(e) => setPlaylistDesc(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Criar</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Link href="#" className="flex items-center gap-3 py-2 px-3 rounded hover:bg-[#282828]" prefetch={false}>
            <HeartIcon className="w-6 h-6" />
            <span>Músicas curtidas</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Icons definition ...


//@ts-ignore
function AirplayIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />
      <path d="m12 15 5 6H7Z" />
    </svg>
  );
}
//@ts-ignore
function HeartIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}


//@ts-ignore

function HomeIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}


//@ts-ignore

function LibraryIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m16 6 4 14" />
      <path d="M12 6v14" />
      <path d="M8 8v12" />
      <path d="M4 4v16" />
    </svg>
  );
}


//@ts-ignore

function PlusIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

// function SearchIcon(props) {
//   return (
//     <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0">
//             </svg>
//   );
// }
