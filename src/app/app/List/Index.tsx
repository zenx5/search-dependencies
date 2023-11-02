import ItemListRepo from "./Item";
import Loading from "../loading";


export default function ListRepo({ items }:{ items:Array<ItemsRepoType>}) {


    return <span className="flex flex-col">
        <Loading id="pending-true" className="hidden flex-row items-center justify-center p-10" />
        <span id="pending-false" className="flex flex-col gap-1">
            {items.map( item => <ItemListRepo key={item.url} url={item.url} version={item.version} />)}
        </span>
    </span>
}