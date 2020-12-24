var express = require("express");
var router = express.Router();

const Receipt = require("../models/receipt").Receipt;

//getReceipt middleware
async function getReceipt(req, res, next) {
  let receipt;
  try {
    receipt = await Receipt.findById({
      _id: req.params.id,
      owner: req.params.owner,
    });
    if (receipt == null) {
      return res.status(404).json({ message: "Cannot find Receipt" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.receipt = receipt;
  next();
}

// Get All Route
router.get("/:owner", async (req, res) => {
  try {
    const receipts = await Receipt.find({ owner: req.params.owner });
    res.json(receipts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get One Route Id
router.get("/:owner/:id", getReceipt, (req, res) => {
  // return res.json({ receipt: receipt });
  res.json(res.receipt);
});

// Create One Route
router.post("/", async (req, res) => {
  const receipt = new Receipt({
    _id: req.body._id,
    owner: req.body.owner,
    name: req.body.name,
    cost: req.body.cost,
    items: req.body.items,
    contributors: req.body.contributors,
  });
  try {
    const newReceipt = await receipt.save();
    res.status(201).json({ newReceipt });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// //Patch One
// router.patch("/:owner/:id", getReceipt, async (req, res) => {
//   if (req.body.name != null) {
//     res.receipt.name = req.body.name;
//   }
//   if (req.body.cost != null) {
//     res.receipt.cost = req.body.cost;
//   }
//   if (req.body.contributors != null) {
//     res.receipt.contributors = req.body.contributors;
//   }
//   if (req.body.selected != null) {
//     res.receipt.selected = req.body.selected;
//   }
//   try {
//     const updatedReceipt = await res.receipt.save();
//     res.json(updatedReceipt);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

//Put One
router.put("/:owner/:id", updateReceipt, async (req, res) => {
  try {
    console.log(req.body);
    const updatedReceipt = await res.receipt.set(req.body);
    res.json(updatedReceipt);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Delete One
router.delete("/:owner/:id", getReceipt, async (req, res) => {
  try {
    await res.receipt.deleteOne();
    res.json({ message: "Receipt has been deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function updateReceipt(req, res, next) {
  const receipt = new Receipt({
    _id: req.body._id,
    owner: req.body.owner,
    name: req.body.name,
    cost: req.body.cost,
    items: req.body.items,
    contributors: req.body.contributors,
  });
  Receipt.updateOne({ owner: req.params.owner, _id: req.params.id }, receipt)
    .then((result) => {
      if (result.n > 0) {
        res.status(200).json({
          message: "receipt updated",
        });
      } else {
        res.status(401).json({
          message: "not authorized",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "updating receipt failed",
      });
    });
  // res.receipt = receipt;
  // next();
}

module.exports = router;
