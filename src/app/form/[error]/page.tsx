
export default async function FormPage({ params }:{ params:{ error:string } }) {
    const { error } = params

    return <div className="flex flex-col gap-1">
        <p>{ error.replaceAll("%20", " ") }</p>
    </div>
}