import { getUser } from "@/tools/actions";
import { ROUTER_PATH } from "@/tools/constants";
import { redirect } from "next/navigation";

export default function AccessLayou({ children }:{ children:any }) {
    const user = getUser()

    if( user ) redirect(ROUTER_PATH.APP)

    return children;
}