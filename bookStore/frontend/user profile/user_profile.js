const input_first_name=document.getElementById("inp_first_name");
const input_last_name=document.getElementById("inp_last_name");
const input_email=document.getElementById("inp_email");
const input_password=document.getElementById("inp_password");
const input_phone_number=document.getElementById("inp_phone_number")
const input_address=document.getElementById("inp_address");
const input_state=document.getElementById("inp_state");
const input_city=document.getElementById("inp_city");
const mem_expiry=document.getElementById("mem_expiry");
const myform=document.getElementById("myform");

// page fucnionality
const tabShow=document.querySelectorAll(".tabShow")
const tab=document.querySelectorAll(".tab")


//page funcitonality
function tabs(panel_index){
    tabShow.forEach(function(node){
        node.style.display="none"
    });
    tabShow[panel_index].style.display="block"

}
tabs(0)
// end page fucnionality






fetch("http://localhost/myfile_frontend/backend/city/read_all_city.php")
.then(function(response){
    return response.json()
}).then(function(obj){
    
    obj.city.forEach(element => {
        input_city.innerHTML+=`<option value="${element.city_id}">${element.name}</option>`
    });
})
fetch("http://localhost/myfile_frontend/backend/state/read_all_state.php")
.then(function(response){
    return response.json()
}).then(function(obj){
    
    obj.state.forEach(element => {
        input_state.innerHTML+=`<option value="${element.state_id}">${element.name}</option>`
    });
    
})


// set values
default_Value_setter();



function default_Value_setter(){
    
    
    const user_obj=JSON.parse(sessionStorage.getItem("user"));
    input_first_name.value=user_obj.first_name
    input_last_name.value=user_obj.last_name
    input_email.value=user_obj.email
    input_password.value=user_obj.password
    input_address.value=user_obj.address
    input_phone_number.value=user_obj.phone_number
    input_city.value=user_obj.city_id
    input_state.value=user_obj.state_id
    mem_expiry.innerHTML=user_obj.mem_expiry

}
//end setting values


myform.addEventListener('submit',function(e){
    e.preventDefault()
    if (input_password.value<8){
        alert("please choose a stronger password")
        default_Value_setter()
    }else{
        let form_data=new FormData(this)
        const user=JSON.parse(sessionStorage.getItem("user"));
        form_data.set("id",`${user.id}`)
        for (pair of form_data){
            console.log(pair[0],pair[1]);
        }
        let value=Object.fromEntries(form_data.entries())
        value=JSON.stringify(value)
        console.log('value',JSON.parse(value))

                    
        fetch('http://localhost/myfile_frontend/backend/user/alter_user.php',{
            method:'post',
            body:value
        }).then(function(response){
            return response.json()
        }).then(function(obj){
            console.log(obj)
            if ('message' in obj){
                console.log(obj.message)
            }
        }).catch(function(error){
            console.log(error)
        })
    }
})

function logout(){
    sessionStorage.clear()
    location.replace("../login_form/login.html")
}










function show_password(){
    input_password.setAttribute("type",'text')
    document.getElementById("hide_pass").style.display='inline'
    document.getElementById("show_pass").style.display='none'
}
function hide_password(){
    input_password.setAttribute("type",'password')
    document.getElementById("show_pass").style.display='inline'
    document.getElementById("hide_pass").style.display='none'
}
