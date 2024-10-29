import React,{useEffect,useState} from "react";
import axios from "axios";

function VenderReg()
{
    const[vuserid,setVUserId]=useState();
    const[vuserpass,setVUserPass]=useState();
    const[vendername,setVenderName]=useState();
    const[vaddress,setVAddress]=useState();
    const[vcontact,setVContact]=useState();
    const[vemail,setVEmail]=useState();
    const[vpicname,setVPicName]=useState();
    const[vid,setVId]=useState();
    const[image,setImage]=useState({preview:'',data:''});
    const[status,setStatus]=useState('');

    const handleVUserIdText=(evt)=>{
        setVUserId(evt.target.value);
    }
    const handleVUserPassText=(evt)=>{
        setVUserPass(evt.target.value);
    }
    const handleVenderNameText=(evt)=>{
        setVenderName(evt.target.value);
    }
    const handleVAddressText=(evt)=>{
        setVAddress(evt.target.value);
    }
    const handleVContactText=(evt)=>{
        setVContact(evt.target.value);
    }
    const handleVEmailText=(evt)=>{
        setVEmail(evt.target.value);
    }
    const handleVidText=(evt)=>{
        setVId(evt.target.value);
    }
    useEffect(()=>{
        axios.get("http://localhost:9191/vendor/getvendercount/").then
        ((res)=>{
            setVId(res.data.length+1);
        }).catch((err)=>{
            alert(err);
        });
        //  5line skip
    },);

    const handleRegisterButton=async()=>{
        var obj={
            VUserId:vuserid,
            VUserPass:vuserpass,
            VenderName:vendername,
            VAddress:vaddress,
            VContact:vcontact,
            VEmail:vemail,
            VPicName:vpicname,    
            Vid:vid,
            Status:"Inactive"  
        }
        // let formData = new FormData()
        // formData.append('file',image.data);
        // const response = await fetch ('http://localhost:9191/customer/savecustomerimage',{
        //     method: "POST",
        //     body: formData,
        // })
        // if(response){
        //     if(response.statusText=="ok")
        //     {
        //         setStatus("File Uploaded Successfully");
        //     }else{
        //         setStatus("Failed to Upload File");
        //     }
        // }
        axios.post("http://localhost:9191/vendor/register",obj).then((res)=>{
            alert(res.data);
        }).catch((err)=>{
            alert(err);
        });
    }
    // browse and save image code
    const handleSubmit=async (evt) => {
        evt.preventDefault()
            let formData = new FormData()
            formData.append('file',image.data);
            const response = await fetch("http://localhost:9191/vendor/savevenderimage",{
                method: 'POST',
                body: formData,
            })
            if(response){
                if(response.statusText=="OK")
                {
                    setStatus("File Uploaded Successfully");
                }else
                {
                    setStatus("Failed to Upload File")
                }
            }
    }
    const handleFileChange=(evt)=> {
        const img = {
            preview: URL.createObjectURL(evt.target.files[0]),
            data:evt.target.files[0]
        }
        setImage(img)
        setVPicName(evt.target.files[0].name);
    }
    return(
        <div className="" style={{backgroundColor:"lightyellow"}}>
            <center>
                <p  style={{backgroundColor:"black",color:"white"}}>Vender Registration Form</p>
                <div>
                <table className="">
                    <tr>
                        <td>Vender Id</td>
                        <td>{vid}</td>
                    </tr>
                    <tr>
                        <td>User Id</td>
                        <td>
                            <input type="text" onChange={handleVUserIdText}className="form-control"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td>
                          <input type="password" onChange={handleVUserPassText} className="form-control"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Vender Name</td>
                        <td>
                            <input type="text"onChange={handleVenderNameText}className="form-control"/>
                        </td>
                    </tr>
                    {/* <tr>
                        <td>State</td>
                        <td>
                            <select onClick={handleStIdSelect}>
                                {
                                    stlist.map((items)=>(
                                        <option value={items.stid}>{items.stname}</option>
                                    ))
                                }
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>City</td>
                        <td>
                            <select onClick={handleCtIdSelect}>
                                {
                                    ctlist.map((items)=>(
                                        <option value={items.ctid}>{items.ctname}</option>
                                    ))
                                }
                            </select>
                        </td>
                    </tr> */}
                    <tr>
                        <td>Address</td>
                        <td>
                            <input type="text" onChange={handleVAddressText} className="form-control"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Contact</td>
                        <td>
                            <input type="number" maxLength={10} minLength={10}
                             onChange={handleVContactText} className="form-control"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>
                            <input type="email" onChange={handleVEmailText} className="form-control"/>
                        </td>
                    </tr>
                    <tr>
                    <td>Select Photo</td>
                <td>
                    <input type="file" onChange={handleFileChange} name="file"/>
                    <img src={image.preview} width="100" height="100"/>
                </td>
                </tr>
                <tr>
                    <td>Click to Upload Vender Photo</td>
                <td>
                    <button type="submit" onClick={handleSubmit} className="btn btn-primary">Upload</button>
                    
                </td>
                </tr>
                <tr>
                    <td></td>
            
                <td>
                    <button type="submit" onClick={handleRegisterButton} className="btn btn-danger">Register</button>
                    
                </td>
                </tr>

                </table>
                </div>
            </center>
        </div>
    );
    
}export  default VenderReg;