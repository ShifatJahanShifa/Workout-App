const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const validator=require('validator')
const Schema=mongoose.Schema

const userSchema=new Schema({
    email:{
        type: String,
        required: true,
        unique: true      // the way i can'y sign up with same email :()
    },
    password:{
        type: String,
        required: true    // password to same hote pare but email can't be same
    }
})

// static sign up method attached with  user model
userSchema.statics.signup= async function(email,password){
    // validation
    if(!email || !password)
    {
        throw Error('all fields must be filled')
    }
    if(!validator.isEmail(email))
    {
        throw Error("email is not valid") 
    }
    if(!validator.isStrongPassword(password)) 
    {
        throw Error('password is not strong enough')
    }

    // if email already exists
    const exists=await this.findOne({email: email})
    if(exists)
    {
        throw Error("email already exists")   // throw error from this method 
    }

    // salt 
    const salt=await bcrypt.genSalt(10)  // 10, default
    const hash=await bcrypt.hash(password,salt)

    const user=await this.create({email, password: hash})

    return user
}


userSchema.statics.login= async function(email,password){
    // validation
    if(!email || !password)
    {
        throw Error('all fields must be filled')
    }
    

    // if email already exists
    const user=await this.findOne({email: email})
    if(!user)
    {
        throw Error("incorrect email")   // throw error from this method 
    }

    const match=await bcrypt.compare(password,user.password)
    if(!match)
    {
        throw Error('incorrect password')
    }
 
    return user
}

module.exports=mongoose.model("User",userSchema)