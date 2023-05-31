// import { useOnlinePeople } from "../../utils/reactQuery"
import {FriendList} from "./friendComps"


function ChatComp({user}) {
    return ( 
    <div>
        <h3>Chat</h3>
        <FriendList peopleList={user.friend}/>
    </div>
     );
}

export default ChatComp;