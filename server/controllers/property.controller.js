import mongoose from 'mongoose'
import Propterty from '../mongoDB/models/property.js'
import User from '../mongoDB/models/user.js'

const getAllProperties = async(req, res ) => {}
const getProperyDetail = async(req, res) => {}
const createProperty = async(req,res)=> {
    const {title, description, propertyType, location , price, photo, email} = req.body ; 

    // start a new session 
    // what happin in this functionis atomic, it can either work or not and we will not get stuck in between
    const session = await mongoose.startSession() ; 
    session.startTransaction() ; 

    const user = await User.findOne({email}).session(session);

    if (!user) throw new Error("user not found please try again.")
}
const updateProperty = async( req,res)=> {}
const deleteProperty = async(req, res)=> {}

export {
    getAllProperties, 
    getProperyDetail, 
    createProperty, updateProperty, deleteProperty
}

