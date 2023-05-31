import { useContext } from "react";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import ListGroup from "react-bootstrap/esm/ListGroupItem";
import { UserContext } from "../Main";


export function Frienditem({item}) {
    const {setSelectedFriend}=useContext(UserContext)
    return (
        <div onClick={()=>{
            setSelectedFriend(item)}}>
            <p className="chat_item" as="li">{item.name}</p>
        </div>
     );
}

export function FriendList({peopleList}) {
    let people = peopleList.map((item)=>{
        return <Frienditem key={item._id}  item={item}/>
    })
    return ( 
    <div>
        
        <ListGroup variant="flush">
            {people}
        </ListGroup>
    </div>
     );
}
