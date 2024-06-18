import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlayIcon } from "@radix-ui/react-icons"

export function ModalVideo({url, title, description}: {url: string, title: string, description: string}){
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-none shadow-none">
            <PlayIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <iframe className="w-full h-[300px]" src={url} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen>
            
        </iframe>
        
      </DialogContent>
    </Dialog>
  )
}
