const express = require("express");
const router = express.Router();
const clientModel = require("../Models/Client");
const bcrypt = require("bcrypt");

router.get("/all", (req, res) => {
  const clients = clientModel.find({});
  clients
    .then((clients) => {
      return res.status(200).json({ clients });
    })
    .catch((error) => {
      return res
        .status(405)
        .json({ message: "collection empty!", error: error });
    });
});

router.post("/add", (req, res) => {
  const { email, nom, prenom, age, password } = req.body;
  const saltRounds = 10;

  bcrypt
    .hash(password, saltRounds)
    .then((hashedPass) => {
      const addClient = new clientModel({
        email,
        nom,
        prenom,
        age,
        password: hashedPass,
      });
      return addClient.save();
    })
    .then((client) => {
      return res.status(201).json({ client, message: "insert good!" });
    })
    .catch((error) => {
      return res.status(400).json({ message: "error", error });
    });
});

router.put("/update/:emailclient", async (req, res) => {
  const emailclient = req.params.emailclient;
  const updatedClient = req.body;

  try {
    const hashedPass = await bcrypt.hash(updatedClient.password, 10);

    const checkingEmail = await clientModel.findOne({ email: emailclient });
    if (checkingEmail) {
      const addClient = await clientModel.updateOne(
        { email: emailclient },
        { ...updatedClient, password: hashedPass }
      );

      return res.status(201).json({ message: "updated good!" });
    } else {
      return res.status(404).json({ message: "email does not exist!" });
    }
  } catch (error) {
    return res.status(400).json({ message: "error", error });
  }
});

router.delete("/delete/:emailclient", async (req, res) => {
  const emailclient = req.params.emailclient;
  try {
    const check = await clientModel.findOne({ email: emailclient });
    if (check) {
      await clientModel.deleteOne({ email: emailclient });
      return  res.status(201).json({ message: "deleted good!" });
    } else {
        return res.status(201).json({ message: "emeil not  good!" });
    }
  } catch (error) {
    return  res.status(201).json({ message: "error" });
  }
});

module.exports = router;
