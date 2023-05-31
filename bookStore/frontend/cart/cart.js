const flex_container=document.getElementById("flex_container")
const total_amount=document.getElementById("total_amount")
const proceed_btn=document.getElementById('proceed')

book_arr=JSON.parse(sessionStorage.getItem('book_arr'))
cart_display()




function grid_maker(obj,total){
    total+=obj.borr_charges
    flex_container.innerHTML+=`<div class="card">
        <img class="card_img" src=${obj.img}>
        <div class="card_text">
            <p class="card_title">${obj.title}</p>
            <h2 class="card_author">${obj.author}</h2>
            <p>Editon</p>
            <h5>${obj.edition}</h5>
            <p >RS/=${obj.borr_charges}</p>
            <button class="card_button" onclick="remove_item_cart('${obj.id}')">Remove</button>
        </div>
    </div>`
    return total
}

function remove_item_cart(item_to_delete){
    flex_container.innerHTML=''
    
    let index_to_delete=book_arr.indexOf(item_to_delete)
    console.log(index_to_delete,item_to_delete)
    book_arr.splice(index_to_delete,1)
    console.log(book_arr)
    sessionStorage.removeItem('book_arr')
    sessionStorage.setItem('book_arr',JSON.stringify(book_arr))
    cart_display()

}












proceed_btn.addEventListener('click',function(){
    
    if (book_arr.length==0){
        alert('please add a book')
    }else{
        alert("are you sure!!")
        book_arr.forEach(element => {
            value={}
            value.mem_id=JSON.parse(sessionStorage.getItem("user")).id
            value.book_id=parseInt(element)
            let date=new Date()
            let year=date.getFullYear()
            let month=date.getMonth()
            let day=date.getDate()
            value.transact_date=`${year}-${month}-${day}`
        
            let json_value=JSON.stringify(value)
            url='http://localhost/myfile_frontend/backend/borrowed_books/read_borr_book_userandbook.php?mem_id='+
            JSON.parse(sessionStorage.getItem("user")).id + '&book_id='+ parseInt(element)
            fetch(url)
            .then(function(response){
                return response.json()
            }).then(function(obj){
                console.log(obj)
                if ('mem_id' in obj){
                    alert('you already have this book')
                }else{
                    let new_url='http://localhost/myfile_frontend/backend/transaction/read_transaction_userandbook.php?mem_id='+
                    JSON.parse(sessionStorage.getItem("user")).id + '&book_id='+ parseInt(element)
                    fetch(new_url)
                    .then(function(response){
                        return response.json()
                    }).then(function(obj){
                        console.log(obj)
                        if('message' in obj){
                            fetch('http://localhost/myfile_frontend/backend/transaction/create_transaction.php',{
                                method:'post',
                                body:json_value
                            }).then(function(response){
                                return response.text()
                            }).then(function(obj){
                                console.log(obj)
                            }).catch(function(error){
                                console.log(error)
                            })

                        }
                    }).catch(function(error){
                        console.log(error)
                    })

                   

                }
            }).catch(function(error){
                console.log(error)
            })





            
            
        });

        
    }
})


function cart_display(){
    let total=0
    book_arr=[...new Set(book_arr)]
    console.log(book_arr)
    sessionStorage.removeItem("book_arr")
    sessionStorage.setItem("book_arr",JSON.stringify(book_arr))
    if (book_arr.length==0){
        flex_container.innerHTML='please add a book'
        total_amount.innerHTML='None'
    }else{
        book_arr.forEach(element => {
            url=`http://localhost/myfile_frontend/backend/book/single_book.php?id=${element}`
            
            fetch(url)
            .then(function(response){
                return response.json()
            }).then(function(obj){
                console.log(obj)
                total=grid_maker(obj,total)
                total_amount.innerHTML=`RS/=${total}`
            }).catch(function(error){
                console.log(error)
            })
        });
    }
    
}










function logout(){
    sessionStorage.clear()
    location.replace("../login_form/login.html")
}