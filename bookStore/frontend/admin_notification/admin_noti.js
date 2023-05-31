const flex_container=document.getElementById("flex_container")

//fetches data from DB of transaction

let transact_array=[]
main_function()

function main_function(){
    flex_container.innerHTML=''
    fetch('http://localhost/myfile_frontend/backend/transaction/read_all_transaction.php')
    .then(function(response){
        return response.json()
    }).then(function(obj){
        console.log(obj)
        if ('message' in obj){
            flex_container.innerHTML='<h1>No notifications right now</h1>'
        }else{
            transact_array=obj.transact
            transact_array.forEach(element => {
                grid_maker(element)
                
            });
        }
        
    }).catch(function(error){
        console.log(error)
    })

}




function grid_maker(obj){
    flex_container.innerHTML+=`
    <div class="card">
    
    
        <h1>Email</h1>
        <h2>${obj.email}</h2>
        <h1>Title</h1>
        <h2>${obj.title}</h2>
        <h1>Edition</h1>
        <h2>${obj.edition}</h2>
        <h2 style='display:none'>${obj.mem_id}</h2>
        <h2 style='display:none'>${obj.book_id}</h2>
        
        <div><button onclick="allow(this)" id="btn_allow">Allow</button></div>
    </div>
    `

}







function allow(tag){
    card_div=tag.parentNode.parentNode
    let value={}
    let mem_id=card_div.childNodes[13].innerHTML
    let book_id=card_div.childNodes[15].innerHTML
    let date=new Date()
    let year=date.getFullYear()
    let month=date.getMonth()+2
    let day=date.getDate()
    if ((month)==13){
        year+=1
    }
    let date_str=`${year}-${month}-${day}`
    
    value.mem_id=mem_id
    value.book_id=book_id
    value.return_date=date_str
    console.log(value)
    json_value=JSON.stringify(value)
    fetch('http://localhost/myfile_frontend/backend/borrowed_books/create_borr_books.php',{
        method:'post',
        body:json_value
    }).then(function(response){
        return response.json()
    }).then(function(obj){
        console.log(obj)
    }).catch(function(){
        console.log(error)
    })
    delete value.return_date
    json_value_transact=JSON.stringify(value)
    console.log(json_value_transact);
    fetch('http://localhost/myfile_frontend/backend/transaction/alter_transaction.php',{
        method:'post',
        body:json_value_transact
    }).then(function(obj){
        console.log(obj)
        main_function() 

    }).catch(function(){
        console.log(error)
    })
   
}




function logout(){
    sessionStorage.clear()
    location.replace("../login_form/login.html")
}
