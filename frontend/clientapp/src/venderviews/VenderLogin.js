import React,{useEffect, useState} from "react";
import axios from "axios";
import VenderHome from "./VenderHome";
import ReactDOM from "react-dom/client";
import Cookies from 'js-cookie';

function VenderLogin()
{
    const[uid,setUId]=useState();
    const[upass,setUPass]=useState();
    const[ischecked,setIsChecked]=useState(false);

    const handleUIdText=(evt)=>{
        setUId(evt.target.value);
    }
    const handleUPassText=(evt)=>{
        setUPass(evt.target.value);
    }

    useEffect(()=>{
        var myccokies=Cookies.get('vauth');
        if(myccokies!=undefined)
        {
            var obj=JSON.parse(myccokies);
            //alert(obj.username);
            setUId(obj.username);
            setUPass(obj.password);
        }
    },[])
    const handleLoginButton=()=>{

        axios.get("http://localhost:9191/vender/login/"+uid+"/"+upass).then((res)=>{
            if(res.data.VUserId!=undefined)
            {

                //cookies handling code
                if(ischecked==true)
                {
                    const userData = {
                        username:uid,
                        password:upass
                    };
                    const expirationTime = new Date(new Date()
                .getTime() + 6000000);
                // store data in cookies
                Cookies.set('vauth',JSON.stringify
                    (userData), {expires:expirationTime});
                }

                //session handling code
                const userSessionData = {
                    vuserfullname:res.data.VenderName
                };
                const sessionexpirationTime = new Date(new Date().getTime() + 60000 );
                // store data in session 
                sessionStorage.setItem('vsessionauth', JSON.stringify
                    (userSessionData), sessionexpirationTime);

                    const root = ReactDOM.createRoot(document.getElementById('root'));
                    var obj={vfname:res.data.VenderName,
                        vpicname:res.data.VPicName,
                        vid:res.data.Vid
                    }
                    root.render(<VenderHome data={obj}></VenderHome>)
            }else{
                alert("Invalid Id/Password");
            }
        });
    }
        const handleIsRemember=()=>{
            setIsChecked(true);
        }
    return(
        <div style={{backgroundColor:"peachpuff", marginTop:"10%", marginLeft:"25%", marginRight:"25%"}}>
            <center>
                <h4 style={{backgroundColor:"black",color:"white"}}>Vender Login Form</h4>
                <div className="">
                <table>
                    <tr>
                        <td>User Id</td>
                        <td>
                            <input type="text" className="form-control"
                             onChange={handleUIdText} value={uid}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td>
                            <input type="password" onChange={handleUPassText} 
                            className="form-control" value={upass}/>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button type="submit" className="btn btn-danger"
                                 onClick={handleLoginButton}>Login</button>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <input type="checkbox" onClick={handleIsRemember}/>
                            <spane>Remember Me</spane>
                        </td>
                    </tr>
                </table>
                </div>
            </center>
        </div>
    );
} export default VenderLogin;