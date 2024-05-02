"use client"
import { Fragment } from "react";
import Image from "next/image";
import { MdCheck } from "react-icons/md";

//Store
import { useStore } from "./store";
import auth from "./auth";

//Components
import Dialog from "../Dialog";
import Register from "./Authorizer/Register";
import Login from "./Authorizer/Login";


const Authorizer = () => {
    //Initializing Hook
    const { current, open } = useStore();

    return (
        <Dialog
            open={open}
            onClose={auth.close}
            width={550}
            className="!p-0"
        >
            {current === "join" &&
                <Register />
            }
            {current === "login" &&
                <Login />
            }
        </Dialog>
    );
};

export default Authorizer;