import { CardContent, CardFooter, Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"

type TestimonyCardProps = {
  text: string,
  avatar: string,
  name: string,
  role: string
}

export default function TestimonyCard({ testimony }: { testimony: TestimonyCardProps}) {
  return (
    <Card className="w-full max-w-md mx-auto max-h-[300px]">
      <CardContent className="border border-gray-200 p-6 dark:border-gray-800 h-3/4">
        <blockquote className="text-md lg:text-md leading-normal">
          {testimony.text}
        </blockquote>
      </CardContent>
      <CardFooter className="space-y-4">
        <div className="flex items-center gap-4 space-y-2">
          <Avatar className="border">
            <img
              alt="User avatar"
              className="rounded-full"
              height="48"
              src={testimony.avatar}
              style={{
                aspectRatio: "48/48",
                objectFit: "cover",
              }}
              width="48"
            />
          </Avatar>
          <div className="leading-none">
            <div className="font-semibold">{testimony.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 leading-normal">{testimony.role}</div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

