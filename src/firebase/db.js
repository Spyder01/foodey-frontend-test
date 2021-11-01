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
  //  const t = await db.collection ("Cooks").doc(id).get ()
 //   console.log(t.collection("Menu"))
    console.log(phone);
    const Orders = await getOrders (null, phone);
    const snapshot = await Orders.filter(order=>{
       // console.log(order.verified)
        if(order.verified)
            return order;
    });
  //  console.table (Orders)db
    console.table (Orders)

    const menu = await Orders.map(async order=>{
      //  console.log(order.cookID)
        if (order.cookID != undefined) {
        const cook = await db.collection ("Cooks").doc(order.cookID).collection('Menu').get ();

        const Menu = await cook.docs.map(doc=>{
            let data = {}
            for (let key in doc.data())
                data[key] = doc.data()[key];
            
        
             const Data = {
                ...data,
                day: doc.id
            };
            console.log (Data);
            return Data;
        })

        return Menu;
        }
        return null;



    })

    console.log (menu)
    return menu

}

const GetMenu = async (phoneNo)=>{
    const orders = await getOrders (null, phoneNo);
    const reqOrders = await orders.filter(order=>order.verified);
    const reqCookIds = await reqOrders.map(order=>order.cookID);
    const menu = await reqCookIds.map(async id=>{
        const data = await db.collection ("Cooks").doc(id).collection("Menu").get ();
        var dayMenu = {};
        await data.docs.map(async doc=>{dayMenu[doc.id] = doc.data});
        console.table (dayMenu);
        return dayMenu;
    })
    return menu;
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