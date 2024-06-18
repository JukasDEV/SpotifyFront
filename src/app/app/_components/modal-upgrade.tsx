import { DiamondIcon } from "@/components/icons/diamond";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useWorkflow } from "@/context/workflow.context";
import Link from "next/link";

export default function ModalUpgrade() {
    const { isModalUpgradeActive, setIsModalUpgradeActive } = useWorkflow();

    const handleCloseModal = () => {
        setIsModalUpgradeActive(false);
    };

    return (
        <div
            className={`fixed inset-0 z-40 ${isModalUpgradeActive ? 'flex' : 'hidden'} items-center justify-center bg-black bg-opacity-50`}
            onClick={handleCloseModal}
        >
            <Card
                className="min-w-[300px] flex flex-col bg-white rounded-lg shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <CardHeader className="flex items-center justify-center w-full p-4 border-b">
                    <CardTitle className="flex flex-col items-center justify-center text-lg font-medium">
                        <span className="mb-2 border-solid border-none border-primary rounded-full p-2">
                            <DiamondIcon className="text-[64px] w-20 h-20 text-primary"/>
                        </span>
                        <span className="font-bold text-black">
                            Upgrade
                        </span>
                    </CardTitle>
                    <CardDescription className="text-center">
                        Este recurso está disponível apenas para assinantes.
                        <br/>
                        Faça upgrade de plano para ter acesso.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-4 flex flex-col items-center gap-4">
                    <span className="text-[14px] text-black">
                        Clique no botão abaixo para escolher um plano.
                    </span>
                    <Link href="/app/plans">
                        <Button variant="default" className="hover:opacity-80" onClick={() => setIsModalUpgradeActive(false)}>
                            Escolher plano
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}
