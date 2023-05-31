const myform=document.getElementById("myform");
const city_id=document.getElementById("inp_city")
const state_id=document.getElementById("inp_state")
fetch("http://localhost/myfile_frontend/backend/city/read_all_city.php")
.then(function(response){
    return response.json()
}).then(function(obj){
    obj.city.forEach(element => {
        inp_city.innerHTML+=`<option value="${element.city_id}">${element.name}</option>`
    });
})
fetch("http://localhost/myfile_frontend/backend/state/read_all_state.php")
.then(function(response){
    return response.json()
}).then(function(obj){
    obj.state.forEach(element => {
        inp_state.innerHTML+=`<option value="${element.state_id}">${element.name}</option>`
    });
})



myform.addEventListener('submit',function(e){
    const pass=document.getElementById("inp_password");
    const conf_pass=document.getElementById("inp_confirm_password");
    
    e.preventDefault();
    if (pass.value !== conf_pass.value){
        alert('comfirm password is not same as password')
        conf_pass.value=''

    }if(7>=pass.value.length || pass.value.length>=20){
                
        alert('password must be in between 8 to 20 characters')
        pass.value=''
        conf_pass.value=''
    }else if(pass.value==conf_pass.value && pass.value.length<20 && 7<pass.value.length){

        //fetch the email address and check whether both different
        let main_url="http://localhost/myfile_frontend/backend/user/single_user.php"+"?email="+document.getElementById("inp_email").value
        console.log(main_url)
        fetch(main_url)
        .then(function(response){
            return response.json()
        }).then(function(obj){
            
            if ("email" in obj){
                
                if (obj.email==document.getElementById("inp_email").value){
                    alert('The email is already taken please try again')
                    document.getElementById("inp_email").value=''
                }

            }else if("message" in obj){
                
                let d = new Date();
                let year = d.getFullYear();
                let month = d.getMonth();
                let day = d.getDate();
                let date = `${year+1}-${month}-${day}`;

                
                form_data=new FormData(myform);
                
                // let name=form_data.get('inp_first_name')+' '+form_data.get('inp_last_name')
                // form_data.delete('inp_first_name');
                // form_data.delete('inp_last_name');
                form_data.delete('inp_confirm_password');
                form_data.delete('gender');
                // form_data.set('mem_fess',`25`)
                form_data.set('mem_expiry',`${date}`)
                // form_data.set('name',`${name}`)
                for (pair of form_data){
                    console.log(pair[0],pair[1]);
                }
                let value=Object.fromEntries(form_data.entries())
                value=JSON.stringify(value)
                
                fetch('http://localhost/myfile_frontend/backend/user/add_user.php',{
                    method:'post',
                    body:value
                }).then(function(response){  
                    return response.json();
                }).then(function(obj){
                    if(obj.message=="member Created"){
                        console.log("signup successfull")

                        fetch(main_url)
                        .then(function(response){
                            return response.json()
                        }).then(function(obj){
                            console.log(obj)
                            
                            sessionStorage.setItem("user",JSON.stringify(obj))
                            sessionStorage.setItem('book_arr','[]')
                            location.replace("../main grid/index.html")
                            
                        }).catch(function(error){
                            console.log(error)
                        })
                      
                    };
                }).catch(function(error){
                    console.log(error);
                })
            }
                
    }).catch(function(error){
        console.log(error)
    })


        
    }
})


