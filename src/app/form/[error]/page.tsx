import Loading from "../loading"

export default async function FormPage({ params }:{ params:{ error:string } }) {
    const { error } = params

    return <div className="flex flex-col gap-1">
        <Loading id="pending-true" className="hidden flex-row items-center justify-center p-10" />
        <span id="pending-false" className="flex flex-col gap-1">
            <p>{ error.replaceAll("%20", " ") }</p>
        </span>
    </div>
}