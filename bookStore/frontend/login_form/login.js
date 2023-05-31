const switch_admin=document.getElementById("switch_admin");
const switch_user=document.getElementById("switch_user");
const myform=document.getElementById("myform");
        
switch_user.style.display="none"
let  url="http://localhost/myfile_frontend/backend/user/single_user.php" // defult value

myform.addEventListener('submit',function(e){
    const pass=document.getElementById("inp_password");
    const conf_pass=document.getElementById("inp_confirm_password");  
    const email=document.getElementById("inp_email");
    e.preventDefault();
    if (pass.value !== conf_pass.value){
        alert('comfirm password is not same as password')
        conf_pass.value=''

    }if(7>=pass.value.length || pass.value.length>=20){
                    
        alert('password must be in between 8 to 20 characters')
        pass.value=''
        conf_pass.value=''
    }else if(pass.value==conf_pass.value && pass.value.length<20 && 7<pass.value.length){
            
        form_data=new FormData(this);
        form_data.delete('inp_confirm_password');
        for (pair of form_data){
            console.log(pair[0],pair[1]);
        }
        
        main_url=url+"?email="+email.value
        console.log(main_url)

        fetch(main_url)
            .then(function(response){  
                return response.json();})
            .then(function(obj){
                console.log(obj)
                
                if ("message" in obj){
                    alert("no such email found try again")
                    email.value=''
                    pass.value=''
                    conf_pass.value=''  
                }else if(obj.password==pass.value && "mem_expiry" in obj){
                    
                    console.log("credentials matched") 
                    sessionStorage.setItem('user',JSON.stringify(obj))
                    sessionStorage.setItem('book_arr','[]')
                    location.replace("../main grid/index.html")

                }else if(obj.password==pass.value ){
                    
                    console.log("credentials matched")
                    sessionStorage.setItem('admin',JSON.stringify(obj))
                    console.log(sessionStorage.getItem('admin'))
                    location.replace("../admin_profile/admin_profile.html")

                }else{

                    alert("password typed was incorrect")
                    email.value=''
                    pass.value=''
                    conf_pass.value=''

                }
                
            })
            .catch(function(error){
            console.log(error);})
        
    }
    })

switch_admin.addEventListener('click',function(){
    switch_user.style.display="inline"
    switch_admin.style.display="none"
    url="http://localhost/myfile_frontend/backend/admin/admin_single_read.php" // url will be of admin login
    
})
switch_user.addEventListener('click',function(){
    switch_user.style.display="none"
    switch_admin.style.display="inline"
    url="http://localhost/myfile_frontend/backend/user/single_user.php" //url will be of user  login
    
})


