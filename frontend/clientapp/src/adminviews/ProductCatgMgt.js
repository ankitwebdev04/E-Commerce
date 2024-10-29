import React, { useEffect, useState } from "react";
import axios from "axios";
import "../index.css";

function ProductCatgMgt() {
    const [pcatgid, setPCatgId] = useState();
    const [pcatgname, setPCatgName] = useState();
    const [pcatglist, setPCatgList] = useState([]);

    const handlePcatgIdText = (evt) => {
        setPCatgId(evt.target.value);
    }
    const handlePcatgNameText = (evt) => {
        setPCatgName(evt.target.value);
    }
    useEffect(() => {
        axios.get("http://localhost:9191/Productcatg/showproductcatg").then((res) => {
            setPCatgList(res.data);
            setPCatgId(res.data.length + 1);
        }).catch((err) => {
            alert(err);
        });
    }, [])

    const handleSaveButton = () => {
        var obj = {
            pcatgid: pcatgid,
            pcatgname: pcatgname
        };
        axios.post("http://localhost:9191/productcatg/addproductcatg/" + pcatgid + "/" + pcatgname).then
            ((res) => {
                alert(res.data);
            }).catch((err) => {
                alert(err);
            })
    }

    const handleShowButton = () => {
        axios.get("http://localhost:9191/productcatg/showproductcatg").then((res) => {
            setPCatgList(res.data);
        }).catch((err) => {
            alert(err);
        });
    }

    // const handleSearchButton=()=>{
    //     if(pcatgid!=undefined&&pcatgid!="")
    //     {
    //         axios.get("http://localhost:9191/productcatg/search/"
    //             +pcatgid).then((res)=>{
    //                 if(res.data.pcatgid!=undefined)
    //                 {
    //                     setPCatgId(res.data.pcatgid);
    //                     setPCatgName(res.data.pcatgname);
    //                 }else{
    //                     alert("Data not found");
    //                 }
    //             }).catch((err)=>{
    //                 alert(err);
    //             });
    //     }
    //     if(pcatgname!=undefined&&pcatgname!="")
    //     {
    //         axios.get("http://localhost:9191/productcatg/searchbyname/"
    //             +pcatgname).then((res)=>{
    //                 if(res.data.pcatg!=undefined)
    //                 {
    //                     setPCatgId(res.data.pcatgid);
    //                     setPCatgName(res.data.pcatgname);
    //                 }else{
    //                     alert("Data not found");
    //                 }
    //             }).catch((err)=>{
    //                 alert(err);
    //             });
    //     }
    // }
    const handleSearchButton = () => {

        if (pcatgid != undefined && pcatgid != "") {
            axios.get("http://localhost:9191/productcatg/searchbyi/" + pcatgid)
                .then((res) => {
                    //  if(res.data.pcatgid!=undefined)
                    {
                        setPCatgName(res.data.pcatgname);

                        // setPCatgId(res.data.pcatgid);
                        // setPCatgName(res.data.pcatgname);
                        // setPCatgList(res.data.pcatglist);
                    }
                    // else{
                    //     alert("Data not Found");
                    // }
                })
                .catch((err) => {
                    alert(err);
                });
        }
        else {
            if (pcatgname != undefined && pcatgname != "") {
                axios.get("http://localhost:9191/productcatg/searchbyname/" + pcatgname)
                    .then((res) => {
                        if (res.data.pcatgname != undefined) {
                            setPCatgId(res.data.pcatgid);

                            // setPCatgId(res.data.pcatgid);
                            // setPCatgName(res.data.pcatgname);
                            // setPCatgList(res.data.pcatglist);
                        }
                        else {
                            alert("Data not Found");
                        }
                    })
                    .catch((err) => {
                        alert(err);
                    });
            }
        }
    }

    return (
        <div style={{ paddingTop: "10px" }}>
            <center>
                <h5 style={{ color: "black", backgroundColor: "violet" }}>Product Category Form</h5>

                <div className="div1">
                    <table style={{ backgroundColor: "pink" }}>
                        <br></br>
                        <tr>
                            <td >Product Id:</td>
                            <td>
                                <input type="text" className="form-control" onChange={handlePcatgIdText} value={pcatgid} />
                            </td>
                        </tr>
                        <tr>
                            <td>Category Name:</td>
                            <td>
                                <input type="text" className="form-control" onChange={handlePcatgNameText} value={pcatgname} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="submit" onClick={handleSaveButton}
                                    className="btn btn-primary">Save</button>
                            </td>
                            <td>
                                <button type="submit" onClick={handleShowButton}
                                    className="btn btn-success">Show</button>
                            </td>
                            {/* <td>
                                <button type="submit"onClick={handleUpdateButton}
                                className="btn btn-danger">Update</button>
                            </td> */}
                            <td>
                                <button type="submit" onClick={handleSearchButton}
                                    className="btn btn-primary">Search</button>
                            </td>
                        </tr>
                    </table>
                     </div>
                <table>
                    <center>
                        <div className="div2" style={{ backgroundColor: "pink" }}>
                        <p style={{ color: "black", backgroundColor: "yellow", marginRight: 50, marginTop: 15, marginLeft: 50 }}>Product Category List</p>

                            <tr>
                                <th>Id</th>
                                <th>Category Name</th>
                            </tr>
                            {
                                pcatglist.map((item) => (
                                    <tr>
                                        <td>{item.pcatgid}</td>
                                        <td>{item.pcatgname}</td>
                                    </tr>
                                ))
                            }
                        </div>
                    </center>
                </table>
            </center>
        </div>

    );
} export default ProductCatgMgt;