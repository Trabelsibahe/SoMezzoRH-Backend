const UserModel = require("../models/user");
const ValidateRegister = require("../validators/register");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ValidateLogin = require("../validators/Login");
const PRIVATE_KEY = "SoMezzoRH";
const ValidatePasswordChange = require("../validators/PasswordChange");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");

//register
const Register = async (req, res) => {
  const { errors, isValid } = ValidateRegister(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      UserModel.findOne({ matricule: req.body.matricule }).then(async (exist) => {
        if (exist) {
          errors.matricule = "utilisateur déjà existant";
          res.status(404).json(errors);
        } else {
          UserModel.findOne({ email: req.body.email }).then(async (exist) => {
            if (exist) {
              errors.email = "email déjà existant";
              res.status(404).json(errors);
            } else {
              const hash = bcrypt.hashSync(req.body.password, 10); //hashed password
              req.body.password = hash;
              //req.body.role = "EMP";
              await UserModel.create(req.body);
              res.status(200).json({ message: "création d'un nouvel utilisateur" });
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
  const { errors, isValid } = ValidatePasswordChange(req.body);

  try {

    if (!isValid) {
      res.status(404).json(errors);
    }
    else {
      const user = await UserModel.findById(req.user.id);
      const isPasswordMatched = await bcrypt.compare(req.body.oldPassword, user.password);
      if (!isPasswordMatched) {
        errors.oldPassword = "Ancien mot de passe incorrect."
        res.status(400).json(errors);
      }
      else {
      const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
      user.password = hashedPassword;
      await user.save();
      return res.status(200).json({ message: "Mot de passe modifié avec succès." });
      }
    }
  }
  catch (error) {
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
                  nom: user.nom,
                  prenom: user.prenom,
                  matricule: user.matricule,
                  role: user.role,
                  operation: user.operation,
                  active: user.active,
                  titre: user.titre,
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
// /user
const EMP = (req, res) => {
  res.send("bienvenue EMP");
};


// /admin
const EXPERT = (req, res) => {
  res.send("bienvenue EXPERT");
};


const transporter = nodemailer.createTransport({
 service : "gmail",
  auth: {
    user: "rhmezzo0@gmail.com",
    pass: "mgoblzwnzgvpalyn",
  },
});




// send password reset 

const sendPasswordResetEmail = async (req,res) => {

  const email = String(req.body.email);
  try {
    const user = await UserModel.findOne({ email });

    if (user) {
    const resetToken = uuidv4(); // Générer un jeton de réinitialisation unique
    user.resetToken = resetToken;
    await user.save();

    const resetLink = `http://localhost:3000/newmotdepasse/${resetToken}`; // URL de réinitialisation du mot de passe

    const mailOptions = {
      from: "rhmezzo0@gmail.com",
      to: email,
      subject: "Réinitialisation de mot de passe",
      text: `Veuillez cliquer sur le lien suivant pour réinitialiser votre mot de passe : ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Un e-mail de réinitialisation de mot de passe a été envoyé." });
 } else {
  return res.status(400).json({ message: "L'utilisateur n'a pas été trouvé." });
}
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Une erreur s'est produite lors de l'envoi de l'e-mail de réinitialisation." });
  }
};



// reset
const resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;
  try {
    if (!resetToken || !newPassword) {
      return res.status(400).json({ message: "Les données de réinitialisation du mot de passe sont incomplètes." });
    }
    const user = await UserModel.findOne({
      resetToken,
      email: req.body.email
    });
    if (!user) {
      return res.status(400).json({ message: "Le jeton de réinitialisation est invalide ou l'utilisateur n'a pas été trouvé." });
    }

    // Générer un hash du nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Mettre à jour le mot de passe de l'utilisateur avec le hash
    user.password = hashedPassword;
    user.resetToken = null; // Réinitialiser le jeton de réinitialisation
    await user.save();

    return res.status(200).json({ message: "Votre mot de passe a été réinitialisé avec succès." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Une erreur s'est produite lors de la réinitialisation du mot de passe." });
  }
};


// gfdfdffd

const FindAllUser = async (req, res) => {
  try {
    const data = await UserModel.find()
    res.status(200).json(data)

  } catch (error) {
    res.status(404).json(error.message)
  }
}



module.exports = {
  FindAllUser,
  resetPassword,
  transporter,
  sendPasswordResetEmail,
  modifmotpass,
  Register,
  Login,
  EMP,
  EXPERT,
  PRIVATE_KEY,
};
