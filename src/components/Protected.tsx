import { useQuery } from "react-query"
import { Button } from 'primereact/button';
import { hasAuthParams, useAuth } from "react-oidc-context";
import { useContext, useEffect, useState } from "react";
import { AxiosContext } from "./AxiosContext";

type UserInfo = {
    name: string,
    sub: string,
    roles: string[],
    email: string,
}

const Protected = () => {

    const auth = useAuth();
    const [hasTriedSignin, setHasTriedSignin] = useState(false);
    const axiosCtx = useContext(AxiosContext)
    
    useEffect(() => {
        if (!(hasAuthParams() || auth.isAuthenticated || auth.activeNavigator || auth.isLoading || hasTriedSignin)) {
            void auth.signinRedirect();
            setHasTriedSignin(true);
        } else {
            axiosCtx.defaults.headers.common['Authorization'] = `Bearer ${auth.user?.access_token}`;
        }
    }, [auth, axiosCtx.defaults.headers.common, hasTriedSignin]);

    const fetchUserInfo = (): Promise<UserInfo> | null => {
        return auth.isAuthenticated ? axiosCtx.get("/api/user/info", {
        }).then((res) => {
            return res.data
        }) : null

    }

    const { isLoading, error, data } = useQuery({
        queryKey: ['repoData', auth.isAuthenticated],
        queryFn: fetchUserInfo
    })

    if (isLoading) return <b>Loading...</b>

    if (error) return (<div>An error has occurred: {JSON.stringify(error)}</div>)

    return (
        data ?
            <div>
                <h1>{data.name}</h1>
                <Button onClick={() => { alert(JSON.stringify(auth.user?.access_token)) }}
                    className="m-1 custom-btn-style"
                    label='Show Parsed Access token'
                    severity="warning" />

                <Button onClick={() => { auth.removeUser(); auth.signoutRedirect(); }}
                    className="m-1 custom-btn-style"
                    label='Logout'
                    severity="warning" />

                <table>
                    <tbody>
                        <tr>
                            <td><strong>UserId</strong></td><td>{data.sub}{' '}</td>
                        </tr>
                        <tr>
                            <td><strong>Roles</strong></td><td>{JSON.stringify(data.roles)}{' '}</td>
                        </tr>
                        <tr>
                            <td><strong>Email</strong></td><td>{data.email}</td>
                        </tr>
                    </tbody>
                </table>
            </div> : <></>
    )
}

export default Protected