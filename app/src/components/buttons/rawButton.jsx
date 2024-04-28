import { Button } from "../ui/button";

export default function RawButton({title, func}) {

    return(
        <Button className="text-xl" onClick={func}>
            {title}
        </Button>
    )

}