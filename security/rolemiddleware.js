const ROLES = {
    "EMP": "EMP",
    "RRH": "RRH",
    "EXPERT": "EXPERT"
}

const inRole  = (...roles)=>(req, res, next)=>{
    const role =  roles.find(role=> req.user.role === role)
    if(!role){
      return res.status(401).json({message: "Access denied."})
    }
     next()
}

module.exports = {
    inRole,
    ROLES
}