const express = require("express");
const app = express();
const cors = require("cors");
require("./db/connection");
const Card = require("./models/Card");
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

const port = process.env.PORT || 8080;

const isNullOrUndefined = (val) => val === null || val === undefined;

app.post("/card", async (req, res) => {
  const card = req.body;
  const { CardNumber, ExpiryDate, CvvCode, CardOwner } = card;
  const currentDate = new Date();

  if (CardNumber.toString().length !== 16) {
    res.status(400).send({
      err: "Invalid Card Number!",
    });
  }
  if (Date.parse(ExpiryDate) <= Date.parse(currentDate)) {
    res.status(400).send({
      err: "Card Expired!",
    });
  }
  if (isNullOrUndefined(CvvCode) || CvvCode.toString().trim().length === 0) {
    res.status(400).send({
      err: "Invalid Cvv!",
    });
  }
  if (
    isNullOrUndefined(CardOwner) ||
    CardOwner.toString().trim().length === 0
  ) {
    res.status(400).send({
      err: "Invalid Card Owner!",
    });
  } else {
    card.creationTime = new Date();
    const newCard = new Card(card);
    await newCard.save();
    res.status(200).send({
      success: "Transaction Successful!",
    });
  }
});

app.listen(port, () => {
  console.log(`connection established at ${port}`);
});
