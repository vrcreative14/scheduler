import { useState } from "react"
import { Button } from "react-bootstrap";
import { Alert } from "react-bootstrap";
export default function UserInfo(){

    const dataList = {
        'username': '',
        'email':'',        
        'password':''
    }

    const submitUrl = 'http://127.0.0.1:8000/accounts/sign-up/'

    const [count, setCount] = useState(0);
    const [userData, setUserData] = useState(dataList)
    const [isLoading, setisLoading] = useState(false)
    const [alertType, setalertType] = useState('')
    const [alertMessage, setalertMessage] = useState('')

    function handleChange(e){
        debugger
        // if (key == 'username')
        // dataList.username = e.target.value
        // else if (key == 'email')
        // dataList.email = e.target.value
        // // else if (key == 'phone')
        // // dataList.phone = e.target.value
        // else if (key == 'password')
        // dataList.password = e.target.value
        setUserData({...userData,[e.target.name]:e.target.value})
        console.log(dataList)
    }

    function showAlert(type){
        setTimeout(setalertType(type), 3000)
    }

    

    function handleSubmit(){
        debugger
        setisLoading(true)
        fetch(submitUrl,
                {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(userData),
            })
            .then(response => response.json())
            .then(result => {
                debugger
                console.log(result)
                setisLoading(false)
                setalertMessage(result.message)
                showAlert('success')
            })
    }
    return(
        <>
        { alertMessage && <Alert variant={alertType} dismissible>{alertMessage}</Alert>}
       
            <div className="row mb-3">
                    <div className="col-lg-2">
                            <span>Username</span>
                    </div>
                    <div className="col-lg-4">
                            <input name="username" className="form-control"
                                 onChange={(e) => handleChange(e)}/>
                    </div>
            </div>

            {/* <div className="row">
                    <div className="col-lg-2">
                            <span>Last Name</span>
                    </div>
                    <div className="col-lg-4">
                            <input name="last_name" className="form-control"/>
                    </div>
            </div> */}

            <div className="row mb-3">
                    <div className="col-lg-2">
                            <span>Email</span>
                    </div>
                    <div className="col-lg-4">
                            <input name="email" className="form-control" 
                                        onChange={(e) => handleChange(e)}/>
                    </div>
            </div>

            <div className="row mb-3">
                    <div className="col-lg-2">
                            <span>Password</span>
                    </div>
                    <div className="col-lg-4">
                            <input name="password" className="form-control" 
                                        onChange={(e) => handleChange(e)}/>
                    </div>
            </div>

            <div className="d-flex center">
                    <Button onClick={handleSubmit}>{isLoading ? '......' : 'Signup'} </Button>
            </div>

        </>
    )
}