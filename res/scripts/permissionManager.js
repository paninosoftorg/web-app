const sections = {
    inventory: 1,
    users: 2,
    orders: 3
}

function managePermissions(userPerms, section){
    alert(userPerms + " " + section);
    switch(section){
        case sections.inventory:
            if(userPerms[0].permission == 1 || userPerms[0].permission == 2){
                //alert("ok");
                return true;
            }else{
                //alert("no");
                return true;
            }
            break;
        case sections.users:
            if(userPerms[0].permission == 1 || userPerms[0].permission == 2){
                //alert("ok");
                return true;
            }else{
                //alert("no");
                return true;
            }
            break;
        case sections.orders:
            if(userPerms[0].permission == 1 || userPerms[0].permission == 3){
                //alert("ok");
                return true;
            }else{
                //alert("no");
                return true;
            }
            break;
        default:
            return false;
            break;
    }
}