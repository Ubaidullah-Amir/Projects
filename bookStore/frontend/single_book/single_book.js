// localstorage must have the currnet book selected
//should be delteled as soon as leaves this page

const book_title=document.getElementById("book_title_edition")
const book_publisher=document.getElementById("book_publisher")
const book_publish_date=document.getElementById("book_publish_date")
const book_img=document.getElementById("book_img")
const book_author=document.getElementById("book_author")
const book_genre=document.getElementById("book_genre")
const book_desc=document.getElementById("book_desc")
const book_charges=document.getElementById("book_charges")

let current_book_id=sessionStorage.getItem("current_book")
//now fetch all the attributes of this book by book id
//

fetch(`http://localhost/myfile_frontend/backend/book/single_book.php?id=${current_book_id}`)
.then(function(response){
    return response.json()
}).then(function(obj){
    console.log(obj)
    book_title.innerHTML=obj.title
    book_publisher.innerHTML=obj.publisher_name
    book_publish_date.innerHTML=obj.date_published
    book_img.src=obj.img
    book_author.innerHTML=obj.author
    book_genre.innerHTML=obj.genre_name
    book_desc.innerHTML=obj.descp
    book_charges.innerHTML='RS/='+obj.borr_charges
    
    
}).catch(function(error){
    console.log(error)
})



 

function add_to_cart(){
    //removes this item from session storage
    sessionStorage.removeItem("current_book")


    book_arr= JSON.parse(sessionStorage.getItem("book_arr"))
    console.log(book_arr)
    book_arr.push(current_book_id)
    console.log(JSON.stringify(book_arr))
    sessionStorage.setItem('book_arr',JSON.stringify(book_arr))
    console.log(sessionStorage.getItem('book_arr'))
    alert("Your item is successfully added to cart")
    
    location.replace('../main grid/index.html')
}





















