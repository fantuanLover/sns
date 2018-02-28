import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

//Create a schema
const userSchema = new Schema({
	email : {
		type : String,
		required : true,
		unique : true,
		lowercase : true
	},
	username : {
		type : String,
		lowercase : true
	},
	password : { 
		type : String,
		required : true
	}
},{ timestamps: true }) 

userSchema.pre('save', async function (next) {
	try {
		const salt = await bcrypt.genSalt(10)
		const passwordHash = await bcrypt.hash(this.password, salt)
		this.password = passwordHash
		next()
	} catch (error) {
		next(error)
	}
})


userSchema.methods = {
	isValidPassword(newPassword){
		return bcrypt.compare(newPassword, this.password)
	},
	toJSON() {
		return {
			_id: this._id,
			username: this.username,
			email: this.email,
			createdAt : this.createdAt,
			updatedAt : this.updatedAt
		}
	}
}

//Create a model
const User = mongoose.model('User', userSchema)

//Export the model
module.exports = User














