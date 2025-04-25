
let chatPanelContainer=[]
let  contactList = []
const setProfile = ()=> {
    let currentUser = localStorage.getItem('username')
    document.getElementById('loged-in-user').textContent=currentUser
    fetchContentList()
    socket.emit('addSocketId',(currentUser))
}
const fetchContentList = async ()=>{

    const res = await fetch(`http://localhost:3002/getContactList?currentUser=${localStorage.getItem('username')}`)
     contactList= await res.json()
     displyContactList(contactList)
}
const displyContactList = (data)=>{
    const contacts = document.querySelector('.contact-list')
    contacts.innerHTML=''
    data.forEach((contactItem) => {
        let contactname=   document.createElement('p')
       
        contactname.setAttribute('id',`${contactItem.name}-${contactItem.id}`)
        contactname.textContent= contactItem.name
        let status = document.createElement('span')
        status.classList.add('current-status')
        let statusText= createElement('span',{
            textContent:'Offline',
            className:'status-text'
        })
        contactname.append(status,statusText)
        contacts.append(contactname)
        const chatPanel= ChatpanelFactory()
        chatPanel.dataset.contactId= contactItem.name
        chatPanelContainer.push(chatPanel)
       //  const firstElementFromContactList = document.querySelector('.contact-list').firstElementChild
       //  if(firstElementFromContactList) {
       //     firstElementFromContactList.dispatchEvent(new MouseEvent('click',{bubbles :true}))
       //  }
       });
}
const searchContact = (e)=>{
//     console.log(e.target.value)
//    let filterData= contactList.filter((contactListItem)=> e.target.value===contactListItem.name)
//    console.log(filterData)
//    displyContactList(filterData)
}
setProfile()