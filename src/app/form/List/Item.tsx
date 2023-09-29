export default function ItemListRepo({ url, version }:{ url:string, version:string }){


    return <span key={url} className="p-2 border-b border-slate-400">
        <p><b>Repository:</b> <a target="_blank" className="hover:bg-slate-300 p-1 rounded-md" href={url}>{url}</a></p>
        <p><b>Version:</b> {version}</p>
    </span>
}

