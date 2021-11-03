import {db, firebase} from './firebaseConfig';


const isUserExists =  async (phoneNo)=>{
  const doc = await  db.collection ("customers").doc(phoneNo.toString()).get()
  return doc.exists;
}

const getUser = async (phoneNo)=>{
    const doc = await db.collection ("customers").doc(phoneNo.toString()).get ();
    console.table (doc.data());
    return doc.data ();
}

const getOrders = async (setOrders, phoneNo)=>{
    const snapshot = await db.collection ("customers").doc(phoneNo).collection ("orders").get()
   // console.table (snapshot.docs.map(doc=>doc.data()))
    return snapshot.docs.map(doc=>doc.data());
}


const addUser = (data)=>{
    db.collection("customers").doc(data.phoneNo.toString ()).set(data).then(res=>console.log("Added"))
}

const addOrder = async (phoneNo, order)=>{
    const today = new Date ();
    const date = `${today.getDate ()}-${today.getMonth ()}-${today.getFullYear ()}`;
    const id = order.cookID;
    const cook = await getCook (id);
 //   console.log(cook.Name)
    const newData = { 
        ...order,
   //     Name: cook.Name,
        date: date
    }
    db.collection ("customers").doc(phoneNo).collection ("orders").add(newData).then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}


const getCooks = async ()=>{
    const snapshot = await db.collection ("Cooks").get ();
    const data = await snapshot.docs.map(doc=>{
    return { ...doc.data(),
                id: doc.id
        }
    });
    console.log(data)
    return data;
}

const getCook = async (id)=>{
    const snapshot = await db.collection ("Cooks").doc(`${id}`).get();
    console.log (snapshot.data())
    const data = await snapshot.data();
    if (data) {
        // data will never be undefined here, because we just checked that.
        const foo = data.foo
    }
    if (data!==undefined)
        return data;
}

const getMenu = async (phone)=>{
    const orders = await getOrders (null, phone)
   // console.log(orders)
   // const orders = await Orders.filter(order=>order.verified)    
  //  console.log(orders);

   // console.log (orders)
    const IDs = await orders.map (order=>order.cookID);
   //console.log (IDs)
    const menuData = await IDs.map (async id=>await GetMenu(id));
    const res = await Promise.all(menuData);
    console.log (res);
    return res;
}

const GetMenu = async (id)=>{
        //console.log (id);
        const Cook = await db.collection ("Cooks").doc(`${id}`).get ();
        const cook = await Cook.data ();
        const Menu = await db.collection ("Cooks").doc (`${id}`).collection('Menu').get ();
        const menu = Menu.docs.map(doc=>doc.data ());
    //    console.log (menu)
        const obj = {
            Cook: cook,
            Menu: menu
        };
        console.log (obj);
        return obj
    }


const getCookByState = async (state)=>{
    const snapshot = await db.collection ("Cooks").get ();
    const data = await snapshot.docs.map(doc=>{
        return { ...doc.data(),
                    id: doc.id
            }
        });

    const cooks = data.filter(cook=>cook.State===state);
    if (cooks.length===0||cooks===undefined||cooks===null)
        return null;
    console.table(cooks)
    return cooks;

}


export {isUserExists, getUser, getOrders, addUser, addOrder, getCooks, getMenu, getCook, getCookByState, GetMenu}