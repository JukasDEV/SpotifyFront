import ResetForm from "./_components/reset-form";

export default function Page({ params }: { params: { token: string }} ){
    return (
        <>
            <ResetForm token={params.token}/>
        </>
    )
}