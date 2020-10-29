import MainLayout from "../../layouts"
import { AdminProtectRoute, ProtectRoute } from "../../route"


export const Users = ({}) => {

    return (
        <MainLayout title="All Users">

        </MainLayout>
    )
}

export default ProtectRoute(AdminProtectRoute(Users));