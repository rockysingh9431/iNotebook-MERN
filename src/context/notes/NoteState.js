import noteContext from "../noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const s1 = {
        "name": "Rocky",
        "class": "5b"
    }
    const [state, setState] = useState(s1)
    const update = () => {
        setTimeout(() => {
            setState({
                "name": "Singh",
                "class": "10th"
            });
        }, 1000);
    }
    return (
        <noteContext.Provider value={{ state, update }}>
            {props.children}
        </noteContext.Provider>
    )
};
export default NoteState;