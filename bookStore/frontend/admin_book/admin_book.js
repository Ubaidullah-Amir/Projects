const myform=document.getElementById("myform");
const add_book_btn=document.getElementById("btn_addbook")

//only for checking numeric values 
let inp_book_price=document.getElementById("inp_price")
let inp_book_charges=document.getElementById("inp_borrow_charges")

//actually used 
let inp_book_edition=document.getElementById("inp_edition")
let inp_book_title=document.getElementById("inp_title")

let inp_descp=document.getElementById("inp_descrip")

//image of book

const inp_img=document.getElementById("inp_img")
const img_display=document.getElementById("img_display")
var upload_img=""

//for creating frop down menu of publisher and genre

const inp_publisher=document.getElementById("inp_publisher")
const inp_genre=document.getElementById("inp_genre")

fetch("http://localhost/myfile_frontend/backend/genre/read_all_genre.php")
.then(function(response){
    return response.json()
}).then(function(obj){
    obj.genre.forEach(element => {
        inp_genre.innerHTML+=`<option value="${element.genre_id}">${element.name}</option>`
    });
})
fetch("http://localhost/myfile_frontend/backend/publisher/read_all_publisher.php")
.then(function(response){
    return response.json()
}).then(function(obj){
    obj.publisher.forEach(element => {
        inp_publisher.innerHTML+=`<option value="${element.publisher_id}">${element.name}</option>`
    });
})



//onchange event occurs when the element loses focus

inp_img.addEventListener('change',function(){
    const reader=new FileReader();
    //onload event occurs when object is loaded
    reader.addEventListener("load",()=>{
        upload_img=reader.result;
        img_display.style.backgroundImage=`url(${upload_img})`
    })
    reader.readAsDataURL(this.files[0])
})


//form submit event

myform.addEventListener('submit',function(e){
    
    e.preventDefault();
    if(inp_descp.value.length>=500){
        alert("please add a concise description")
        console.log(inp_descp.value.length)
        inp_descp.value=''
    }if(inp_descp.value.length<=50){
        alert("please add a concise description")
        conole.log(inp_descp.value.length)
        inp_descp.value=''
    }if (upload_img==""){
        alert('add a image')
    
    }else if(upload_img !== "" && inp_descp.value.length<500 && inp_descp.value.length>50 ){
        console.log(inp_book_title.value);
        console.log(inp_book_edition.value);

        //now fetching a single book by title and edition and see whether there is book already exists
        let main_url='http://localhost/myfile_frontend/backend/book/read_book_title.php?title='+`${inp_book_title.value}`+'&edition='+`${inp_book_edition.value}`
        console.log(main_url)
        fetch(main_url)
        .then(function(response){
            return response.json()
        }).then(function(obj){
            console.log("returned",obj)
            if ("title" in obj){
                alert("the book already exists !")
                inp_book_title.value=''
                inp_book_edition.value=''
            }else if("message" in obj){
                form_data=new FormData(myform);
                form_data.append("img",inp_img.files[0])
                for (pair of form_data){
                    console.log(pair[0],pair[1]);
                }
                
                fetch('http://localhost/myfile_frontend/backend/book/create_book.php',{
                    method:'post',
                    body:form_data
                }).then(function(response){  
                    return response.json();
                }).then(function(obj){
                    console.log(obj);
                   
                }).catch(function(error){
                    console.log(error);
                })

            }
        })
        .catch(function(error){
            console.log(error)
        })

        
        
    }
})







function logout(){
    sessionStorage.clear()
    location.replace("../login_form/login.html")
}














//checking the integer of from inputs
// if(!Number.isInteger(inp_book_price)){
                
//     alert('book price should be integer')
//     inp_book_price=''

// }if(!Number.isInteger(inp_book_charges)){
            
//     alert('book charges should be integer')
//     inp_book_charges=''

// }if(!Number.isInteger(inp_book_edition)){
            
//     alert('book edition should be integer')
//     inp_book_edition=''











