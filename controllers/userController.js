const UserModel = require("../models/user");
const ValidateRegister = require("../validators/register");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ValidateLogin = require("../validators/Login");
const PRIVATE_KEY = "SoMezzoRH";


//register
const Register = async (req, res) => {
  const { errors, isValid } = ValidateRegister(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      UserModel.findOne({ matricule: req.body.matricule }).then(async (exist) => {
        if (exist) {
          errors.matricule = "utilisateur déja exist ";
          res.status(404).json(errors);
        } else {
          const hash = bcrypt.hashSync(req.body.password, 10); //hashed password
          req.body.password = hash;
          req.body.role = "EMP";
          await UserModel.create(req.body);
          res.status(200).json({ message: "création un nouvel utilisateur" });
        }
      });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};

//login
const Login = async (req, res) => {
  const { errors, isValid } = ValidateLogin(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      UserModel.findOne({ matricule: req.body.matricule }).then((user) => {
        if (!user) {
          errors.matricule = "Ce matricule n'existe pas.";
          res.status(404).json(errors);
        } else {
          bcrypt.compare(req.body.password, user.password).then((isMatch) => {
            if (!isMatch) {
              errors.password = "Mot de passe incorrect.";
              res.status(404).json(errors);
            } else {
              var token = jwt.sign(
                {
                  id: user._id,
                  utilisateur: user.utilisateur,
                  matricule: user.matricule,
                  role: user.role,
                },
                PRIVATE_KEY,
                { expiresIn: "1d" }
              );
              res.status(200).json({
                message: "Connexion réussite.",
                token: "Bearer " + token,
              });
            }
          });
        }
      });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};
//fonction modifier motpass 
const modifmotpass = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await UserModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    const isPasswordMatched = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({ message: "Ancien mot de passe incorrect." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Mot de passe modifié avec succès." });
  } catch (error) {
    return res.status(500).json({ message: "Une erreur s'est produite lors de la modification du mot de passe." });
  }
};
// /user
const EMP = (req, res) => {
  res.send("bienvenue EMP");
};


// /admin
const EXPERT = (req, res) => {
  res.send("bienvenue EXPERT");
};


module.exports = {
  modifmotpass,
  Register,
  Login,
  EMP,
  EXPERT,
  PRIVATE_KEY,
};
