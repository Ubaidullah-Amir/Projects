
const category_heading=document.getElementById("category_heading")
const grid_container=document.getElementById("grid_container")
const logout_li=document.getElementById("logout")
logout_li.addEventListener('click',function(){
    location.replace("../login_form/login.html")
})






//creating default grid
cat_selected_all()



function grid_maker(obj){
    

    grid_container.innerHTML+=`
    <div class="card" onclick="display_book(this)" >
        <img src="${obj.img}">
        <div class="card_text" >
            
            <p class="card_title">${obj.title}</p>
            <h2 class="card_author">${obj.author}</h2>
            <h5>book edition ${obj.edition}</h5>
            <p style='display:none'>${obj.id}</p>
            <p class="card_category">${obj.genre_name}</p>
            <p class="card_info">${obj.descp.slice(0,60)+'...'}</p>

        </div>
    </div>
    `
    
    
    
}
function message_dispplayer(message){

    grid_container.innerHTML=`<p class="not_found">${message}</p>`
}
//to go to book profile


function display_book(tag){
    console.log(tag.childNodes[3].childNodes[7].innerHTML)
    sessionStorage.setItem("current_book",tag.childNodes[3].childNodes[7].innerHTML)
    location.replace("../single_book/single_book.html")
}






function cat_selected_action(){
    category_heading.innerHTML="Action & Adventure"
    grid_container.innerHTML=''
    fetch("http://localhost/myfile_frontend/backend/book/read_book_genre.php?genre_id=11")
    .then(function(response){  
        
        return response.json();
    })
    .then(function(obj){
        console.log(obj)
        if("message" in obj){
            message_dispplayer(obj.message)
        }else{
            let book_array=obj.book
            book_array.forEach(element => {
                grid_maker(element)
            });
        }
    }).catch(function(error){
        console.log(error)
    })  

}
function cat_selected_fiction(){
    category_heading.innerHTML="Fiction"
    grid_container.innerHTML=''
    fetch("http://localhost/myfile_frontend/backend/book/read_book_genre.php?genre_id=1")
    .then(function(response){  // anything that index.php varDumps will be response
        
        return response.json();
    })
    .then(function(obj){
        console.log(obj)
        if("message" in obj){
            message_dispplayer(obj.message)
        }else{
            let book_array=obj.book
            book_array.forEach(element => {
                grid_maker(element)
            });
        }
    }).catch(function(error){
        console.log(error)
    })
    
    
    
}
function cat_selected_research(){
    category_heading.innerHTML="Research"
    grid_container.innerHTML=''
    fetch("http://localhost/myfile_frontend/backend/book/read_book_genre.php?genre_id=3")
    .then(function(response){  // anything that index.php varDumps will be response
        
        return response.json();
    })
    .then(function(obj){
        console.log(obj)
        if("message" in obj){
            message_dispplayer(obj.message)
        }else{
            let book_array=obj.book
            book_array.forEach(element => {
                grid_maker(element)
            });
        }
    }).catch(function(error){
        console.log(error)
    })
    
}
function cat_selected_tech(){
    category_heading.innerHTML="Technology"
    grid_container.innerHTML=''
    fetch("http://localhost/myfile_frontend/backend/book/read_book_genre.php?genre_id=5")
    .then(function(response){  // anything that index.php varDumps will be response
        
        return response.json();
    })
    .then(function(obj){
        console.log(obj)
        if("message" in obj){
            message_dispplayer(obj.message)
        }else{
            let book_array=obj.book
            book_array.forEach(element => {
                grid_maker(element)
            });
        }
    }).catch(function(error){
        console.log(error)
    })
}
function cat_selected_bio(){
    category_heading.innerHTML="Biography"
    grid_container.innerHTML=''
    fetch("http://localhost/myfile_frontend/backend/book/read_book_genre.php?genre_id=15")
    .then(function(response){  // anything that index.php varDumps will be response
        
        return response.json();
    })
    .then(function(obj){
        console.log(obj)
        if("message" in obj){
            message_dispplayer(obj.message)
        }else{
            let book_array=obj.book
            book_array.forEach(element => {
                grid_maker(element)
            });
        }
    }).catch(function(error){
        console.log(error)
    })
}
function cat_selected_manga(){
    category_heading.innerHTML="Manga"
    grid_container.innerHTML=''
    fetch("http://localhost/myfile_frontend/backend/book/read_book_genre.php?genre_id=16")
    .then(function(response){  // anything that index.php varDumps will be response
        
        return response.json();
    })
    .then(function(obj){
        console.log(obj)
        if("message" in obj){
            message_dispplayer(obj.message)
        }else{
            let book_array=obj.book
            book_array.forEach(element => {
                grid_maker(element)
            });
        }
    }).catch(function(error){
        console.log(error)
    })
}
function cat_selected_comic(){
    category_heading.innerHTML="Comics"
    grid_container.innerHTML=''
    fetch("http://localhost/myfile_frontend/backend/book/read_book_genre.php?genre_id=17")
    .then(function(response){  // anything that index.php varDumps will be response
        
        return response.json();
    })
    .then(function(obj){
        console.log(obj)
        if("message" in obj){
            message_dispplayer(obj.message)
        }else{
            let book_array=obj.book
            book_array.forEach(element => {
                grid_maker(element)
            });
        }
    }).catch(function(error){
        console.log(error)
    })
}
function cat_selected_history(){
    category_heading.innerHTML="Histroy"
    grid_container.innerHTML=''
    fetch("http://localhost/myfile_frontend/backend/book/read_book_genre.php?genre_id=9")
    .then(function(response){  // anything that index.php varDumps will be response
        
        return response.json();
    })
    .then(function(obj){
        console.log(obj)
        if("message" in obj){
            message_dispplayer(obj.message)
        }else{
            let book_array=obj.book
            book_array.forEach(element => {
                grid_maker(element)
            });
        }
    }).catch(function(error){
        console.log(error)
    })
}
function cat_selected_all(){
    category_heading.innerHTML="All Books"
    grid_container.innerHTML=''
    fetch("http://localhost/myfile_frontend/backend/book/read_all_book.php")
    .then(function(response){  // anything that index.php varDumps will be response
        
        return response.json();
    })
    .then(function(obj){
        console.log(obj)
        if("message" in obj){
            message_dispplayer(obj.message)
        }else{
            let book_array=obj.book
            book_array.forEach(element => {
                grid_maker(element)
            });
        }
    }).catch(function(error){
        console.log(error)
    })
}


