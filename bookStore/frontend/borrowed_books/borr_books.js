const flex_container=document.getElementById("flex_container")
const user_name=document.getElementById("user_name")

let user_obj=JSON.parse(sessionStorage.getItem('user'))
user_name.innerHTML=user_obj.first_name+' '+user_obj.last_name


borr_books_display()


function grid_maker(obj){
    
    flex_container.innerHTML+=`
    <div class="card">
        <h1>Title</h1>
        <h2 class="card_title">${obj.title}</h2>
        <h1>Edition</h1>
        <h2>${obj.edition}</h2>
        <h1>Return Date</h1>
        <h2>${obj.return_date}</h2>
        <h2 style='display:none'>${obj.mem_id}</h2>
        <h2 style='display:none'>${obj.book_id}</h2>
        <a href="#" class="card_button" onclick="return_book(this)">Return</a>
        
    </div>`
    
}



function borr_books_display(){
    flex_container.innerHTML=''
    let url='http://localhost/myfile_frontend/backend/borrowed_books/all_borr_books_user.php?mem_id='+user_obj.id
    fetch(url)
    .then(function(response){
        return response.json()
    }).then(function(obj){
        console.log(obj)
        if ('message' in obj){
            flex_container.innerHTML='No borrowed books found'
        }else{
            obj.user_borr_books.forEach(element => {
                grid_maker(element)
            });
        }
    }).catch(function(error){
        console.log(error)
    })
    
}




function return_book(tag){
    let card_div=tag.parentNode
    let return_date=new Date(card_div.childNodes[11].innerHTML)
    let today=new Date()
    if (return_date.getTime()>today.getTime()){
        alert("extra chrages are added for last return")
    }

    let mem_id=card_div.childNodes[13].innerHTML
    let book_id=card_div.childNodes[15].innerHTML
    let URL='http://localhost/myfile_frontend/backend/borrowed_books/delete_all_books_user.php?mem_id='+mem_id+'&book_id='+book_id
    console.log(URL)
    fetch(URL)
    .then(function(response){
        return response.json()
    }).then(function(obj){
        console.log(obj);
        if (obj.message='borrowed books deleted successfully'){
            borr_books_display()
        }
    }).catch(function(error){
        console.log(error)
    })


}





function logout(){
    sessionStorage.clear()
    location.replace("../login_form/login.html")
}