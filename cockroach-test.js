const { Sequelize, DataTypes, Model } = require("sequelize-cockroachdb"); // import the required packages
const Str = require("@supercharge/strings");
require("dotenv").config();

// connect to CockroachDB through Sequelize
var sequelize = new Sequelize({
  dialect: "postgres",
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

// define the User model in accordance with schema
const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    referral_code: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    uid_1: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    uid_2: {
      type: DataTypes.STRING,
    },
    uid_3: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize, // we need to pass the connection instance
    modelName: "User", // we need to choose the model name (this can be anything)
    tableName: "referral", // table already defined in schema (use the same name)
    timestamps: false, // if true, creates columns "createdAt" and "updatedAt"
  }
);

// for testing the connection to CockroachDB
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    return true;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return false;
  }
}

// save a new user with uid (string)
async function newUser(uid_1) {
  var ref = Str.random(7); // generate the referral code
  const NewUser = User.build({ referral_code: ref, uid_1: uid_1 });
  try{
    await NewUser.save();
    console.log("New User was saved to the database!");
    return true;
  }
  catch(error){
    console.error("Unable to save New User:", error);
    return false;
  }

}

// checks if a user exists in the database with uid (string)
async function checkUserExists(uid_1){
    var res = await User.findAll({
        where: {
          uid_1: uid_1
        }
    })
    if(res.length == 0){
        console.log("User does not exist");
        return false;
    }
    else{
        console.log("User exists");
        return true;
    }
}

// fetch all user details by entering uid (string)
async function displayUser(uid_1){
  const user = await User.findOne({ where: { uid_1: uid_1 } });
  //console.log(user);
  if (user === null) {
    console.log('User not found!');
    return null;
  } else {
    var data = [];
    data.push(user.referral_code);
    data.push(user.uid_1);
    data.push(user.uid_2);
    data.push(user.uid_3);
    console.log(data);
    return data;
  }
}

// checks if slots are empty for the given referral code
async function checkSlots(ref_code){
  const user = await User.findOne({ where: { referral_code: ref_code } });
  if (user === null) {
    console.log('User not found!');
    return null;
  } else {
    var data = [];
    if(user.uid_2 == null){
      data.push(2);
    }
    if(user.uid_3 == null){
      data.push(3);
    }
    console.log(data);
    return data; // returns array like [2,3] [3] 
  }
}

// adds passed uid to the referral's row (either as uid_2 or uid_3 depending on availability)
async function addReferral(ref_code, uid){
  const user = await User.findOne({ where: { referral_code: ref_code } });
  var data = await checkSlots(ref_code);
  if(data.length == 0){
    console.log('No slots empty!');
    return null;
  }
  else{
    await user.set(`uid_${data[0]}`, uid).save();
    //await displayUser(user.uid_1);
  }
}

async function main(){
    //await testConnection();
    //await newUser("8765432");
    //await checkUserExists("8765432");
    //await displayUser("7654321");
    //await checkSlots("zWrjls9");
    //await addReferral("zWrjls9", "8765432");
}

main();
