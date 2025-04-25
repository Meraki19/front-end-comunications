module.exports = function onlineUserDetails(data,currentusername) {
  
  let onlineUser=  data.filter((user)=>user.name==currentusername)
  return onlineUser
}