// const books_json='{"book":[{"name":"harry potter","author":"JK Rowling","seller":"someone","id":1},{"name":"harry potter2","author":"JK Rowling","seller":"someone2","id":2},{"name":"harry potter3","author":"JK Rowling","seller":"someone3","id":3}]}'
// const book_arr=JSON.parse(books_json)["book"];
// console.log(book_arr)
// const grid_container=document.getElementsByClassName("grid_container")[0]
// const navbar_links=document.getElementsByClassName("navbar-links")[0]

// book_arr.forEach(obj => {
//     gridGenerator(obj)
// })

// //now all the grids are filled using the fetched data 

// localStorage.setItem("person","ubaid")
// //if the person is not loged in 
// checking_person_logedin()











// function checking_person_logedin(){
//     const person=localStorage.getItem("person")
    
//     if (person==null){
        
//         navbar_links.style.display="none"
// }

// }




















// function gridGenerator(obj){
//     // console.log(obj.name,obj.author,obj.seller,obj.id)
//     grid_container.innerHTML+=`
//     <div class="grid_item">
//             <p class="grid_item_name">${obj.name}</p>
//             <p class="grid_item_id">${obj.id}</p>
//             <p class="grid_item_author">${obj.author}</p>
//             <p class="grid_item_seller">${obj.seller}</p>
//         </div>`
    

// }