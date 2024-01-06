require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const router = express.Router();
const cors = require('cors')
const login = require("./controller/login_contoroller");
const expense = require("./controller/exp_controller");
const deletee = require("./controller/delete_controller");
const ledger = require("./controller/ledger_controller");
const admin = require("./controller/admin_controller");
const authmiddlewre = require('./middleware/auth_middleware')
const adminmiddleware = require('./middleware/admin_middleware')
const upload = require('./middleware/multer_middleware')
const emailauth = require('./middleware/email_auth')
const path = require('path');

app.use(express.json());
require('./conn/conn')
require('./test');
app.use(cors());
app.use(router);

app.get('/', (req, res) => {
    app.use(express.static(path.resolve(__dirname, 'client', 'build')))
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

router.route('/signup').post(login.signup,emailauth);    //used
router.route('/login').post(emailauth,login.login);      //used
router.route('/verify').get(login.verify);      //used
router.route('/photo').post(authmiddlewre, upload.single('image'), login.photo); //used
router.route('/updateuserdetail').post(authmiddlewre, login.updateuserdetail); //used

router.route('/addexpense').post(authmiddlewre, expense.addexpense); //used
router.route('/userdata').get(authmiddlewre, expense.userdata); //used
router.route('/userledger').post(authmiddlewre, expense.userledger);    //used     

router.route('/delmany').delete(authmiddlewre, deletee.delmany); //used
router.route('/updateexp').post(authmiddlewre, deletee.updateexp); //used

router.route('/addledger').post(authmiddlewre, ledger.addledger); //used
router.route('/updateledger').post(authmiddlewre, ledger.updateledger);    //used     
router.route('/deleteledger').post(authmiddlewre, ledger.deleteledger); //used

router.route('/adminexp').get(authmiddlewre, adminmiddleware, admin.allexpense); //used
router.route('/adminuser').get(authmiddlewre, adminmiddleware, admin.alluser); //used
router.route('/adminuserupdate').post(authmiddlewre, adminmiddleware, admin.userupdate); //used
router.route('/removeuser').post(authmiddlewre, adminmiddleware, admin.removeuser); //used
router.route('/deletemanyexp').post(authmiddlewre, adminmiddleware, deletee.delmany); //used
router.route('/adminupdateexp').post(authmiddlewre, adminmiddleware, deletee.updateexp); //used

app.listen(port, () => {
    console.log(`server listening at ${port}`);
})