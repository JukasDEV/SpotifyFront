import Cookies from "cookies-js";

export const signOut = () => {
    Cookies.expire("token");
    Cookies.expire("user");
    Cookies.expire("WhitelabelApp")
    window.location.href="/"
}