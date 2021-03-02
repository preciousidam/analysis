import { ProtectRoute } from "../route"


export const About = ({}) => {

    return (
        <div><h1>About us</h1></div>
    )
}

export default ProtectRoute(About);