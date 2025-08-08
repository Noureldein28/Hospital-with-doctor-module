import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Home from "../Modules/Client/home";
import App from "../App";

export const routes =createBrowserRouter(createRoutesFromElements(
    <>
    <Route path="/" element={<App/>}>
    <Route index element={<Home/>}/>
    </Route>
    </>
))