import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"

  
export default function Info({ title, description }: { title: string, description: string }) {
    return (
        <>
        <HoverCard>
            <HoverCardTrigger>

                    <div className="info__icon text-primary cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 24 24" height="16"><path fill="#393a37" d="m12 1.5c-5.79844 0-10.5 4.70156-10.5 10.5 0 5.7984 4.70156 10.5 10.5 10.5 5.7984 0 10.5-4.7016 10.5-10.5 0-5.79844-4.7016-10.5-10.5-10.5zm.75 15.5625c0 .1031-.0844.1875-.1875.1875h-1.125c-.1031 0-.1875-.0844-.1875-.1875v-6.375c0-.1031.0844-.1875.1875-.1875h1.125c.1031 0 .1875.0844.1875.1875zm-.75-8.0625c-.2944-.00601-.5747-.12718-.7808-.3375-.206-.21032-.3215-.49305-.3215-.7875s.1155-.57718.3215-.7875c.2061-.21032.4864-.33149.7808-.3375.2944.00601.5747.12718.7808.3375.206.21032.3215.49305.3215.7875s-.1155.57718-.3215.7875c-.2061.21032-.4864.33149-.7808.3375z"></path></svg>
                    </div>
            </HoverCardTrigger>
            <HoverCardContent>
                <span className="text-[12px]">
                    {description}
                </span>        
            </HoverCardContent>
        </HoverCard>   
        <style>
            {`
            .info {
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                
                padding: 6px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                border-radius: 8px;
                box-shadow: 0px 0px 5px -3px #111;
              }
              
              .info__icon {
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              
              .info__icon path {
                fill: #facc15;
              }
              
              .info__title {
                font-weight: 500;
                font-size: 14px;
                color: #fff;
              }
              
              .info__close {
                width: 20px;
                height: 20px;
                cursor: pointer;
                margin-left: auto;
              }
              
              .info__close path {
                fill: #fff;
              }
            `}
        </style>
        </>   
    );
}